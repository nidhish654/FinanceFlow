"use client";

import {
    AlertTriangle,
    CheckCircle2,
    CircleDollarSign,
} from "lucide-react";

import DashboardWidgetCard from "./dashboard-widget-card";

import { Button } from "@/components/ui/button";

import { BudgetView } from "@/features/planning/budget/types/budget-view";

import {
    formatCurrency,
    formatPercentage,
} from "../../lib/dashboard-formatters";

import Link from "next/link";

interface BudgetWidgetProps {
    budgets: BudgetView[];

    currency: string;
}

export default function BudgetWidget({
    budgets,
    currency,
}: BudgetWidgetProps) {
    const activeBudgets =
        budgets
            .filter(
                (budget) =>
                    !budget.archived
            )
            .slice(0, 5);

    return (
        <DashboardWidgetCard
            title="Budget Overview"
            description="Track your current budget usage."
            actions={
                <Button asChild variant="link" size="sm">
                    <Link href="/planning">View all</Link>
                </Button>
            }
        >
            {activeBudgets.length === 0 ? (
                <div
                    className="
                        flex
                        h-40
                        items-center
                        justify-center
                        text-sm
                        text-muted-foreground
                    "
                >
                    No active budgets found.
                </div>
            ) : (
                <div className="space-y-4">
                    {activeBudgets.map(
                        (budget) => {
                            const statusColor =
                                budget.isExceeded
                                    ? "text-red-500"
                                    : budget.progress >= 80
                                        ? "text-amber-500"
                                        : "text-emerald-500";

                            const StatusIcon =
                                budget.isExceeded
                                    ? AlertTriangle
                                    : budget.progress >= 80
                                        ? CircleDollarSign
                                        : CheckCircle2;

                            return (
                                <div
                                    key={budget.id}
                                    className="
                                        space-y-2
                                    "
                                >
                                    {/* Header */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-4
                                        "
                                    >
                                        <div className="flex min-w-0 items-center gap-2">
                                            <StatusIcon
                                                className={`h-4 w-4 ${statusColor}`}
                                            />

                                            <span
                                                className="truncate text-sm font-medium"
                                            >
                                                {budget.categoryName}
                                            </span>

                                        </div>

                                        <span
                                            className="
                                                text-xs
                                                font-semibold
                                            "
                                        >
                                            {formatPercentage(
                                                budget.progress
                                            )}
                                        </span>

                                    </div>

                                    {/* Progress */}

                                    <div
                                        className="
                                            h-2
                                            overflow-hidden
                                            rounded-full
                                            bg-muted
                                        "
                                    >
                                        <div
                                            className={
                                                budget.isExceeded
                                                    ? "h-full bg-red-500"
                                                    : budget.progress >= 80
                                                        ? "h-full bg-amber-500"
                                                        : "h-full bg-emerald-500"
                                            }
                                            style={{
                                                width: `${Math.min(
                                                    budget.progress,
                                                    100
                                                )}%`,
                                            }}
                                        />
                                    </div>

                                    {/* Footer */}

                                    <div
                                        className="
                                            flex
                                            justify-between
                                            text-xs
                                            text-muted-foreground
                                        "
                                    >
                                        <span>
                                            Spent{" "}
                                            {formatCurrency(
                                                budget.spentAmount,
                                                currency
                                            )}
                                        </span>

                                        <span>
                                            Budget{" "}
                                            {formatCurrency(
                                                budget.amount,
                                                currency
                                            )}
                                        </span>

                                    </div>

                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </DashboardWidgetCard>
    );
}
