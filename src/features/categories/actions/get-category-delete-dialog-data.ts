"use server";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

import { getCategoryOptions } from "@/services/options/category-options.service";

export async function getCategoryDeleteDialogData(
    categoryId: string
) {
    try {
        const financeProfile =
            await requireActiveFinanceProfile();

        const category =
            await prisma.category.findFirst({
                where: {
                    id: categoryId,
                    financeProfileId:
                        financeProfile.id,
                },
                select: {
                    id: true,
                    name: true,
                    type: true,
                    _count: {
                        select: {
                            transactions: true,
                            budgets: true,
                            children: true,
                        },
                    },
                },
            });

        if (!category) {
            return {
                success: false,
                message:
                    "Category not found.",
            };
        }

        const replacementCategories =
            category._count.transactions > 0
                ? await getCategoryOptions({
                    type: category.type,
                    excludeCategoryId:
                        category.id,
                })
                : [];

        return {
            success: true,
            data: {
                category: {
                    id: category.id,
                    name: category.name,
                    type: category.type,
                },
                transactionCount:
                    category._count.transactions,

                budgetCount:
                    category._count.budgets,

                childCount:
                    category._count.children,

                replacementCategories,
            },
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                "Failed to load delete information.",
        };
    }
}