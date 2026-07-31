import { z } from "zod";

import type { GoalHistoryType } from "@prisma/client";

import { goalSchema } from "../schemas/goal-schema";

import type { GoalWithHistoryCount } from "./goal-query";

/**
 * Form data used by React Hook Form.
 *
 * Represents the INPUT before any Zod transforms.
 */
export type GoalFormData =
    z.input<typeof goalSchema>;

/**
 * Calculated goal values.
 * These are NEVER stored in the database.
 */
export interface GoalProgress {
    percentage: number;
    remainingAmount: number;
    isCompleted: boolean;
    historyCount: number;
}

/**
 * Goal object consumed by the UI.
 */
export type GoalWithProgress =
    GoalWithHistoryCount &
        GoalProgress;

/**
 * Summary cards shown on the Goals page.
 */
export interface GoalSummary {
    totalTargetAmount: number;
    totalSavedAmount: number;
    totalRemainingAmount: number;

    goalCount: number;

    activeGoalCount: number;
    completedGoalCount: number;
    archivedGoalCount: number;
}

/**
 * Query filters.
 */
export interface GoalFilters {
    financeProfileId: string;
    archived?: boolean;
    completed?: boolean;
}

/**
 * Payload for adding money.
 */
export interface AddMoneyInput {
    goalId: string;
    amount: number;
    note?: string;
}

/**
 * Payload for withdrawing money.
 */
export interface WithdrawMoneyInput {
    goalId: string;
    amount: number;
    note?: string;
}

/**
 * Goal history entry.
 */
export interface GoalHistoryItem {
    id: string;
    amount: number;
    type: GoalHistoryType;
    note: string | null;
    createdAt: Date;
}