"use client";

import { Lightbulb } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface ExpenseInsightsProps {
    insights: string[];
}

export default function ExpenseInsights({
    insights,
}: ExpenseInsightsProps) {
    if (insights.length === 0) {
        return null;
    }

    const displayInsights = insights.slice(0, 6);

    return (
        <Card
            className="
                rounded-2xl
                border
                border-blue-500/20
                bg-blue-500/5
                shadow-sm
            "
        >
            <CardHeader className="space-y-2">
                <CardTitle
                    className="
                        flex
                        items-center
                        gap-2
                        text-xl
                        font-bold
                        text-blue-500
                    "
                >
                    <Lightbulb className="h-5 w-5" />
                    Expense Insights
                </CardTitle>
                <CardDescription>
                    AI-generated observations based on your spending patterns for the selected period.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <ul className="space-y-4">
                    {displayInsights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                            <span className="leading-6 text-muted-foreground">
                                {insight}
                            </span>
                        </li>
                    ))}
                </ul>

                <div
                    className="
                        mt-6
                        border-t
                        pt-4
                        text-xs
                        text-muted-foreground
                    "
                >
                    Insights are generated from your selected expense data.
                </div>
            </CardContent>
        </Card>
    );
}
