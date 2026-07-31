import { prisma } from "@/lib/prisma";

import type { GoalWithHistoryCount } from "../types/goal-query";

type GetGoalsOptions = {
    financeProfileId: string;
    archived?: boolean;
};

export async function getGoals({
    financeProfileId,
    archived,
}: GetGoalsOptions): Promise<GoalWithHistoryCount[]> {
    return prisma.goal.findMany({
        where: {
            financeProfileId,

            ...(archived !== undefined && {
                archived,
            }),
        },

        include: {
            _count: {
                select: {
                    history: true,
                },
            },
        },

        orderBy: [
            {
                archived: "asc",
            },
            {
                displayOrder: "asc",
            },
            {
                createdAt: "asc",
            },
        ],
    });
}