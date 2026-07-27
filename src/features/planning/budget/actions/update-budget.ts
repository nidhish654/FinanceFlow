"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    budgetSchema,
    type BudgetSchema,
} from "../schemas/budget-schema";

export async function updateBudget(
    budgetId: string,
    values: BudgetSchema
) {
    const parsed = budgetSchema.safeParse(values);

    if (!parsed.success) {
        return {
            success: false,
            message: "Validation failed.",
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    const financeProfile =
        await requireActiveFinanceProfile();

    const existingBudget =
        await prisma.budget.findFirst({
            where: {
                id: budgetId,
                financeProfileId:
                    financeProfile.id,
            },
        });

    if (!existingBudget) {
        return {
            success: false,
            message: "Budget not found.",
        };
    }

    const data = parsed.data;

    // Convert "Overall Budget" ("") to null for Prisma
    const categoryId =
        data.categoryId === ""
            ? null
            : data.categoryId;

    const duplicateBudget =
        await prisma.budget.findFirst({
            where: {
                financeProfileId:
                    financeProfile.id,

                categoryId,

                startDate:
                    data.startDate,

                endDate:
                    data.endDate,

                NOT: {
                    id: budgetId,
                },
            },
        });

    if (duplicateBudget) {
        return {
            success: false,
            message:
                "A budget already exists for this category and date range.",
        };
    }

    await prisma.budget.update({
        where: {
            id: budgetId,
        },
        data: {
            categoryId,

            amount: data.amount,

            period: data.period,

            startDate:
                data.startDate,

            endDate:
                data.endDate,

            notes:
                data.notes || null,
        },
    });

    revalidatePath("/budgets");

    return {
        success: true,
        message:
            "Budget updated successfully.",
    };
}