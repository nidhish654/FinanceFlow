"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { AnalyticsSummary, SummaryComparison } from "../../../types/analytics-view";
import { cn } from "@/lib/utils";

interface OverviewPeriodComparisonProps {
    summary: AnalyticsSummary;
}

function ComparisonPill({ label, comp, invert = false }: { label: string, comp: SummaryComparison, invert?: boolean }) {
    if (comp.previous === 0 && comp.current === 0) return null;

    let Icon = Minus;
    let colorClass = "text-muted-foreground";
    let bgClass = "bg-muted";

    if (comp.trend === "up") {
        Icon = ArrowUpRight;
        if (invert) {
            colorClass = "text-rose-600 dark:text-rose-400";
            bgClass = "bg-rose-500/10";
        } else {
            colorClass = "text-emerald-600 dark:text-emerald-400";
            bgClass = "bg-emerald-500/10";
        }
    } else if (comp.trend === "down") {
        Icon = ArrowDownRight;
        if (invert) {
            colorClass = "text-emerald-600 dark:text-emerald-400";
            bgClass = "bg-emerald-500/10";
        } else {
            colorClass = "text-rose-600 dark:text-rose-400";
            bgClass = "bg-rose-500/10";
        }
    }

    return (
        <div className="flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-sm shadow-sm">
            <span className="font-medium text-muted-foreground">{label}</span>
            <span className={cn("flex items-center font-bold", colorClass, bgClass, "px-1.5 py-0.5 rounded-md")}>
                <Icon className="mr-0.5 h-3.5 w-3.5" />
                {Math.abs(comp.percentage).toFixed(1)}%
            </span>
        </div>
    );
}

export default function OverviewPeriodComparison({ summary }: OverviewPeriodComparisonProps) {
    return (
        <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Compared to Previous Period
            </h3>
            <div className="flex flex-wrap items-center gap-3">
                <ComparisonPill label="Income" comp={summary.income} />
                <ComparisonPill label="Expenses" comp={summary.expense} invert />
                <ComparisonPill label="Cash Flow" comp={summary.netCashFlow} />
                <ComparisonPill label="Savings Rate" comp={summary.savingsRate} />
            </div>
        </div>
    );
}
