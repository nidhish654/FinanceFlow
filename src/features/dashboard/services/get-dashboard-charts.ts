import { TransactionType } from "@prisma/client";

import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    DashboardCharts,
    CategoryChartPoint,
    CashFlowChartPoint,
} from "../types/dashboard-view";

interface GetDashboardChartsParams {
    transactions: TransactionDto[];
}

export function getDashboardCharts({
    transactions,
}: GetDashboardChartsParams): DashboardCharts {
    const now = new Date();

    const currentYear =
        now.getFullYear();

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
                date.getFullYear() ===
                    currentYear &&
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
            (_, month) => {
                const monthTransactions =
                    transactions.filter(
                        (transaction) => {
                            const date =
                                new Date(
                                    transaction.transactionDate
                                );

                            return (
                                date.getFullYear() ===
                                    currentYear &&
                                date.getMonth() ===
                                    month
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
                        new Date(
                            currentYear,
                            month
                        ).toLocaleString(
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
        .slice(0, now.getMonth() + 1);

    return {
        expenseByCategory,

        incomeVsExpense,

        cashFlowTrend,
    };
}
