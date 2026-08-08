"use client";

import { CheckCircle2, Clock, AlertTriangle, AlertCircle } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { AnalyticsGoal } from "@/features/analytics/types/analytics-view";
import { cn } from "@/lib/utils";
import { getGoalIcon } from "@/features/planning/goal/lib/goal-icons";
import { formatCurrency as globalFormatCurrency } from "@/lib/formatters";

interface GoalOverviewProps {
    goals: AnalyticsGoal[];
    currency: string;
}

export default function GoalOverview({ goals, currency }: GoalOverviewProps) {
    const formatCurrency = (value: number) => globalFormatCurrency(value, currency);

    const formatDate = (date: Date) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });


    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Goal Overview
                </CardTitle>
                <CardDescription>
                    Review your savings goals and monitor progress.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {goals.length === 0 ? (
                    <div className="flex h-64 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
                        No goals match this filter.
                    </div>
                ) : (
                    <div className="max-h-[440px] space-y-4 overflow-y-auto pr-2">
                        {goals.map((goal) => {
                            let barColor = "bg-blue-500";
                            let statusText = "ACTIVE";
                            let statusBadge = "bg-blue-500/10 text-blue-500";

                            if (goal.isCompleted) {
                                barColor = "bg-emerald-500";
                                statusText = "COMPLETED";
                                statusBadge = "bg-emerald-500/10 text-emerald-500";
                            } else if (goal.isOverdue) {
                                barColor = "bg-red-500";
                                statusText = "OVERDUE";
                                statusBadge = "bg-red-500/10 text-red-500";
                            }

                            return (
                                <div
                                    key={goal.id}
                                    className="rounded-xl border bg-muted/20 p-5 space-y-4"
                                >
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        {(() => {
                                            const GoalIcon = goal.icon
                                                ? getGoalIcon(goal.icon).icon
                                                : null;

                                            const iconContainerClass = goal.isCompleted
                                                ? "bg-emerald-500/15 text-emerald-500"
                                                : goal.isOverdue
                                                    ? "bg-red-500/15 text-red-500"
                                                    : "bg-blue-500/10 text-blue-500";

                                            return (
                                                <div className="flex items-center gap-3 min-w-0">
                                                    <div
                                                        className={cn(
                                                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                                                            iconContainerClass
                                                        )}
                                                    >
                                                        {GoalIcon ? (
                                                            <GoalIcon className="h-6 w-6" />
                                                        ) : (
                                                            <TargetIcon className="h-6 w-6" />
                                                        )}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <h3 className="text-lg font-semibold leading-tight">
                                                            {goal.name}
                                                        </h3>

                                                        {goal.isCompleted && (
                                                            <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                                                <CheckCircle2 className="h-4 w-4" />
                                                                <span>Goal Achieved</span>
                                                            </div>
                                                        )}

                                                        {!goal.isCompleted && goal.isOverdue && (
                                                            <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-red-500">
                                                                <AlertCircle className="h-4 w-4" />
                                                                <span>Goal Overdue</span>
                                                            </div>
                                                        )}

                                                        {!goal.isCompleted &&
                                                            !goal.isOverdue &&
                                                            goal.completionPercentage >= 90 && (
                                                                <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-amber-500">
                                                                    <AlertTriangle className="h-4 w-4" />
                                                                    <span>Almost Complete</span>
                                                                </div>
                                                            )}
                                                    </div>
                                                </div>
                                            );
                                        })()}
                                        <span
                                            className={cn(
                                                "rounded-lg px-3 py-1 text-xs font-semibold uppercase tracking-wide",
                                                statusBadge
                                            )}
                                        >
                                            {statusText}
                                        </span>
                                    </div>

                                    {/* Progress */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-semibold tabular-nums">
                                                {goal.completionPercentage.toFixed(0)}%
                                            </span>
                                        </div>
                                        <Progress
                                            value={Math.min(goal.completionPercentage, 100)}
                                            indicatorClassName={barColor}
                                            className="h-2.5"
                                        />
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Saved</p>
                                            <p className="mt-1 font-semibold">{formatCurrency(goal.savedAmount)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Target</p>
                                            <p className="mt-1 font-semibold">{formatCurrency(goal.targetAmount)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Remaining</p>
                                            <p className="mt-1 font-semibold">{formatCurrency(goal.remainingAmount)}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Target Date</p>
                                            <p className="mt-1 font-semibold">
                                                {goal.targetDate ? formatDate(goal.targetDate) : "No deadline"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function TargetIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    );
}
