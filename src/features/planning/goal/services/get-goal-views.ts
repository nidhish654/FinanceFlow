import { GoalView } from "../types/goal-view";
import { GoalWithHistoryCount } from "../types/goal-query";

import { buildGoalPreview } from "../lib/goal-preview";

interface GetGoalViewsParams {
    goals: GoalWithHistoryCount[];

    currency: string;

    locale?: string;
}

export function getGoalViews({
    goals,
    currency,
    locale = "en-IN",
}: GetGoalViewsParams): GoalView[] {
    return goals.map((goal) => {
        const preview = buildGoalPreview({
            name: goal.name,

            icon: goal.icon ?? undefined,

            targetAmount: goal.targetAmount,

            savedAmount: goal.savedAmount,

            targetDate: goal.targetDate,

            createdAt: goal.createdAt,

            notes: goal.notes ?? undefined,

            currency,

            locale,
        });

        return {
            id: goal.id,

            ...preview,

            archived: goal.archived,

            historyCount: goal._count.history,

            createdAt: goal.createdAt,

            updatedAt: goal.updatedAt,

            currency,
        };
    });
}