"use client";

import {
    ArrowDownLeft,
} from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { TransactionDto } from "@/features/transactions/types/transaction";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface LargestIncomeTransactionsProps {
    transactions: TransactionDto[];

    currency: string;
}

export default function LargestIncomeTransactions({
    transactions,
    currency,
}: LargestIncomeTransactionsProps) {
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
                    Largest Income Transactions
                </CardTitle>

                <CardDescription>
                    Your highest income transactions during the selected period.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {transactions.length === 0 ? (
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
                        No income transactions found.
                    </div>
                ) : (
                    <div
                        className="
                            max-h-[420px]
                            space-y-3
                            overflow-y-auto
                            pr-1

                            [scrollbar-width:none]
                            [-ms-overflow-style:none]

                            [&::-webkit-scrollbar]:hidden
                        "
                    >
                        {transactions.map(
                            (transaction) => (
                                <div
                                    key={transaction.id}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        rounded-xl
                                        border
                                        p-4
                                        transition-colors

                                        hover:bg-muted/40
                                    "
                                >
                                    <div
                                        className="
                                            flex
                                            items-center
                                            gap-4
                                            min-w-0
                                        "
                                    >

                                        <div
                                            className="
                                                flex
                                                h-11
                                                w-11
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-emerald-500/10
                                            "
                                        >
                                            <ArrowDownLeft
                                                className="
                                                    h-5
                                                    w-5
                                                    text-emerald-500
                                                "
                                            />
                                        </div>

                                        <div
                                            className="
                                                min-w-0
                                            "
                                        >
                                            <p
                                                className="
                                                    truncate
                                                    font-medium
                                                "
                                            >
                                                {transaction.description ||
                                                    "Income"}
                                            </p>

                                            <div
                                                className="
                                                    mt-1
                                                    flex
                                                    flex-wrap
                                                    items-center
                                                    gap-2
                                                    text-xs
                                                    text-muted-foreground
                                                "
                                            >
                                                <span>
                                                    {transaction.category?.name ??
                                                        "Uncategorized"}
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {new Date(
                                                        transaction.transactionDate
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    <div
                                        className="
                                            ml-4
                                            shrink-0
                                            text-right
                                        "
                                    >
                                        <p
                                            className="
                                                font-semibold
                                                text-emerald-500
                                                tabular-nums
                                            "
                                        >
                                            {formatCurrency(
                                                transaction.amount,
                                                currency
                                            )}
                                        </p>

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