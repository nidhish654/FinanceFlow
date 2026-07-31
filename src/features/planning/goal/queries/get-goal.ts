import { prisma } from "@/lib/prisma";

import type { GoalWithHistoryCount } from "../types/goal-query";

export async function getGoal(
    goalId: string,
    financeProfileId: string
): Promise<GoalWithHistoryCount | null> {
    return prisma.goal.findFirst({
        where: {
            id: goalId,
            financeProfileId,
        },

        include: {
            _count: {
                select: {
                    history: true,
                },
            },
        },
    });
}