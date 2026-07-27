import { TransactionType } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type GetBudgetSpendingParams = {
    financeProfileId: string;
    categoryId: string;
    startDate: Date;
    endDate: Date;
};

export async function getBudgetSpending({
    financeProfileId,
    categoryId,
    startDate,
    endDate,
}: GetBudgetSpendingParams) {
    const result = await prisma.transaction.aggregate({
        _sum: {
            amount: true,
        },

        _count: {
            id: true,
        },

        where: {
            financeProfileId,

            categoryId,

            type: TransactionType.EXPENSE,

            transactionDate: {
                gte: startDate,
                lte: endDate,
            },
        },
    });

    return {
        spent: Number(result._sum.amount ?? 0),

        transactionCount: result._count.id,
    };
}