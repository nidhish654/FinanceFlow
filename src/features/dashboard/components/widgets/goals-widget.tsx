"use client";

import {
    CheckCircle2,
    Clock3,
    Target,
} from "lucide-react";

import DashboardWidgetCard from "./dashboard-widget-card";

import { Button } from "@/components/ui/button";

import {
    GoalDeadlineState,
    GoalView,
} from "@/features/planning/goal/types/goal-view";

import {
    formatCurrency,
    formatPercentage,
} from "../../lib/dashboard-formatters";

import Link from "next/link";

interface GoalsWidgetProps {
    goals: GoalView[];

    currency: string;
}

export default function GoalsWidget({
    goals,
    currency,
}: GoalsWidgetProps) {
    const activeGoals = goals
        .filter((goal) => !goal.archived)
        .slice(0, 5);

    return (
        <DashboardWidgetCard
            title="Goals Overview"
            description="Track your savings goals."
            actions={
                <Button asChild variant="link" size="sm">
                    <Link href="/planning?tab=goals">View all</Link>
                </Button>
            }
        >
            {activeGoals.length === 0 ? (
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
                    No active goals found.
                </div>
            ) : (
                <div className="space-y-4">
                    {activeGoals.map((goal) => {
                        const completed =
                            goal.completed;

                        const progressColor =
                            completed
                                ? "bg-emerald-500"
                                : "bg-blue-500";

                        const StatusIcon =
                            completed
                                ? CheckCircle2
                                : Target;

                        const statusColor =
                            completed
                                ? "text-emerald-500"
                                : goal.deadlineState ===
                                    GoalDeadlineState.OVERDUE
                                    ? "text-red-500"
                                    : goal.deadlineState ===
                                        GoalDeadlineState.WARNING
                                        ? "text-amber-500"
                                        : "text-blue-500";

                        return (
                            <div
                                key={goal.id}
                                className="space-y-2"
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
                                            {goal.name}
                                        </span>

                                    </div>

                                    <span
                                        className="
                                            text-xs
                                            font-semibold
                                        "
                                    >
                                        {formatPercentage(
                                            goal.progress
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
                                        className={progressColor}
                                        style={{
                                            width: `${Math.min(
                                                goal.progress,
                                                100
                                            )}%`,
                                            height: "100%",
                                        }}
                                    />
                                </div>

                                {/* Footer */}

                                <div
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        text-xs
                                        text-muted-foreground
                                    "
                                >
                                    <span>
                                        {formatCurrency(
                                            goal.savedAmount,
                                            currency
                                        )}
                                        {" / "}
                                        {formatCurrency(
                                            goal.targetAmount,
                                            currency
                                        )}
                                    </span>

                                    {completed ? (
                                        <span className="text-emerald-600 dark:text-emerald-400">
                                            Completed
                                        </span>
                                    ) : goal.remainingDays ===
                                        null ? (
                                        <span>
                                            No deadline
                                        </span>
                                    ) : (
                                        <span
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                            "
                                        >
                                            <Clock3 className="h-3 w-3" />

                                            {goal.remainingDays} days
                                        </span>
                                    )}

                                </div>

                            </div>
                        );
                    })}
                </div>
            )}
        </DashboardWidgetCard>
    );
}
