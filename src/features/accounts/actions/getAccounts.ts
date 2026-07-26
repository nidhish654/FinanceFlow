"use server";

import { prisma } from "@/lib/prisma";
import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import { AccountDto } from "../types/account";
import { calculateAccountBalance } from "@/features/finance/services/account-balance.service";

export async function getAccounts(): Promise<AccountDto[]> {
    const financeProfile =
        await requireActiveFinanceProfile();

    const accounts = await prisma.financeAccount.findMany({
        where: {
            financeProfileId: financeProfile.id,
            status: "ACTIVE",
        },

        orderBy: {
            name: "asc",
        },

        include: {
            outgoingTransactions: {
                select: {
                    amount: true,
                    type: true,
                },
            },

            incomingTransfers: {
                select: {
                    amount: true,
                },
            },
        },
    });

    // console.log(JSON.stringify(accounts, null, 2));

    return accounts.map((account) => {
        const openingBalance = Number(account.openingBalance);

        const balance = calculateAccountBalance({
            openingBalance,

            outgoingTransactions:
                account.outgoingTransactions.map((t) => ({
                    amount: Number(t.amount),
                    type: t.type,
                })),

            incomingTransfers:
                account.incomingTransfers.map((t) => ({
                    amount: Number(t.amount),
                })),
        });

        // console.log(balance);

        const dto = {
            id: account.id,
            name: account.name,
            type: account.type,
            currency: account.currency,
            openingBalance,
            currentBalance: balance.currentBalance,
            transactionCount: balance.transactionCount,
        };

        // console.log(dto);

        return dto;
    });
}
