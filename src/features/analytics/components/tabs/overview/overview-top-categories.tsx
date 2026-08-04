"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { AnalyticsCategoryPoint } from "../../../types/analytics-view";
import { formatCurrency } from "@/features/dashboard/lib/dashboard-formatters";

interface OverviewTopCategoriesProps {
    categories: AnalyticsCategoryPoint[];
    currency: string;
}

export default function OverviewTopCategories({
    categories,
    currency,
}: OverviewTopCategoriesProps) {
    const displayCategories = categories.slice(0, 5);
    const maxAmount = displayCategories[0]?.amount ?? 0;
    const totalExpense = categories.reduce((sum, cat) => sum + cat.amount, 0);

    const getMedal = (index: number) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";
        return <span className="text-muted-foreground tabular-nums w-4 inline-block text-center">{index + 1}.</span>;
    };

    return (
        <Card className="rounded-2xl border shadow-sm flex flex-col">
            <CardHeader className="pb-4">
                <CardTitle>Top Spending Categories</CardTitle>
                <CardDescription>
                    Your largest expense areas.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                {displayCategories.length === 0 ? (
                    <div className="flex h-64 flex-col items-center justify-center text-sm text-muted-foreground text-center">
                        <p className="font-medium">No expense activity in this period.</p>
                        <p className="mt-1">Categorized expenses will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {displayCategories.map((category, index) => {
                            const barPercentage = maxAmount === 0 ? 0 : (category.amount / maxAmount) * 100;
                            const totalPercentage = totalExpense === 0 ? 0 : (category.amount / totalExpense) * 100;

                            return (
                                <div key={category.id} className="space-y-2">
                                    <div className="flex items-start justify-between gap-3 text-sm">
                                        <div className="flex items-center gap-2 truncate font-medium">
                                            <span className="shrink-0 flex items-center justify-center w-5">
                                                {getMedal(index)}
                                            </span>
                                            <span className="truncate">{category.name}</span>
                                        </div>
                                        <div className="flex flex-col items-end shrink-0">
                                            <span className="font-semibold tabular-nums text-foreground">
                                                {formatCurrency(category.amount, currency)}
                                            </span>
                                            <span className="text-xs text-muted-foreground tabular-nums">
                                                {totalPercentage.toFixed(1)}% of total
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full bg-violet-500"
                                            style={{ width: `${barPercentage}%` }}
                                        />
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