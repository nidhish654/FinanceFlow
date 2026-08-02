"use client";

import { Target, TrendingUp, PiggyBank, HeartPulse } from "lucide-react";
import { AnalyticsGoalSummary } from "@/features/analytics/types/analytics-view";
import { cn } from "@/lib/utils";

interface GoalSummaryCardsProps {
    summary: AnalyticsGoalSummary;
    currency: string;
}

export default function GoalSummaryCards({
    summary,
    currency,
}: GoalSummaryCardsProps) {
    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(value);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            
            {/* 1. Total Goals */}
            <div className="rounded-2xl border shadow-sm p-6 bg-card transition-colors hover:bg-muted/10">
                <div className="flex items-start justify-between">
                    <div className="min-w-0">
                        <p className="text-sm font-medium">Total Goals</p>
                        <p className="mt-3 truncate text-2xl font-bold tracking-tight tabular-nums">
                            {summary.totalGoals}
                        </p>
                        <p className="mt-2 text-xs opacity-80">
                            {summary.activeGoals} Active • {summary.completedGoals} Completed
                        </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/50">
                        <Target className="h-5 w-5 text-indigo-500" />
                    </div>
                </div>
            </div>

            {/* 2. Total Target Amount */}
            <div className="rounded-2xl border shadow-sm p-6 bg-card transition-colors hover:bg-muted/10">
                <div className="flex items-start justify-between">
                    <div className="min-w-0">
                        <p className="text-sm font-medium">Total Target Amount</p>
                        <p className="mt-3 truncate text-2xl font-bold tracking-tight tabular-nums">
                            {formatCurrency(summary.totalTarget)}
                        </p>
                        <p className="mt-2 text-xs opacity-80">
                            Across all goals
                        </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/50">
                        <TrendingUp className="h-5 w-5 text-emerald-500" />
                    </div>
                </div>
            </div>

            {/* 3. Total Saved */}
            <div className="rounded-2xl border shadow-sm p-6 bg-card transition-colors hover:bg-muted/10">
                <div className="flex items-start justify-between">
                    <div className="min-w-0">
                        <p className="text-sm font-medium">Total Saved</p>
                        <p className="mt-3 truncate text-2xl font-bold tracking-tight tabular-nums text-blue-600 dark:text-blue-400">
                            {formatCurrency(summary.totalSaved)}
                        </p>
                        <p className="mt-2 text-xs opacity-80">
                            {summary.completionPercentage.toFixed(0)}% completed
                        </p>
                    </div>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/50">
                        <PiggyBank className="h-5 w-5 text-blue-500" />
                    </div>
                </div>
            </div>

            {/* 4. Overall Health */}
            <div className={cn(
                "rounded-2xl border shadow-sm p-6 transition-colors",
                summary.healthStatus === "Excellent" && "bg-emerald-500/5 border-emerald-500/20",
                summary.healthStatus === "Good" && "bg-blue-500/5 border-blue-500/20",
                summary.healthStatus === "Needs Attention" && "bg-amber-500/5 border-amber-500/20",
                summary.healthStatus === "Critical" && "bg-red-500/5 border-red-500/20"
            )}>
                <div className="flex items-start justify-between">
                    <div className="min-w-0">
                        <p className="text-sm font-medium">Overall Health</p>
                        <p className={cn(
                            "mt-3 truncate text-2xl font-bold tracking-tight tabular-nums",
                            summary.healthStatus === "Excellent" && "text-emerald-600 dark:text-emerald-400",
                            summary.healthStatus === "Good" && "text-blue-600 dark:text-blue-400",
                            summary.healthStatus === "Needs Attention" && "text-amber-600 dark:text-amber-400",
                            summary.healthStatus === "Critical" && "text-red-600 dark:text-red-400"
                        )}>
                            {summary.healthStatus}
                        </p>
                        <p className="mt-2 text-xs opacity-80 text-muted-foreground">
                            {summary.completedGoals} Completed • {summary.activeGoals} Active
                        </p>
                    </div>
                    <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background/50"
                    )}>
                        <HeartPulse className={cn(
                            "h-5 w-5",
                            summary.healthStatus === "Excellent" && "text-emerald-500",
                            summary.healthStatus === "Good" && "text-blue-500",
                            summary.healthStatus === "Needs Attention" && "text-amber-500",
                            summary.healthStatus === "Critical" && "text-red-500"
                        )} />
                    </div>
                </div>
            </div>

        </div>
    );
}
