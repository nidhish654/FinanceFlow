"use client";

import {
    FolderHeart,
    Tags,
    Trophy,
    Medal,
} from "lucide-react";

import { cn } from "@/lib/utils";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import CurrencyAmount from "@/components/common/CurrencyAmount";

import { CategorySummary } from "../../../types/analytics-view";

interface CategorySummaryCardsProps {
    summary: CategorySummary;
    currency: string;
}

export default function CategorySummaryCards({
    summary,
    currency,
}: CategorySummaryCardsProps) {
    const categoryPercentage = null;
    const subcategoryPercentage = null;

    const cards = [
        {
            title: "Parent Categories",
            value: summary.categoriesUsed.toString(),
            description: "Active this period",
            icon: <FolderHeart className="h-5 w-5" />,
            color:
                "bg-blue-500/10 text-blue-600 dark:text-blue-400",
        },

        {
            title: "Subcategories",
            value: summary.subcategoriesUsed.toString(),
            description:
                summary.subcategoriesUsed > 0
                    ? "Used this period"
                    : "No subcategories used",
            icon: <Tags className="h-5 w-5" />,
            color:
                "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        },

        {
            title: "Top Category",
            value:
                summary.topCategory?.name ??
                "No Category",
            description:
                summary.topCategory ? (
                    <CurrencyAmount
                        amount={summary.topCategory.amount}
                        currency={currency}
                    />
                ) : (
                    "No spending recorded"
                ),
            icon: <Trophy className="h-5 w-5" />,
            color:
                "bg-amber-500/10 text-amber-600 dark:text-amber-400",
        },

        {
            title: "Top Subcategory",
            value:
                summary.topSubcategory?.name ??
                "No Subcategory",
            description:
                summary.topSubcategory ? (
                    <CurrencyAmount
                        amount={summary.topSubcategory.amount}
                        currency={currency}
                    />
                ) : (
                    "Parent categories only"
                ),
            icon: <Medal className="h-5 w-5" />,
            color:
                "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
        },
    ];

    return (
        <section
            className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                lg:grid-cols-4
            "
        >
            {cards.map((card) => (
                <Card
                    key={card.title}
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
                            <div className="min-w-0 flex-1">
                                <p
                                    className="
                                        text-sm
                                        font-medium
                                        text-muted-foreground
                                    "
                                >
                                    {card.title}
                                </p>

                                <p
                                    className="
                                        mt-3
                                        truncate
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                    "
                                >
                                    {card.value}
                                </p>

                                <div
                                    className="
                                        mt-2
                                        text-xs
                                        text-muted-foreground
                                        leading-5
                                    "
                                >
                                    {card.description}
                                </div>
                            </div>

                            <div
                                className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                    card.color
                                )}
                            >
                                {card.icon}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </section>
    );
}