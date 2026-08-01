import {
    AnalyticsCategoryPoint,
    AnalyticsIncomeAnalysis,
    AnalyticsIncomePeriod,
} from "../types/analytics-view";

import {
    AnalyticsBuilderContext,
} from "./analytics-builder-context";

interface BuildIncomeAnalysisParams
    extends AnalyticsBuilderContext {

    incomeCategoryMap: Map<
        string,
        AnalyticsCategoryPoint
    >;

    monthly: AnalyticsIncomePeriod[];

    quarterly: AnalyticsIncomePeriod[];

    yearly: AnalyticsIncomePeriod[];
}

export function buildIncomeAnalysis({
    periodTransactions,
    summary,
    incomeCategoryMap,
    monthly,
    quarterly,
    yearly,
    byAmount,
}: BuildIncomeAnalysisParams): AnalyticsIncomeAnalysis {
    const incomeSummary = {
        totalIncome: summary.income,

        averageMonthlyIncome:
            monthly.length > 0
                ? summary.income /
                monthly.length
                : 0,

        highestSource:
            Array.from(
                incomeCategoryMap.values()
            ).sort(byAmount)[0] ??
            null,

        highestMonth:
            [...monthly].sort(
                (a, b) =>
                    b.income -
                    a.income
            )[0] ?? null,
    };

    const largestTransactions =
        periodTransactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    "INCOME"
            )
            .sort(
                (a, b) =>
                    b.amount -
                    a.amount
            )
            .slice(0, 10);

    const insights: string[] = [];

    if (
        incomeSummary.highestSource
    ) {
        insights.push(
            `${incomeSummary.highestSource.name} is your largest income source.`
        );
    }

    if (
        incomeSummary.highestMonth
    ) {
        insights.push(
            `${incomeSummary.highestMonth.label} was your highest income month.`
        );
    }

    insights.push(
        `Your average monthly income is ${incomeSummary.averageMonthlyIncome.toLocaleString(
            "en-IN"
        )}.`
    );

    return {
        summary:
            incomeSummary,

        sources: Array.from(
            incomeCategoryMap.values()
        ).sort(byAmount),

        monthly,

        quarterly,

        yearly,

        largestTransactions,

        insights,
    };
}