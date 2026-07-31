"use server";

import { requireActiveFinanceProfile } from "@/features/finance-profile/services/active-finance-profile.service";

import { getGoalHistory } from "../queries/get-goal-history";
import { getGoalHistoryViews } from "../services/get-goal-history-views";

import type { GoalHistoryView } from "../types/goal-history-view";

interface GetGoalHistoryResult {
    success: boolean;

    history?: GoalHistoryView[];

    message?: string;
}

export async function getGoalHistoryAction(
    goalId: string
): Promise<GetGoalHistoryResult> {
    try {
        const financeProfile =
            await requireActiveFinanceProfile();

        const history =
            await getGoalHistory({
                goalId,
                financeProfileId:
                    financeProfile.id,
            });

        return {
            success: true,
            history: getGoalHistoryViews({
                history,
                currency: financeProfile.baseCurrency,
            }),
        };
    } catch (error) {
        console.error(
            "Failed to load goal history:",
            error
        );

        return {
            success: false,
            message:
                "Failed to load goal history.",
        };
    }
}