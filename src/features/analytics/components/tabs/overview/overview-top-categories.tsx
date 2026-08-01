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

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface OverviewTopCategoriesProps {
    categories: AnalyticsCategoryPoint[];

    currency: string;
}

export default function OverviewTopCategories({
    categories,
    currency,
}: OverviewTopCategoriesProps) {
    const maxAmount =
        categories[0]?.amount ?? 0;

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
                    Top Spending Categories
                </CardTitle>

                <CardDescription>
                    Your largest expense areas.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {categories.length === 0 ? (
                    <p
                        className="
                            flex
                            h-64
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No expense activity in this period.
                    </p>
                ) : (
                    <div className="space-y-4">

                        {categories.map(
                            (
                                category,
                                index
                            ) => {
                                const percentage =
                                    maxAmount ===
                                    0
                                        ? 0
                                        : (category.amount /
                                              maxAmount) *
                                          100;

                                return (
                                    <div
                                        key={
                                            category.id
                                        }
                                        className="space-y-1.5"
                                    >
                                        <div
                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                gap-3
                                                text-sm
                                            "
                                        >
                                            <span
                                                className="
                                                    truncate
                                                    font-medium
                                                "
                                            >
                                                {index +
                                                    1}
                                                .{" "}
                                                {
                                                    category.name
                                                }
                                            </span>

                                            <span
                                                className="
                                                    shrink-0
                                                    font-semibold
                                                    tabular-nums
                                                "
                                            >
                                                {formatCurrency(
                                                    category.amount,
                                                    currency
                                                )}
                                            </span>

                                        </div>

                                        <div
                                            className="
                                                h-1.5
                                                overflow-hidden
                                                rounded-full
                                                bg-muted
                                            "
                                        >
                                            <div
                                                className="
                                                    h-full
                                                    rounded-full
                                                    bg-violet-500
                                                "
                                                style={{
                                                    width: `${percentage}%`,
                                                }}
                                            />
                                        </div>

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