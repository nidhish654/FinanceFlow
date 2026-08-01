"use client";

import { useState } from "react";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { Button } from "@/components/ui/button";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

import {
    AnalyticsExpenseAnalysis,
    AnalyticsExpensePeriod,
} from "../../../types/analytics-view";

type Cadence =
    | "monthly"
    | "weekly"
    | "daily";

interface ExpenseCadenceProps {
    analysis: AnalyticsExpenseAnalysis;

    currency: string;
}

function PeriodCard({
    period,
    currency,
}: {
    period: AnalyticsExpensePeriod;

    currency: string;
}) {
    return (
        <Card className="rounded-xl">

            <CardHeader className="pb-3">

                <CardTitle className="text-base">
                    {period.label}
                </CardTitle>

                <CardDescription>
                    {formatCurrency(
                        period.expense,
                        currency
                    )}{" "}
                    spent
                </CardDescription>

            </CardHeader>

            <CardContent className="space-y-3">

                <div
                    className="
                        grid
                        grid-cols-2
                        gap-3
                        rounded-lg
                        bg-muted/40
                        p-3
                        text-sm
                    "
                >
                    <div>

                        <p className="text-xs text-muted-foreground">
                            Income
                        </p>

                        <p className="mt-1 font-semibold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(
                                period.income,
                                currency
                            )}
                        </p>

                    </div>

                    <div>

                        <p className="text-xs text-muted-foreground">
                            Net Cash Flow
                        </p>

                        <p
                            className={cn(
                                "mt-1 font-semibold",
                                period.netCashFlow >= 0
                                    ? "text-emerald-600 dark:text-emerald-400"
                                    : "text-rose-600 dark:text-rose-400"
                            )}
                        >
                            {formatCurrency(
                                period.netCashFlow,
                                currency
                            )}
                        </p>

                    </div>

                </div>

                {period.categories.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No expense activity.
                    </p>
                ) : (
                    <div className="space-y-2">

                        {period.categories
                            .slice(0, 4)
                            .map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between text-sm"
                                >
                                    <span className="truncate text-muted-foreground">
                                        {category.name}
                                    </span>

                                    <span className="font-medium tabular-nums">
                                        {formatCurrency(
                                            category.amount,
                                            currency
                                        )}
                                    </span>

                                </div>
                            ))}

                    </div>
                )}

            </CardContent>

        </Card>
    );
}

export default function ExpenseCadence({
    analysis,
    currency,
}: ExpenseCadenceProps) {
    const [cadence, setCadence] =
        useState<Cadence>("monthly");

    const periods =
        cadence === "monthly"
            ? analysis.monthly
            : analysis.weekly;

    return (
        <div className="space-y-6">

            <div
                className="
                    flex
                    flex-col
                    gap-4

                    md:flex-row
                    md:items-center
                    md:justify-between
                "
            >
                <div>

                    <h2 className="text-xl font-semibold">
                        Spending Cadence
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Compare your spending across different
                        time intervals.
                    </p>

                </div>

                <div
                    className="
                        flex
                        rounded-xl
                        border
                        bg-muted/40
                        p-1
                    "
                >
                    {(["monthly", "weekly", "daily"] as const).map(
                        (item) => (
                            <Button
                                key={item}
                                size="sm"
                                variant={
                                    cadence === item
                                        ? "secondary"
                                        : "ghost"
                                }
                                className={cn(
                                    cadence === item &&
                                        "bg-background shadow-sm",
                                    "capitalize"
                                )}
                                onClick={() =>
                                    setCadence(item)
                                }
                            >
                                {item}
                            </Button>
                        )
                    )}

                </div>

            </div>

            {cadence === "daily" ? (
                <Card>

                    <CardHeader>

                        <CardTitle>
                            Weekday Spending Pattern
                        </CardTitle>

                        <CardDescription>
                            Compare expenses by weekday.
                        </CardDescription>

                    </CardHeader>

                    <CardContent>

                        <div className="h-80">

                            <ResponsiveContainer>

                                <BarChart
                                    data={
                                        analysis.weekdaySpending
                                    }
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                    />

                                    <XAxis dataKey="day" />

                                    <YAxis />

                                    <Tooltip
                                        formatter={(value) => [
                                            formatCurrency(
                                                Number(value),
                                                currency
                                            ),
                                            "Spent",
                                        ]}
                                    />

                                    <Bar
                                        dataKey="amount"
                                        fill="#7c3aed"
                                        radius={[
                                            6,
                                            6,
                                            0,
                                            0,
                                        ]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </CardContent>

                </Card>
            ) : (
                <div
                    className="
                        grid
                        gap-4

                        md:grid-cols-2

                        2xl:grid-cols-3
                    "
                >
                    {periods.map((period) => (
                        <PeriodCard
                            key={period.id}
                            period={period}
                            currency={currency}
                        />
                    ))}

                </div>
            )}

        </div>
    );
}