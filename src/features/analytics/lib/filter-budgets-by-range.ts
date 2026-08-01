import { BudgetWithCategory } from "@/features/planning/budget/types/budget-query";

/**
 * Returns budgets whose active period overlaps the given analytics range.
 * Uses interval overlap: budget.startDate <= rangeEnd && budget.endDate >= rangeStart
 */
export function filterBudgetsByRange(
    budgets: BudgetWithCategory[],
    rangeStart: Date,
    rangeEnd: Date
): BudgetWithCategory[] {
    return budgets.filter(
        (b) =>
            new Date(b.startDate) <= rangeEnd &&
            new Date(b.endDate) >= rangeStart
    );
}

/**
 * Returns the effective date window = intersection of budget period and analytics range.
 */
export function getBudgetEffectiveDates(
    budget: BudgetWithCategory,
    rangeStart: Date,
    rangeEnd: Date
): { effectiveStart: Date; effectiveEnd: Date } {
    const effectiveStart = new Date(
        Math.max(new Date(budget.startDate).getTime(), rangeStart.getTime())
    );
    const effectiveEnd = new Date(
        Math.min(new Date(budget.endDate).getTime(), rangeEnd.getTime())
    );
    return { effectiveStart, effectiveEnd };
}
