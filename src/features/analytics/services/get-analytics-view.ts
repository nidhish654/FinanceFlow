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

import { SettingsState } from "@/features/settings/types/settings";
import { getFinancialMonthRange, getFiscalYearRange, addFinancialMonths } from "@/lib/finance/financial-period";
import { Month } from "@prisma/client";

function getRangeStart(range: AnalyticsRange, now: Date, settings: SettingsState | null) {
    const monthStart = settings?.monthStart || 1;
    const fiscalYear = settings?.fiscalYear || "JANUARY";

    if (range === "YTD") {
        return getFiscalYearRange(now, fiscalYear as Month, monthStart).start;
    }

    const monthCount = range === "1M" ? 1 : range === "3M" ? 3 : range === "6M" ? 6 : 12;
    const targetDate = addFinancialMonths(now, -(monthCount - 1), monthStart);
    return getFinancialMonthRange(targetDate, monthStart).start;
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
    const { getSettings } = await import("@/features/settings/services/get-settings");
    const settings = await getSettings();
    const monthStartDay = settings?.monthStart || 1;

    let now = new Date();
    let start = getRangeStart(range, now, settings);
    let previousStart: Date;
    let previousEnd: Date;

    if (range === "CUSTOM" && customRange) {
        start = customRange.startDate;
        now = customRange.endDate;
        const duration = now.getTime() - start.getTime();
        previousEnd = new Date(start.getTime());
        previousStart = new Date(start.getTime() - duration);
    } else if (range === "YTD") {
        const fiscalYear = settings?.fiscalYear || "JANUARY";
        const previousYtd = new Date(now);
        previousYtd.setFullYear(previousYtd.getFullYear() - 1);
        previousStart = getFiscalYearRange(previousYtd, fiscalYear as Month, monthStartDay).start;
        const { start: currStart } = getFiscalYearRange(now, fiscalYear as Month, monthStartDay);
        const diff = now.getTime() - currStart.getTime();
        previousEnd = new Date(previousStart.getTime() + diff);
    } else {
        const monthSpan = range === "1M" ? 1 : range === "3M" ? 3 : range === "6M" ? 6 : 12;
        const prevTargetDate = addFinancialMonths(start, -monthSpan, monthStartDay);
        previousStart = getFinancialMonthRange(prevTargetDate, monthStartDay).start;
        previousEnd = new Date(start.getTime());
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
    let cursor1 = new Date(start.getTime());

    while (cursor1 <= now) {
        const { start: monthStart, end: monthEnd } = getFinancialMonthRange(cursor1, monthStartDay);
        
        const monthTransactions = periodTransactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);
            return date.getTime() >= monthStart.getTime() && date.getTime() <= monthEnd.getTime();
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
            month: monthStart.toLocaleString("en-US", {
                month: "short",
                year: range === "12M" ? "2-digit" : undefined,
            }),
            income,
            expense,
            netCashFlow: income - expense,
        });

        cursor1 = addFinancialMonths(cursor1, 1, monthStartDay);
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
    let cursor2 = new Date(start.getTime());

    while (cursor2 <= now) {
        const { start: monthStart, end: monthEnd } = getFinancialMonthRange(cursor2, monthStartDay);
        
        const monthTransactions = periodTransactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);
            return date.getTime() >= monthStart.getTime() && date.getTime() <= monthEnd.getTime();
        });

        monthly.push(
            buildExpensePeriod({
                id: `${monthStart.getFullYear()}-${monthStart.getMonth() + 1}`,
                label: monthStart.toLocaleString(
                    "en-US",
                    {
                        month: "long",
                        year: "numeric",
                    }
                ),
                transactions: monthTransactions,
            })
        );
        cursor2 = addFinancialMonths(cursor2, 1, monthStartDay);
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
    let cursor3 = new Date(start.getTime());

    while (cursor3 <= now) {
        const { start: monthStart, end: monthEnd } = getFinancialMonthRange(cursor3, monthStartDay);

        const monthTransactions = periodTransactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);
            return date.getTime() >= monthStart.getTime() && date.getTime() <= monthEnd.getTime();
        });

        incomeMonthly.push(
            buildIncomePeriod({
                id: `${monthStart.getFullYear()}-${monthStart.getMonth() + 1}`,
                label: monthStart.toLocaleString("en-US", { month: "long", year: "numeric" }),
                transactions: monthTransactions,
            })
        );

        cursor3 = addFinancialMonths(cursor3, 1, monthStartDay);
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
    let cursor4 = new Date(start.getTime());

    while (cursor4 <= now) {
        const { start: monthStart, end: monthEnd } = getFinancialMonthRange(cursor4, monthStartDay);

        const monthTransactions = periodTransactions.filter((transaction) => {
            const date = new Date(transaction.transactionDate);
            return date.getTime() >= monthStart.getTime() && date.getTime() <= monthEnd.getTime();
        });

        const period = buildCashFlowPeriod({
            id: `${monthStart.getFullYear()}-${monthStart.getMonth() + 1}`,
            label: monthStart.toLocaleString("en-US", { month: "long", year: "numeric" }),
            transactions: monthTransactions,
            openingBalance: runningBalance,
        });

        cashFlowMonthly.push(period);
        runningBalance = period.closingBalance;
        cursor4 = addFinancialMonths(cursor4, 1, monthStartDay);
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
