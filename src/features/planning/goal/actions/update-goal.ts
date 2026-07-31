"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    goalSchema,
    type GoalSchema,
} from "../schemas/goal-schema";

export async function updateGoal(
    goalId: string,
    values: GoalSchema
) {
    const parsed = goalSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed.",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const financeProfile =
        await requireActiveFinanceProfile();

    const existingGoal =
        await prisma.goal.findFirst({
            where: {
                id: goalId,

                financeProfileId:
                    financeProfile.id,
            },
        });

    if (!existingGoal) {
        return {
            success: false,
            message: "Goal not found.",
        };
    }

    const data = parsed.data;

    const duplicateGoal =
        await prisma.goal.findFirst({
            where: {
                financeProfileId:
                    financeProfile.id,

                name: data.name,

                NOT: {
                    id: goalId,
                },
            },
        });

    if (duplicateGoal) {
        return {
            success: false,
            message:
                "A goal with this name already exists.",
        };
    }

    await prisma.goal.update({
        where: {
            id: goalId,
        },

        data: {
            name: data.name,

            icon:
                data.icon || null,

            targetAmount:
                data.targetAmount,

            targetDate:
                data.targetDate ?? null,

            notes:
                data.notes || null,
        },
    });

    revalidatePath("/planning");

    return {
        success: true,
        message:
            "Goal updated successfully.",
    };
}