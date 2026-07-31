"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    goalSchema,
    type GoalSchema,
} from "../schemas/goal-schema";

export async function createGoal(
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

    const data = parsed.data;

    const existingGoal =
        await prisma.goal.findFirst({
            where: {
                financeProfileId:
                    financeProfile.id,

                name: data.name,
            },
        });

    if (existingGoal) {
        return {
            success: false,
            message:
                "A goal with this name already exists.",
        };
    }

    const maxDisplayOrder =
        await prisma.goal.aggregate({
            where: {
                financeProfileId:
                    financeProfile.id,
            },

            _max: {
                displayOrder: true,
            },
        });

    await prisma.goal.create({
        data: {
            financeProfileId:
                financeProfile.id,

            name: data.name,

            icon:
                data.icon || null,

            targetAmount:
                data.targetAmount,

            targetDate:
                data.targetDate ?? null,

            notes:
                data.notes || null,

            displayOrder:
                (maxDisplayOrder._max.displayOrder ?? -1) +
                1,
        },
    });

    revalidatePath("/planning");

    return {
        success: true,
        message:
            "Goal created successfully.",
    };
}