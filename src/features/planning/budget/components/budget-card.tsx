"use client";

import { BudgetPeriod } from "@prisma/client";

import { AlertTriangle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { BudgetView } from "../types/budget-view";

import {
    formatCurrency,
    formatShortDate,
} from "../lib/formatters";

interface BudgetCardProps {
    budget: BudgetView;

    preview?: boolean;

    className?: string;

    actions?: React.ReactNode;
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
    actions,
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
    isExceeded,
    overBudgetAmount,
} = budget;

    const formattedAmount = formatCurrency(
        amount ?? 0,
        currency,
        locale
    );

    const formattedSpent = formatCurrency(
        spentAmount ?? 0,
        currency,
        locale
    );

    const formattedRemaining = formatCurrency(
        remainingAmount ?? 0,
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

    const progressValue = Math.max(
        progress ?? 0,
        0
    );

    const progressWidth = Math.min(
        progressValue,
        100
    );

    const progressColor = isExceeded
    ? "bg-destructive"
    : progressValue >= 90
        ? "bg-yellow-500"
        : "bg-blue-500";

    return (
        <Card
            className={cn(
                `
                overflow-hidden
                rounded-2xl
                bg-card
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                `,
                isExceeded
                    ? "border-red-500/40 hover:border-red-500/60"
                    : progressValue >= 90
                        ? "border-yellow-500/40 hover:border-yellow-500/60"
                        : "border-blue-500/30 hover:border-blue-500/60",
                className
            )}
        >
            <CardContent className="
                space-y-3
                px-5
                py-1

                sm:space-y-5
                sm:px-6
                sm:py-5
            ">

                {/* ---------- Header ---------- */}

                <div className="flex items-start justify-between gap-4">

                    <div className="min-w-0 flex-1 space-y-2">
                        <h3 className="truncate text-lg font-semibold tracking-tight sm:text-2xl">
                            {categoryName}
                        </h3>

                        <Badge
                            variant="secondary"
                            className="
                                inline-flex
                                w-fit
                                rounded-full
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                            "
                        >
                            {period}
                        </Badge>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">

                        <Badge
                            variant={
                                preview
                                    ? "outline"
                                    : isExceeded
                                        ? "destructive"
                                        : "secondary"
                            }
                            className={cn(
                                progressValue >= 90 &&
                                    progressValue < 100 &&
                                    "bg-yellow-500/15 text-yellow-600 border-yellow-500/30"
                            )}
                        >
                            {preview
                                ? "Preview"
                                : budget.archived
                                    ? "Archived"
                                    : isExceeded
                                        ? "Over Budget"
                                        : progressValue >= 90
                                            ? "Near Limit"
                                            : "Active"}
                        </Badge>

                        {!preview && actions}

                    </div>

                </div>

                {/* ---------- Budget Amount ---------- */}

                <div className="space-y-1">

                    <h2 className="leading-none font-bold tracking-tight text-3xl sm:text-3xl lg:text-3xl break-words">

                        {formattedAmount}

                    </h2>

                    <p className="text-sm text-muted-foreground">

                        Total Budget

                    </p>

                </div>

                {/* ---------- Progress ---------- */}

                <div className="space-y-3">

                    <div className="flex items-center justify-between">

                        <span className="text-sm font-medium">
                            Budget Usage
                        </span>

                        <span
                            className={cn(
                                "text-blue-500 text-sm font-semibold",
                                progressValue >= 90 &&
                                    progressValue < 100 &&
                                    "text-yellow-500",
                                isExceeded &&
                                    "text-red-500"
                            )}
                        >
                            {Math.round(progressValue)}%
                        </span>

                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">

                        <div
                            className={cn(
                                "h-full rounded-full transition-all duration-500 ease-out",
                                progressColor
                            )}
                            style={{
                                width: `${progressWidth}%`,
                            }}
                        />

                    </div>

                    {/* Reserved space for warning */}
                    <div className="min-h-10 flex items-center">

                        {isExceeded && (
                            <div
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-2
                                    rounded-lg
                                    border
                                    border-destructive/30
                                    bg-destructive/10
                                    px-3
                                    py-2
                                "
                            >
                                <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />

                                <p className="text-sm text-destructive">
                                    Over budget by{" "}
                                    <span className="font-semibold">
                                        {formatCurrency(
                                            overBudgetAmount,
                                            currency,
                                            locale
                                        )}
                                    </span>
                                </p>

                            </div>
                        )}

                    </div>

                </div>


                <Separator className="bg-border/60" />


                {/* ---------- Budget Metrics ---------- */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">

                    <div
                        className="
                            rounded-xl
                            border
                            bg-muted/20
                            p-4
                            transition-all
                            duration-300
                            hover:border-primary/20
                            hover:bg-muted/40
                        "
                    >

                        <p
                            className="
                                text-[11px]
                                sm:text-xs
                                font-medium
                                uppercase
                                tracking-[0.12em]
                                sm:tracking-[0.18em]
                                text-muted-foreground
                            "
                        >
                            Spent
                        </p>

                        <p
                            className="
                                mt-2
                                break-words
                                text-xl
                                sm:text-lg
                                lg:text-xl
                                font-semibold
                                tracking-tight
                            "
                        >
                            {formattedSpent}
                        </p>

                        <p
                            className="
                                mt-2
                                text-xs
                                text-muted-foreground
                            "
                        >
                            Amount already used
                        </p>

                    </div>

                    <div
                        className="
                            rounded-xl
                            border
                            bg-muted/25
                            p-4
                            transition-colors
                            hover:bg-muted/40
                        "
                    >

                        <p
                            className="
                                text-[11px]
                                sm:text-xs
                                font-medium
                                uppercase
                                tracking-[0.12em]
                                sm:tracking-[0.18em]
                                text-muted-foreground
                            "
                        >
                            Remaining
                        </p>

                        <p
                            className={cn(
                                `
                                mt-2
                                break-words
                                text-xl
                                sm:text-lg
                                lg:text-xl
                                font-semibold
                                tracking-tight
                                `,
                                isExceeded &&
                                    "text-destructive"
                            )}
                        >
                            {formattedRemaining}
                        </p>

                        <p
                            className="
                                mt-2
                                text-xs
                                text-muted-foreground
                            "
                        >
                            {isExceeded
                            ? "Budget exceeded"
                            : "Budget available"}
                        </p>

                    </div>

                </div>

                <Separator className="bg-border/60" />

                {/* ---------- Budget Details ---------- */}

                <div className="space-y-4">

                    <div className="flex items-center justify-between">

                        <span
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Duration
                        </span>

                        <span
                            className="
                                text-sm
                                font-medium
                            "
                        >
                            {durationDays}{" "}
                            {durationDays === 1
                                ? "Day"
                                : "Days"}
                        </span>

                    </div>

                    <div
                        className="
                            flex
                            items-start
                            justify-between
                            gap-6
                        "
                    >

                        <span
                            className="
                                text-sm
                                text-muted-foreground
                            "
                        >
                            Date Range
                        </span>

                        <span
                            className="
                                text-right
                                text-sm
                                font-medium
                            "
                        >
                            {dateRange}
                        </span>

                    </div>

                </div>

            </CardContent>

        </Card>

    );
}