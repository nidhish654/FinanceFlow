import { Decimal } from "@prisma/client/runtime/library";

import {
    calculateDeadlineState,
    calculateGoalProgress,
    calculateRemainingAmount,
    calculateRemainingDays,
    isGoalCompleted,
} from "./calculations";

import {
    formatGoalAmount,
    formatGoalDate,
    formatGoalProgress,
} from "./formatters";

interface BuildGoalPreviewParams {
    name: string;

    icon?: string;

    targetAmount: number | Decimal;

    savedAmount: number | Decimal;

    targetDate: Date | null;

    createdAt: Date;

    notes?: string;

    currency: string;

    locale?: string;
}

function toNumber(
    value: number | Decimal
): number {
    const number =
        typeof value === "number"
            ? value
            : value.toNumber();

    return Number.isFinite(number)
        ? number
        : 0;
}

export function buildGoalPreview({
    name,
    icon,
    targetAmount,
    savedAmount,
    targetDate,
    createdAt,
    notes,
    currency,
    locale = "en-IN",
}: BuildGoalPreviewParams) {
    const target =
        toNumber(targetAmount);

    const saved =
        toNumber(savedAmount);

    const calculatedProgress =
        calculateGoalProgress(
            saved,
            target
        );

    const progress =
        Number.isFinite(
            calculatedProgress
        )
            ? calculatedProgress
            : 0;

    const remainingAmount =
        calculateRemainingAmount(
            saved,
            target
        );

    const remainingDays =
        calculateRemainingDays(
            targetDate
        );

    const completed =
        isGoalCompleted(
            saved,
            target
        );

    const deadlineState =
        calculateDeadlineState({
            createdAt,
            targetDate,
            completed,
        });

    return {
        name,

        icon,

        notes,

        currency,

        archived: false,

        targetDate,

        formattedTargetDate:
            formatGoalDate(
                targetDate,
                locale
            ),

        targetAmount: target,

        formattedTargetAmount:
            formatGoalAmount(
                target,
                currency,
                locale
            ),

        savedAmount: saved,

        formattedSavedAmount:
            formatGoalAmount(
                saved,
                currency,
                locale
            ),

        remainingAmount,

        formattedRemainingAmount:
            formatGoalAmount(
                remainingAmount,
                currency,
                locale
            ),

        progress,

        formattedProgress:
            formatGoalProgress(
                progress
            ),

        remainingDays,

        completed,

        deadlineState,
    };
}