"use client";

import { format } from "date-fns";
import { Priority, TransactionType } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { SelectOption } from "@/components/forms/SelectField";

import TransactionRowActions from "./transaction-row-actions";

import { TransactionDto } from "../types/transaction";
import { formatCurrency } from "@/lib/formatters";

interface TransactionCardProps {
    transaction: TransactionDto;
    accountOptions: SelectOption[];
    categoryOptions: SelectOption[];
}

function priorityVariant(priority: Priority | null) {
    switch (priority) {
        case Priority.NEED:
            return "destructive";
        case Priority.WANT:
            return "secondary";
        case Priority.SAVINGS:
            return "success";
        default:
            return "outline";
    }
}

function priorityLabel(priority: Priority) {
    return (
        priority.charAt(0) +
        priority.slice(1).toLowerCase()
    );
}

function amountStyle(type: TransactionType) {
    switch (type) {
        case TransactionType.INCOME:
            return {
                color: "text-green-600 dark:text-green-400",
                prefix: "+",
            };

        case TransactionType.EXPENSE:
            return {
                color: "text-red-600 dark:text-red-400",
                prefix: "-",
            };

        case TransactionType.TRANSFER:
            return {
                color: "text-blue-600 dark:text-blue-400",
                prefix: "⇄",
            };
    }
}

export default function TransactionCard({
    transaction,
    accountOptions,
    categoryOptions,
}: TransactionCardProps) {
    const amount = amountStyle(transaction.type);

    const title =
        transaction.description ||
        transaction.category?.name ||
        "Untitled Transaction";

    const subtitle =
        transaction.type === TransactionType.TRANSFER
            ? transaction.transferAccount
                ? `${transaction.account.name} → ${transaction.transferAccount.name}`
                : transaction.account.name
            : transaction.merchant;

    return (
        <div className="rounded-xl border bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-lg hover:-translate-y-0.5">

            <div className="flex items-start justify-between gap-3">

                <div className="min-w-0 flex-1">

                    <h3 className="truncate text-2xl font-semibold leading-none">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="mt-1 truncate text-xs text-muted-foreground">
                            {subtitle}
                        </p>
                    )}

                </div>

                <TransactionRowActions
                    transaction={transaction}
                    accountOptions={accountOptions}
                    categoryOptions={categoryOptions}
                />

            </div>

            <div className="mt-4">

                <p className={`text-2xl font-bold ${amount.color}`}>
                    {amount.prefix}{" "}
                    {formatCurrency(transaction.amount)}
                </p>

            </div>

            <div className="mt-4 border-t pt-3">

                <div className="space-y-2">

                    <div className="flex items-center justify-between">

                        <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            Category
                        </span>

                        <span className="text-sm font-semibold">
                            {transaction.type === TransactionType.TRANSFER
                                ? "Transfer"
                                : transaction.category?.name ?? "-"}
                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            Account
                        </span>

                        <span className="truncate text-sm font-semibold">
                            {transaction.account.name}
                        </span>

                    </div>

                    <div className="flex items-center justify-between">

                        <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            Priority
                        </span>

                        {transaction.priority ? (
                            <Badge
                                className="h-6 px-2 text-xs"
                                variant={priorityVariant(transaction.priority)}
                            >
                                {priorityLabel(transaction.priority)}
                            </Badge>
                        ) : (
                            <span className="text-sm text-muted-foreground">
                                —
                            </span>
                        )}

                    </div>

                    <div className="flex items-center justify-between">

                        <span className="text-xs uppercase tracking-wide text-muted-foreground">
                            Date
                        </span>

                        <span className="text-sm font-semibold">
                            {format(
                                transaction.transactionDate,
                                "dd MMM yyyy"
                            )}
                        </span>

                    </div>

                </div>

            </div>

        </div>
    );
}