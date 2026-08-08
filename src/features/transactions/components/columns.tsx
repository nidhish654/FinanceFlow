"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Priority, TransactionType } from "@prisma/client";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SelectOption } from "@/components/forms/SelectField";

import TransactionRowActions from "./transaction-row-actions";

import { TransactionDto } from "../types/transaction";

import { formatCurrency } from "@/lib/formatters";

import { getCategoryIcon } from "@/lib/category-icons";

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

export function columns(
    accountOptions: SelectOption[],
    categoryOptions: SelectOption[]
): ColumnDef<TransactionDto>[] {
    return [
        {
            accessorKey: "transactionDate",

            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(
                            column.getIsSorted() === "asc"
                        )
                    }
                >
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),

            cell: ({ row }) =>
                format(
                    row.original.transactionDate,
                    "dd MMM yyyy"
                ),
        },

        {
            accessorKey: "description",

            header: "Description",

            cell: ({ row }) => (
                <div className="max-w-xs">
                    <p className="font-medium">
                        {row.original.description ?? "—"}
                    </p>

                    {row.original.merchant && (
                        <p className="text-xs text-muted-foreground">
                            {row.original.merchant}
                        </p>
                    )}
                </div>
            ),
        },

        {
            id: "category",

            header: "Category",

            cell: ({ row }) => {
                if (
                    row.original.type ===
                    TransactionType.TRANSFER
                ) {
                    return (
                        row.original.transferAccount
                            ?.name ?? "-"
                    );
                }

                const category =
                    row.original.category;

                if (!category) {
                    return "-";
                }

                const isSubcategory = !!category.parentCategoryId && !!category.parent;
                const displayCategory = isSubcategory ? category.parent! : category;

                const {
                    icon: Icon,
                } = getCategoryIcon(displayCategory.icon);

                const categoryColor =
                    displayCategory.color ?? "#6366F1";

                return (
                    <div className="flex items-center gap-2">
                        <div
                            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                            style={{
                                backgroundColor: `${categoryColor}18`,
                                color: categoryColor,
                            }}
                        >
                            <Icon className="h-4 w-4" />
                        </div>

                        <div className="flex flex-col">
                            <span className="truncate font-medium">
                                {displayCategory.name}
                            </span>
                            {isSubcategory && (
                                <span className="text-xs text-muted-foreground truncate">
                                    ↳ {category.name}
                                </span>
                            )}
                        </div>
                    </div>
                );
            },
        },

        {
            id: "account",

            header: "Account",

            cell: ({ row }) =>
                row.original.account.name,
        },

        {
            accessorKey: "priority",

            header: "Priority",

            cell: ({ row }) =>
                row.original.priority ? (
                    <Badge
                        variant={priorityVariant(
                            row.original.priority
                        )}
                    >
                        {priorityLabel(
                            row.original.priority
                        )}
                    </Badge>
                ) : (
                    "-"
                ),
        },

        {
            accessorKey: "amount",

            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(
                            column.getIsSorted() === "asc"
                        )
                    }
                >
                    Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),

            cell: ({ row }) => {
                const { type, amount, account } = row.original;
                const currency = account.currency ?? "INR";

                let color = "text-foreground";

                let prefix = "";

                switch (type) {
                    case TransactionType.INCOME:
                        color =
                            "text-green-600 dark:text-green-400";
                        prefix = "+";
                        break;

                    case TransactionType.EXPENSE:
                        color =
                            "text-red-600 dark:text-red-400";
                        prefix = "-";
                        break;

                    case TransactionType.TRANSFER:
                        color =
                            "text-blue-600 dark:text-blue-400";
                        prefix = "⇄";
                        break;
                }

                return (
                    <span
                        className={`font-semibold ${color}`}
                    >
                        {prefix}{" "}
                        {formatCurrency(amount, currency)}
                    </span>
                );
            },
        },

        {
            id: "actions",

            enableHiding: false,

            cell: ({ row }) => (
                <TransactionRowActions
                    transaction={row.original}
                    accountOptions={
                        accountOptions
                    }
                    categoryOptions={
                        categoryOptions
                    }
                />
            ),
        },
    ];
}