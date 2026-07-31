"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function deleteGoal(
    goalId: string
) {
    const financeProfile =
        await requireActiveFinanceProfile();

    const goal =
        await prisma.goal.findFirst({
            where: {
                id: goalId,
                financeProfileId:
                    financeProfile.id,
            },
        });

    if (!goal) {
        return {
            success: false,
            message: "Goal not found.",
        };
    }

    await prisma.goal.delete({
        where: {
            id: goalId,
        },
    });

    revalidatePath("/planning");

    return {
        success: true,
        message:
            "Goal deleted successfully.",
    };
}