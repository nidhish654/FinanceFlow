"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function restoreAccount(id: string) {
    try {
        const financeProfile = await requireActiveFinanceProfile();

        const account = await prisma.financeAccount.findFirst({
            where: {
                id,
                financeProfileId: financeProfile.id,
            },
        });

        if (!account) {
            return {
                success: false,
                message: "Account not found.",
            };
        }

        await prisma.financeAccount.update({
            where: {
                id,
            },
            data: {
                isArchived: false,
            },
        });

        revalidatePath("/accounts");
        revalidatePath("/transactions");
        revalidatePath("/dashboard");
        revalidatePath("/analytics");
        revalidatePath("/planning");

        return {
            success: true,
            message: "Account restored successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Failed to restore account.",
        };
    }
}
