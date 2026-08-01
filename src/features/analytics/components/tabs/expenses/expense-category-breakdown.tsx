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
    formatPercentage,
} from "@/features/dashboard/lib/dashboard-formatters";

interface ExpenseCategoryBreakdownProps {
    categories: AnalyticsCategoryPoint[];

    totalExpense: number;

    currency: string;
}



export default function ExpenseCategoryBreakdown({
    categories,
    totalExpense,
    currency,
}: ExpenseCategoryBreakdownProps) {
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
                    Expense Breakdown by Category
                </CardTitle>

                <CardDescription>
                    See where your money is being spent across all categories.
                </CardDescription>

            </CardHeader>

            <CardContent
                className="
                h-[375px]
                overflow-hidden
                pt-0
            "
            >

                {categories.length === 0 ? (
                    <div
                        className="
                            flex
                            h-64
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No expense categories found.
                    </div>
                ) : (
                    <div
                        className="
                            h-full
                            space-y-5
                            overflow-y-auto
                            pr-2

                            [scrollbar-width:none]
                            [-ms-overflow-style:none]

                            [&::-webkit-scrollbar]:hidden
                        "
                    >

                        {categories.map(
                            (
                                category,
                                index
                            ) => {
                                const percentage =
                                    totalExpense > 0
                                        ? (category.amount /
                                            totalExpense) *
                                        100
                                        : 0;

                                return (
                                    <div
                                        key={
                                            category.id
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
                                                    items-center
                                                    gap-3
                                                    min-w-0
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
                                                        bg-primary/10
                                                        text-xs
                                                        font-semibold
                                                        text-primary
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
                                                    {category.name}
                                                </span>

                                            </div>

                                            <div
                                                className="
                                                    text-right
                                                    shrink-0
                                                "
                                            >
                                                <p
                                                    className="
                                                        font-semibold
                                                        tabular-nums
                                                    "
                                                >
                                                    {formatCurrency(
                                                        category.amount,
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
                                                    bg-primary
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
                            }
                        )}

                    </div>
                )}

            </CardContent>

        </Card>
    );
}