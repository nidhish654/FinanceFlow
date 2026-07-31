import { GoalHistoryType } from "@prisma/client";

export interface GoalHistoryView {
    id: string;

    type: GoalHistoryType;

    amount: number;

    formattedAmount: string;

    note?: string;

    createdAt: Date;

    formattedDate: string;
}