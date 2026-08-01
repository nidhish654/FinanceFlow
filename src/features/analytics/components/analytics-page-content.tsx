"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import AnalyticsTabs from "./analytics-tabs";

import AnalyticsTabContent from "./analytics-tab-content";

import {
    ANALYTICS_RANGES,
    AnalyticsRange,
    AnalyticsTab,
    AnalyticsView,
} from "../types/analytics-view";

interface AnalyticsPageContentProps {
    analytics: AnalyticsView;
}

const RANGE_LABELS: Record<
    AnalyticsRange,
    string
> = {
    "3M": "3 months",

    "6M": "6 months",

    YTD: "Year to date",

    "12M": "12 months",
};

export default function AnalyticsPageContent({
    analytics,
}: AnalyticsPageContentProps) {
    const {
        range,
    } = analytics;

    const [tab, setTab] =
        useState<AnalyticsTab>(
            "overview"
        );

    return (
        <main className="space-y-8 pb-6">

            {/* =========================================
             * Header
             * ========================================= */}

            <div
                className="
                    flex
                    flex-col
                    gap-4

                    lg:flex-row
                    lg:items-end
                    lg:justify-between
                "
            >
                <div className="space-y-1">

                    <p
                        className="
                            text-sm
                            font-medium
                            text-primary
                        "
                    >

                    </p>

                    <h1
                        className="
                            text-3xl
                            font-bold
                            tracking-tight
                        "
                    >
                        Insights & Analytics
                    </h1>

                    <p className="text-muted-foreground">
                        Understand your money, explore the patterns behind your income,
                        spending and cash flow.
                    </p>

                </div>

                <div className="overflow-x-auto">
                    <div
                        className="
                            flex
                            w-max
                            gap-1
                            rounded-xl
                            border
                            bg-muted/40
                            p-1
                        "
                    >
                        {ANALYTICS_RANGES.map(
                            (item) => (
                                <Button
                                    key={item}
                                    asChild
                                    size="sm"
                                    variant={
                                        item === range
                                            ? "secondary"
                                            : "ghost"
                                    }
                                    className={cn(
                                        "whitespace-nowrap rounded-lg px-4",
                                        item === range &&
                                        "bg-background shadow-sm"
                                    )}
                                >
                                    <Link
                                        href={`/analytics?range=${item}`}
                                    >
                                        {item}
                                    </Link>
                                </Button>
                            )
                        )}
                    </div>
                </div>

            </div>

            {/* =========================================
             * Range Info
             * ========================================= */}

            <p
                className="
                    text-sm
                    text-muted-foreground
                "
            >
                {RANGE_LABELS[
                    range
                ]}{" "}
                compared with the preceding period.
            </p>

            {/* =========================================
             * Analytics Tabs
             * ========================================= */}

            <AnalyticsTabs
                value={tab}
                onValueChange={setTab}
            />

            {/* =========================================
            * Tab Content
            * ========================================= */}

            <AnalyticsTabContent
                tab={tab}
                analytics={analytics}
            />

        </main>
    );
}