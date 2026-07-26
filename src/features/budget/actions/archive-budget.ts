"use server";

import { revalidatePath } from "next/cache";

import { BudgetStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function archiveBudget(
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

    if (
        budget.status ===
        BudgetStatus.ARCHIVED
    ) {
        return {
            success: false,
            message:
                "Budget is already archived.",
        };
    }

    await prisma.budget.update({
        where: {
            id: budgetId,
        },
        data: {
            status:
                BudgetStatus.ARCHIVED,
        },
    });

    revalidatePath("/budgets");

    return {
        success: true,
        message:
            "Budget archived successfully.",
    };
}