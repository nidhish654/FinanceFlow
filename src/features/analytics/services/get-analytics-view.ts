import { TransactionType } from "@prisma/client";

import { getTransactions } from "@/features/transactions/services/get-transactions";
import { requireActiveFinanceProfile } from "@/features/finance-profile/services";
import { buildExpensePeriod } from "../lib/build-expense-period";
import { buildIncomePeriod } from "../lib/build-income-period";
import { buildExpenseAnalysis } from "../builders/build-expense-analysis";
import { buildIncomeAnalysis, } from "../builders/build-income-analysis";
import { buildCashFlowAnalysis } from "../builders/build-cashflow-analysis";
import { buildCashFlowPeriod } from "../lib/build-cashflow-period";
import { getAccounts } from "@/features/accounts/actions/getAccounts";
import { buildAccountAnalysis } from "../builders/build-account-analysis";
import { getBudgets } from "@/features/planning/budget/queries/get-budgets";
import { buildBudgetAnalysis } from "../builders/build-budget-analysis";
import { getGoals } from "@/features/planning/goal/queries/get-goals";
import { buildGoalAnalysis } from "../builders/build-goal-analysis";

import {
    AnalyticsCategoryPoint,
    AnalyticsMerchantPoint,
    AnalyticsMonthlyPoint,
    AnalyticsRange,
    AnalyticsView,
    AnalyticsIncomePeriod,
    AnalyticsCashFlowPeriod,
} from "../types/analytics-view";
import { buildSummary } from "../builders/build-summary";

const WEEKDAY_LABELS = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
];

function getRangeStart(range: AnalyticsRange, now: Date) {
    if (range === "YTD") {
        return new Date(now.getFullYear(), 0, 1);
    }

    const monthCount = range === "3M" ? 3 : range === "6M" ? 6 : 12;

    return new Date(
        now.getFullYear(),
        now.getMonth() - monthCount + 1,
        1
    );
}

