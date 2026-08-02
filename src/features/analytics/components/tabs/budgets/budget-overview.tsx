"use client";

import {
    CheckCircle2,
    AlertCircle,
    AlertTriangle,
    XCircle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import { AnalyticsBudget } from "@/features/analytics/types/analytics-view";

import { cn } from "@/lib/utils";

interface BudgetOverviewProps {
    budgets: AnalyticsBudget[];

    currency: string;
}

export default function BudgetOverview({
    budgets,
    currency,
}: BudgetOverviewProps) {
    const formatCurrency = (
        value: number
    ) =>
        new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency,
                maximumFractionDigits: 0,
            }
        ).format(value);

    const formatDate = (
        date: Date
    ) =>
        new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
            }
        );

    const healthConfig = {
        Excellent: {
            icon: (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ),

            badge:
                "bg-emerald-500/10 text-emerald-500",

            bar: "bg-emerald-500",

            rank: 4,
        },

        Good: {
            icon: (
                <AlertCircle className="h-5 w-5 text-blue-500" />
            ),

            badge:
                "bg-blue-500/10 text-blue-500",

            bar: "bg-blue-500",

            rank: 3,
        },

        Warning: {
            icon: (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
            ),

            badge:
                "bg-amber-500/10 text-amber-500",

            bar: "bg-amber-500",

            rank: 2,
        },

        Exceeded: {
            icon: (
                <XCircle className="h-5 w-5 text-red-500" />
            ),

            badge:
                "bg-red-500/10 text-red-500",

            bar: "bg-red-500",

            rank: 1,
        },
    };

    const sortedBudgets = [...budgets].sort(
        (a, b) => {
            const rankA =
                healthConfig[
                    a.healthStatus
                ].rank;

            const rankB =
                healthConfig[
                    b.healthStatus
                ].rank;

            if (rankA !== rankB) {
                return (
                    rankA - rankB
                );
            }

            return (
                b.utilization -
                a.utilization
            );
        }
    );

    return (
        <Card className="rounded-2xl border shadow-sm">

            <CardHeader className="space-y-2">

                <CardTitle className="text-2xl font-bold tracking-tight">
                    Budget Overview
                </CardTitle>

                <CardDescription>
                    Review every budget and monitor
                    spending progress across the
                    selected filter.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {sortedBudgets.length ===
                    0 ? (
                    <div
                        className="
                            flex
                            h-64
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No budgets match this
                        filter.
                    </div>
                ) : (
                    <div
                        className="
                            max-h-[440px]
                            space-y-4
                            overflow-y-auto
                            pr-2
                        "
                    >
                        {sortedBudgets.map(
                            (
                                budget
                            ) => {
                                const cfg =
                                    healthConfig[
                                    budget
                                        .healthStatus
                                    ];

                                return (
                                    <div
                                        key={
                                            budget.id
                                        }
                                        className="
                                            rounded-xl
                                            border
                                            bg-muted/20
                                            p-5
                                            space-y-4
                                        "
                                    >
                                        {/* Header */}

                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                        >
                                            <div>

                                                <div
                                                    className="
                                                        flex
                                                        flex-wrap
                                                        items-center
                                                        gap-2
                                                    "
                                                >
                                                    {
                                                        cfg.icon
                                                    }

                                                    <h3 className="text-lg font-semibold">

                                                        {
                                                            budget.name
                                                        }

                                                    </h3>

                                                    <span
                                                        className="
                                                            rounded-md
                                                            bg-muted
                                                            px-2
                                                            py-0.5
                                                            text-[10px]
                                                            font-semibold
                                                            uppercase
                                                            tracking-wide
                                                            text-muted-foreground
                                                        "
                                                    >
                                                        {
                                                            budget.period
                                                        }{" "}
                                                        Budget
                                                    </span>

                                                </div>

                                                <p className="mt-1 text-sm text-muted-foreground">

                                                    {formatDate(
                                                        budget.startDate
                                                    )}

                                                    {" → "}

                                                    {formatDate(
                                                        budget.endDate
                                                    )}

                                                </p>

                                            </div>

                                            <span
                                                className={cn(
                                                    "rounded-lg px-3 py-1 text-xs font-semibold",
                                                    cfg.badge
                                                )}
                                            >
                                                {
                                                    budget.healthStatus
                                                }
                                            </span>

                                        </div>

                                        {/* Progress */}

                                        <div className="space-y-2">

                                            <div className="flex items-center justify-between text-sm">

                                                <span className="text-muted-foreground">
                                                    Budget
                                                    Utilization
                                                </span>

                                                <span
                                                    className={cn(
                                                        "font-semibold tabular-nums",
                                                        budget.isExceeded &&
                                                        "text-red-500"
                                                    )}
                                                >
                                                    {budget.utilization.toFixed(
                                                        0
                                                    )}
                                                    %
                                                </span>

                                            </div>

                                            <Progress
                                                value={Math.min(
                                                    budget.utilization,
                                                    100
                                                )}
                                                indicatorClassName={
                                                    cfg.bar
                                                }
                                                className="h-2.5"
                                            />

                                        </div>

                                        {/* Stats */}

                                        <div
                                            className="
                                                grid
                                                grid-cols-3
                                                gap-4
                                            "
                                        >

                                            <div>

                                                <p
                                                    className="
                                                        text-[10px]
                                                        uppercase
                                                        tracking-wider
                                                        text-muted-foreground
                                                    "
                                                >
                                                    Budget
                                                </p>

                                                <p className="mt-1 text-base font-semibold">

                                                    {formatCurrency(
                                                        budget.amount
                                                    )}

                                                </p>

                                            </div>

                                            <div>

                                                <p
                                                    className="
                                                        text-[10px]
                                                        uppercase
                                                        tracking-wider
                                                        text-muted-foreground
                                                    "
                                                >
                                                    Spent
                                                </p>

                                                <p className="mt-1 text-base font-semibold">

                                                    {formatCurrency(
                                                        budget.spent
                                                    )}

                                                </p>

                                            </div>

                                            <div>

                                                <p
                                                    className="
                                                        text-[10px]
                                                        uppercase
                                                        tracking-wider
                                                        text-muted-foreground
                                                    "
                                                >
                                                    Remaining
                                                </p>

                                                <p
                                                    className={cn(
                                                        "mt-1 text-base font-semibold",
                                                        budget.isExceeded
                                                            ? "text-red-500"
                                                            : "text-emerald-500"
                                                    )}
                                                >
                                                    {budget.isExceeded
                                                        ? `-${formatCurrency(
                                                            budget.overBy
                                                        )}`
                                                        : formatCurrency(
                                                            budget.remaining
                                                        )}
                                                </p>

                                            </div>

                                        </div>

                                    </div>
                                );
                            }
                        )}
                    </div>
                )}

            </CardContent>

        </Card>
    );
}