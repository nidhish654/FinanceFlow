"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

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

import { DateRangePicker } from "@/components/common/date-range-picker";
import { Separator } from "@/components/ui/separator";

interface AnalyticsPageContentProps {
    analytics: AnalyticsView;
}

const RANGE_LABELS: Record<AnalyticsRange, string> = {
    "1M": "1 month",
    "3M": "3 months",
    "6M": "6 months",
    YTD: "Year to date",
    "12M": "12 months",
    CUSTOM: "Custom",
};

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

                return `${startStr} – ${endStr} compared with ${prevStartStr} – ${prevEndStr}`;
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
    const [isPickerOpen, setIsPickerOpen] = useState(false);

    const mobileRangeRef = useRef<HTMLDivElement>(null);

    const handleCustomApply = ({ startDate, endDate }: { startDate: Date; endDate: Date }) => {
        router.push(
            `/analytics?range=CUSTOM&start=${startDate.toISOString()}&end=${endDate.toISOString()}`
        );
    };

    useEffect(() => {
        const container = mobileRangeRef.current;

        if (!container) return;

        const selected = container.querySelector(
            `[data-range="${range}"]`
        ) as HTMLElement | null;

        if (!selected) return;

        // selected.scrollIntoView({
        //     behavior: "smooth",
        //     inline: "center",
        //     block: "nearest",
        // });

        const left =
            selected.offsetLeft -
            container.clientWidth / 2 +
            selected.clientWidth / 2;

        container.scrollTo({
            left,
            behavior: "smooth",
        });
    }, [range]);

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
                    tab !== "categories" && (
                        <div className="mt-3">

                            {/* Mobile */}
                            <div className="relative md:hidden">

                                {/* Left Fade */}
                                <div
                                    className="
                                    pointer-events-none
                                    absolute
                                    left-0
                                    top-0
                                    z-10
                                    h-full
                                    w-6
                                "
                                />

                                {/* Right Fade */}
                                <div
                                    className="
                                    pointer-events-none
                                    absolute
                                    right-0
                                    top-0
                                    z-10
                                    h-full
                                    w-6
                                "
                                />

                                <div
                                    ref={mobileRangeRef}
                                    className="
                                    overflow-x-auto
                                    scrollbar-hide
                                    snap-x
                                    snap-mandatory
                                    px-4
                                "
                                >
                                    <div
                                        className="
                                        inline-flex
                                        w-max
                                        items-center
                                        gap-1
                                        sm:rounded-full
                                        border
                                        bg-muted/40
                                        p-1
                                    "
                                    >
                                        {ANALYTICS_RANGES.map((item) => {

                                            if (item === "CUSTOM") {
                                                return (
                                                    <DateRangePicker
                                                        key={item}
                                                        isOpen={isPickerOpen}
                                                        onOpenChange={setIsPickerOpen}
                                                        initialDateRange={
                                                            customRange
                                                                ? {
                                                                    from: customRange.startDate,
                                                                    to: customRange.endDate,
                                                                }
                                                                : undefined
                                                        }
                                                        onApply={handleCustomApply}
                                                        onCancel={() =>
                                                            setIsPickerOpen(false)
                                                        }
                                                        trigger={
                                                            <Button
                                                                data-range="CUSTOM"
                                                                size="sm"
                                                                variant={
                                                                    range === "CUSTOM"
                                                                        ? "secondary"
                                                                        : "ghost"
                                                                }
                                                                className={cn(
                                                                    `
                                                                snap-start
                                                                whitespace-nowrap
                                                                rounded-full
                                                                h-8
                                                                px-3
                                                                text-sm
                                                                `,
                                                                    range === "CUSTOM" &&
                                                                    "bg-background shadow-sm font-semibold"
                                                                )}
                                                            >
                                                                {range === "CUSTOM" &&
                                                                    customRange
                                                                    ? `${format(
                                                                        customRange.startDate,
                                                                        "MMM d"
                                                                    )} – ${format(
                                                                        customRange.endDate,
                                                                        "MMM d"
                                                                    )}`
                                                                    : "Custom"}
                                                            </Button>
                                                        }
                                                    />
                                                );
                                            }

                                            return (
                                                <Button
                                                    key={item}
                                                    data-range={item}
                                                    asChild
                                                    size="sm"
                                                    variant={
                                                        item === range
                                                            ? "secondary"
                                                            : "ghost"
                                                    }
                                                    className={cn(
                                                        `
                                                    snap-start
                                                    whitespace-nowrap
                                                    rounded-full
                                                    h-8
                                                    px-3
                                                    text-sm
                                                    `,
                                                        item === range &&
                                                        "bg-background shadow-sm font-semibold"
                                                    )}
                                                >
                                                    <Link href={`/analytics?range=${item}`}>
                                                        {item}
                                                    </Link>
                                                </Button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Desktop */}
                            <div className="hidden md:block">
                                <div className="inline-flex w-max rounded-full border bg-muted/40 p-1.5">
                                    {ANALYTICS_RANGES.map((item) => {

                                        if (item === "CUSTOM") {
                                            return (
                                                <DateRangePicker
                                                    key={item}
                                                    isOpen={isPickerOpen}
                                                    onOpenChange={setIsPickerOpen}
                                                    initialDateRange={
                                                        customRange
                                                            ? {
                                                                from: customRange.startDate,
                                                                to: customRange.endDate,
                                                            }
                                                            : undefined
                                                    }
                                                    onApply={handleCustomApply}
                                                    onCancel={() =>
                                                        setIsPickerOpen(false)
                                                    }
                                                    trigger={
                                                        <Button
                                                            data-range="CUSTOM"
                                                            size="sm"
                                                            variant={
                                                                range === "CUSTOM"
                                                                    ? "secondary"
                                                                    : "ghost"
                                                            }
                                                            className={cn(
                                                                `
                                                            whitespace-nowrap
                                                            rounded-full
                                                            px-5
                                                            py-2
                                                            h-auto
                                                            text-sm
                                                            `,
                                                                range === "CUSTOM" &&
                                                                "bg-background shadow-md font-semibold"
                                                            )}
                                                        >
                                                            {range === "CUSTOM" &&
                                                                customRange
                                                                ? `${format(
                                                                    customRange.startDate,
                                                                    "MMM d"
                                                                )} – ${format(
                                                                    customRange.endDate,
                                                                    "MMM d"
                                                                )}`
                                                                : "Custom"}
                                                        </Button>
                                                    }
                                                />
                                            );
                                        }

                                        return (
                                            <Button
                                                key={item}
                                                data-range={item}
                                                asChild
                                                size="sm"
                                                variant={
                                                    item === range
                                                        ? "secondary"
                                                        : "ghost"
                                                }
                                                className={cn(
                                                    `
                                                whitespace-nowrap
                                                rounded-full
                                                px-5
                                                py-2
                                                h-auto
                                                text-sm
                                                `,
                                                    item === range &&
                                                    "bg-background shadow-md font-semibold"
                                                )}
                                            >
                                                <Link href={`/analytics?range=${item}`}>
                                                    {item}
                                                </Link>
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
            </div>

            {/* =========================================
             * Range Info
             * ========================================= */}

            {tab !== "budgets" && tab !== "goals" && tab !== "categories" && (
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