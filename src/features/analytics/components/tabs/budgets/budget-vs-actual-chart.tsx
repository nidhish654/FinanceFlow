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

interface BudgetVsActualChartProps {
    budgets: AnalyticsBudget[];
    currency: string;
}

export default function BudgetVsActualChart({
    budgets,
    currency,
}: BudgetVsActualChartProps) {
    if (budgets.length === 0) {
        return null;
    }

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(value);

    const healthConfig = {
        Excellent: {
            icon: (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ),
            bar: "bg-emerald-500",
            badge:
                "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
            rank: 4,
        },
        Good: {
            icon: (
                <AlertCircle className="h-5 w-5 text-blue-500" />
            ),
            bar: "bg-blue-500",
            badge:
                "bg-blue-500/10 text-blue-400 border border-blue-500/20",
            rank: 3,
        },
        Warning: {
            icon: (
                <AlertTriangle className="h-5 w-5 text-amber-500" />
            ),
            bar: "bg-amber-500",
            badge:
                "bg-amber-500/10 text-amber-400 border border-amber-500/20",
            rank: 2,
        },
        Exceeded: {
            icon: (
                <XCircle className="h-5 w-5 text-red-500" />
            ),
            bar: "bg-red-500",
            badge:
                "bg-red-500/10 text-red-400 border border-red-500/20",
            rank: 1,
        },
    };

    const sorted = [...budgets].sort((a, b) => {
        const rankDiff =
            healthConfig[a.healthStatus].rank -
            healthConfig[b.healthStatus].rank;

        if (rankDiff !== 0) {
            return rankDiff;
        }

        return b.utilization - a.utilization;
    });

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Budget Performance Comparison
                </CardTitle>

                <CardDescription>
                    Compare how efficiently every budget is
                    being utilized.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="space-y-6">
                    {sorted.map((budget) => {
                        const config =
                            healthConfig[
                            budget.healthStatus
                            ];

                        return (
                            <div
                                key={budget.id}
                                className="rounded-xl border bg-muted/20 p-5 transition-colors hover:bg-muted/30"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3">
                                        {config.icon}

                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h3 className="font-semibold text-base">
                                                    {budget.name}
                                                </h3>

                                                <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                                                    {budget.period}
                                                </span>
                                            </div>

                                            <p className="mt-1 text-xs text-muted-foreground">
                                                Budget{" "}
                                                {formatCurrency(
                                                    budget.amount
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-2xl font-bold tabular-nums">
                                            {budget.utilization.toFixed(
                                                0
                                            )}
                                            %
                                        </div>

                                        <span
                                            className={cn(
                                                "mt-1 inline-flex rounded-md px-2 py-1 text-xs font-medium",
                                                config.badge
                                            )}
                                        >
                                            {
                                                budget.healthStatus
                                            }
                                        </span>
                                    </div>
                                </div>

                                {/* Progress */}

                                <div className="mt-5">
                                    <Progress
                                        value={Math.min(
                                            budget.utilization,
                                            100
                                        )}
                                        indicatorClassName={
                                            config.bar
                                        }
                                        className="h-3"
                                    />
                                </div>

                                {/* Bottom Stats */}

                                <div className="mt-5 grid grid-cols-4 gap-4">
                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                            Budget
                                        </p>

                                        <p className="mt-1 font-semibold">
                                            {formatCurrency(
                                                budget.amount
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                            Spent
                                        </p>

                                        <p className="mt-1 font-semibold">
                                            {formatCurrency(
                                                budget.spent
                                            )}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                            Remaining
                                        </p>

                                        <p
                                            className={cn(
                                                "mt-1 font-semibold",
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

                                    <div>
                                        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                                            Status
                                        </p>

                                        <p
                                            className={cn(
                                                "mt-1 font-semibold",
                                                budget.healthStatus ===
                                                "Exceeded" &&
                                                "text-red-500",
                                                budget.healthStatus ===
                                                "Warning" &&
                                                "text-amber-500",
                                                budget.healthStatus ===
                                                "Good" &&
                                                "text-blue-500",
                                                budget.healthStatus ===
                                                "Excellent" &&
                                                "text-emerald-500"
                                            )}
                                        >
                                            {budget.isExceeded
                                                ? `Exceeded by ${formatCurrency(
                                                    budget.overBy
                                                )}`
                                                : `${formatCurrency(
                                                    budget.remaining
                                                )} Left`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}