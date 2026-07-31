"use server";

import { revalidatePath } from "next/cache";

import {
    GoalHistoryType,
    Prisma,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    addMoneySchema,
    type AddMoneySchema,
} from "../schemas/goal-schema";

export async function addMoney(
    goalId: string,
    values: AddMoneySchema
) {
    const parsed =
        addMoneySchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed.",
            errors:
                parsed.error.flatten()
                    .fieldErrors,
        };
    }

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

    const data = parsed.data;

    const amount =
        new Prisma.Decimal(data.amount);

    const newSavedAmount =
        goal.savedAmount.plus(amount);

    await prisma.$transaction([
        prisma.goal.update({
            where: {
                id: goal.id,
            },
            data: {
                savedAmount:
                    newSavedAmount,

                completedAt:
                    newSavedAmount.greaterThanOrEqualTo(
                        goal.targetAmount
                    )
                        ? new Date()
                        : goal.completedAt,
            },
        }),

        prisma.goalHistory.create({
            data: {
                goalId: goal.id,

                amount,

                type: GoalHistoryType.DEPOSIT,

                note:
                    data.note || null,
            },
        }),
    ]);

    revalidatePath("/planning");

    return {
        success: true,
        message:
            "Money added successfully.",
    };
}