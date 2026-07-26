"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function deleteTransaction(
    transactionId: string
) {
    const financeProfile =
        await requireActiveFinanceProfile();

    if (!financeProfile) {
        return {
            success: false,
            message: "Finance profile not found.",
        };
    }

    const transaction =
        await prisma.transaction.findFirst({
            where: {
                id: transactionId,
                financeProfileId: financeProfile.id,
            },
            select: {
                id: true,
            },
        });

    if (!transaction) {
        return {
            success: false,
            message: "Transaction not found.",
        };
    }

    await prisma.transaction.delete({
        where: {
            id: transaction.id,
        },
    });

    revalidatePath("/transactions");
    revalidatePath("/accounts");
    revalidatePath("/dashboard");

    return {
        success: true,
        message:
            "Transaction deleted successfully.",
    };
}