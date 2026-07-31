export enum GoalDeadlineState {
    NORMAL = "NORMAL",

    WARNING = "WARNING",

    OVERDUE = "OVERDUE",
}

export interface GoalView {
    id: string;

    name: string;

    icon?: string;

    notes?: string;

    archived: boolean;

    completed: boolean;

    historyCount: number;

    targetDate: Date | null;

    formattedTargetDate: string | null;

    targetAmount: number;

    formattedTargetAmount: string;

    savedAmount: number;

    formattedSavedAmount: string;

    remainingAmount: number;

    formattedRemainingAmount: string;

    currency: string;

    progress: number;

    formattedProgress: string;

    remainingDays: number | null;

    /**
     * Deadline state used by the UI.
     *
     * NORMAL   → Plenty of time remaining
     * WARNING  → ≤14 days left OR ≥80% duration elapsed
     * OVERDUE  → Target date has passed and goal is not completed
     */
    deadlineState: GoalDeadlineState;

    createdAt: Date;

    updatedAt: Date;
}