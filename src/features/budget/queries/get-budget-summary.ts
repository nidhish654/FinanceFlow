import { BudgetStatus } from "@prisma/client";

import { getBudgets } from "./get-budgets";
import { getBudgetSpending } from "./get-budget-spending";

import { calculateBudgetProgress } from "../lib/calculations";

type GetBudgetSummaryParams = {
    financeProfileId: string;
};

export async function getBudgetSummary({
    financeProfileId,
}: GetBudgetSummaryParams) {
    const budgets = await getBudgets({
        financeProfileId,
    });

    let totalBudget = 0;
    let totalSpent = 0;
    let overspentCount = 0;

    for (const budget of budgets) {
        if (!budget.categoryId) {
            continue;
        }

        const spending = await getBudgetSpending({
            financeProfileId,
            categoryId: budget.categoryId,
            startDate: budget.startDate,
            endDate: budget.endDate,
        });

        const progress = calculateBudgetProgress(
            Number(budget.amount),
            spending.spent
        );

        totalBudget += Number(budget.amount);

        totalSpent += spending.spent;

        if (progress.isOverspent) {
            overspentCount++;
        }
    }

    return {
        totalBudget,

        totalSpent,

        totalRemaining:
            totalBudget - totalSpent,

        budgetCount: budgets.length,

        activeBudgetCount: budgets.filter(
            (budget) =>
                budget.status === BudgetStatus.ACTIVE
        ).length,

        archivedBudgetCount: budgets.filter(
            (budget) =>
                budget.status === BudgetStatus.ARCHIVED
        ).length,

        overspentCount,
    };
}