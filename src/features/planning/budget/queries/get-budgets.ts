    import { prisma } from "@/lib/prisma";

    import type { BudgetWithCategory } from "../types/budget-query";

    type GetBudgetsOptions = {
        financeProfileId: string;
    };

    export async function getBudgets({
        financeProfileId,
    }: GetBudgetsOptions): Promise<BudgetWithCategory[]> {
        return prisma.budget.findMany({
            where: {
                financeProfileId,
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
                    status: "asc",
                },
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