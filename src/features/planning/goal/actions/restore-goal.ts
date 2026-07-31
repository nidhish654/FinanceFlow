"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function restoreGoal(
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

    if (!goal.archived) {
        return {
            success: false,
            message:
                "Goal is already active.",
        };
    }

    await prisma.goal.update({
        where: {
            id: goalId,
        },
        data: {
            archived: false,
        },
    });

    revalidatePath("/planning");

    return {
        success: true,
        message:
            "Goal restored successfully.",
    };
}