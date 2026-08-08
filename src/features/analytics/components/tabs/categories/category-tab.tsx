"use client";

import { useMemo, useState } from "react";

import { CategoryPoint, CategoryPeriodAnalysis } from "../../../types/analytics-view";
import { TransactionDto } from "@/features/transactions/types/transaction";

import { useTransactionFilters } from "@/features/transactions/hooks/use-transaction-filters";

import FilterPopover from "@/components/filters/filter-popover";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

import { buildCategoryAnalysis } from "../../../builders/build-category-analysis";

import CategorySummaryCards from "./category-summary-cards";
import CategoryExplorer from "./category-explorer";
import TopSubcategories from "./top-subcategories";
import CategoryConcentrationCard from "./category-concentration";
import CategoryGrowthCard from "./category-growth";
import CategoryInsights from "./category-insights";
import CategoryDrilldownSheet from "./category-drilldown-sheet";

interface CategoryTabProps {
    analysis: CategoryPeriodAnalysis;
    transactions: TransactionDto[];
    previousTransactions: TransactionDto[];
    currency: string;
}

export default function CategoryTab({
    analysis,
    transactions,
    previousTransactions,
    currency,
}: CategoryTabProps) {

    const [account, setAccount] = useState("all");
    const [priority, setPriority] = useState("all");

    const [selectedCategory, setSelectedCategory] =
        useState<CategoryPoint | null>(null);

    /**
     * Current Period Transactions
     */
    const filteredTransactions = useTransactionFilters({
        transactions,
        search: "",
        period: "all",
        dateRange: undefined,
        type: "all",
        category: "all",
        account,
        priority,
    });

    /**
     * Previous Period Transactions
     */
    const filteredPreviousTransactions = useMemo(() => {

        let list = previousTransactions;

        if (account !== "all") {
            list = list.filter(
                (transaction) =>
                    transaction.account.id === account
            );
        }

        if (priority !== "all") {
            list = list.filter(
                (transaction) =>
                    transaction.priority === priority
            );
        }

        return list;

    }, [
        previousTransactions,
        account,
        priority,
    ]);

    /**
     * Build Analysis
     */
    const data = useMemo(() => {

        if (
            account === "all" &&
            priority === "all"
        ) {
            return analysis;
        }

        return buildCategoryAnalysis(
            filteredTransactions,
            filteredPreviousTransactions,
            currency
        );

    }, [
        analysis,
        filteredTransactions,
        filteredPreviousTransactions,
        currency,
        account,
        priority,
    ]);

    /**
     * Filter Count
     */
    let filterCount = 0;

    if (account !== "all") filterCount++;

    if (priority !== "all") filterCount++;

    /**
     * Categories
     */
    const categories = [
        ...new Map(
            transactions
                .filter((transaction) => transaction.category)
                .map((transaction) => [
                    transaction.category!.id,
                    transaction.category!,
                ])
        ).values(),
    ];

    /**
     * Accounts
     */
    const accounts = [
        ...new Map(
            transactions.map((transaction) => [
                transaction.account.id,
                transaction.account,
            ])
        ).values(),
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-800">

            {/* =========================================
             * Header
             * ========================================= */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                        Category Analytics
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Deep dive into your spending hierarchy.
                    </p>
                </div>

                <div className="flex items-center gap-2">

                    <FilterPopover
                        showPeriod={false}
                        showType={false}
                        showCategory={false}
                        showAccount={true}
                        showPriority={true}
                        showSavingsPriority={false}

                        period="all"
                        onPeriodChange={() => { }}

                        type="all"
                        onTypeChange={() => { }}

                        category="all"
                        onCategoryChange={() => { }}

                        account={account}
                        onAccountChange={setAccount}

                        priority={priority}
                        onPriorityChange={setPriority}

                        dateRange={undefined}
                        onDateRangeChange={() => { }}

                        categories={categories}
                        accounts={accounts}
                    >
                        <Button
                            variant="outline"
                            className="gap-2"
                        >
                            <Filter className="h-4 w-4" />

                            Filters

                            {filterCount > 0 && (
                                <Badge
                                    variant="secondary"
                                    className="ml-1 rounded-sm px-1 font-normal"
                                >
                                    {filterCount}
                                </Badge>
                            )}
                        </Button>

                    </FilterPopover>

                </div>

            </div>

            {/* =========================================
             * Summary
             * ========================================= */}

            <CategorySummaryCards
                summary={data.summary}
                currency={currency}
            />

            {/* =========================================
             * Smart Insights
             * ========================================= */}

            <CategoryInsights
                insights={data.insights}
            />

            {/* =========================================
             * Category Explorer
             * ========================================= */}

            <CategoryExplorer
                categories={data.categories}
                currency={currency}
                onCategoryClick={setSelectedCategory}
            />

            {/* =========================================
             * Concentration + Top Subcategories
             * ========================================= */}

            <div className="grid gap-6 lg:grid-cols-6">

                <div className="lg:col-span-3 h-full">

                    <CategoryConcentrationCard
                        concentration={data.concentration}
                    />

                </div>

                <div className="lg:col-span-3 space-y-6 h-full">

                    <TopSubcategories
                        subcategories={data.topSubcategories}
                        currency={currency}
                    />

                </div>

            </div>

            {/* =========================================
             * Growth / Spending Shifts
             * ========================================= */}

            <CategoryGrowthCard
                growth={data.growth}
                currency={currency}
            />

            {/* =========================================
             * Drilldown
             * ========================================= */}

            <CategoryDrilldownSheet
                category={selectedCategory}
                currency={currency}
                isOpen={!!selectedCategory}
                onOpenChange={(open) => {
                    if (!open) {
                        setSelectedCategory(null);
                    }
                }}
            />

        </div>
    );
}