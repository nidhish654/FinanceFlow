"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { AnalyticsBudgetMonth } from "@/features/analytics/types/analytics-view";
import { cn } from "@/lib/utils";

interface BudgetMonthlyOverviewProps {
    monthly: AnalyticsBudgetMonth[];
    currency: string;
}

export default function BudgetMonthlyOverview({
    monthly,
    currency,
}: BudgetMonthlyOverviewProps) {
    if (monthly.length === 0) return null;

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const getHealthBadgeColor = (status: string) => {
        switch (status) {
            case "Excellent": return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
            case "Good": return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
            case "Warning": return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
            case "Exceeded": return "bg-red-500/10 text-red-600 dark:text-red-400";
            default: return "";
        }
    };

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {monthly.map((monthData) => (
                        <div
                            key={monthData.label}
                            className="flex flex-col gap-2 p-3 rounded-xl bg-muted/30 border"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">{monthData.label}</span>
                                <span className={cn(
                                    "px-2 py-0.5 rounded text-[10px] font-medium",
                                    getHealthBadgeColor(monthData.healthStatus)
                                )}>
                                    {monthData.healthStatus}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 mt-1">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Budget</p>
                                    <p className="text-sm font-medium">{formatCurrency(monthData.totalBudgeted)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Spent</p>
                                    <p className="text-sm font-medium">{formatCurrency(monthData.totalSpent)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Remaining</p>
                                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                        {formatCurrency(monthData.totalRemaining)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
