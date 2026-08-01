"use client";

import {
    ArrowDownRight,
    ArrowUpRight,
    Landmark,
    TrendingDown,
    TrendingUp,
    WalletCards,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import {
    AnalyticsSummary,
} from "../../../types/analytics-view";

import {
    formatCurrency,
    formatPercentage,
} from "@/features/dashboard/lib/dashboard-formatters";

interface OverviewSummaryCardsProps {
    summary: AnalyticsSummary;

    currency: string;
}

function changeLabel(
    change: number | null,
    noun: string
) {
    if (change === null) {
        return `No prior ${noun} data`;
    }

    return `${Math.abs(change).toFixed(1)}% ${change >= 0
            ? "up"
            : "down"
        } vs prior period`;
}

export default function OverviewSummaryCards({
    summary,
    currency,
}: OverviewSummaryCardsProps) {
    const cards = [
        {
            title: "Income",

            value: formatCurrency(
                summary.income,
                currency
            ),

            change:
                summary.incomeChange,

            icon: TrendingUp,

            color:
                "text-emerald-500",
        },

        {
            title: "Expenses",

            value: formatCurrency(
                summary.expense,
                currency
            ),

            change:
                summary.expenseChange,

            icon: TrendingDown,

            color:
                "text-rose-500",
        },

        {
            title: "Net Cash Flow",

            value: formatCurrency(
                summary.netCashFlow,
                currency
            ),

            change: null,

            icon: WalletCards,

            color:
                summary.netCashFlow >= 0
                    ? "text-blue-500"
                    : "text-rose-500",
        },

        {
            title: "Savings Rate",

            value:
                summary.savingsRate ===
                    null
                    ? "—"
                    : formatPercentage(
                        summary.savingsRate
                    ),

            change: null,

            icon: Landmark,

            color:
                "text-violet-500",
        },
    ];

    return (
        <section
            className="
                grid
                gap-4

                sm:grid-cols-2

                xl:grid-cols-4
            "
        >
            {cards.map((card) => {
                const Icon =
                    card.icon;

                const isChangeCard =
                    card.change !==
                    null;

                return (
                    <Card
                        key={
                            card.title
                        }
                        className="
                            rounded-2xl
                            border
                            shadow-sm
                        "
                    >
                        <CardContent className="p-5">

                            <div
                                className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-3
                                "
                            >
                                <div>

                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                            text-muted-foreground
                                        "
                                    >
                                        {
                                            card.title
                                        }
                                    </p>

                                    <p
                                        className="
                                            mt-3
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                            tabular-nums
                                        "
                                    >
                                        {
                                            card.value
                                        }
                                    </p>

                                </div>

                                <div
                                    className={cn(
                                        `
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-muted
                                        `,
                                        card.color
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                            </div>

                            <p
                                className="
                                    mt-3
                                    flex
                                    items-center
                                    gap-1
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                {isChangeCard &&
                                    card.change !==
                                    null &&
                                    (card.change >=
                                        0 ? (
                                        <ArrowUpRight className="h-3.5 w-3.5" />
                                    ) : (
                                        <ArrowDownRight className="h-3.5 w-3.5" />
                                    ))}

                                {isChangeCard
                                    ? changeLabel(
                                        card.change,
                                        card.title.toLowerCase()
                                    )
                                    : "Across the selected period"}
                            </p>

                        </CardContent>
                    </Card>
                );
            })}
        </section>
    );
}