"use client";

import { useMemo, useState } from "react";
import { DateRange } from "react-day-picker";
import { subMonths, subWeeks, subYears, subDays, isWithinInterval, startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear } from "date-fns";

import { CategoryPoint } from "../../../types/analytics-view";
import { TransactionDto } from "@/features/transactions/types/transaction";
import { useTransactionFilters } from "@/features/transactions/hooks/use-transaction-filters";
import FilterPopover, { PeriodFilter } from "@/components/filters/filter-popover";

import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { buildCategoryAnalysis } from "../../../builders/build-category-analysis";

import CategorySummaryCards from "./category-summary-cards";
import CategoryExplorer from "./category-explorer";
import TopSubcategories from "./top-subcategories";
import CategoryConcentrationCard from "./category-concentration";
import CategoryGrowthCard from "./category-growth";
import CategoryInsights from "./category-insights";
import CategoryDrilldownSheet from "./category-drilldown-sheet";

interface CategoryTabProps {
    transactions: TransactionDto[];
    currency: string;
}

export default function CategoryTab({
    transactions,
    currency,
}: CategoryTabProps) {
    const [period, setPeriod] = useState<PeriodFilter>("month");
    const [type, setType] = useState<string>("EXPENSE");
    const [account, setAccount] = useState<string>("all");
    const [priority, setPriority] = useState<string>("all");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<CategoryPoint | null>(null);

    const filteredTransactions = useTransactionFilters({
        transactions,
        search: "",
        period,
        dateRange,
        type,
        category: "all",
        account,
        priority,
    });

    const previousTransactions = useMemo(() => {
        const now = new Date();
        let prevStart: Date | null = null;
        let prevEnd: Date | null = null;

        if (period === "today") {
            prevStart = startOfDay(subDays(now, 1));
            prevEnd = endOfDay(subDays(now, 1));
        } else if (period === "week") {
            const lastWeek = subWeeks(now, 1);
            prevStart = startOfWeek(lastWeek, { weekStartsOn: 1 });
            prevEnd = endOfWeek(lastWeek, { weekStartsOn: 1 });
        } else if (period === "month") {
            const lastMonth = subMonths(now, 1);
            prevStart = startOfMonth(lastMonth);
            prevEnd = endOfMonth(lastMonth);
        } else if (period === "last-month") {
            const twoMonthsAgo = subMonths(now, 2);
            prevStart = startOfMonth(twoMonthsAgo);
            prevEnd = endOfMonth(twoMonthsAgo);
        } else if (period === "year") {
            const lastYear = subYears(now, 1);
            prevStart = startOfYear(lastYear);
            prevEnd = endOfYear(lastYear);
        }

        // We still need to apply type, account, priority to the previous transactions
        let prevList = transactions;
        if (type !== "all") prevList = prevList.filter(t => t.type === type);
        if (account !== "all") prevList = prevList.filter(t => t.account.id === account);
        if (priority !== "all") prevList = prevList.filter(t => t.priority === priority);

        if (prevStart && prevEnd) {
            return prevList.filter(t => {
                const d = new Date(t.transactionDate);
                return isWithinInterval(d, { start: prevStart!, end: prevEnd! });
            });
        }
        return [];
    }, [transactions, period, type, account, priority]);

    const data = useMemo(
        () => buildCategoryAnalysis(filteredTransactions, previousTransactions, currency),
        [filteredTransactions, previousTransactions, currency]
    );

    // Filter count for badge
    let filterCount = 0;
    if (period !== "all") filterCount++;
    if (type !== "all") filterCount++;
    if (account !== "all") filterCount++;
    if (priority !== "all") filterCount++;
    if (period === "custom" && dateRange) filterCount++;

    const categories = [
        ...new Map(transactions.filter(t => t.category).map(t => [t.category!.id, t.category!])).values()
    ];
    const accounts = [
        ...new Map(transactions.map(t => [t.account.id, t.account])).values()
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header / Filter */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight">Category Analytics</h2>
                    <p className="text-sm text-muted-foreground">Deep dive into your spending hierarchy.</p>
                </div>
                <div className="flex items-center gap-2">
                    <FilterPopover
                        showCategory={false}
                        period={period}
                        onPeriodChange={setPeriod}
                        type={type}
                        onTypeChange={setType}
                        category="all"
                        onCategoryChange={() => { }}
                        account={account}
                        onAccountChange={setAccount}
                        priority={priority}
                        onPriorityChange={setPriority}
                        dateRange={dateRange}
                        onDateRangeChange={setDateRange}
                        categories={categories}
                        accounts={accounts}
                    >
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filters
                            {filterCount > 0 && (
                                <Badge variant="secondary" className="ml-1 rounded-sm px-1 font-normal">
                                    {filterCount}
                                </Badge>
                            )}
                        </Button>
                    </FilterPopover>
                </div>
            </div>

            {/* Summary Cards */}
            <CategorySummaryCards summary={data.summary} currency={currency} />

            {/* Smart Insights */}
            <CategoryInsights insights={data.insights} />

            <div className="grid gap-6 lg:grid-cols-7">
                {/* Explorer (Left side, takes 4 columns) */}
                <div className="lg:col-span-4 h-full">
                    <CategoryExplorer
                        categories={data.categories}
                        currency={currency}
                        onCategoryClick={setSelectedCategory}
                    />
                </div>
                {/* Right side (takes 3 columns) */}
                <div className="lg:col-span-3 space-y-6 h-full">
                    <TopSubcategories subcategories={data.topSubcategories} currency={currency} />
                </div>
            </div>

            <CategoryConcentrationCard concentration={data.concentration} />
            {/* Shifts / Growth */}
            <CategoryGrowthCard growth={data.growth} currency={currency} />

            <CategoryDrilldownSheet
                category={selectedCategory}
                currency={currency}
                isOpen={!!selectedCategory}
                onOpenChange={(isOpen) => !isOpen && setSelectedCategory(null)}
            />
        </div>
    );
}
