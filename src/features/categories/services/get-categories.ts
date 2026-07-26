"use server";

import { prisma } from "@/lib/prisma";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services";

export async function getCategories() {
    const financeProfile =
        await requireActiveFinanceProfile();

    return prisma.category.findMany({
        where: {
            financeProfileId: financeProfile.id,
        },

        orderBy: [
            {
                isArchived: "asc",
            },
            {
                type: "asc",
            },
            {
                displayOrder: "asc",
            },
            {
                name: "asc",
            },
        ],
    });
}