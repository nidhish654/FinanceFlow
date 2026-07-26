export type BudgetProgress = {
    spent: number;
    remaining: number;
    percentage: number;
    isOverspent: boolean;
};

export function calculateBudgetProgress(
    budgetAmount: number,
    spent: number
): BudgetProgress {
    const remaining = budgetAmount - spent;

    const percentage =
        budgetAmount <= 0
            ? 0
            : Math.min(
                (spent / budgetAmount) * 100,
                100
            );

    return {
        spent,

        remaining,

        percentage,

        isOverspent: spent > budgetAmount,
    };
}

export function getBudgetStatus(
    percentage: number,
    isOverspent: boolean
) {
    if (isOverspent) {
        return "overspent";
    }

    if (percentage >= 80) {
        return "warning";
    }

    return "healthy";
}