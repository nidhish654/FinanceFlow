import type { BudgetStatus } from "@prisma/client";

import { z } from "zod";

import { budgetSchema } from "../schemas/budget-schema";

import type { BudgetWithCategory } from "./budget-query";

/**
 * Form data used by React Hook Form.
 *
 * This represents the INPUT before Zod transforms
 * "" -> null for categoryId.
 */
export type BudgetFormData =
    z.input<typeof budgetSchema>;

/**
 * Calculated budget values.
 * These are NEVER stored in the database.
 */
export interface BudgetProgress {
    spent: number;
    remaining: number;
    percentage: number;
    isOverspent: boolean;
    transactionCount: number;
}

/**
 * Budget object consumed by the UI.
 */
export type BudgetWithProgress =
    BudgetWithCategory &
        BudgetProgress;

/**
 * Summary cards shown on the Budgets page.
 */
export interface BudgetSummary {
    totalBudget: number;
    totalSpent: number;
    totalRemaining: number;
    budgetCount: number;
    activeBudgetCount: number;
    archivedBudgetCount: number;
    overspentCount: number;
}

/**
 * Query filters.
 */
export interface BudgetFilters {
    financeProfileId: string;
    period?: BudgetStatus;
    status?: BudgetStatus;
    startDate?: Date;
    endDate?: Date;
}