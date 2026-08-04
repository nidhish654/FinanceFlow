"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import {
    categorySchema,
    CategoryFormInput,
} from "../schemas/category.schema";

export async function createCategory(
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

    const data = parsed.data;

    const existing =
        await prisma.category.findFirst({
            where: {
                financeProfileId:
                    financeProfile.id,

                type: data.type,

                name: data.name,

                parentCategoryId: data.parentCategoryId || null,
            },
        });

    if (existing) {
        return {
            success: false,
            message:
                "A category with this name already exists.",
        };
    }

    const maxDisplayOrder =
        await prisma.category.aggregate({
            where: {
                financeProfileId:
                    financeProfile.id,

                type: data.type,
            },

            _max: {
                displayOrder: true,
            },
        });

    let categoryType = data.type;

    if (data.parentCategoryId) {
        const parent = await prisma.category.findUnique({
            where: { id: data.parentCategoryId }
        });
        if (!parent) {
            return {
                success: false,
                message: "Parent category not found."
            };
        }
        categoryType = parent.type;
    }

    await prisma.category.create({
        data: {
            financeProfileId:
                financeProfile.id,

            name: data.name,

            description:
                data.description || null,

            type: categoryType,

            parentCategoryId: data.parentCategoryId || null,

            icon:
                data.icon || null,

            color:
                data.color || null,

            displayOrder:
                (maxDisplayOrder._max
                    .displayOrder ?? 0) + 1,

            isDefault: false,
        },
    });

    revalidatePath("/categories");

    return {
        success: true,
        message:
            "Category created successfully.",
    };
}