import {
    formatGoalAmount,
} from "../lib/formatters";

import type {
    GoalHistory,
} from "../types/goal-query";

import type {
    GoalHistoryView,
} from "../types/goal-history-view";

interface GetGoalHistoryViewsParams {
    history: GoalHistory[];

    currency: string;

    locale?: string;
}

export function getGoalHistoryViews({
    history,
    currency,
    locale = "en-IN",
}: GetGoalHistoryViewsParams): GoalHistoryView[] {
    return history.map((entry) => ({
        id: entry.id,

        type: entry.type,

        amount: Number(entry.amount),

        formattedAmount: formatGoalAmount(
            Number(entry.amount),
            currency,
            locale
        ),

        note: entry.note ?? undefined,

        createdAt: entry.createdAt,

        formattedDate: new Intl.DateTimeFormat(
            locale,
            {
                dateStyle: "medium",
                timeStyle: "short",
            }
        ).format(entry.createdAt),
    }));
}