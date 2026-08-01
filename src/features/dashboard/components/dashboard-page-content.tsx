"use client";

import { DashboardView } from "../types/dashboard-view";

import DashboardSummaryGrid from "./summary/dashboard-summary-grid";

import DashboardCharts from "./charts/dashboard-charts";

import DashboardWidgets from "./widgets/dashboard-widgets";

import DashboardInsights from "./insights/dashboard-insights";

interface DashboardPageContentProps {
    dashboard: DashboardView;
}

export default function DashboardPageContent({
    dashboard,
}: DashboardPageContentProps) {
    return (
        <div className="space-y-10 pb-6">

            {/* =========================================
             * Summary Cards
             * ========================================= */}

            <DashboardSummaryGrid
                summary={dashboard.summary}
            />

            {/* =========================================
            * Charts
            * ========================================= */}

            <DashboardCharts
                charts={dashboard.charts}
                currency={dashboard.currency}
            />

            {/* =========================================
            * Widgets
            * ========================================= */}

            <DashboardWidgets
                widgets={dashboard.widgets}
                currency={dashboard.currency}
            />

            {/* =========================================
            * Insights
            * ========================================= */}

            <DashboardInsights
                insights={dashboard.insights}
            />

        </div>
    );
}
