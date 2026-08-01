"use client";

import { AnalyticsView } from "../../../types/analytics-view";

import OverviewSummaryCards from "./overview-summary-cards";
import OverviewIncomeExpenseChart from "./overview-income-expense-chart";
import OverviewTopCategories from "./overview-top-categories";
import OverviewTopMerchants from "./overview-top-merchants";

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
            />

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
                    currency={analytics.currency}
                />

                <OverviewTopCategories
                    categories={analytics.topCategories}
                    currency={analytics.currency}
                />

            </section>

            {/* =========================================
             * Merchants
             * ========================================= */}

            <OverviewTopMerchants
                merchants={analytics.topMerchants}
                currency={analytics.currency}
            />

        </div>
    );
}