"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Lightbulb } from "lucide-react";

interface CashFlowInsightsProps {
    insights: string[];
}

export default function CashFlowInsights({
    insights,
}: CashFlowInsightsProps) {
    if (insights.length === 0) {
        return null;
    }
    return (
        <Card className="rounded-2xl border shadow-sm bg-blue-500/5 border-blue-500/20">
            <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Lightbulb className="h-5 w-5" />
                    Cash Flow Insights
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                            <span className="text-muted-foreground">{insight}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}
