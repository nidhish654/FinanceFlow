"use server";

import { revalidatePath } from "next/cache";

import {
    GoalHistoryType,
    Prisma,
} from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    withdrawMoneySchema,
    type WithdrawMoneySchema,
} from "../schemas/goal-schema";

export async function withdrawMoney(
    goalId: string,
    values: WithdrawMoneySchema
) {
    const parsed =
        withdrawMoneySchema.safeParse(
            values
        );

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

    if (
        amount.greaterThan(
            goal.savedAmount
        )
    ) {
        return {
            success: false,
            message:
                "Withdrawal amount exceeds the saved amount.",
        };
    }

    const newSavedAmount =
        goal.savedAmount.minus(amount);

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
                        ? goal.completedAt
                        : null,
            },
        }),

        prisma.goalHistory.create({
            data: {
                goalId: goal.id,

                amount,

                type: GoalHistoryType.WITHDRAWAL,

                note:
                    data.note || null,
            },
        }),
    ]);

    revalidatePath("/planning");

    return {
        success: true,
        message:
            "Money withdrawn successfully.",
    };
}