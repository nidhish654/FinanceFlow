"use client";

import { CategoryPoint } from "../../../types/analytics-view";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import CurrencyAmount from "@/components/common/CurrencyAmount";

import { Badge } from "@/components/ui/badge";

import {
    FolderOpen,
    Receipt,
    ChartPie,
} from "lucide-react";

import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface CategoryDrilldownDialogProps {
    category: CategoryPoint | null;
    currency: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CategoryDrilldownDialog({
    category,
    currency,
    isOpen,
    onOpenChange,
}: CategoryDrilldownDialogProps) {
    if (!category) return null;

    const totalTransactions =
        category.recentTransactions.length;

    const averageTransaction =
        totalTransactions > 0
            ? category.amount / totalTransactions
            : 0;

    const maxAmount = Math.max(
        category.generalAmount,
        ...category.subcategories.map((s) => s.amount),
        1
    );

    const totalBreakdown =
        category.generalAmount +
        category.subcategories.reduce(
            (sum, s) => sum + s.amount,
            0
        );

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    w-[95vw]
                    md:w-[70vh]
                    max-w-3xl
                    md:max-w-[70vh]
                    rounded-2xl
                    md:rounded-3xl
                    max-h-[95vh]
                    md:h-[95vh]
                    overflow-y-auto
                    p-0
                "
            >
                {/* Header */}

                <DialogHeader className="border-b px-4 py-4 md:px-6 md:py-5">

                    <div className="flex items-start gap-3 md:gap-4">

                        <div
                            className="flex h-10 w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl md:rounded-2xl"
                            style={{
                                backgroundColor:
                                    category.color
                                        ? `${category.color}20`
                                        : "var(--muted)",

                                color:
                                    category.color ??
                                    "currentColor",
                            }}
                        >
                            <FolderOpen className="h-5 w-5 md:h-7 md:w-7" />
                        </div>

                        <div className="flex-1">

                            <DialogTitle className="text-lg md:text-xl font-bold">

                                {category.name}

                            </DialogTitle>

                            <DialogDescription className="mt-2 text-sm">

                                Detailed spending breakdown for this category.

                            </DialogDescription>

                        </div>

                    </div>

                </DialogHeader>

                <div className="space-y-6 px-4 py-6 md:space-y-8 md:px-8 md:py-8">

                    {/* Summary */}

                    <section
                        className="
                            rounded-xl
                            md:rounded-2xl
                            border
                            bg-muted/20
                            p-4
                            md:p-6
                        "
                    >
                        <div className="flex items-start justify-between">

                            <div>

                                <p className="text-sm text-muted-foreground">
                                    Total Spending
                                </p>

                                <h2 className="mt-2 text-xl font-bold tracking-tight">

                                    <CurrencyAmount
                                        amount={category.amount}
                                        currency={currency}
                                    />

                                </h2>

                            </div>

                            <Badge
                                variant="secondary"
                                className="rounded-full px-4 py-2 text-sm"
                            >
                                <ChartPie className="mr-2 h-4 w-4" />

                                {totalTransactions} Transaction
                                {totalTransactions !== 1 && "s"}

                            </Badge>

                        </div>

                        <div className="mt-6 flex flex-wrap justify-between items-center gap-4 md:mt-8">

                            <div>

                                <p className="text-xs uppercase tracking-wide text-muted-foreground">

                                    Subcategories

                                </p>

                                <p className="mt-2 text-xl font-semibold">

                                    {category.subcategories.length}

                                </p>

                            </div>

                            <div>

                                <p className="text-xs uppercase tracking-wide text-muted-foreground">

                                    General

                                </p>

                                <p className="mt-2 text-xl font-semibold">

                                    <CurrencyAmount
                                        amount={category.generalAmount}
                                        currency={currency}
                                    />

                                </p>

                            </div>

                            {/* <div>

                                <p className="text-xs uppercase tracking-wide text-muted-foreground">

                                    Average

                                </p>

                                <p className="mt-2 text-xl font-semibold">

                                    <CurrencyAmount
                                        amount={averageTransaction}
                                        currency={currency}
                                    />

                                </p>

                            </div> */}

                        </div>

                    </section>

                    <Separator />

                    {/* Spending Breakdown */}

                    <section className="space-y-5">

                        <div>

                            <h3 className="text-xl font-semibold">

                                Spending Breakdown

                            </h3>

                            <p className="mt-1 text-sm text-muted-foreground">

                                Distribution across all spending buckets.

                            </p>

                        </div>

                        <div className="space-y-5">

                            {category.subcategories.map((sub) => {

                                const percent =
                                    totalBreakdown === 0
                                        ? 0
                                        : (sub.amount /
                                            totalBreakdown) *
                                        100;

                                return (
                                    <div
                                        key={sub.id}
                                        className="space-y-2"
                                    >
                                        <div className="flex items-center justify-between">

                                            <div>

                                                <div className="font-medium">

                                                    {sub.name}

                                                </div>

                                                <div className="text-xs text-muted-foreground">

                                                    {percent.toFixed(1)}% of category

                                                </div>

                                            </div>

                                            <div className="text-right">

                                                <div className="font-semibold">

                                                    <CurrencyAmount
                                                        amount={sub.amount}
                                                        currency={currency}
                                                    />

                                                </div>

                                            </div>

                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-muted">

                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${(sub.amount / maxAmount) * 100}%`,
                                                    backgroundColor:
                                                        category.color ??
                                                        "#3b82f6",
                                                }}
                                            />

                                        </div>

                                    </div>
                                );
                            })}

                            {category.generalAmount > 0 && (() => {

                                const percent =
                                    (category.generalAmount /
                                        totalBreakdown) *
                                    100;

                                return (

                                    <div className="space-y-2">

                                        <div className="flex items-center justify-between">

                                            <div>

                                                <div className="font-medium">

                                                    General

                                                </div>

                                                <div className="text-xs text-muted-foreground">

                                                    No Subcategory • {percent.toFixed(1)}%

                                                </div>

                                            </div>

                                            <div className="font-semibold">

                                                <CurrencyAmount
                                                    amount={category.generalAmount}
                                                    currency={currency}
                                                />

                                            </div>

                                        </div>

                                        <div className="h-2 overflow-hidden rounded-full bg-muted">

                                            <div
                                                className="h-full rounded-full opacity-80"
                                                style={{
                                                    width: `${(category.generalAmount / maxAmount) * 100}%`,
                                                    backgroundColor:
                                                        category.color ??
                                                        "#3b82f6",
                                                }}
                                            />

                                        </div>

                                    </div>

                                );

                            })()}
                        </div>

                    </section>

                    <Separator />

                    <section className="space-y-5">

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="text-xl font-semibold">

                                    Recent Transactions

                                </h3>

                                <p className="mt-1 text-sm text-muted-foreground">

                                    Latest transactions belonging to this category.

                                </p>

                            </div>

                            <Badge
                                variant="outline"
                                className="rounded-full px-3 py-1"
                            >
                                <Receipt className="mr-2 h-4 w-4" />

                                {category.recentTransactions.length} Recent

                            </Badge>

                        </div>

                        {category.recentTransactions.length === 0 ? (

                            <div
                                className="
                                    flex
                                    h-40
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    border
                                    border-dashed
                                    text-muted-foreground
                                "
                            >
                                No transactions found.

                            </div>

                        ) : (

                            <div className="space-y-3">

                                {category.recentTransactions.map((txn) => (

                                    <div
                                        key={txn.id}
                                        className="
                                            rounded-xl
                                            md:rounded-2xl
                                            border
                                            p-3
                                            md:p-4
                                            transition-all
                                            hover:bg-muted/30
                                            hover:border-primary/20
                                        "
                                    >

                                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">

                                            <div className="min-w-0 flex-1 w-full">

                                                <p className="truncate text-base font-semibold">

                                                    {txn.description ||
                                                        txn.merchant ||
                                                        txn.category?.name ||
                                                        "Untitled Transaction"}

                                                </p>

                                                <div
                                                    className="
                                                        mt-2
                                                        flex
                                                        flex-wrap
                                                        items-center
                                                        gap-2
                                                    "
                                                >

                                                    {txn.category?.parent && (

                                                        <Badge
                                                            variant="secondary"
                                                            className="rounded-full"
                                                        >
                                                            {txn.category.parent.name}
                                                        </Badge>

                                                    )}

                                                    {txn.category
                                                        ?.parentCategoryId && (

                                                            <Badge
                                                                variant="outline"
                                                                className="rounded-full"
                                                            >
                                                                {txn.category.name}
                                                            </Badge>

                                                        )}

                                                    {!txn.category
                                                        ?.parentCategoryId && (

                                                            <Badge
                                                                variant="outline"
                                                                className="rounded-full"
                                                            >
                                                                General
                                                            </Badge>

                                                        )}

                                                </div>

                                                <p
                                                    className="
                                                        mt-3
                                                        text-xs
                                                        text-muted-foreground
                                                    "
                                                >
                                                    {format(
                                                        new Date(
                                                            txn.transactionDate
                                                        ),
                                                        "dd MMM yyyy"
                                                    )}

                                                </p>

                                            </div>

                                            <div className="text-left sm:text-right w-full sm:w-auto">

                                                <p
                                                    className="
                                                        text-base
                                                        md:text-lg
                                                        font-bold
                                                        tabular-nums
                                                    "
                                                >
                                                    <CurrencyAmount
                                                        amount={txn.amount}
                                                        currency={currency}
                                                    />
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </section>

                    {/* <div
                        className="
                            flex
                            justify-end
                            border-t
                            pt-6
                        "
                    >

                        <button
                            type="button"
                            className="
                                rounded-xl
                                border
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                transition-colors
                                hover:bg-muted
                            "
                        >
                            View All Transactions →
                        </button>

                    </div> */}

                </div>

            </DialogContent>

        </Dialog>

    );
}