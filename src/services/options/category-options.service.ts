import { CategoryType } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

interface GetCategoryOptionsParams {
    type?: CategoryType;
    excludeCategoryId?: string;
    includeArchived?: boolean;
}

export async function getCategoryOptions({
    type,
    excludeCategoryId,
    includeArchived = false,
}: GetCategoryOptionsParams = {}) {
    const financeProfile =
        await requireActiveFinanceProfile();

    const categories =
        await prisma.category.findMany({
            where: {
                financeProfileId:
                    financeProfile.id,

                ...(type && {
                    type,
                }),

                ...(excludeCategoryId && {
                    id: {
                        not: excludeCategoryId,
                    },
                }),

                ...(includeArchived
                    ? {}
                    : {
                        isArchived: false,
                    }),
            },

            orderBy: [
                {
                    displayOrder: "asc",
                },
                {
                    name: "asc",
                },
            ],
        });

    return categories.map((category) => ({
        value: category.id,
        label: category.name,
        type: category.type,
        group:
        category.type === "EXPENSE"
            ? "Expense Categories"
            : "Income Categories",
    }));
}