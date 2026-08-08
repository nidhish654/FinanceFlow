"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import AnalyticsTabs from "./analytics-tabs";
import AnalyticsTabContent from "./analytics-tab-content";

import { AnalyticsTab, AnalyticsView, AnalyticsRange } from "../types/analytics-view";

import AnalyticsRangePicker from "./analytics-range-picker";

import { Separator } from "@/components/ui/separator";

interface AnalyticsPageContentProps {
    analytics: AnalyticsView;
}

function getComparisonText(range: AnalyticsRange, customRange?: AnalyticsView["customRange"]) {
    switch (range) {
        case "1M":
            return "Comparing this month with the previous month";
        case "3M":
            return "Comparing these months with the previous 3 months";
        case "6M":
            return "Comparing these months with the previous 6 months";
        case "YTD":
            return "Comparing this year with previous year";
        case "12M":
            return "Comparing these months with the previous 12 months";
        case "CUSTOM":
            if (customRange) {
                const startStr = format(customRange.startDate, "MMM d");
                const endStr = format(customRange.endDate, "MMM d");
                const duration = customRange.endDate.getTime() - customRange.startDate.getTime();

                // Approximate previous range for text
                const previousStart = new Date(customRange.startDate.getTime() - duration);
                const previousEnd = new Date(customRange.startDate.getTime() - (1000 * 60 * 60 * 24)); // minus 1 day to be inclusive

                const prevStartStr = format(previousStart, "MMM d");
                const prevEndStr = format(previousEnd, "MMM d");

                return `${startStr} – ${endStr} vs ${prevStartStr} – ${prevEndStr}`;
            }
            return "Select a custom date range";
    }
}

export default function AnalyticsPageContent({
    analytics,
}: AnalyticsPageContentProps) {
    const { range, customRange } = analytics;
    const router = useRouter();

    const [tab, setTab] = useState<AnalyticsTab>("overview");

    const handleCustomApply = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
        router.push(
            `/analytics?range=CUSTOM&start=${startDate.toISOString()}&end=${endDate.toISOString()}`
        );
    };

    return (
        <main className="space-y-8 pb-6">

            {/* =========================================
             * Header
             * ========================================= */}

            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                    <p className="text-sm font-medium text-primary"></p>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Insights & Analytics
                    </h1>
                    <p className="text-muted-foreground">
                        Explore the patterns behind your income,
                        spending and cash flow.
                    </p>
                </div>

                {tab !== "budgets" &&
                    tab !== "goals" &&
                    // tab !== "categories" &&
                    (
                        <div className="mt-3">

                            <AnalyticsRangePicker
                                range={range}
                                customRange={customRange}
                                onApply={handleCustomApply}
                            />

                        </div>
                    )}
            </div>

            {/* =========================================
             * Range Info
             * ========================================= */}

            {tab !== "budgets" && tab !== "goals" &&
                // tab !== "categories" && 
                (
                    <p className="text-sm text-muted-foreground">
                        {getComparisonText(range, customRange)}
                    </p>
                )}

            <Separator />

            {/* =========================================
             * Analytics Tabs
             * ========================================= */}

            <AnalyticsTabs value={tab} onValueChange={setTab} />

            <Separator className="md:hidden" />
            {/* =========================================
            * Tab Content
            * ========================================= */}

            <AnalyticsTabContent tab={tab} analytics={analytics} />

        </main>
    );
}