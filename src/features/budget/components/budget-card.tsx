"use client";

import { BudgetPeriod } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { BudgetView } from "../types/budget-view";

import {
    formatCurrency,
    formatShortDate,
} from "../lib/formatters";

interface BudgetCardProps {
    budget: BudgetView;

    preview?: boolean;

    className?: string;
}

const PERIOD_LABELS: Record<BudgetPeriod, string> = {
    WEEKLY: "Weekly Budget",
    MONTHLY: "Monthly Budget",
    YEARLY: "Yearly Budget",
    CUSTOM: "Custom Budget",
};

export default function BudgetCard({
    budget,
    preview = false,
    className,
}: BudgetCardProps) {
    const {
        categoryName,
        amount,
        currency,
        locale = "en-IN",
        period,
        startDate,
        endDate,
        durationDays,
        spentAmount,
        remainingAmount,
        progress,
        isTypical,
        title,
        message,
    } = budget;

    const formattedAmount = formatCurrency(
        amount,
        currency,
        locale
    );

    const formattedSpent = formatCurrency(
        spentAmount,
        currency,
        locale
    );

    const formattedRemaining = formatCurrency(
        remainingAmount,
        currency,
        locale
    );

    const dateRange = `${formatShortDate(
        startDate,
        locale
    )} → ${formatShortDate(
        endDate,
        locale
    )}`;

    return (
        <Card className={className}>
            <CardContent className="space-y-5 p-6">

                <div className="space-y-1">

                    <div className="flex items-center justify-between">

                        <h3 className="text-lg font-semibold">
                            {categoryName}
                        </h3>

                        <Badge
                            variant={
                                preview
                                    ? "secondary"
                                    : "default"
                            }
                        >
                            {preview
                                ? "Preview"
                                : "Active"}
                        </Badge>

                    </div>

                    <p className="text-sm text-muted-foreground">
                        {PERIOD_LABELS[period]}
                    </p>

                </div>

                <div className="space-y-1">

                    <h2 className="text-3xl font-bold tracking-tight">
                        {formattedAmount}
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Total Budget
                    </p>

                </div>

                <div className="space-y-2">

                    <div className="flex items-center justify-between text-sm">

                        <span>Budget Usage</span>

                        <span className="font-medium">
                            {Math.round(progress)}%
                        </span>

                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">

                        <div
                            className="h-full rounded-full bg-primary transition-all duration-300"
                            style={{
                                width: `${progress}%`,
                            }}
                        />

                    </div>

                </div>

                <Separator />

                <div className="grid grid-cols-2 gap-4">

                    <div className="space-y-1">

                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Spent
                        </p>

                        <p className="text-lg font-semibold">
                            {formattedSpent}
                        </p>

                    </div>

                    <div className="space-y-1">

                        <p className="text-xs uppercase tracking-wide text-muted-foreground">
                            Remaining
                        </p>

                        <p className="text-lg font-semibold">
                            {formattedRemaining}
                        </p>

                    </div>

                </div>

                <Separator />

                <div className="space-y-3">

                    <div className="flex items-center justify-between">

                        <span className="text-sm text-muted-foreground">
                            Date Range
                        </span>

                        <span className="text-sm font-medium">
                            {dateRange}
                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <span className="text-sm text-muted-foreground">
                            Duration
                        </span>

                        <span className="text-sm font-medium">
                            {durationDays}{" "}
                            {durationDays === 1
                                ? "Day"
                                : "Days"}
                        </span>

                    </div>

                    <div
                        className={`rounded-lg border p-4 ${
                            isTypical
                                ? "border-green-200 bg-green-50"
                                : "border-amber-200 bg-amber-50"
                        }`}
                    >

                        <div className="flex items-start gap-2">

                            <span className="text-lg">
                                {isTypical
                                    ? "✓"
                                    : "⚠"}
                            </span>

                            <div>

                                <p
                                    className={`font-medium ${
                                        isTypical
                                            ? "text-green-800"
                                            : "text-amber-800"
                                    }`}
                                >
                                    {title}
                                </p>

                                {isTypical ? (
                                    <p className="text-sm text-green-700">
                                        This budget duration matches a typical{" "}
                                        {period.toLowerCase()} budget.
                                    </p>
                                ) : (
                                    message && (
                                        <p className="mt-1 whitespace-pre-line text-sm text-amber-700">
                                            {message}
                                        </p>
                                    )
                                )}

                            </div>

                        </div>

                    </div>

                </div>

            </CardContent>
        </Card>
    );
}