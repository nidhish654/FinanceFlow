"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    budgetSchema,
    type BudgetSchema,
} from "../schemas/budget-schema";

export async function createBudget(
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

    const data = parsed.data;

    // Convert "Overall Budget" ("") to null for Prisma
    const categoryId =
        data.categoryId === ""
            ? null
            : data.categoryId;

    const existingBudget =
        await prisma.budget.findFirst({
            where: {
                financeProfileId:
                    financeProfile.id,

                categoryId,

                startDate:
                    data.startDate,

                endDate:
                    data.endDate,
            },
        });

    if (existingBudget) {
        return {
            success: false,
            message:
                "A budget already exists for this category and date range.",
        };
    }

    await prisma.budget.create({
        data: {
            financeProfileId:
                financeProfile.id,

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
            "Budget created successfully.",
    };
}