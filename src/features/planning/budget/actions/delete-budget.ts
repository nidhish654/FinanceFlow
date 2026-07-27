"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function deleteBudget(
    budgetId: string
) {
    const financeProfile =
        await requireActiveFinanceProfile();

    const budget =
        await prisma.budget.findFirst({
            where: {
                id: budgetId,
                financeProfileId:
                    financeProfile.id,
            },
        });

    if (!budget) {
        return {
            success: false,
            message: "Budget not found.",
        };
    }

    await prisma.budget.delete({
        where: {
            id: budgetId,
        },
    });

    revalidatePath("/budgets");

    return {
        success: true,
        message:
            "Budget deleted successfully.",
    };
}