"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import CurrencyAmount from "@/components/common/CurrencyAmount";

import { CategoryGrowth } from "../../../types/analytics-view";

interface CategoryGrowthCardProps {
    growth: CategoryGrowth;
    currency: string;
}

export default function CategoryGrowthCard({
    growth,
    currency,
}: CategoryGrowthCardProps) {
    const {
        mostIncreased,
        mostDecreased,
    } = growth;

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-bold">
                    Spending Shifts
                </CardTitle>

                <CardDescription>
                    Biggest changes in your spending compared to the previous period.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4 lg:grid-cols-2">

                    {/* Increase */}

                    <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">

                        <Badge
                            variant="secondary"
                            className="mb-4 border-rose-500/20 bg-rose-500/10 text-rose-500"
                        >
                            <TrendingUp className="mr-1 h-3.5 w-3.5" />
                            Biggest Increase
                        </Badge>

                        {mostIncreased ? (
                            <>
                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">
                                        <h3 className="truncate text-xl sm:text-2xl font-bold">
                                            {mostIncreased.name}
                                        </h3>

                                        <p className="mt-2 text-2xl sm:text-3xl font-bold text-rose-500">
                                            +{Math.round(mostIncreased.percentage)}%
                                        </p>
                                    </div>

                                    <div className="text-right text-sm">
                                        <p className="text-muted-foreground">
                                            Previous
                                        </p>

                                        <p className="font-semibold">
                                            <CurrencyAmount
                                                amount={mostIncreased.oldAmount}
                                                currency={currency}
                                            />
                                        </p>

                                        <p className="mt-3 text-muted-foreground">
                                            Current
                                        </p>

                                        <p className="font-semibold">
                                            <CurrencyAmount
                                                amount={mostIncreased.newAmount}
                                                currency={currency}
                                            />
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full bg-rose-500"
                                        style={{
                                            width: `${Math.min(
                                                Math.abs(
                                                    mostIncreased.percentage
                                                ),
                                                100
                                            )}%`,
                                        }}
                                    />
                                </div>

                            </>
                        ) : (
                            <div className="py-8 text-center text-sm text-muted-foreground">
                                No major increases this period.
                            </div>
                        )}

                    </div>

                    {/* Decrease */}

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">

                        <Badge
                            variant="secondary"
                            className="mb-4 border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
                        >
                            <TrendingDown className="mr-1 h-3.5 w-3.5" />
                            Biggest Decrease
                        </Badge>

                        {mostDecreased ? (
                            <>
                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">

                                        <h3 className="truncate text-xl sm:text-2xl font-bold">
                                            {mostDecreased.name}
                                        </h3>

                                        <p className="mt-2 text-2xl sm:text-3xl font-bold text-emerald-500">
                                            {Math.round(
                                                mostDecreased.percentage
                                            )}
                                            %
                                        </p>

                                    </div>

                                    <div className="text-right text-sm">

                                        <p className="text-muted-foreground">
                                            Previous
                                        </p>

                                        <p className="font-semibold">
                                            <CurrencyAmount
                                                amount={mostDecreased.oldAmount}
                                                currency={currency}
                                            />
                                        </p>

                                        <p className="mt-3 text-muted-foreground">
                                            Current
                                        </p>

                                        <p className="font-semibold">
                                            <CurrencyAmount
                                                amount={mostDecreased.newAmount}
                                                currency={currency}
                                            />
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">

                                    <div
                                        className="h-full rounded-full bg-emerald-500"
                                        style={{
                                            width: `${Math.min(
                                                Math.abs(
                                                    mostDecreased.percentage
                                                ),
                                                100
                                            )}%`,
                                        }}
                                    />

                                </div>

                            </>
                        ) : (
                            <div className="py-8 text-center text-sm text-muted-foreground">
                                No major decreases this period.
                            </div>
                        )}

                    </div>

                </div>
            </CardContent>
        </Card>
    );
}