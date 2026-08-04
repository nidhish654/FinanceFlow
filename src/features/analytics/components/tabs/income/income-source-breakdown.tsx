"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AnalyticsCategoryPoint,
} from "../../../types/analytics-view";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
    formatCurrency,
    formatPercentage,
} from "@/features/dashboard/lib/dashboard-formatters";

interface IncomeSourceBreakdownProps {
    sources: AnalyticsCategoryPoint[];

    totalIncome: number;

    currency: string;
}

export default function IncomeSourceBreakdown({
    sources,
    totalIncome,
    currency,
}: IncomeSourceBreakdownProps) {
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <Card
            className="
                rounded-2xl
                border
                shadow-sm
            "
        >
            <CardHeader>

                <CardTitle>
                    Income Sources
                </CardTitle>

                <CardDescription>
                    See how your income is distributed across all sources.
                </CardDescription>

            </CardHeader>

            <CardContent
                className="
                    h-[460px]
                    overflow-hidden
                    pt-0
                "
            >
                {sources.length === 0 ? (
                    <div
                        className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No income sources found.
                    </div>
                ) : (
                    <div
                        className="
                            h-full
                            space-y-5
                            overflow-y-auto
                            no-scrollbar
                            pr-2
                        "
                    >
                        {sources.map(
                            (
                                source,
                                index
                            ) => {
                                const percentage =
                                    totalIncome > 0
                                        ? (source.amount /
                                            totalIncome) *
                                        100
                                        : 0;

                                return (
                                    <div
                                        key={
                                            source.id
                                        }
                                        className="space-y-2"
                                    >
                                        {/* Header */}

                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-4
                                            "
                                        >
                                            <div
                                                className="
                                                    flex
                                                    min-w-0
                                                    items-center
                                                    gap-3
                                                "
                                            >
                                                <div
                                                    className="
                                                        flex
                                                        h-7
                                                        w-7
                                                        items-center
                                                        justify-center
                                                        rounded-full
                                                        bg-emerald-500/10
                                                        text-xs
                                                        font-semibold
                                                        text-emerald-600
                                                        dark:text-emerald-400
                                                    "
                                                >
                                                    {index + 1}
                                                </div>

                                                <span
                                                    className="
                                                        truncate
                                                        font-medium
                                                    "
                                                >
                                                    {source.name}
                                                </span>

                                            </div>

                                            <div
                                                className="
                                                    shrink-0
                                                    text-right
                                                "
                                            >
                                                <p
                                                    className="
                                                        font-semibold
                                                        tabular-nums
                                                    "
                                                >
                                                    {formatCurrency(
                                                        source.amount,
                                                        currency
                                                    )}
                                                </p>

                                                <p
                                                    className="
                                                        text-xs
                                                        text-muted-foreground
                                                    "
                                                >
                                                    {formatPercentage(
                                                        percentage
                                                    )}
                                                </p>
                                                
                                                {source.subcategories && source.subcategories.length > 0 && (
                                                    <button
                                                        onClick={() => toggleExpand(source.id)}
                                                        className="mt-1 flex items-center text-xs text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        {expandedIds.has(source.id) ? (
                                                            <ChevronDown className="mr-1 h-3 w-3" />
                                                        ) : (
                                                            <ChevronRight className="mr-1 h-3 w-3" />
                                                        )}
                                                        {source.subcategories.length} subcategories
                                                    </button>
                                                )}
                                            </div>

                                        </div>

                                        {/* Progress */}

                                        <div
                                            className="
                                                h-2
                                                overflow-hidden
                                                rounded-full
                                                bg-muted
                                            "
                                        >
                                            <div
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-emerald-500
                                                "
                                                style={{
                                                    width: `${Math.min(
                                                        percentage,
                                                        100
                                                    )}%`,
                                                }}
                                            />
                                        </div>

                                        {expandedIds.has(source.id) && source.subcategories && (
                                            <div className="mt-3 pl-11 space-y-3">
                                                {source.subcategories
                                                    .sort((a, b) => b.amount - a.amount)
                                                    .map(sub => {
                                                        const subPercentage = totalIncome > 0 ? (sub.amount / totalIncome) * 100 : 0;
                                                        return (
                                                            <div key={sub.id} className="flex items-center justify-between text-sm">
                                                                <div className="flex items-center gap-2">
                                                                    <div className="w-1 h-1 rounded-full bg-emerald-500/40" />
                                                                    <span className="text-muted-foreground">{sub.name}</span>
                                                                </div>
                                                                <div className="text-right">
                                                                    <span className="font-medium tabular-nums">{formatCurrency(sub.amount, currency)}</span>
                                                                    <span className="ml-2 text-xs text-muted-foreground tabular-nums w-8 inline-block text-right">{subPercentage.toFixed(0)}%</span>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                            </div>
                                        )}
                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </CardContent>

        </Card>
    );
}