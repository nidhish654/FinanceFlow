import { TransactionType } from "@prisma/client";

import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    DashboardCharts,
    CategoryChartPoint,
    CashFlowChartPoint,
} from "../types/dashboard-view";
import { SettingsState } from "@/features/settings/types/settings";
import { getFinancialMonthRange, getFiscalYearRange } from "@/lib/finance/financial-period";

interface GetDashboardChartsParams {
    transactions: TransactionDto[];
    settings: SettingsState | null;
}

export function getDashboardCharts({
    transactions,
    settings,
}: GetDashboardChartsParams): DashboardCharts {
    const now = new Date();
    const monthStart = settings?.monthStart || 1;
    const fiscalStartMonth = settings?.fiscalYear || "JANUARY";

    const currentFiscalYear = getFiscalYearRange(now, fiscalStartMonth, monthStart);

    /* ========================================
     * Expense By Category
     * ====================================== */

    const expenseCategoryMap =
        new Map<string, CategoryChartPoint>();

    transactions
        .filter((transaction) => {
            const date =
                new Date(
                    transaction.transactionDate
                );

            return (
                transaction.type ===
                    TransactionType.EXPENSE &&
                date.getTime() >= currentFiscalYear.start.getTime() &&
                date.getTime() <= currentFiscalYear.end.getTime() &&
                transaction.category
            );
        })
        .forEach((transaction) => {
            const key =
                transaction.category!.id;

            const existing =
                expenseCategoryMap.get(key);

            if (existing) {
                existing.amount +=
                    transaction.amount;

                return;
            }

            expenseCategoryMap.set(key, {
                categoryId:
                    transaction.category!.id,

                categoryName:
                    transaction.category!.name,

                color:
                    transaction.category!
                        .color ?? "#94A3B8",

                amount:
                    transaction.amount,
            });
        });

    const expenseByCategory =
        Array.from(
            expenseCategoryMap.values()
        ).sort(
            (a, b) =>
                b.amount - a.amount
        );

    /* ========================================
     * Monthly Income vs Expense
     * ====================================== */

    const incomeVsExpense =
        Array.from(
            {
                length: 12,
            },
            (_, monthOffset) => {
                const targetDate = new Date(currentFiscalYear.start);
                targetDate.setMonth(targetDate.getMonth() + monthOffset);
                const { start, end } = getFinancialMonthRange(targetDate, monthStart);

                const monthTransactions =
                    transactions.filter(
                        (transaction) => {
                            const date =
                                new Date(
                                    transaction.transactionDate
                                );

                            return (
                                date.getTime() >= start.getTime() &&
                                date.getTime() <= end.getTime()
                            );
                        }
                    );

                const income =
                    monthTransactions
                        .filter(
                            (
                                transaction
                            ) =>
                                transaction.type ===
                                TransactionType.INCOME
                        )
                        .reduce(
                            (
                                total,
                                transaction
                            ) =>
                                total +
                                transaction.amount,
                            0
                        );

                const expense =
                    monthTransactions
                        .filter(
                            (
                                transaction
                            ) =>
                                transaction.type ===
                                TransactionType.EXPENSE
                        )
                        .reduce(
                            (
                                total,
                                transaction
                            ) =>
                                total +
                                transaction.amount,
                            0
                        );

                return {
                    month:
                        start.toLocaleString(
                            "en-US",
                            {
                                month:
                                    "short",
                            }
                        ),

                    income,

                    expense,
                };
            }
        );

    /* ========================================
     * Cash Flow Trend
     * ====================================== */

    let runningBalance = 0;

    const cashFlowTrend =
        incomeVsExpense.map(
            (
                month
            ): CashFlowChartPoint => {
                runningBalance +=
                    month.income -
                    month.expense;

                return {
                    month:
                        month.month,

                    balance:
                        runningBalance,
                };
            }
        )
        // Future months are not a forecast. Showing them creates a misleading
        // flat line after the latest real financial activity.
        .filter((_, index) => {
            const targetDate = new Date(currentFiscalYear.start);
            targetDate.setMonth(targetDate.getMonth() + index);
            const { start } = getFinancialMonthRange(targetDate, monthStart);
            const { start: currentStart } = getFinancialMonthRange(now, monthStart);
            return start.getTime() <= currentStart.getTime();
        });

    return {
        expenseByCategory,

        incomeVsExpense,

        cashFlowTrend,
    };
}
