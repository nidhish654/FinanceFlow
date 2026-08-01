import { BudgetPeriod } from "@prisma/client";

import { BudgetView } from "../types/budget-view";

import { calculateBudgetDuration } from "./budget-duration";

interface BuildBudgetPreviewParams {
    categoryId: string | null;

    categoryName: string;

    amount?: number;

    currency: string;

    locale?: string;

    period: BudgetPeriod;

    startDate: Date;

    endDate: Date;

    notes?: string;

    isExceeded?: boolean;

    overBudgetAmount: number;
}

export function buildBudgetPreview({
    categoryId,
    categoryName,
    amount = 0,
    currency,
    locale = "en-IN",
    period,
    startDate,
    endDate,
    notes,
    isExceeded = false,
    overBudgetAmount,
}: BuildBudgetPreviewParams): BudgetView {
    const duration = calculateBudgetDuration(
        startDate,
        endDate,
        period
    );

    const spentAmount = 0;

    const remainingAmount = Math.max(
        amount - spentAmount,
        0
    );

    const progress =
        amount > 0
            ? Math.min(
                (spentAmount / amount) * 100,
                100
            )
            : 0;

    return {
        id: "",

        categoryId,

        notes: notes ?? null,

        archived: false,

        categoryName,

        amount,

        currency,

        locale,

        period,

        startDate,

        endDate,

        durationDays:
            duration?.durationDays ?? 0,

        spentAmount,

        remainingAmount,

        progress,

        isTypical:
            duration?.isTypical ?? false,

        title:
            duration?.title ??
            "Invalid Duration",

        message:
            duration?.message,

        isExceeded,

        overBudgetAmount,
    };
}