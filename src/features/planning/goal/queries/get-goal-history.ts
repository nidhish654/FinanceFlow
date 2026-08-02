import { prisma } from "@/lib/prisma";

import type { GoalHistory } from "../types/goal-query";

type GetGoalHistoryOptions = {
    goalId: string;
    financeProfileId: string;
};

export async function getGoalHistory({
    goalId,
    financeProfileId,
}: GetGoalHistoryOptions): Promise<GoalHistory[]> {
    return prisma.goalHistory.findMany({
        where: {
            goalId,

            goal: {
                financeProfileId,
            },
        },

        orderBy: {
            createdAt: "desc",
        },
    });
}