"use client";

import {
    Calendar,
    Landmark,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    cn,
} from "@/lib/utils";

import {
    AnalyticsCashFlowSummary,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface CashFlowSummaryCardsProps {
    summary: AnalyticsCashFlowSummary;

    currency: string;
}

interface SummaryCardProps {
    title: string;

    value: number;

    currency: string;

    icon: React.ReactNode;

    color: string;

    description?: string;
}

function SummaryCard({
    title,
    value,
    currency,
    icon,
    color,
    description,
}: SummaryCardProps) {
    return (
        <Card
            key={
                title
            }
            className="
                rounded-2xl
                border
                shadow-sm
            "
        >
            <CardContent className="p-5">

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-3
                    "
                >
                    <div className="min-w-0">

                        <p
                            className="
                                text-sm
                                font-medium
                                text-muted-foreground
                            "
                        >
                            {
                                title
                            }
                        </p>

                        <p
                            className="
                                mt-3
                                truncate
                                text-2xl
                                font-bold
                                tracking-tight
                                tabular-nums
                            "
                        >
                            {formatCurrency(
                                value,
                                currency
                            )}
                        </p>

                        {description && (
                            <p
                                className="
                                    mt-2
                                    text-xs
                                    text-muted-foreground
                                "
                            >
                                {
                                    description
                                }
                            </p>
                        )}

                    </div>

                    <div
                        className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                            color
                        )}
                    >
                        {icon}
                    </div>

                </div>

            </CardContent>

        </Card>
    );
}

export default function CashFlowSummaryCards({
    summary,
    currency,
}: CashFlowSummaryCardsProps) {

    const positive =
        summary.netCashFlow >= 0;

    return (
        <section
            className="
                grid
                gap-4

                sm:grid-cols-2

                xl:grid-cols-4
            "
        >

            <SummaryCard
                title="Opening Balance"
                value={
                    summary.openingBalance
                }
                currency={currency}
                description="Beginning of selected period"
                icon={
                    <Wallet
                        className="
                            h-6
                            w-6
                            text-blue-600
                        "
                    />
                }
                color="bg-blue-500/10"
            />

            <SummaryCard
                title="Closing Balance"
                value={
                    summary.closingBalance
                }
                currency={currency}
                description="Current balance"
                icon={
                    <Landmark
                        className="
                            h-6
                            w-6
                            text-emerald-600
                        "
                    />
                }
                color="bg-emerald-500/10"
            />

            <SummaryCard
                title="Net Cash Flow"
                value={
                    summary.netCashFlow
                }
                currency={currency}
                description={
                    positive
                        ? "Positive cash flow"
                        : "Negative cash flow"
                }
                icon={
                    positive ? (
                        <TrendingUp
                            className="
                                h-6
                                w-6
                                text-emerald-600
                            "
                        />
                    ) : (
                        <TrendingDown
                            className="
                                h-6
                                w-6
                                text-rose-600
                            "
                        />
                    )
                }
                color={
                    positive
                        ? "bg-emerald-500/10"
                        : "bg-rose-500/10"
                }
            />

            <SummaryCard
                title="Average Monthly"
                value={
                    summary.averageMonthlyCashFlow
                }
                currency={currency}
                description="Average net cash flow"
                icon={
                    <Calendar
                        className="
                            h-6
                            w-6
                            text-violet-600
                        "
                    />
                }
                color="bg-violet-500/10"
            />

        </section>
    );
}