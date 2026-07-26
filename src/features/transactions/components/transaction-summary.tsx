"use client";

import {
    ReceiptText,
    TrendingDown,
    TrendingUp,
    Wallet,
} from "lucide-react";
import { TransactionType } from "@prisma/client";

import SummaryCard from "./summary-card";

import { TransactionDto } from "../types/transaction";
import { formatCurrency } from "@/lib/formatters";

interface TransactionSummaryProps {
    transactions: TransactionDto[];
    currentBalance: number;
}

export default function TransactionSummary({
    transactions,
    currentBalance,
}: TransactionSummaryProps) {
    const income = transactions
        .filter((t) => t.type === TransactionType.INCOME)
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === TransactionType.EXPENSE)
        .reduce((sum, t) => sum + t.amount, 0);

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
                title="Current Balance"
                value={formatCurrency(currentBalance)}
                icon={Wallet}
                iconClassName="text-blue-600"
            />

            <SummaryCard
                title="Income"
                value={formatCurrency(income)}
                valueClassName="text-green-600"
                icon={TrendingUp}
                iconClassName="text-green-600"
            />

            <SummaryCard
                title="Expenses"
                value={formatCurrency(expenses)}
                valueClassName="text-red-600"
                icon={TrendingDown}
                iconClassName="text-red-600"
            />

            <SummaryCard
                title="Transactions"
                value={transactions.length.toString()}
                icon={ReceiptText}
                iconClassName="text-violet-600"
            />
        </div>
    );
}