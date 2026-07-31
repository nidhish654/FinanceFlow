import { Decimal } from "@prisma/client/runtime/library";

import { GoalDeadlineState } from "../types/goal-view";

function toNumber(
    value: number | Decimal
): number {
    return typeof value === "number"
        ? value
        : value.toNumber();
}

/**
 * Returns the goal progress percentage (0–100+).
 */
export function calculateGoalProgress(
    savedAmount: number | Decimal,
    targetAmount: number | Decimal
): number {
    const saved = toNumber(savedAmount);
    const target = toNumber(targetAmount);

    if (target <= 0) {
        return 0;
    }

    return (saved / target) * 100;
}

/**
 * Returns the remaining amount needed to reach the goal.
 * Never returns a negative value.
 */
export function calculateRemainingAmount(
    savedAmount: number | Decimal,
    targetAmount: number | Decimal
): number {
    const saved = toNumber(savedAmount);
    const target = toNumber(targetAmount);

    return Math.max(
        target - saved,
        0
    );
}

/**
 * Returns true if the goal has reached its target.
 */
export function isGoalCompleted(
    savedAmount: number | Decimal,
    targetAmount: number | Decimal
): boolean {
    return (
        toNumber(savedAmount) >=
        toNumber(targetAmount)
    );
}

/**
 * Returns the number of days remaining.
 *
 * null = no target date
 * 0 = due today
 * negative = overdue
 */
export function calculateRemainingDays(
    targetDate: Date | null
): number | null {
    if (!targetDate) {
        return null;
    }

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const target = new Date(
        targetDate
    );

    target.setHours(
        0,
        0,
        0,
        0
    );

    const diff =
        target.getTime() -
        today.getTime();

    return Math.ceil(
        diff /
            (1000 *
                60 *
                60 *
                24)
    );
}

/**
 * Calculates the deadline state for a goal.
 *
 * Rules:
 * - Completed goals are always NORMAL.
 * - Overdue starts after the target date.
 * - Warning starts when either:
 *   - 14 days or fewer remain, OR
 *   - 80% of the goal duration has elapsed.
 */
export function calculateDeadlineState({
    createdAt,
    targetDate,
    completed,
}: {
    createdAt: Date;
    targetDate: Date | null;
    completed: boolean;
}): GoalDeadlineState {
    if (
        completed ||
        !targetDate
    ) {
        return GoalDeadlineState.NORMAL;
    }

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    const start = new Date(
        createdAt
    );

    start.setHours(
        0,
        0,
        0,
        0
    );

    const target =
        new Date(targetDate);

    target.setHours(
        0,
        0,
        0,
        0
    );

    if (
        today.getTime() >
        target.getTime()
    ) {
        return GoalDeadlineState.OVERDUE;
    }

    const totalDuration =
        Math.max(
            Math.ceil(
                (target.getTime() -
                    start.getTime()) /
                    (1000 *
                        60 *
                        60 *
                        24)
            ),
            1
        );

    const elapsed =
        Math.max(
            Math.ceil(
                (today.getTime() -
                    start.getTime()) /
                    (1000 *
                        60 *
                        60 *
                        24)
            ),
            0
        );

    const elapsedPercentage =
        (elapsed /
            totalDuration) *
        100;

    const remainingDays =
        calculateRemainingDays(
            targetDate
        );

    if (
        remainingDays !==
            null &&
        (remainingDays <=
            14 ||
            elapsedPercentage >=
                80)
    ) {
        return GoalDeadlineState.WARNING;
    }

    return GoalDeadlineState.NORMAL;
}