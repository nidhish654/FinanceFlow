import { BudgetPeriod } from "@prisma/client";

export interface BudgetView {
    id: string;

    categoryId: string | null;

    notes: string | null;

    archived: boolean;

    categoryName: string;

    amount: number;

    currency: string;

    locale?: string;

    period: BudgetPeriod;

    startDate: Date;

    endDate: Date;

    durationDays: number;

    spentAmount: number;

    progress: number;

    remainingAmount: number;

    isTypical: boolean;

    title: string;

    message?: string;
}