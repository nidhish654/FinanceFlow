"use client";

import {
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
    periodLabel: string;
}

export default function OverviewSummaryCards({
    summary,
    currency,
    periodLabel,
}: OverviewSummaryCardsProps) {
    const cards = [
        {
            title: "Income",
            value: formatCurrency(summary.income.current, currency),
            subtitle: `Income during the ${periodLabel}`,
            icon: TrendingUp,
            color: "text-emerald-500",
        },
        {
            title: "Expenses",
            value: formatCurrency(summary.expense.current, currency),
            subtitle: `Expenses during the ${periodLabel}`,
            icon: TrendingDown,
            color: "text-rose-500",
        },
        {
            title: "Net Cash Flow",
            value: formatCurrency(summary.netCashFlow.current, currency),
            subtitle:
                summary.netCashFlow.current >= 0
                    ? `Cash flow during the ${periodLabel}`
                    : `Cash deficit during the ${periodLabel}`,
            icon: WalletCards,
            color:
                summary.netCashFlow.current >= 0
                    ? "text-blue-500"
                    : "text-rose-500",
        },
        {
            title: "Savings Rate",
            value: formatPercentage(summary.savingsRate.current),
            subtitle: `Savings rate during the ${periodLabel}`,
            icon: Landmark,
            color: "text-violet-500",
        },
    ];

    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;

                return (
                    <Card
                        key={card.title}
                        className="rounded-2xl border shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
                    >
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <p className="text-xl sm:xl font-medium text-muted-foreground">
                                        {card.title}
                                    </p>

                                    <p className="mt-3 text-2xl sm:text-2xl font-bold tracking-tight tabular-nums">
                                        {card.value}
                                    </p>

                                    <p className="mt-3 text-sm text-muted-foreground">
                                        {card.subtitle}
                                    </p>
                                </div>

                                <div
                                    className={cn(
                                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-muted",
                                        card.color
                                    )}
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