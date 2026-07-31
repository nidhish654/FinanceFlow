"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function archiveGoal(
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

    if (goal.archived) {
        return {
            success: false,
            message:
                "Goal is already archived.",
        };
    }

    await prisma.goal.update({
        where: {
            id: goalId,
        },

        data: {
            archived: true,
        },
    });

    revalidatePath("/planning");

    return {
        success: true,
        message:
            "Goal archived successfully.",
    };
}