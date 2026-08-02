"use client";

import { useMemo, useState } from "react";
import { Ghost } from "lucide-react";

import { AnalyticsGoalAnalysis } from "@/features/analytics/types/analytics-view";

import GoalSummaryCards from "./goal-summary-cards";
import GoalInsights from "./goal-insights";
import GoalFilter, { GoalFilterValue } from "@/features/planning/goal/components/goal-filter";
import GoalOverview from "./goal-overview";
import GoalNeedsAttention from "./goal-needs-attention";

interface GoalTabProps {
    analysis: AnalyticsGoalAnalysis;
    currency: string;
}

export default function GoalTab({ analysis, currency }: GoalTabProps) {
    const [filter, setFilter] = useState<GoalFilterValue>("All");

    const filteredGoals = useMemo(() => {
        switch (filter) {
            case "Pending":
                return analysis.goals.filter((g) => !g.isCompleted);
            case "Completed":
                return analysis.goals.filter((g) => g.isCompleted);
            case "All":
            default:
                return analysis.goals;
        }
    }, [analysis.goals, filter]);

    const filteredNeedsAttention = useMemo(() => {
        switch (filter) {
            case "Pending":
                return analysis.needsAttention.filter((g) => !g.isCompleted);
            case "Completed":
                // Completed goals never need attention
                return [];
            case "All":
            default:
                return analysis.needsAttention;
        }
    }, [analysis.needsAttention, filter]);

    if (analysis.goals.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-dashed bg-muted/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
                    <Ghost className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Goals Found</h3>
                <p className="mt-2 text-muted-foreground max-w-sm">
                    Create a savings goal on the Planning page to start tracking your progress here.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* 1. Summary Cards (Always shows all goals) */}
            <GoalSummaryCards summary={analysis.summary} currency={currency} />

            {/* 2. Insights */}
            <GoalInsights insights={analysis.insights} />

            {/* 3. Filter + Overview */}
            <div className="space-y-4">
                <GoalFilter value={filter} onChange={setFilter} />
                <GoalOverview goals={filteredGoals} currency={currency} />
            </div>

            {/* 4. Needs Attention */}
            <GoalNeedsAttention goals={filteredNeedsAttention} currency={currency} />

        </div>
    );
}
