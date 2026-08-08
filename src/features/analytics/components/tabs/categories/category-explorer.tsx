"use client";

import { useState } from "react";

import {
    ChevronDown,
    ChevronRight,
    Folder,
    FolderOpen,
    Receipt,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import CurrencyAmount from "@/components/common/CurrencyAmount";

import { cn } from "@/lib/utils";

import { CategoryPoint } from "../../../types/analytics-view";

import { getCategoryIcon } from "@/lib/category-icons";
import { Button } from "@/components/ui/button";

interface CategoryExplorerProps {
    categories: CategoryPoint[];
    currency: string;
    onCategoryClick: (category: CategoryPoint) => void;
}

export default function CategoryExplorer({
    categories,
    currency,
    onCategoryClick,
}: CategoryExplorerProps) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    if (categories.length === 0) {
        return (
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle>Category Explorer</CardTitle>
                    <CardDescription>
                        Explore spending by category and subcategory.
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex h-60 items-center justify-center">
                    <div className="text-center text-muted-foreground">
                        <Folder className="mx-auto mb-4 h-10 w-10 opacity-40" />
                        <p className="font-medium">No category activity found.</p>
                        <p className="mt-1 text-sm">
                            Transactions will appear here once spending is recorded.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    const totalSpend = categories.reduce((sum, c) => sum + c.amount, 0);

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-bold tracking-tight">
                    Category Explorer
                </CardTitle>

                <CardDescription>
                    Browse every category and drill down into subcategories.
                </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
                <div className="max-h-[420px] md:max-h-[520px] overflow-y-auto">
                    {categories.map((category, index) => {
                        const hasChildren =
                            category.subcategories.length > 0;

                        const isExpanded =
                            expanded[category.id];

                        const percentage =
                            totalSpend === 0
                                ? 0
                                : (category.amount /
                                    totalSpend) *
                                100;
                        const {
                            icon: Icon,
                        } = getCategoryIcon(category.icon);

                        return (
                            <div
                                key={category.id}
                                className={cn(
                                    "transition-colors",
                                    index !==
                                    categories.length -
                                    1 &&
                                    "border-b"
                                )}
                            >
                                {/* Parent Row */}
                                <button
                                    type="button"
                                    onClick={() => onCategoryClick(category)}
                                    className="
                                        w-full
                                        px-4
                                        py-4
                                        text-left
                                        transition-colors
                                        hover:bg-muted/30
                                        md:px-5
                                        md:py-5
                                    "
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between gap-4">

                                        {/* Left */}
                                        <div className="flex min-w-0 items-center gap-3">

                                            <div
                                                className="
                                                    flex
                                                    h-7
                                                    w-7
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    md:rounded-xl
                                                    md:h-9
                                                    md:w-9
                                                "
                                                style={{
                                                    backgroundColor: category.color
                                                        ? `${category.color}20`
                                                        : "var(--muted)",
                                                    color: category.color ?? "inherit",
                                                }}
                                            >
                                                <Icon className="h-4 w-4 md:h-5 md:w-5" />
                                            </div>

                                            <div className="min-w-0">

                                                <div className="flex flex-wrap items-center gap-2">

                                                    <h3 className="truncate text-xl font-semibold md:text-xl">
                                                        {category.name}
                                                    </h3>

                                                    {hasChildren && (
                                                        <span
                                                            className="
                                                                rounded-full
                                                                bg-muted
                                                                px-2
                                                                py-0.5
                                                                text-[10px]
                                                                font-semibold
                                                                uppercase
                                                                tracking-wide
                                                                text-muted-foreground
                                                            "
                                                        >
                                                            {category.subcategories.length} SUB
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                        {/* Desktop Amount */}
                                        <div className="hidden shrink-0 md:block">

                                            <div className="text-xl font-bold tracking-tight">

                                                <CurrencyAmount
                                                    amount={category.amount}
                                                    currency={currency}
                                                />

                                            </div>

                                        </div>

                                    </div>

                                    {/* Mobile Amount */}
                                    <div className="mt-3 md:hidden">

                                        <div className="text-xl font-bold tracking-tight">

                                            <CurrencyAmount
                                                amount={category.amount}
                                                currency={currency}
                                            />

                                        </div>

                                    </div>

                                    {/* Progress */}
                                    <div className="mt-4">

                                        <div className="h-2.5 overflow-hidden rounded-full bg-muted">

                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${percentage}%`,
                                                    backgroundColor:
                                                        category.color ?? "#6366F1",
                                                }}
                                            />

                                        </div>

                                    </div>

                                    {/* Metadata */}
                                    <div className="mt-3 text-sm text-muted-foreground">

                                        {percentage.toFixed(1)}% of spending

                                        {category.transactionCount > 0 && (
                                            <>
                                                {" • "}
                                                {category.transactionCount}
                                                {" "}
                                                transaction
                                                {category.transactionCount > 1 ? "s" : ""}
                                            </>
                                        )}

                                    </div>

                                    {/* Expand */}
                                    {hasChildren && (
                                        <>
                                            <div className="mx-2 mt-5 border-t" />

                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    setExpanded((prev) => ({
                                                        ...prev,
                                                        [category.id]: !prev[category.id],
                                                    }));
                                                }}
                                                className="
                                                    mt-3
                                                    flex
                                                    w-full
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    py-2
                                                    text-sm
                                                    font-semibold
                                                    text-primary
                                                    transition-colors
                                                    hover:bg-primary/5
                                                "
                                            >
                                                <span>
                                                    {isExpanded ? "Hide" : "Show"}{" "}
                                                    {category.subcategories.length}{" "}
                                                    Subcategor
                                                    {category.subcategories.length === 1
                                                        ? "y"
                                                        : "ies"}
                                                </span>

                                                {isExpanded ? (
                                                    <ChevronDown className="h-4 w-4" />
                                                ) : (
                                                    <ChevronRight className="h-4 w-4" />
                                                )}
                                            </button>
                                        </>
                                    )}

                                </button>

                                {/* Expanded Section */}
                                {isExpanded && hasChildren && (
                                    <div className="border-t bg-muted/15">
                                        <div className="space-y-2 px-4 pb-4 pt-2 md:px-5">

                                            {/* General first */}
                                            {category.generalAmount > 0 && (
                                                <div
                                                    className="
                                                        flex
                                                        items-center
                                                        justify-between
                                                        rounded-xl
                                                        border
                                                        bg-background/40
                                                        px-3
                                                        py-3
                                                        transition-colors
                                                        hover:bg-muted/40
                                                    "
                                                >
                                                    <div className="flex items-center gap-3">

                                                        <div className="h-2 w-2 rounded-full bg-muted-foreground" />

                                                        <span className="text-sm font-medium text-muted-foreground">
                                                            General
                                                        </span>

                                                    </div>

                                                    <div className="text-sm font-semibold">

                                                        <CurrencyAmount
                                                            amount={
                                                                category.generalAmount
                                                            }
                                                            currency={currency}
                                                        />

                                                    </div>
                                                </div>
                                            )}

                                            {/* Subcategories */}
                                            <div className="mt-2 space-y-1">
                                                {category.subcategories.map(
                                                    (sub) => (
                                                        <div
                                                            key={sub.id}
                                                            className="
                                                                flex
                                                                items-center
                                                                justify-between
                                                                rounded-xl
                                                                border
                                                                bg-background/40
                                                                px-3
                                                                py-3
                                                                transition-colors
                                                                hover:bg-muted/40
                                                            "
                                                        >
                                                            <div className="flex items-center gap-3">

                                                                <div
                                                                    className="h-2 w-2 rounded-full"
                                                                    style={{
                                                                        backgroundColor:
                                                                            category.color ??
                                                                            "#6366F1",
                                                                    }}
                                                                />

                                                                <div className="min-w-0">

                                                                    <div className="break-words md:truncate text-sm font-medium">
                                                                        {sub.name}
                                                                    </div>

                                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                                        {(
                                                                            (sub.amount /
                                                                                category.amount) *
                                                                            100
                                                                        ).toFixed(
                                                                            1
                                                                        )}
                                                                        % of{" "}
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </div>

                                                                </div>
                                                            </div>

                                                            <div className="text-right shrink-0">

                                                                <div className="text-sm font-semibold">

                                                                    <CurrencyAmount
                                                                        amount={
                                                                            sub.amount
                                                                        }
                                                                        currency={
                                                                            currency
                                                                        }
                                                                    />

                                                                </div>

                                                                {sub.transactionCount && (
                                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                                        {
                                                                            sub.transactionCount
                                                                        }{" "}
                                                                        txn
                                                                        {sub.transactionCount >
                                                                            1
                                                                            ? "s"
                                                                            : ""}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardContent >
        </Card >
    );
}