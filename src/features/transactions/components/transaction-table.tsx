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
    rawAccounts: any[];
    rawCategories: any[];
    baseCurrency: string;
}

export default function TransactionTable({
    transactions,
    currentBalance,
    accountOptions,
    categoryOptions,
    rawAccounts,
    rawCategories,
    baseCurrency,
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
                baseCurrency={baseCurrency}
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
                allCategories={rawCategories}
                allAccounts={rawAccounts}
                view={view}
                onViewChange={setView}
                priority={priority}
                onPriorityChange={
                    setPriority
                }
            />

            {view === "table" && (
                <div className="hidden md:block">
                    {filteredTransactions.length === 0 ? (
                        <TransactionEmptyState
                            variant={
                                transactions.length === 0
                                    ? "empty"
                                    : "filtered"
                            }
                        />
                    ) : (
                        <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
                            <DataTable
                                columns={columns(
                                    accountOptions,
                                    categoryOptions
                                )}
                                data={paginatedTransactions}
                            />
                        </div>
                    )}
                </div>
            )}

            {view === "cards" && (
                <div className="hidden md:block">
                    {filteredTransactions.length === 0 ? (
                        <TransactionEmptyState
                            variant={
                                transactions.length === 0
                                    ? "empty"
                                    : "filtered"
                            }
                        />
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                            {paginatedTransactions.map(
                                (transaction) => (
                                    <TransactionCard
                                        key={transaction.id}
                                        transaction={transaction}
                                        accountOptions={accountOptions}
                                        categoryOptions={categoryOptions}
                                    />
                                )
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="space-y-4 md:hidden">
                {filteredTransactions.length === 0 ? (
                    <TransactionEmptyState
                        variant={
                            transactions.length === 0
                                ? "empty"
                                : "filtered"
                        }
                    />
                ) : (
                    paginatedTransactions.map(
                        (transaction) => (
                            <TransactionMobileCard
                                key={transaction.id}
                                transaction={transaction}
                                accountOptions={accountOptions}
                                categoryOptions={categoryOptions}
                            />
                        )
                    )
                )}
            </div>

            {filteredTransactions.length > 0 && (
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
            )}
        </div>
    );
}