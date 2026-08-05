export const COLUMN_ALIASES: Record<string, string[]> = {
    date: [
        "date",
        "transaction date",
        "txn date",
        "posting date",
        "post date",
    ],
    description: [
        "description",
        "details",
        "remarks",
        "narration",
        "title",
    ],
    account: [
        "account",
        "bank",
        "wallet",
        "source account",
        "account name",
    ],
    category: [
        "category",
        "expense category",
        "type",
    ],
    credit: [
        "credit",
        "income",
        "received",
        "deposit",
    ],
    debit: [
        "debit",
        "expense",
        "paid",
        "withdrawal",
    ],
    priority: [
        "priority",
        "need / want",
        "importance",
    ],
    merchant: [
        "merchant",
        "payee",
        "vendor",
    ],
    referenceNumber: [
        "reference",
        "reference number",
        "transaction id",
        "txn id",
        "ref",
    ],
    notes: [
        "notes",
        "memo",
        "comments",
    ],
};

// Required FinanceFlow columns
export const REQUIRED_COLUMNS = [
    "date",
    "account",
    "category",
    "priority",
];

// Either credit or debit must be mapped
export const AMOUNT_COLUMNS = ["credit", "debit"];

// Optional columns
export const OPTIONAL_COLUMNS = [
    "description",
    "merchant",
    "referenceNumber",
    "notes",
];
