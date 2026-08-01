"use client";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import {
    ANALYTICS_TABS,
    AnalyticsTab,
} from "../types/analytics-view";

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

    "cash-flow": "Cash Flow",

    accounts: "Accounts",

    budgets: "Budgets",

    goals: "Goals",

    merchants: "Merchants",
};

export default function AnalyticsTabs({
    value,
    onValueChange,
}: AnalyticsTabsProps) {
    return (
        <div
            className="
                overflow-x-auto
                scrollbar-hide
                pb-0.5
            "
        >
            <div
                className="
                    flex
                    items-center
                    justify-center
                    w-max
                    gap-1
                    rounded-2xl
                    border
                    bg-muted/40
                    p-1
                "
            >
                {ANALYTICS_TABS.map(
                    (tab) => (
                        <Button
                            key={tab}
                            size="sm"
                            variant={
                                value === tab
                                    ? "secondary"
                                    : "ghost"
                            }
                            className={cn(
                                `
                                whitespace-nowrap
                                rounded-xl
                                px-4
                                `,
                                value ===
                                tab &&
                                "bg-background shadow-sm"
                            )}
                            onClick={() =>
                                onValueChange(
                                    tab
                                )
                            }
                        >
                            {
                                TAB_LABELS[
                                tab
                                ]
                            }
                        </Button>
                    )
                )}
            </div>
        </div>
    );
}