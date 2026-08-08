"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import { AnalyticsBudget } from "@/features/analytics/types/analytics-view";

import { cn } from "@/lib/utils";
import { formatCurrency as globalFormatCurrency } from "@/lib/formatters";

interface BudgetUtilizationProps {
    budgets: AnalyticsBudget[];
    currency: string;
}

export default function BudgetUtilization({
    budgets,
    currency,
}: BudgetUtilizationProps) {
    if (budgets.length === 0) return null;

    const formatCurrency = (value: number) => globalFormatCurrency(value, currency);

    const healthColors = {
        Excellent: "bg-emerald-500",
        Good: "bg-blue-500",
        Warning: "bg-amber-500",
        Exceeded: "bg-red-500",
    };

    const excellent = budgets.filter(
        (b) => b.healthStatus === "Excellent"
    ).length;

    const warning = budgets.filter(
        (b) => b.healthStatus === "Warning"
    ).length;

    const exceeded = budgets.filter(
        (b) => b.healthStatus === "Exceeded"
    ).length;

    return (
        <Card className="rounded-2xl border shadow-sm">

            <CardHeader className="space-y-4">

                <div>

                    <CardTitle className="text-2xl font-bold tracking-tight">
                        Budget Utilization
                    </CardTitle>

                    <CardDescription className="mt-1 text-sm">
                        Track how much of each budget has been utilized.
                    </CardDescription>

                </div>

                <div className="flex flex-wrap gap-2">

                    <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-500">
                        {excellent} Healthy
                    </div>

                    {warning > 0 && (
                        <div className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-500">
                            {warning} Warning
                        </div>
                    )}

                    {exceeded > 0 && (
                        <div className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-medium text-red-500">
                            {exceeded} Exceeded
                        </div>
                    )}

                </div>

            </CardHeader>

            <CardContent>

                <div className="space-y-8">

                    {budgets.map((budget) => (

                        <div
                            key={budget.id}
                            className="space-y-3"
                        >

                            <div className="flex items-start justify-between gap-4">

                                <div className="min-w-0">

                                    <div className="flex items-center gap-2">

                                        <h4 className="truncate text-base font-semibold">
                                            {budget.name}
                                        </h4>

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
                                            {budget.period}
                                        </span>

                                        {budget.isExceeded && (

                                            <span
                                                className="
                                                    rounded-md
                                                    bg-red-500/10
                                                    px-2
                                                    py-0.5
                                                    text-[10px]
                                                    font-semibold
                                                    text-red-500
                                                "
                                            >
                                                Over by{" "}
                                                {formatCurrency(
                                                    budget.overBy
                                                )}
                                            </span>

                                        )}

                                    </div>

                                </div>

                                <div className="text-right">

                                    <div className="text-sm font-semibold tabular-nums">
                                        {formatCurrency(
                                            budget.spent
                                        )}{" "}
                                        <span className="text-muted-foreground">
                                            of{" "}
                                            {formatCurrency(
                                                budget.amount
                                            )}
                                        </span>
                                    </div>

                                    <div
                                        className={cn(
                                            "text-sm font-bold",
                                            budget.isExceeded
                                                ? "text-red-500"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {budget.utilization.toFixed(
                                            0
                                        )}
                                        %
                                    </div>

                                </div>

                            </div>

                            <Progress
                                value={Math.min(
                                    budget.utilization,
                                    100
                                )}
                                indicatorClassName={
                                    healthColors[
                                    budget.healthStatus
                                    ]
                                }
                                className="h-3"
                            />

                        </div>

                    ))}

                </div>

            </CardContent>

        </Card>
    );
}