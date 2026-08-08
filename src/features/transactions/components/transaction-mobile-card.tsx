"use client";

import { format } from "date-fns";
import { Priority, TransactionType } from "@prisma/client";

import { Badge } from "@/components/ui/badge";
import { SelectOption } from "@/components/forms/SelectField";

import TransactionRowActions from "./transaction-row-actions";

import { TransactionDto } from "../types/transaction";
import { formatCurrency } from "@/lib/formatters";

interface TransactionMobileCardProps {
    transaction: TransactionDto;
    accountOptions: SelectOption[];
    categoryOptions: SelectOption[];
}

function priorityVariant(priority: Priority | null) {
    switch (priority) {
        case Priority.NEED:
            return "secondary";

        case Priority.WANT:
            return "destructive";

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

export default function TransactionMobileCard({
    transaction,
    accountOptions,
    categoryOptions,
}: TransactionMobileCardProps) {
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
        <div className="rounded-xl border bg-card p-4 shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-md">

            <div className="flex items-start justify-between">

                <div className="min-w-0 flex-1">

                    <h3 className="truncate text-xl font-semibold">
                        {title}
                    </h3>

                    {subtitle && (
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
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

                <p
                    className={`text-2xl font-bold ${amount.color}`}
                >
                    {amount.prefix}{" "}
                    {formatCurrency(transaction.amount, transaction.account.currency ?? "INR")}
                </p>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

                <Badge
                    variant="outline"
                    className="h-6 px-2 text-xs"
                >
                    {transaction.type ===
                        TransactionType.TRANSFER
                        ? "Transfer"
                        : transaction.category?.name ??
                        "-"}
                </Badge>

                {transaction.priority && (
                    <Badge
                        className="h-6 px-2 text-xs"
                        variant={priorityVariant(
                            transaction.priority
                        )}
                    >
                        {priorityLabel(
                            transaction.priority
                        )}
                    </Badge>
                )}

            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-3 text-sm">

                <span className="truncate text-muted-foreground">
                    {transaction.account.name}
                </span>

                <span className="whitespace-nowrap text-muted-foreground">
                    {format(
                        transaction.transactionDate,
                        "dd MMM yyyy"
                    )}
                </span>

            </div>

        </div>
    );
}