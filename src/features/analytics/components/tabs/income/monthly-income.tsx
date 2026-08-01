"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AnalyticsIncomePeriod,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface MonthlyIncomeProps {
    months: AnalyticsIncomePeriod[];

    currency: string;
}

export default function MonthlyIncome({
    months,
    currency,
}: MonthlyIncomeProps) {
    return (
        <section className="space-y-4">

            <div>

                <h2 className="text-xl font-semibold">
                    Monthly Income
                </h2>

                <p className="text-sm text-muted-foreground">
                    Review income earned each month and its primary sources.
                </p>

            </div>

            {months.length === 0 ? (
                <Card>

                    <CardContent
                        className="
                            flex
                            h-48
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No monthly income available.

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
                    {months.map((month) => (
                        <Card
                            key={month.id}
                            className="
                                rounded-2xl
                                border
                                shadow-sm
                            "
                        >
                            <CardHeader className="pb-4">

                                <CardTitle className="text-base">
                                    {month.label}
                                </CardTitle>

                                <div className="mt-2 space-y-1">

                                    <p
                                        className="
                                            text-3xl
                                            font-bold
                                            tracking-tight
                                            text-emerald-500
                                            tabular-nums
                                        "
                                    >
                                        {formatCurrency(
                                            month.income,
                                            currency
                                        )}
                                    </p>

                                    <CardDescription>
                                        Total Income
                                    </CardDescription>

                                </div>

                            </CardHeader>

                            <CardContent
                                className="
                                    flex
                                    min-h-[190px]
                                    flex-col
                                "
                            >

                                {month.income === 0 ? (
                                    <div
                                        className="
                                            flex
                                            flex-1
                                            items-center
                                            justify-center
                                            text-sm
                                            text-muted-foreground
                                        "
                                    >
                                        No income recorded.
                                    </div>
                                ) : (
                                    <>

                                        <div className="space-y-4 flex-1">

                                            {month.sources
                                                .slice(0, 4)
                                                .map((source) => {
                                                    const percentage =
                                                        month.income === 0
                                                            ? 0
                                                            : (source.amount /
                                                                month.income) *
                                                            100;

                                                    return (
                                                        <div
                                                            key={source.id}
                                                            className="space-y-2"
                                                        >

                                                            <div
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    justify-between
                                                                    gap-4
                                                                    text-sm
                                                                "
                                                            >
                                                                <span
                                                                    className="
                                                                        truncate
                                                                        font-medium
                                                                    "
                                                                >
                                                                    {source.name}
                                                                </span>

                                                                <span
                                                                    className="
                                                                        shrink-0
                                                                        font-semibold
                                                                        tabular-nums
                                                                    "
                                                                >
                                                                    {formatCurrency(
                                                                        source.amount,
                                                                        currency
                                                                    )}
                                                                </span>

                                                            </div>

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

                                                        </div>
                                                    );
                                                })}

                                        </div>

                                        <div
                                            className="
                                                mt-6
                                                border-t
                                                pt-3
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            {month.sources.length}{" "}
                                            {month.sources.length === 1
                                                ? "Income Source"
                                                : "Income Sources"}
                                        </div>

                                    </>
                                )}

                            </CardContent>

                        </Card>
                    ))}

                </div>
            )}

        </section>
    );
}