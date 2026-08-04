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

    const monthCount = range === "1M" ? 1 : range === "3M" ? 3 : range === "6M" ? 6 : 12;

    return new Date(
        now.getFullYear(),
        now.getMonth() - monthCount + 1,
        1
    );
}

import { AnalyticsDateRange } from "../types/analytics-view";

export async function getAnalyticsView(
    range: AnalyticsRange,
    customRange?: AnalyticsDateRange
): Promise<AnalyticsView> {
    const financeProfile = await requireActiveFinanceProfile();
    const transactions = await getTransactions();
    const accounts = await getAccounts();
    const budgets = await getBudgets({ financeProfileId: financeProfile.id });
    const goals = await getGoals({ financeProfileId: financeProfile.id });

    let now = new Date();
    let start = getRangeStart(range, now);
    let previousStart: Date;
    let previousEnd: Date;

    if (range === "CUSTOM" && customRange) {
        start = customRange.startDate;
        now = customRange.endDate;
        const duration = now.getTime() - start.getTime();
        previousEnd = new Date(start.getTime());
        previousStart = new Date(start.getTime() - duration);
    } else if (range === "YTD") {
        previousStart = new Date(start.getFullYear() - 1, 0, 1);
        previousEnd = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), 23, 59, 59, 999);
    } else {
        const monthSpan = range === "1M" ? 1 : range === "3M" ? 3 : range === "6M" ? 6 : 12;
        previousStart = new Date(start.getFullYear(), start.getMonth() - monthSpan, 1);
        previousEnd = new Date(start.getFullYear(), start.getMonth(), 1);
    }

    const periodTransactions = transactions.filter((transaction) => {
        const date = new Date(transaction.transactionDate);
        return date >= start && date <= now;
    });

    const previousTransactions = transactions.filter((transaction) => {
        const date = new Date(transaction.transactionDate);
        return date >= previousStart && date < previousEnd;
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

    const summary = buildSummary({
        periodTransactions,
        previousTransactions,
        monthlyCashFlow,
    });

    const categoryMap = new Map<string, AnalyticsCategoryPoint>();

    periodTransactions
        .filter((transaction) => transaction.type === TransactionType.EXPENSE)
        .forEach((transaction) => {
            const category = transaction.category;

            const isSubcategory = !!category?.parent;
            const parentKey = isSubcategory ? category!.parent!.id : (category?.id ?? "uncategorized");
            const parentName = isSubcategory ? category!.parent!.name : (category?.name ?? "Uncategorized");

            const currentCategory = categoryMap.get(parentKey) ?? {
                id: parentKey,
                name: parentName,
                amount: 0,
                subcategories: [],
            };

            currentCategory.amount += transaction.amount;

            if (isSubcategory) {
                const subKey = category!.id;
                let sub = currentCategory.subcategories?.find(s => s.id === subKey);
                if (!sub) {
                    sub = { id: subKey, name: category!.name, amount: 0 };
                    currentCategory.subcategories?.push(sub);
                }
                sub.amount += transaction.amount;
            }

            categoryMap.set(parentKey, currentCategory);
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
            const category = transaction.category;

            const isSubcategory = !!category?.parent;
            const parentKey = isSubcategory ? category!.parent!.id : (category?.id ?? "uncategorized");
            const parentName = isSubcategory ? category!.parent!.name : (category?.name ?? "Uncategorized");

            const current = incomeCategoryMap.get(parentKey) ?? {
                id: parentKey,
                name: parentName,
                amount: 0,
                subcategories: [],
            };

            current.amount += transaction.amount;

            if (isSubcategory) {
                const subKey = category!.id;
                let sub = current.subcategories?.find(s => s.id === subKey);
                if (!sub) {
                    sub = { id: subKey, name: category!.name, amount: 0 };
                    current.subcategories?.push(sub);
                }
                sub.amount += transaction.amount;
            }

            incomeCategoryMap.set(parentKey, current);
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

    let periodLabel = "";
    let comparisonLabel = "";

    switch (range) {
        case "1M":
            periodLabel = "last 30 days";
            comparisonLabel = "last 30 days";
            break;

        case "3M":
            periodLabel = "last 3 months";
            comparisonLabel = "last 3 months";
            break;

        case "6M":
            periodLabel = "last 6 months";
            comparisonLabel = "last 6 months";
            break;

        case "YTD":
            periodLabel = "year-to-date";
            comparisonLabel = "same period last year";
            break;

        case "12M":
            periodLabel = "last 12 months";
            comparisonLabel = "last 12 months";
            break;

        case "CUSTOM":
            periodLabel = `${start.toLocaleDateString()} - ${now.toLocaleDateString()}`;
            comparisonLabel =
                `${previousStart.toLocaleDateString()} - ${previousEnd.toLocaleDateString()}`;
            break;
    }

    return {
        range,

        customRange,

        period: {
            label: periodLabel,
            comparisonLabel,
        },

        currency: financeProfile.baseCurrency,

        summary,

        monthlyCashFlow,

        topCategories: Array.from(
            categoryMap.values()
        )
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 5),
        transactions: periodTransactions,

        accountAnalysis,

        budgetAnalysis,

        expenseAnalysis,

        incomeAnalysis,

        cashFlowAnalysis,

        goalAnalysis,
    };
}
