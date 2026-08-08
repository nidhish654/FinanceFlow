"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import {
    ANALYTICS_TABS,
    AnalyticsTab,
} from "../types/analytics-view";
import { Separator } from "@/components/ui/separator";

interface AnalyticsTabsProps {
    value: AnalyticsTab;

    onValueChange: (
        value: AnalyticsTab
    ) => void;
}

const TAB_LABELS: Record<
    AnalyticsTab,
    string
> = {
    overview: "Overview",

    expenses: "Expenses",

    income: "Income",

    categories: "Categories",

    "cash-flow": "Cash Flow",

    accounts: "Accounts",

    budgets: "Budgets",

    goals: "Goals",
};

export default function AnalyticsTabs({
    value,
    onValueChange,
}: AnalyticsTabsProps) {
    return (
        <>
            {/* =========================================
            * Mobile Layout
            * ========================================= */}

            <div className="md:hidden">
                <div
                    className="
                        grid
                        grid-cols-2
                        gap-x-4
                        gap-y-3
                    "
                >
                    {ANALYTICS_TABS.map((tab) => (
                        <Button
                            key={tab}
                            size="sm"
                            variant="ghost"
                            onClick={() => onValueChange(tab)}
                            className={cn(
                                `
                                    relative
                                    h-11
                                    rounded-none
                                    border-0
                                    bg-transparent
                                    px-1
                                    pb-2

                                    text-base
                                    font-medium
                                    text-muted-foreground

                                    transition-colors
                                    duration-200

                                    hover:bg-transparent
                                    hover:text-foreground

                                    active:scale-[0.98]
                                `,
                                value === tab &&
                                `
                                    text-foreground
                                    font-semibold
                                `
                            )}
                        >
                            {TAB_LABELS[tab]}

                            {/* Active Indicator */}
                            <span
                                className={cn(
                                    `
                                        absolute
                                        bottom-0
                                        left-1/2
                                        h-0.5
                                        -translate-x-1/2
                                        rounded-full
                                        bg-primary
                                        transition-all
                                        duration-300
                                    `,
                                    value === tab
                                        ? "w-12 opacity-100"
                                        : "w-0 opacity-0"
                                )}
                            />
                        </Button>
                    ))}
                </div>
            </div>

            {/* =========================================
            * Desktop Layout
            * ========================================= */}

            <div
                className="
                    hidden
                    md:flex
                    items-center
                    gap-6
                    border-b
                    border-border/60
                    pb-2
                "
            >
                {ANALYTICS_TABS.map((tab) => (
                    <Button
                        key={tab}
                        size="sm"
                        variant="ghost"
                        onClick={() => onValueChange(tab)}
                        className={cn(
                            `
                                relative
                                h-10
                                rounded-none
                                px-0
                                pb-3
                                text-2xl
                                font-medium
                                text-muted-foreground
                                transition-colors
                                duration-200

                                hover:bg-transparent
                                hover:text-foreground

                                active:scale-[0.98]
                            `,
                            value === tab &&
                            `
                                text-foreground
                                font-semibold
                                bg-transparent
                            `
                        )}
                    >
                        {TAB_LABELS[tab]}

                        {/* Bottom Indicator */}
                        <span
                            className={cn(
                                `
                                    absolute
                                    bottom-0
                                    left-0
                                    h-0.5
                                    rounded-full
                                    bg-primary
                                    transition-all
                                    duration-300
                                `,
                                value === tab
                                    ? "w-full opacity-100"
                                    : "w-0 opacity-0"
                            )}
                        />
                    </Button>
                ))}
            </div>
        </>
    );
}