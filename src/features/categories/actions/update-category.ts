"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    categorySchema,
    CategoryFormInput,
} from "../schemas/category.schema";

export async function updateCategory(
    id: string,
    values: CategoryFormInput
) {
    const parsed =
        categorySchema.safeParse(values);

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

    const existing =
        await prisma.category.findFirst({
            where: {
                id,
                financeProfileId:
                    financeProfile.id,
            },
        });

    if (!existing) {
        return {
            success: false,
            message: "Category not found.",
        };
    }

    const duplicate =
        await prisma.category.findFirst({
            where: {
                financeProfileId:
                    financeProfile.id,

                type: parsed.data.type,

                name: parsed.data.name,

                NOT: {
                    id,
                },
            },
        });

    if (duplicate) {
        return {
            success: false,
            message:
                "A category with this name already exists.",
        };
    }

    await prisma.category.update({
        where: {
            id,
        },
        data: {
            name: parsed.data.name,

            description:
                parsed.data.description ||
                null,

            type: parsed.data.type,

            icon:
                parsed.data.icon || null,

            color:
                parsed.data.color || null,
        },
    });

    revalidatePath("/categories");

    return {
        success: true,
        message:
            "Category updated successfully.",
    };
}