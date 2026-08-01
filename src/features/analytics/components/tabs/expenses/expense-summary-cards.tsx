"use client";

import {
    CalendarDays,
    CreditCard,
    Receipt,
    TrendingUp,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    AnalyticsExpenseSummary,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface ExpenseSummaryCardsProps {
    summary: AnalyticsExpenseSummary;

    currency: string;
}

export default function ExpenseSummaryCards({
    summary,
    currency,
}: ExpenseSummaryCardsProps) {
    const cards = [
        {
            title: "Total Expenses",

            value: formatCurrency(
                summary.totalExpense,
                currency
            ),

            subtitle:
                "Across the selected period",

            icon: Receipt,

            color:
                "text-rose-500",
        },

        {
            title: "Average Monthly Spend",

            value: formatCurrency(
                summary.averageMonthlyExpense,
                currency
            ),

            subtitle:
                "Average per month",

            icon: TrendingUp,

            color:
                "text-amber-500",
        },

        {
            title: "Highest Category",

            value:
                summary.highestCategory
                    ?.name ??
                "—",

            subtitle:
                summary.highestCategory
                    ? formatCurrency(
                        summary.highestCategory
                            .amount,
                        currency
                    )
                    : "No expense data",

            icon: CreditCard,

            color:
                "text-violet-500",
        },

        {
            title: "Highest Spending Month",

            value:
                summary.highestMonth
                    ?.label ??
                "—",

            subtitle:
                summary.highestMonth
                    ? formatCurrency(
                        summary.highestMonth
                            .expense,
                        currency
                    )
                    : "No expense data",

            icon: CalendarDays,

            color:
                "text-blue-500",
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
            {cards.map(
                (card) => {
                    const Icon =
                        card.icon;

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
                                    <div className="min-w-0">

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
                                                truncate
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

                                        <p
                                            className="
                                                mt-2
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            {
                                                card.subtitle
                                            }
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
                }
            )}
        </section>
    );
}