"use client";

import { AnalyticsView } from "../../../types/analytics-view";

import OverviewSummaryCards from "./overview-summary-cards";
import OverviewSmartInsights from "./overview-smart-insights";
import OverviewPeriodComparison from "./overview-period-comparison";
import OverviewIncomeExpenseChart from "./overview-income-expense-chart";
import OverviewTopCategories from "./overview-top-categories";

interface OverviewTabProps {
    analytics: AnalyticsView;
}

export default function OverviewTab({
    analytics,
}: OverviewTabProps) {
    return (
        <div className="space-y-8">

            {/* =========================================
             * Summary
             * ========================================= */}

            <OverviewSummaryCards
                summary={analytics.summary}
                currency={analytics.currency}
                periodLabel={analytics.period.label}
            />

            {/* =========================================
             * Insights
             * ========================================= */}

            <OverviewSmartInsights insights={analytics.summary.insights} />

            {/* =========================================
             * Comparisons
             * ========================================= */}

            {/* <OverviewPeriodComparison summary={analytics.summary} /> */}

            {/* =========================================
             * Charts
             * ========================================= */}

            <section
                className="
                    grid
                    gap-6

                    xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,1fr)]
                "
            >
                <OverviewIncomeExpenseChart
                    data={analytics.monthlyCashFlow}
                    summary={analytics.summary}
                    currency={analytics.currency}
                />

                <OverviewTopCategories
                    categories={analytics.topCategories}
                    currency={analytics.currency}
                />

            </section>



        </div>
    );
}