import { prisma } from "@/lib/prisma";

export async function getBudget(
    budgetId: string,
    financeProfileId: string
) {
    return prisma.budget.findFirst({
        where: {
            id: budgetId,
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
                },
            },
        },
    });
}