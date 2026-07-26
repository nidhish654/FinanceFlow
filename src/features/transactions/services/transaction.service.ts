import { prisma } from "@/lib/prisma";

import { TransactionDto } from "../types/transaction";

export async function getTransactions(): Promise<TransactionDto[]> {
    const transactions =
        await prisma.transaction.findMany({
            include: {
                account: true,
                transferAccount: true,
                category: true,
            },
            orderBy: {
                transactionDate: "desc",
            },
        });

    return transactions.map((transaction) => ({
        ...transaction,
        amount: Number(transaction.amount),
    }));
}