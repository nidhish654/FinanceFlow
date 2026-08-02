"use client";

import { useMemo, useState } from "react";
import { Ghost } from "lucide-react";

import { AnalyticsBudgetAnalysis } from "@/features/analytics/types/analytics-view";

import BudgetFilter, { BudgetFilterValue } from "./budget-filter";
import BudgetSummaryCards from "./budget-summary-cards";
import BudgetVsActualChart from "./budget-vs-actual-chart";
import BudgetHealth from "./budget-health";
import BudgetNeedsAttention from "./budget-needs-attention";
import BudgetOverview from "./budget-overview";
import BudgetInsights from "./budget-insights";

interface BudgetTabProps {
    analysis: AnalyticsBudgetAnalysis;
    currency: string;
}

function isActiveToday(startDate: Date, endDate: Date): boolean {
    const now = new Date();
    // Reset times to compare dates properly without time-of-day edge cases
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const start = new Date(new Date(startDate).getFullYear(), new Date(startDate).getMonth(), new Date(startDate).getDate());
    const end = new Date(new Date(endDate).getFullYear(), new Date(endDate).getMonth(), new Date(endDate).getDate());
    return start <= today && end >= today;
}

export default function BudgetTab({ analysis, currency }: BudgetTabProps) {
    const [filter, setFilter] = useState<BudgetFilterValue>("Current");

    const filteredBudgets = useMemo(() => {
        return analysis.budgets.filter((b) => {
            if (filter === "Current") {
                return isActiveToday(b.startDate, b.endDate);
            }
            if (filter === "Completed") {
                return !isActiveToday(b.startDate, b.endDate);
            }
            if (filter === "Weekly") return b.period === "WEEKLY";
            if (filter === "Monthly") return b.period === "MONTHLY";
            if (filter === "Yearly") return b.period === "YEARLY";
            if (filter === "Custom") return b.period === "CUSTOM";
            return true;
        });
    }, [analysis.budgets, filter]);

    if (analysis.budgets.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-dashed bg-muted/20">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
                    <Ghost className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No Budgets Found</h3>
                <p className="mt-2 text-muted-foreground max-w-sm">
                    Create a budget on the Planning page to start tracking your spending against targets.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            {/* 1. Summary Cards — always use all budgets in range */}
            <BudgetSummaryCards summary={analysis.summary} currency={currency} />

            {/* 6. Insights */}
            <BudgetInsights insights={analysis.insights} />

            {/* 2. Secondary filter + Utilization Hero */}
            <div className="space-y-4">
                <BudgetFilter value={filter} onChange={setFilter} />
                <BudgetOverview budgets={filteredBudgets} currency={currency} />

            </div>

            {/* 4. Needs Attention */}
            <BudgetNeedsAttention budgets={filteredBudgets} currency={currency} />
        </div>
    );
}
