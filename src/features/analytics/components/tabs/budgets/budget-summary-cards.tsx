"use client";

import { Target, TrendingDown, Wallet, AlertCircle } from "lucide-react";

import { AnalyticsBudgetSummary } from "@/features/analytics/types/analytics-view";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { formatCurrency as globalFormatCurrency } from "@/lib/formatters";

interface BudgetSummaryCardsProps {
    summary: AnalyticsBudgetSummary;
    currency: string;
}

export default function BudgetSummaryCards({
    summary,
    currency,
}: BudgetSummaryCardsProps) {
    const formatCurrency = (value: number) => globalFormatCurrency(value, currency);;

    const healthColors = {
        Excellent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
        Good: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
        Warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
        Exceeded: "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20",
    };

    const cards = [
        {
            title: "Total Budget",
            value: formatCurrency(summary.totalBudgeted),
            description: `${summary.budgetCount} active budgets`,
            icon: <Target className="h-5 w-5" />,
            color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },
        {
            title: "Total Spent",
            value: formatCurrency(summary.totalSpent),
            description: `${summary.overallUtilization.toFixed(1)}% utilized`,
            icon: <TrendingDown className="h-5 w-5" />,
            color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        },
        {
            title: "Remaining",
            value: formatCurrency(summary.totalRemaining),
            description: "Available to spend",
            icon: <Wallet className="h-5 w-5" />,
            color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },
    ];

    return (
        <section
            className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
            "
        >
            {cards.map((card) => (
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
                                    {card.description}
                                </p>
                            </div>
                            <div
                                className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                    card.color
                                )}
                            >
                                {card.icon}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            {/* Health Card */}
            <Card
                className={cn(
                    "rounded-2xl border shadow-sm",
                    healthColors[summary.healthStatus]
                )}
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
                                "
                            >
                                Overall Health
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
                                {summary.healthStatus}
                            </p>
                            <p
                                className="
                                    mt-2
                                    text-xs
                                    opacity-80
                                "
                            >
                                {summary.overallUtilization.toFixed(0)}% Utilized &bull; {summary.budgetCount} Active Budget{summary.budgetCount !== 1 ? 's' : ''}
                            </p>
                        </div>
                        <div
                            className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/50",
                            )}
                        >
                            <AlertCircle className="h-5 w-5" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
