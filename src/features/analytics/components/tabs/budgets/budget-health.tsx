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

import { AnalyticsBudget } from "@/features/analytics/types/analytics-view";

import { cn } from "@/lib/utils";

interface BudgetHealthProps {
    budgets: AnalyticsBudget[];

    currency: string;
}

export default function BudgetHealth({
    budgets,
    currency,
}: BudgetHealthProps) {
    if (budgets.length === 0) return null;

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

    const getHealthIcon = (
        status: string
    ) => {
        switch (status) {
            case "Excellent":
                return (
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                );

            case "Good":
                return (
                    <AlertCircle className="h-5 w-5 text-blue-500" />
                );

            case "Warning":
                return (
                    <AlertTriangle className="h-5 w-5 text-amber-500" />
                );

            case "Exceeded":
                return (
                    <XCircle className="h-5 w-5 text-red-500" />
                );

            default:
                return null;
        }
    };

    const getBadgeColor = (
        status: string
    ) => {
        switch (status) {
            case "Excellent":
                return "bg-emerald-500/10 text-emerald-500";

            case "Good":
                return "bg-blue-500/10 text-blue-500";

            case "Warning":
                return "bg-amber-500/10 text-amber-500";

            case "Exceeded":
                return "bg-red-500/10 text-red-500";

            default:
                return "";
        }
    };

    // Exceeded → Warning → Good → Excellent
    const statusOrder: Record<
        string,
        number
    > = {
        Exceeded: 0,
        Warning: 1,
        Good: 2,
        Excellent: 3,
    };

    const sorted = [...budgets].sort(
        (a, b) =>
            statusOrder[
            a.healthStatus
            ] -
            statusOrder[
            b.healthStatus
            ]
    );

    return (
        <Card className="rounded-2xl border shadow-sm">

            <CardHeader className="space-y-2">

                <CardTitle className="text-2xl font-bold tracking-tight">
                    Category Health
                </CardTitle>

                <CardDescription>
                    Monitor the health of every budget category.
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="space-y-5">

                    {sorted.map(
                        (budget) => (

                            <div
                                key={
                                    budget.id
                                }
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                "
                            >

                                <div className="flex items-center gap-3">

                                    <div className="shrink-0">

                                        {getHealthIcon(
                                            budget.healthStatus
                                        )}

                                    </div>

                                    <div>

                                        <h4 className="font-semibold">
                                            {
                                                budget.name
                                            }
                                        </h4>

                                        <p className="text-xs text-muted-foreground">

                                            {formatCurrency(
                                                budget.spent
                                            )}

                                            {" "}of{" "}

                                            {formatCurrency(
                                                budget.amount
                                            )}

                                            {budget.isExceeded && (
                                                <>
                                                    {" • "}
                                                    <span className="font-medium text-red-500">
                                                        Over by{" "}
                                                        {formatCurrency(
                                                            budget.overBy
                                                        )}
                                                    </span>
                                                </>
                                            )}

                                        </p>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <span
                                        className={cn(
                                            "rounded-md px-2.5 py-1 text-xs font-semibold",
                                            getBadgeColor(
                                                budget.healthStatus
                                            )
                                        )}
                                    >
                                        {
                                            budget.healthStatus
                                        }
                                    </span>

                                    <span
                                        className={cn(
                                            "w-14 text-right text-sm font-bold tabular-nums",
                                            budget.isExceeded
                                                ? "text-red-500"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {budget.utilization.toFixed(
                                            0
                                        )}
                                        %
                                    </span>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </CardContent>

        </Card>
    );
}