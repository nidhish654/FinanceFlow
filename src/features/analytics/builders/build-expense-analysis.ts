import { TransactionType } from "@prisma/client";

import {
    AnalyticsCategoryPoint,
    AnalyticsExpenseAnalysis,
    AnalyticsExpensePeriod,
    AnalyticsWeekdayPoint,
} from "../types/analytics-view";

import {
    AnalyticsBuilderContext,
} from "./analytics-builder-context";

interface BuildExpenseAnalysisParams
    extends AnalyticsBuilderContext {

    monthly: AnalyticsExpensePeriod[];

    weekly: AnalyticsExpensePeriod[];

    weekdaySpending: AnalyticsWeekdayPoint[];

    categoryMap: Map<
        string,
        AnalyticsCategoryPoint
    >;
}
export function buildExpenseAnalysis({
    periodTransactions,
    summary,
    monthly,
    weekly,
    weekdaySpending,
    categoryMap,
    byAmount,
}: BuildExpenseAnalysisParams): AnalyticsExpenseAnalysis {
    const expenseSummary = {
        totalExpense: summary.expense,

        averageMonthlyExpense:
            monthly.length > 0
                ? summary.expense /
                monthly.length
                : 0,

        highestCategory:
            Array.from(
                categoryMap.values()
            ).sort(byAmount)[0] ??
            null,

        highestMonth:
            [...monthly].sort(
                (a, b) =>
                    b.expense -
                    a.expense
            )[0] ?? null,
    };

    const largestTransactions =
        periodTransactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    TransactionType.EXPENSE
            )
            .sort(
                (a, b) =>
                    b.amount -
                    a.amount
            )
            .slice(0, 10);

    const insights: string[] = [];

    if (
        expenseSummary.highestCategory
    ) {
        const percentage =
            expenseSummary.totalExpense >
                0
                ? (
                    expenseSummary
                        .highestCategory
                        .amount /
                    expenseSummary.totalExpense
                ) * 100
                : 0;

        insights.push(
            `${expenseSummary.highestCategory.name} accounts for ${percentage.toFixed(
                1
            )}% of your total expenses.`
        );
    }

    if (
        expenseSummary.highestMonth
    ) {
        insights.push(
            `${expenseSummary.highestMonth.label} was your highest spending month.`
        );
    }

    const weekendExpense =
        periodTransactions
            .filter(
                (transaction) => {
                    if (
                        transaction.type !==
                        TransactionType.EXPENSE
                    ) {
                        return false;
                    }

                    const day =
                        new Date(
                            transaction.transactionDate
                        ).getDay();

                    return (
                        day === 0 ||
                        day === 6
                    );
                }
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

    const weekdayExpense =
        expenseSummary.totalExpense -
        weekendExpense;

    if (
        weekendExpense >
        weekdayExpense
    ) {
        insights.push(
            "You spent more on weekends than weekdays."
        );
    }

    insights.push(
        `Your average monthly spending is ${expenseSummary.averageMonthlyExpense.toLocaleString(
            "en-IN"
        )}.`
    );

    return {
        summary:
            expenseSummary,

        categories:
            Array.from(
                categoryMap.values()
            ).sort(byAmount),

        monthly,

        weekly,

        weekdaySpending,

        largestTransactions,

        insights,
    };
}