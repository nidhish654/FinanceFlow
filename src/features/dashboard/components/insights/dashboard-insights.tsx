"use client";

import DashboardInsightCard from "./dashboard-insight-card";

import {
    DashboardInsight,
} from "../../types/dashboard-view";

interface DashboardInsightsProps {
    insights: DashboardInsight[];
}

export default function DashboardInsights({
    insights,
}: DashboardInsightsProps) {
    return (
        <section className="space-y-5">

            <div>

                <h2 className="text-xl font-semibold">
                    Smart Insights
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Personalized insights based on your financial activity.
                </p>

            </div>

            <div
                className="
                    grid
                    gap-4

                    lg:grid-cols-2
                "
            >
                {insights.map((insight) => (
                    <DashboardInsightCard
                        key={insight.id}
                        insight={insight}
                    />
                ))}
            </div>

        </section>
    );
}