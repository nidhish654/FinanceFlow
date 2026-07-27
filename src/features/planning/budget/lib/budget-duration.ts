import { BudgetPeriod } from "@prisma/client";

export interface BudgetDurationResult {
    durationDays: number;

    isTypical: boolean;

    title: string;

    message?: string;
}

export function calculateBudgetDuration(
    startDate?: Date,
    endDate?: Date,
    period?: BudgetPeriod
): BudgetDurationResult | null {
    if (!startDate || !endDate || !period) {
        return null;
    }

    const millisecondsPerDay =
        1000 * 60 * 60 * 24;

    const durationDays =
        Math.floor(
            (endDate.getTime() -
                startDate.getTime()) /
                millisecondsPerDay
        ) + 1;

    if (durationDays <= 0) {
        return {
            durationDays: 0,
            isTypical: false,
            title: "Invalid Date Range",
            message:
                "End date must be after the start date.",
        };
    }

    switch (period) {
        case BudgetPeriod.WEEKLY:
            if (durationDays === 7) {
                return {
                    durationDays,
                    isTypical: true,
                    title: "Typical Weekly Budget",
                };
            }

            return {
                durationDays,
                isTypical: false,
                title: "Weekly Budget",
                message: `Typical weekly budgets last 7 days.

Your selected duration is ${durationDays} days.

You can still continue.`,
            };

        case BudgetPeriod.MONTHLY:
            if (
                durationDays >= 28 &&
                durationDays <= 31
            ) {
                return {
                    durationDays,
                    isTypical: true,
                    title: "Typical Monthly Budget",
                };
            }

            return {
                durationDays,
                isTypical: false,
                title: "Monthly Budget",
                message: `Typical monthly budgets usually last between 28 and 31 days.

Your selected duration is ${durationDays} days.

You can still continue.`,
            };

        case BudgetPeriod.YEARLY:
            if (
                durationDays === 365 ||
                durationDays === 366
            ) {
                return {
                    durationDays,
                    isTypical: true,
                    title: "Typical Yearly Budget",
                };
            }

            return {
                durationDays,
                isTypical: false,
                title: "Yearly Budget",
                message: `Typical yearly budgets usually last 365 or 366 days.

Your selected duration is ${durationDays} days.

You can still continue.`,
            };

        case BudgetPeriod.CUSTOM:
            return {
                durationDays,
                isTypical: true,
                title: "Custom Budget",
            };

        default:
            return null;
    }
}