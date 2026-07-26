"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function restoreCategory(id: string) {
    try {
        const financeProfile =
            await requireActiveFinanceProfile();

        const category =
            await prisma.category.findFirst({
                where: {
                    id,
                    financeProfileId:
                        financeProfile.id,
                },
            });

        if (!category) {
            return {
                success: false,
                message: "Category not found.",
            };
        }

        if (!category.isArchived) {
            return {
                success: false,
                message:
                    "Category is already active.",
            };
        }

        await prisma.category.update({
            where: {
                id,
            },
            data: {
                isArchived: false,
            },
        });

        revalidatePath("/categories");

        return {
            success: true,
            message:
                "Category restored successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                "Something went wrong while restoring the category.",
        };
    }
}