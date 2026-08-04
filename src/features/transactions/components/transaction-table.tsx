"use client";

import { useEffect, useMemo, useState } from "react";
import { DateRange } from "react-day-picker";

import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";
import TransactionCard from "./transaction-card";
import TransactionMobileCard from "./transaction-mobile-card";
import TransactionPagination from "./transaction-pagination";
import TransactionSummary from "./transaction-summary";
import TransactionToolbar from "./transaction-toolbar";
import { PeriodFilter } from "@/components/filters/filter-popover";
import TransactionEmptyState from "./transaction-empty-state";

import { useTransactionFilters } from "../hooks/use-transaction-filters";
import { TransactionDto } from "../types/transaction";
import { SelectOption } from "@/components/forms/SelectField";

interface TransactionTableProps {
    transactions: TransactionDto[];
    currentBalance: number;

    accountOptions: SelectOption[];
    categoryOptions: SelectOption[];
}

export default function TransactionTable({
    transactions,
    currentBalance,
    accountOptions,
    categoryOptions,
}: TransactionTableProps) {
    const [search, setSearch] = useState("");

    const [period, setPeriod] =
        useState<PeriodFilter>("all");

    const [dateRange, setDateRange] =
        useState<DateRange>();

    const [type, setType] =
        useState("all");

    const [category, setCategory] =
        useState("all");

    const [account, setAccount] =
        useState("all");

    const [priority, setPriority] =
        useState("all");

    const [view, setView] = useState<
        "table" | "cards"
    >("table");

    // ---------------- Pagination ----------------

    const [currentPage, setCurrentPage] =
        useState(1);

    const [pageSize, setPageSize] =
        useState(10);

    // --------------------------------------------

    const filteredTransactions =
        useTransactionFilters({
            transactions,
            search,
            period,
            dateRange,
            type,
            category,
            account,
            priority,
        });

    // Reset page whenever filters change

    useEffect(() => {
        setCurrentPage(1);
    }, [
        search,
        period,
        dateRange,
        type,
        category,
        account,
        priority,
    ]);

    const paginatedTransactions =
        useMemo(() => {
            const start =
                (currentPage - 1) *
                pageSize;

            return filteredTransactions.slice(
                start,
                start + pageSize
            );
        }, [
            filteredTransactions,
            currentPage,
            pageSize,
        ]);

    const categories = [
        ...new Map(
            transactions
                .filter(
                    (t) => t.category
                )
                .map((t) => [
                    t.category!.id,
                    t.category!,
                ])
        ).values(),
    ];

    const accounts = [
        ...new Map(
            transactions.map((t) => [
                t.account.id,
                t.account,
            ])
        ).values(),
    ];

    return (
        <div className="space-y-8">
            <TransactionSummary
                transactions={
                    filteredTransactions
                }
                currentBalance={
                    currentBalance
                }
            />

            <TransactionToolbar
                transactions={
                    filteredTransactions
                }
                search={search}
                onSearchChange={
                    setSearch
                }
                period={period}
                onPeriodChange={
                    setPeriod
                }
                dateRange={dateRange}
                onDateRangeChange={
                    setDateRange
                }
                type={type}
                onTypeChange={setType}
                category={category}
                onCategoryChange={
                    setCategory
                }
                categories={categories}
                account={account}
                onAccountChange={
                    setAccount
                }
                accounts={accounts}
                view={view}
                onViewChange={setView}
                priority={priority}
                onPriorityChange={
                    setPriority
                }
            />

            {view === "table" && (
                <div className="hidden overflow-hidden rounded-xl border bg-card shadow-sm md:block">
                    {filteredTransactions.length === 0 ? (
                        <TransactionEmptyState variant="filtered" />
                    ) : (
                        <div className="hidden overflow-hidden rounded-xl border bg-card shadow-sm md:block">
                            <DataTable
                                columns={columns(accountOptions, categoryOptions)}
                                data={paginatedTransactions}
                            />
                        </div>
                )}
                </div>
            )}

            {view === "cards" && (
                <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
                    {paginatedTransactions.map(
                        (
                            transaction
                        ) => (
                            <TransactionCard
                                key={
                                    transaction.id
                                }
                                transaction={
                                    transaction
                                }
                                accountOptions={accountOptions}
                                categoryOptions={categoryOptions}
                            />
                        )
                    )}
                </div>
            )}

            <div className="space-y-4 md:hidden">
                {paginatedTransactions.length ===
                0 ? (
                    <TransactionEmptyState variant="filtered" />
                ) : (
                    paginatedTransactions.map(
                        (
                            transaction
                        ) => (
                            <TransactionMobileCard
                                key={
                                    transaction.id
                                }
                                transaction={
                                    transaction
                                }
                                accountOptions={accountOptions}
                                categoryOptions={categoryOptions}
                            />
                        )
                    )
                )}
            </div>

            <TransactionPagination
                totalItems={
                    filteredTransactions.length
                }
                currentPage={
                    currentPage
                }
                pageSize={pageSize}
                onPageChange={
                    setCurrentPage
                }
                onPageSizeChange={(
                    size
                ) => {
                    setPageSize(size);
                    setCurrentPage(1);
                }}
            />
        </div>
    );
}