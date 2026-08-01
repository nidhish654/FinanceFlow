import {
    TransactionType,
} from "@prisma/client";

import {
    AnalyticsCashFlowAnalysis,
    AnalyticsSummary,
    AnalyticsCashFlowPeriod,
} from "../types/analytics-view";

import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    AnalyticsBuilderContext,
} from "./analytics-builder-context";

interface BuildCashFlowAnalysisParams {
    periodTransactions: TransactionDto[];

    summary: AnalyticsSummary;

    monthly: AnalyticsCashFlowPeriod[];
}

export function buildCashFlowAnalysis({
    periodTransactions,
    summary,
    monthly,
}: BuildCashFlowAnalysisParams): AnalyticsCashFlowAnalysis {

    const largestInflows =
        periodTransactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    TransactionType.INCOME
            )
            .sort(
                (a, b) =>
                    b.amount - a.amount
            )
            .slice(0, 10);

    const largestOutflows =
        periodTransactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    TransactionType.EXPENSE
            )
            .sort(
                (a, b) =>
                    b.amount - a.amount
            )
            .slice(0, 10);

    const summaryData = {

        openingBalance:
            monthly[0]
                ?.openingBalance ?? 0,

        closingBalance:
            monthly.at(-1)
                ?.closingBalance ?? 0,

        netCashFlow:
            summary.netCashFlow,

        averageMonthlyCashFlow:
            monthly.length
                ? summary.netCashFlow /
                  monthly.length
                : 0,

        highestInflowMonth:
            [...monthly]
                .sort(
                    (a, b) =>
                        b.income -
                        a.income
                )[0] ?? null,

        highestOutflowMonth:
            [...monthly]
                .sort(
                    (a, b) =>
                        b.expense -
                        a.expense
                )[0] ?? null,
    };

    const insights: string[] = [];

    const bestMonth =
        [...monthly]
            .sort(
                (a, b) =>
                    b.netCashFlow -
                    a.netCashFlow
            )[0];

    if (bestMonth) {
        insights.push(
            `${bestMonth.label} recorded your strongest positive cash flow of ${bestMonth.netCashFlow.toLocaleString("en-IN")}.`
        );
    }

    const worstMonth =
        [...monthly]
            .sort(
                (a, b) =>
                    a.netCashFlow -
                    b.netCashFlow
            )[0];

    if (
        worstMonth &&
        worstMonth.netCashFlow < 0
    ) {
        insights.push(
            `${worstMonth.label} recorded your largest cash deficit.`
        );
    }

    let biggestGrowth = 0;

    let growthMonth:
        AnalyticsCashFlowPeriod | null =
        null;

    for (const month of monthly) {

        const growth =
            month.closingBalance -
            month.openingBalance;

        if (growth > biggestGrowth) {

            biggestGrowth =
                growth;

            growthMonth =
                month;
        }
    }

    if (growthMonth) {

        insights.push(
            `Your balance grew the most during ${growthMonth.label}.`
        );
    }

    const negativeMonths =
        monthly.filter(
            (month) =>
                month.netCashFlow < 0
        );

    if (negativeMonths.length) {

        insights.push(
            `${negativeMonths.length} month${
                negativeMonths.length > 1
                    ? "s"
                    : ""
            } finished with negative cash flow.`
        );
    }

    const positiveMonths =
        monthly.filter(
            (month) =>
                month.netCashFlow >= 0
        ).length;

    const percentage =
        monthly.length
            ? (
                positiveMonths /
                monthly.length
            ) * 100
            : 0;

    insights.push(
        `${percentage.toFixed(0)}% of months had positive cash flow.`
    );

    insights.push(
        `Average monthly cash flow is ${summaryData.averageMonthlyCashFlow.toLocaleString(
            "en-IN", { maximumFractionDigits: 0 }
        )}.`
    );

    // if (
    //     summaryData.highestInflowMonth
    // ) {
    //     insights.push(
    //         `${summaryData.highestInflowMonth.label} recorded your highest cash inflow.`
    //     );
    // }

    // if (
    //     summaryData.highestOutflowMonth
    // ) {
    //     insights.push(
    //         `${summaryData.highestOutflowMonth.label} recorded your highest cash outflow.`
    //     );
    // }

    // insights.push(
    //     `Average monthly cash flow is ${summaryData.averageMonthlyCashFlow.toLocaleString(
    //         "en-IN"
    //     )}.`
    // );

    return {

        summary:
            summaryData,

        monthly,

        largestInflows,

        largestOutflows,

        insights,
    };
}