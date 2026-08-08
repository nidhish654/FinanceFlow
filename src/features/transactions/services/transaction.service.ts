import { prisma } from "@/lib/prisma";

import { TransactionDto } from "../types/transaction";

export async function getTransactions(): Promise<TransactionDto[]> {
    const transactions =
        await prisma.transaction.findMany({
            include: {
                account: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        currency: true,
                    },
                },
                transferAccount: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                category: {
                    select: {
                        id: true,
                        name: true,
                        type: true,
                        icon: true,
                        color: true,
                        parentCategoryId: true,
                        parent: {
                            select: {
                                id: true,
                                name: true,
                                icon: true,
                                color: true,
                            },
                        },
                    },
                },
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