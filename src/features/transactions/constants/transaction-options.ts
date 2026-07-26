import { Priority, TransactionType } from "@prisma/client";

export const TRANSACTION_TYPE_OPTIONS = [
    {
        label: "Income",
        value: TransactionType.INCOME,
    },
    {
        label: "Expense",
        value: TransactionType.EXPENSE,
    },
    {
        label: "Transfer",
        value: TransactionType.TRANSFER,
    },
];

export const PRIORITY_OPTIONS = [
    {
        label: "Need",
        value: Priority.NEED,
    },
    {
        label: "Want",
        value: Priority.WANT,
    },
    {
        label: "Savings",
        value: Priority.SAVINGS,
    },
];