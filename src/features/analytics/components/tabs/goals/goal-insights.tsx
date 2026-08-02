"use client";

import { Lightbulb } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface GoalInsightsProps {
    insights: string[];
}

export default function GoalInsights({ insights }: GoalInsightsProps) {
    if (insights.length === 0) {
        return null;
    }

    return (
        <Card className="rounded-2xl border border-blue-500/20 bg-blue-500/5 shadow-sm">
            <CardHeader className="space-y-2">
                <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-500">
                    <Lightbulb className="h-5 w-5" />
                    Goal Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                            <span className="leading-6 text-muted-foreground">
                                {insight}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
