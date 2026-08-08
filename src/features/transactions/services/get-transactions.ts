import { prisma } from "@/lib/prisma";
import { TransactionDto } from "../types/transaction";
import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function getTransactions(): Promise<TransactionDto[]> {
    const financeProfile = await requireActiveFinanceProfile();;

    if (!financeProfile) {
        return [];
    }

    const transactions = await prisma.transaction.findMany({
        where: {
            financeProfileId: financeProfile.id,
        },

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
                        }
                    }
                },
            },
        },

        orderBy: [
            {
                transactionDate: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
    });

    return transactions.map((transaction) => ({
        ...transaction,
        amount: transaction.amount.toNumber(),
    }));
}