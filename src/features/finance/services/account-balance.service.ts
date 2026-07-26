import { TransactionType } from "@prisma/client";

interface OutgoingTransaction {
    amount: number;
    type: TransactionType;
}

interface IncomingTransfer {
    amount: number;
}

interface AccountBalanceInput {
    openingBalance: number;
    outgoingTransactions: OutgoingTransaction[];
    incomingTransfers: IncomingTransfer[];
}

export interface AccountBalanceResult {
    currentBalance: number;
    transactionCount: number;
}

export function calculateAccountBalance(
    account: AccountBalanceInput
): AccountBalanceResult {
    let currentBalance = account.openingBalance;

    for (const transaction of account.outgoingTransactions) {
        switch (transaction.type) {
            case "INCOME":
                currentBalance += transaction.amount;
                break;

            case "EXPENSE":
            case "TRANSFER":
                currentBalance -= transaction.amount;
                break;
        }
    }

    for (const transfer of account.incomingTransfers) {
        currentBalance += transfer.amount;
    }

    return {
        currentBalance,
        transactionCount:
            account.outgoingTransactions.length +
            account.incomingTransfers.length,
    };
}