export async function getAnalyticsView(
    range: AnalyticsRange
): Promise<AnalyticsView> {
    const financeProfile = await requireActiveFinanceProfile();
    const transactions = await getTransactions();
    const accounts = await getAccounts();
    const budgets = await getBudgets({ financeProfileId: financeProfile.id });
    const goals = await getGoals({ financeProfileId: financeProfile.id });
    
    const now = new Date();
    const start = getRangeStart(range, now);
    const monthSpan =
        (now.getFullYear() - start.getFullYear()) * 12 +
        now.getMonth() - start.getMonth() +
        1;
    const previousStart = new Date(
        start.getFullYear(),
        start.getMonth() - monthSpan,
        1
    );

    const periodTransactions = transactions.filter((transaction) => {
        const date = new Date(transaction.transactionDate);

        return date >= start && date <= now;
    });

    const previousTransactions = transactions.filter((transaction) => {
        const date = new Date(transaction.transactionDate);

        return date >= previousStart && date < start;
    });

    const summary =
        buildSummary({
            periodTransactions,

            previousTransactions,
        });

    const monthlyCashFlow: AnalyticsMonthlyPoint[] = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);

    while (cursor <= now) {
        const monthStart = new Date(cursor);
        const monthEnd = new Date(
            cursor.getFullYear(),
            cursor.getMonth() + 1,
            1
        );
        const monthTransactions = periodTransactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);

            return date >= monthStart && date < monthEnd;
        });

        const income =
            monthTransactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        TransactionType.INCOME
                )
                .reduce(
                    (total, transaction) =>
                        total +
                        transaction.amount,
                    0
                );

        const expense =
            monthTransactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        TransactionType.EXPENSE
                )
                .reduce(
                    (total, transaction) =>
                        total +
                        transaction.amount,
                    0
                );

        monthlyCashFlow.push({
            month: cursor.toLocaleString("en-US", {
                month: "short",
                year: range === "12M" ? "2-digit" : undefined,
            }),
            income,
            expense,
            netCashFlow: income - expense,
        });

        cursor.setMonth(cursor.getMonth() + 1);
    }

    const categoryMap = new Map<string, AnalyticsCategoryPoint>();
    const merchantMap = new Map<string, AnalyticsMerchantPoint>();

    periodTransactions
        .filter((transaction) => transaction.type === TransactionType.EXPENSE)
        .forEach((transaction) => {
            const category = transaction.category;
            const categoryKey = category?.id ?? "uncategorized";
            const categoryName = category?.name ?? "Uncategorized";
            const currentCategory = categoryMap.get(categoryKey);
            const merchantName = transaction.description?.trim() || categoryName;
            const currentMerchant = merchantMap.get(merchantName);

            categoryMap.set(categoryKey, {
                id: categoryKey,
                name: categoryName,
                amount: (currentCategory?.amount ?? 0) + transaction.amount,
            });

            merchantMap.set(merchantName, {
                name: merchantName,
                amount: (currentMerchant?.amount ?? 0) + transaction.amount,
                transactionCount: (currentMerchant?.transactionCount ?? 0) + 1,
            });
        });

    const byAmount = <T extends { amount: number }>(a: T, b: T) =>
        b.amount - a.amount;

    const monthly = [];
    const monthCursor = new Date(start.getFullYear(), start.getMonth(), 1);

    while (monthCursor <= now) {
        const monthStart = new Date(monthCursor);
        const monthEnd = new Date(
            monthCursor.getFullYear(),
            monthCursor.getMonth() + 1,
            1
        );
        const monthTransactions = periodTransactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);

            return date >= monthStart && date < monthEnd;
        });

        monthly.push(
            buildExpensePeriod({
                id: `${monthCursor.getFullYear()}-${monthCursor.getMonth() + 1}`,

                label: monthCursor.toLocaleString(
                    "en-US",
                    {
                        month: "long",
                        year: "numeric",
                    }
                ),

                transactions:
                    monthTransactions,
            })
        );
        monthCursor.setMonth(monthCursor.getMonth() + 1);
    }

    const weekly = [];
    const weekCursor = new Date(start);
    const weekDay = weekCursor.getDay();
    weekCursor.setDate(
        weekCursor.getDate() - (weekDay === 0 ? 6 : weekDay - 1)
    );

    while (weekCursor <= now) {
        const weekStart = new Date(weekCursor);
        const weekEnd = new Date(weekCursor);
        weekEnd.setDate(weekEnd.getDate() + 7);
        const weekTransactions = periodTransactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);

            return date >= weekStart && date < weekEnd;
        });

        weekly.push(
            buildExpensePeriod({
                id: weekStart
                    .toISOString()
                    .slice(0, 10),

                label: `Week of ${weekStart.toLocaleDateString(
                    "en-US",
                    {
                        day: "numeric",
                        month: "short",
                    }
                )}`,

                transactions:
                    weekTransactions,
            })
        );
        weekCursor.setDate(weekCursor.getDate() + 7);
    }

    const weekdaySpending = WEEKDAY_LABELS.map((day, index) => ({
        day,
        amount: periodTransactions
            .filter((transaction) =>
                transaction.type === TransactionType.EXPENSE &&
                new Date(transaction.transactionDate).getDay() === index
            )
            .reduce((total, transaction) => total + transaction.amount, 0),
    }));

    const expenseAnalysis =
        buildExpenseAnalysis({
            periodTransactions,

            summary,

            monthly,

            weekly,

            weekdaySpending,

            categoryMap,

            byAmount,
        });

    const incomeCategoryMap = new Map<
        string,
        AnalyticsCategoryPoint
    >();

    periodTransactions
        .filter(
            (transaction) =>
                transaction.type ===
                TransactionType.INCOME
        )
        .forEach((transaction) => {
            const categoryId =
                transaction.category?.id ??
                "uncategorized";

            const current =
                incomeCategoryMap.get(
                    categoryId
                );

            incomeCategoryMap.set(
                categoryId,
                {
                    id: categoryId,

                    name:
                        transaction.category
                            ?.name ??
                        "Uncategorized",

                    amount:
                        (current?.amount ??
                            0) +
                        transaction.amount,
                }
            );
        });

    const incomeMonthly: AnalyticsIncomePeriod[] = [];

    const incomeCursor =
        new Date(
            start.getFullYear(),
            start.getMonth(),
            1
        );

    while (incomeCursor <= now) {
        const monthStart =
            new Date(incomeCursor);

        const monthEnd =
            new Date(
                incomeCursor.getFullYear(),
                incomeCursor.getMonth() +
                1,
                1
            );

        const monthTransactions =
            periodTransactions.filter(
                (transaction) => {
                    const date =
                        new Date(
                            transaction.transactionDate
                        );

                    return (
                        date >= monthStart &&
                        date < monthEnd
                    );
                }
            );

        incomeMonthly.push(
            buildIncomePeriod({
                id: `${incomeCursor.getFullYear()}-${incomeCursor.getMonth() + 1}`,

                label: incomeCursor.toLocaleString(
                    "en-US",
                    {
                        month: "long",
                        year: "numeric",
                    }
                ),

                transactions:
                    monthTransactions,
            })
        );

        incomeCursor.setMonth(
            incomeCursor.getMonth() + 1
        );
    }

    const quarterly: AnalyticsIncomePeriod[] = [];

    const yearly: AnalyticsIncomePeriod[] = [];

    const incomeAnalysis =
        buildIncomeAnalysis({
            periodTransactions,

            summary,

            incomeCategoryMap,

            monthly:
                incomeMonthly,

            quarterly,

            yearly,

            byAmount,
        });

    const cashFlowMonthly: AnalyticsCashFlowPeriod[] = [];

    let runningBalance = 0;

    const cashFlowCursor = new Date(
        start.getFullYear(),
        start.getMonth(),
        1
    );

    while (cashFlowCursor <= now) {

        const monthStart = new Date(cashFlowCursor);

        const monthEnd = new Date(
            cashFlowCursor.getFullYear(),
            cashFlowCursor.getMonth() + 1,
            1
        );

        const monthTransactions =
            periodTransactions.filter((transaction) => {

                const date = new Date(
                    transaction.transactionDate
                );

                return (
                    date >= monthStart &&
                    date < monthEnd
                );
            });

        const period =
            buildCashFlowPeriod({

                id:
                    `${cashFlowCursor.getFullYear()}-${cashFlowCursor.getMonth() + 1}`,

                label:
                    cashFlowCursor.toLocaleString(
                        "en-US",
                        {
                            month: "long",
                            year: "numeric",
                        }
                    ),

                transactions:
                    monthTransactions,

                openingBalance:
                    runningBalance,
            });

        cashFlowMonthly.push(period);

        runningBalance =
            period.closingBalance;

        cashFlowCursor.setMonth(
            cashFlowCursor.getMonth() + 1
        );
    }

    const cashFlowAnalysis =
        buildCashFlowAnalysis({

            periodTransactions,

            summary,

            monthly:
                cashFlowMonthly,
        });

    const accountAnalysis = buildAccountAnalysis({
        accounts,
        periodTransactions,
        startDate: start,
        endDate: now,
    });

    const budgetAnalysis = buildBudgetAnalysis({
        budgets,
        transactions,
        currency: financeProfile.baseCurrency,
    });

    const goalAnalysis = buildGoalAnalysis({
        goals,
        currency: financeProfile.baseCurrency,
    });

    return {
        range,

        currency:
            financeProfile.baseCurrency,

        summary,

        monthlyCashFlow,

        topCategories:
            Array.from(
                categoryMap.values()
            )
                .sort(byAmount)
                .slice(0, 5),

        topMerchants:
            Array.from(
                merchantMap.values()
            )
                .sort(byAmount)
                .slice(0, 5),

        accountAnalysis,

        budgetAnalysis,

        expenseAnalysis,

        incomeAnalysis,

        cashFlowAnalysis,

        goalAnalysis,
    };
}
