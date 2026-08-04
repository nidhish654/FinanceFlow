"use client";

import {
    PieChart,
    Trophy,
    Layers,
    Circle,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Progress } from "@/components/ui/progress";

import { CategoryConcentration } from "../../../types/analytics-view";

interface CategoryConcentrationProps {
    concentration: CategoryConcentration;
}

export default function CategoryConcentrationCard({
    concentration,
}: CategoryConcentrationProps) {
    const {
        top3Percentage,
        top5Percentage,
        remainingPercentage,
    } = concentration;

    const top4to5Percentage = Math.max(
        top5Percentage - top3Percentage,
        0
    );

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                        <PieChart className="h-5 w-5" />
                    </div>

                    <div>
                        <CardTitle className="text-2xl font-bold tracking-tight">
                            Spending Concentration
                        </CardTitle>

                        <CardDescription className="mt-1">
                            See how much of your spending is concentrated
                            within your highest spending categories.
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-6">

                {/* Progress */}

                <div className="space-y-3">

                    <div className="flex h-3 overflow-hidden rounded-full bg-muted">

                        {/* Top 3 */}
                        <div
                            className="bg-blue-600 transition-all duration-700"
                            style={{
                                width: `${top3Percentage}%`,
                            }}
                        />

                        {/* Top 4-5 */}
                        <div
                            className="bg-blue-300 transition-all duration-700"
                            style={{
                                width: `${top4to5Percentage}%`,
                            }}
                        />

                        {/* Remaining */}
                        <div
                            className="bg-indigo-400/60 transition-all duration-700"
                            style={{
                                width: `${remainingPercentage}%`,
                            }}
                        />

                    </div>

                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>More Concentrated</span>
                        <span>More Diversified</span>
                    </div>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

                    <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Trophy className="h-4 w-4 text-blue-600" />

                            <span className="text-sm font-medium">
                                Top 3
                            </span>

                        </div>

                        <p className="mt-3 text-3xl font-bold tabular-nums">
                            {Math.round(top3Percentage)}%
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Spending from your 3 biggest categories
                        </p>

                    </div>

                    <div className="rounded-2xl border border-blue-300/20 bg-blue-300/5 p-5">

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Layers className="h-4 w-4 text-blue-300" />

                            <span className="text-sm font-medium">
                                Top 5
                            </span>

                        </div>

                        <p className="mt-3 text-3xl font-bold tabular-nums">
                            {Math.round(top5Percentage)}%
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Spending from your 5 biggest categories
                        </p>

                    </div>

                    <div className="rounded-2xl border border-indigo-400/20 bg-indigo-400/5 p-5">

                        <div className="flex items-center gap-2 text-muted-foreground">

                            <Circle className="h-4 w-4 fill-indigo-400/60 text-indigo-400" />

                            <span className="text-sm font-medium">
                                Remaining
                            </span>

                        </div>

                        <p className="mt-3 text-3xl font-bold tabular-nums">
                            {Math.round(remainingPercentage)}%
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                            Spread across all other categories
                        </p>

                    </div>

                </div>

                {/* Footer Insight */}

                <div className="rounded-xl border border-dashed bg-muted/20 p-4">

                    <p className="text-sm leading-6 text-muted-foreground">

                        {top3Percentage >= 80
                            ? "Your spending is highly concentrated in just a few categories."
                            : top3Percentage >= 60
                                ? "Most of your spending comes from a handful of categories."
                                : "Your spending is fairly diversified across multiple categories."}

                    </p>

                </div>

            </CardContent>
        </Card>
    );
}