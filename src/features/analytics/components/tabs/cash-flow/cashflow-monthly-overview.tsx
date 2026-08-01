"use client";

import {
    ArrowDownCircle,
    ArrowUpCircle,
    Wallet,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    cn,
} from "@/lib/utils";

import {
    AnalyticsCashFlowPeriod,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface CashFlowMonthlyOverviewProps {
    months: AnalyticsCashFlowPeriod[];

    currency: string;
}

export default function CashFlowMonthlyOverview({
    months,
    currency,
}: CashFlowMonthlyOverviewProps) {

    return (
        <section className="space-y-4">

            <div>

                <h2 className="text-xl font-semibold">
                    Monthly Cash Flow
                </h2>

                <p className="text-sm text-muted-foreground">
                    Understand how your balance evolved each month.
                </p>

            </div>

            {months.length === 0 ? (
                <Card>

                    <CardContent
                        className="
                            flex
                            h-52
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No monthly cash flow available.
                    </CardContent>

                </Card>
            ) : (

                <div
                    className="
                        grid
                        gap-4

                        md:grid-cols-2

                        xl:grid-cols-3
                    "
                >

                    {months.map((month) => {

                        const positive =
                            month.netCashFlow >= 0;

                        return (

                            <Card
                                key={month.id}
                                className="
                                    rounded-2xl
                                    border
                                    shadow-sm
                                "
                            >

                                <CardHeader>

                                    <CardTitle>
                                        {month.label}
                                    </CardTitle>

                                    <CardDescription>

                                        Net Cash Flow

                                        {" "}

                                        <span
                                            className={cn(
                                                "font-semibold",

                                                positive
                                                    ? "text-emerald-600"
                                                    : "text-rose-600"
                                            )}
                                        >
                                            {formatCurrency(
                                                month.netCashFlow,
                                                currency
                                            )}
                                        </span>

                                    </CardDescription>

                                </CardHeader>

                                <CardContent
                                    className="
                                        space-y-5
                                    "
                                >

                                    {/* Opening */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <Wallet
                                                className="
                                                    h-5
                                                    w-5
                                                    text-blue-500
                                                "
                                            />

                                            <span>
                                                Opening
                                            </span>

                                        </div>

                                        <span
                                            className="
                                                font-semibold
                                                tabular-nums
                                            "
                                        >
                                            {formatCurrency(
                                                month.openingBalance,
                                                currency
                                            )}
                                        </span>

                                    </div>

                                    {/* Income */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <ArrowDownCircle
                                                className="
                                                    h-5
                                                    w-5
                                                    text-emerald-500
                                                "
                                            />

                                            <span>
                                                Income
                                            </span>

                                        </div>

                                        <span
                                            className="
                                                font-semibold
                                                text-emerald-600
                                                tabular-nums
                                            "
                                        >
                                            {formatCurrency(
                                                month.income,
                                                currency
                                            )}
                                        </span>

                                    </div>

                                    {/* Expense */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                            "
                                        >

                                            <ArrowUpCircle
                                                className="
                                                    h-5
                                                    w-5
                                                    text-rose-500
                                                "
                                            />

                                            <span>
                                                Expense
                                            </span>

                                        </div>

                                        <span
                                            className="
                                                font-semibold
                                                text-rose-600
                                                tabular-nums
                                            "
                                        >
                                            {formatCurrency(
                                                month.expense,
                                                currency
                                            )}
                                        </span>

                                    </div>

                                    <div className="border-t" />

                                    {/* Closing */}

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                        "
                                    >

                                        <span
                                            className="
                                                font-semibold
                                            "
                                        >
                                            Closing Balance
                                        </span>

                                        <span
                                            className="
                                                text-lg
                                                font-bold
                                                tabular-nums
                                            "
                                        >
                                            {formatCurrency(
                                                month.closingBalance,
                                                currency
                                            )}
                                        </span>

                                    </div>

                                </CardContent>

                            </Card>
                        );
                    })}

                </div>

            )}

        </section>
    );
}