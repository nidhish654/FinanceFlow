import { prisma } from "@/lib/prisma";

import type { GoalHistoryView } from "../types/goal-query";

type GetGoalHistoryOptions = {
    goalId: string;
    financeProfileId: string;
};

export async function getGoalHistory({
    goalId,
    financeProfileId,
}: GetGoalHistoryOptions): Promise<GoalHistoryView[]> {
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