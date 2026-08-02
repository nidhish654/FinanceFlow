"use client";

import { AlertTriangle, Clock, XCircle } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";
import { AnalyticsGoal } from "@/features/analytics/types/analytics-view";
import { cn } from "@/lib/utils";

interface GoalNeedsAttentionProps {
    goals: AnalyticsGoal[];
    currency: string;
}

export default function GoalNeedsAttention({
    goals,
    currency,
}: GoalNeedsAttentionProps) {
    if (goals.length === 0) return null;

    const formatCurrency = (value: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(value);

    const getStatusInfo = (g: AnalyticsGoal) => {
        if (g.isOverdue) {
            return {
                label: `Overdue by ${Math.abs(g.daysRemaining!)} days`,
                badge: "bg-red-500/10 text-red-600 dark:text-red-400",
                bar: "bg-red-500",
                pct: "text-red-600 dark:text-red-400",
                icon: <XCircle className="h-4 w-4 text-red-500" />,
            };
        }
        
        if (g.daysRemaining !== null && g.daysRemaining <= 7) {
            const label = g.daysRemaining === 0 ? "Due Today" : `Due in ${g.daysRemaining} days`;
            return {
                label,
                badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                bar: "bg-amber-500",
                pct: "text-amber-600 dark:text-amber-400",
                icon: <Clock className="h-4 w-4 text-amber-500" />,
            };
        }

        return {
            label: "Low Progress",
            badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
            bar: "bg-amber-500",
            pct: "text-amber-600 dark:text-amber-400",
            icon: <AlertTriangle className="h-4 w-4 text-amber-500" />,
        };
    };

    return (
        <Card className="rounded-2xl border shadow-sm border-amber-500/20 bg-amber-500/5">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="h-5 w-5" />
                    Needs Attention
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {goals.map((goal) => {
                        const status = getStatusInfo(goal);
                        return (
                            <div key={goal.id} className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2 min-w-0">
                                        {status.icon}
                                        <span className="font-medium truncate">
                                            {goal.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap",
                                            status.badge
                                        )}>
                                            {status.label}
                                        </span>
                                        <span className={cn("font-bold text-sm w-12 text-right tabular-nums", status.pct)}>
                                            {goal.completionPercentage.toFixed(0)}%
                                        </span>
                                    </div>
                                </div>
                                <Progress
                                    value={Math.min(goal.completionPercentage, 100)}
                                    indicatorClassName={status.bar}
                                    className="h-1.5"
                                />
                                <p className="text-[11px] text-muted-foreground">
                                    {formatCurrency(goal.remainingAmount)} remaining
                                </p>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
