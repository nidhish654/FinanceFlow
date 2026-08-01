"use client";

import {
    CalendarDays,
    Landmark,
    TrendingUp,
    Wallet,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    AnalyticsIncomeSummary,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface IncomeSummaryCardsProps {
    summary: AnalyticsIncomeSummary;

    currency: string;
}

export default function IncomeSummaryCards({
    summary,
    currency,
}: IncomeSummaryCardsProps) {
    const cards = [
        {
            title: "Total Income",

            value: formatCurrency(
                summary.totalIncome,
                currency
            ),

            subtitle:
                "Across the selected period",

            icon: Wallet,

            color:
                "text-emerald-500",
        },

        {
            title: "Average Monthly Income",

            value: formatCurrency(
                summary.averageMonthlyIncome,
                currency
            ),

            subtitle:
                "Average per month",

            icon: TrendingUp,

            color:
                "text-blue-500",
        },

        {
            title: "Largest Income Source",

            value:
                summary.highestSource?.name ??
                "—",

            subtitle:
                summary.highestSource
                    ? formatCurrency(
                          summary.highestSource.amount,
                          currency
                      )
                    : "No income recorded",

            icon: Landmark,

            color:
                "text-violet-500",
        },

        {
            title: "Highest Income Month",

            value:
                summary.highestMonth?.label ??
                "—",

            subtitle:
                summary.highestMonth
                    ? formatCurrency(
                          summary.highestMonth.income,
                          currency
                      )
                    : "No income recorded",

            icon: CalendarDays,

            color:
                "text-amber-500",
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

                return (
                    <Card
                        key={card.title}
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
                                <div className="min-w-0">

                                    <p
                                        className="
                                            text-sm
                                            font-medium
                                            text-muted-foreground
                                        "
                                    >
                                        {card.title}
                                    </p>

                                    <p
                                        className="
                                            mt-3
                                            truncate
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                            tabular-nums
                                        "
                                    >
                                        {card.value}
                                    </p>

                                    <p
                                        className="
                                            mt-2
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        {card.subtitle}
                                    </p>

                                </div>

                                <div
                                    className={`
                                        flex
                                        h-10
                                        w-10
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        bg-muted
                                        ${card.color}
                                    `}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                            </div>

                        </CardContent>

                    </Card>
                );
            })}
        </section>
    );
}