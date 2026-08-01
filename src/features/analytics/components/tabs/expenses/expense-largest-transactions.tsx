"use client";

import {
    ArrowUpRight,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    TransactionDto,
} from "@/features/transactions/types/transaction";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface ExpenseLargestTransactionsProps {
    transactions: TransactionDto[];

    currency: string;
}

export default function ExpenseLargestTransactions({
    transactions,
    currency,
}: ExpenseLargestTransactionsProps) {
    const largestTransactions =
        transactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    "EXPENSE"
            )
            .sort(
                (a, b) =>
                    b.amount -
                    a.amount
            )
            .slice(0, 10);

    return (
        <Card className="rounded-2xl shadow-sm">

            <CardHeader>

                <CardTitle>
                    Largest Expenses
                </CardTitle>

                <CardDescription>
                    Your biggest individual spending transactions.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {largestTransactions.length === 0 ? (
                    <div
                        className="
                            flex
                            h-56
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No expense transactions found.
                    </div>
                ) : (
                    <div className="divide-y">

                        {largestTransactions.map(
                            (transaction) => (
                                <div
                                    key={
                                        transaction.id
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        py-4
                                        first:pt-0
                                        last:pb-0
                                    "
                                >
                                    <div
                                        className="
                                            min-w-0
                                            flex-1
                                        "
                                    >
                                        <p className="truncate font-medium">
                                            {transaction.description ||
                                                transaction.category?.name ||
                                                "Expense"}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {transaction.category?.name ??
                                                "Uncategorized"}
                                            {" • "}
                                            {new Date(
                                                transaction.transactionDate
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            font-semibold
                                            text-rose-600
                                            dark:text-rose-400
                                        "
                                    >
                                        <ArrowUpRight className="h-4 w-4" />

                                        <span className="tabular-nums">
                                            {formatCurrency(
                                                transaction.amount,
                                                currency
                                            )}
                                        </span>

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

            </CardContent>

        </Card>
    );
}