"use client";

import {
    ArrowDownCircle,
    ArrowLeftRight,
    ArrowUpCircle,
} from "lucide-react";

import DashboardWidgetCard from "./dashboard-widget-card";

import { Button } from "@/components/ui/button";

import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    formatCurrency,
    formatDashboardDate,
} from "../../lib/dashboard-formatters";

import Link from "next/link";

interface RecentTransactionsWidgetProps {
    transactions: TransactionDto[];

    currency: string;
}

export default function RecentTransactionsWidget({
    transactions,
    currency,
}: RecentTransactionsWidgetProps) {
    const recentTransactions =
        transactions.slice(0, 5);

    return (
        <DashboardWidgetCard
            title="Recent Transactions"
            description="Your latest financial activity."
            actions={
                <Button asChild variant="link" size="sm">
                    <Link href="/transactions">View all</Link>
                </Button>
            }
        >
            {recentTransactions.length === 0 ? (
                <div
                    className="
                        flex
                        h-40
                        items-center
                        justify-center
                        text-sm
                        text-muted-foreground
                    "
                >
                    No transactions found.
                </div>
            ) : (
                <div className="space-y-4">
                    {recentTransactions.map(
                        (transaction) => {
                            const Icon =
                                transaction.type ===
                                    "INCOME"
                                    ? ArrowDownCircle
                                    : transaction.type ===
                                        "EXPENSE"
                                        ? ArrowUpCircle
                                        : ArrowLeftRight;

                            return (
                                <div
                                    key={transaction.id}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    "
                                >
                                    {/* Left */}

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div
                                            className={`
                                                flex
                                                h-9
                                                w-9
                                                items-center
                                                justify-center
                                                rounded-full
                                                ${transaction.type ===
                                                    "INCOME"
                                                    ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"
                                                    : transaction.type ===
                                                        "EXPENSE"
                                                        ? "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400"
                                                        : "bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400"
                                                }
                                            `}
                                        >
                                            <Icon className="h-4 w-4" />
                                        </div>

                                        <div className="min-w-0">

                                            <p className="truncate font-medium">
                                                {transaction.description ||
                                                    transaction.category
                                                        ?.name ||
                                                    transaction.type}
                                            </p>

                                            <p
                                                className="
                                                    text-xs
                                                    text-muted-foreground
                                                "
                                            >
                                                {transaction.account.name}
                                                {" • "}
                                                {formatDashboardDate(
                                                    transaction.transactionDate,
                                                    currency
                                                )}
                                            </p>

                                        </div>

                                    </div>

                                    {/* Right */}

                                    <p
                                        className={`
                                            text-sm
                                            font-semibold
                                            tabular-nums
                                            ${transaction.type ===
                                                "INCOME"
                                                ? "text-emerald-600 dark:text-emerald-400"
                                                : transaction.type ===
                                                    "EXPENSE"
                                                    ? "text-red-600 dark:text-red-400"
                                                    : ""
                                            }
                                        `}
                                    >
                                        {transaction.type ===
                                            "EXPENSE"
                                            ? "-"
                                            : transaction.type ===
                                                "INCOME"
                                                ? "+"
                                                : ""}
                                        {formatCurrency(
                                            transaction.amount,
                                            currency
                                        )}
                                    </p>

                                </div>
                            );
                        }
                    )}
                </div>
            )}
        </DashboardWidgetCard>
    );
}
