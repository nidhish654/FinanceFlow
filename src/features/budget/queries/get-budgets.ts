import { BudgetStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

import type { BudgetWithCategory } from "../types/budget-query";

type GetBudgetsOptions = {
    financeProfileId: string;
    includeArchived?: boolean;
};

export async function getBudgets({
    financeProfileId,
    includeArchived = false,
}: GetBudgetsOptions): Promise<BudgetWithCategory[]> {
    return prisma.budget.findMany({
        where: {
            financeProfileId,
            ...(includeArchived
                ? {}
                : {
                    status: BudgetStatus.ACTIVE,
                }),
        },

        include: {
            category: {
                select: {
                    id: true,
                    name: true,
                    icon: true,
                    color: true,
                    parentCategoryId: true,

                    parent: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            },
        },

        orderBy: [
            {
                category: {
                    parentCategoryId: "asc",
                },
            },
            {
                category: {
                    name: "asc",
                },
            },
            {
                startDate: "desc",
            },
        ],
    });
}