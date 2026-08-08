"use client";

import IncomeSummaryCards from "./income-summary-cards";
import IncomeTrendChart from "./income-trend-chart";
import IncomeSourceBreakdown from "./income-source-breakdown";

import {
    AnalyticsIncomeAnalysis,
    AnalyticsMonthlyPoint,
} from "../../../types/analytics-view";
import IncomeCadence from "./monthly-income";
import MonthlyIncome from "./monthly-income";
import LargestIncomeTransactions from "./largest-income-transactions";
import IncomeInsights from "./income-insights";

interface IncomeTabProps {
    analysis: AnalyticsIncomeAnalysis;

    monthlyCashFlow: AnalyticsMonthlyPoint[];

    currency: string;
}

export default function IncomeTab({
    analysis,
    monthlyCashFlow,
    currency,
}: IncomeTabProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-800">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                        Income Analytics
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Analyze your income trends.
                    </p>
                </div>
            </div>

            {/* =========================================
             * Income Summary
             * ========================================= */}

            <IncomeSummaryCards
                summary={analysis.summary}
                currency={currency}
            />

            {/* =========================================
             * Income Insights
             * ========================================= */}

            <IncomeInsights
                insights={
                    analysis.insights
                }
            />

            {/* =========================================
             * Income Trend + Sources
             * ========================================= */}

            <section
                className="
                    grid
                    gap-6

                    xl:grid-cols-[minmax(0,1.75fr)_400px]
                    items-start
                "
            >
                <IncomeTrendChart
                    data={monthlyCashFlow}
                    currency={currency}
                />

                <IncomeSourceBreakdown
                    sources={analysis.sources}
                    totalIncome={
                        analysis.summary.totalIncome
                    }
                    currency={currency}
                />

            </section>

            {/* =========================================
             * Income Cadence
             * ========================================= */}

            <MonthlyIncome
                months={analysis.monthly}
                currency={currency}
            />

            {/* =========================================
             * Largest Income Transactions
             * ========================================= */}

            <LargestIncomeTransactions
                transactions={
                    analysis.largestTransactions
                }
                currency={currency}
            />

        </div>
    );
}