"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

interface DeleteCategoryInput {
    categoryId: string;
    replacementCategoryId?: string;
}

export async function deleteCategory({
    categoryId,
    replacementCategoryId,
}: DeleteCategoryInput) {
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
                include: {
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

        if (category._count.children > 0) {
            return {
                success: false,
                message:
                    "Delete child categories first.",
            };
        }

        if (category._count.budgets > 0) {
            return {
                success: false,
                message:
                    "This category is used in one or more budgets.",
            };
        }

        const isSubcategory = !!category.parentCategoryId;
        const actualReplacementId = isSubcategory ? category.parentCategoryId : replacementCategoryId;

        if (
            category._count.transactions >
                0 &&
            !actualReplacementId
        ) {
            return {
                success: false,
                message:
                    "A replacement category is required.",
            };
        }

        if (
            actualReplacementId ===
            category.id
        ) {
            return {
                success: false,
                message:
                    "Replacement category cannot be the same category.",
            };
        }

        await prisma.$transaction(
            async (tx) => {
                if (
                    category._count.transactions >
                    0
                ) {
                    const replacement =
                        await tx.category.findFirst(
                            {
                                where: {
                                    id: actualReplacementId!,
                                    financeProfileId:
                                        financeProfile.id,
                                    type: category.type,
                                    isArchived: false,
                                },
                            }
                        );

                    if (!replacement) {
                        throw new Error(
                            "Replacement category not found."
                        );
                    }

                    await tx.transaction.updateMany(
                        {
                            where: {
                                financeProfileId:
                                    financeProfile.id,
                                categoryId:
                                    category.id,
                            },
                            data: {
                                categoryId:
                                    replacement.id,
                            },
                        }
                    );
                }

                await tx.category.delete({
                    where: {
                        id: category.id,
                    },
                });
            }
        );

        revalidatePath("/categories");
        revalidatePath("/transactions");
        revalidatePath("/dashboard");

        return {
            success: true,
            message:
                "Category deleted successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Something went wrong while deleting the category.",
        };
    }
}