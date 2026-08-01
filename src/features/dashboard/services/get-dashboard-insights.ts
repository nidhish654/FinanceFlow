import { DashboardInsight } from "../types/dashboard-view";

import { BudgetView } from "@/features/planning/budget/types/budget-view";

import {
    GoalDeadlineState,
    GoalView,
} from "@/features/planning/goal/types/goal-view";

interface GetDashboardInsightsParams {
    budgets: BudgetView[];

    goals: GoalView[];
}

export function getDashboardInsights({
    budgets,
    goals,
}: GetDashboardInsightsParams): DashboardInsight[] {
    const insights: DashboardInsight[] = [];

    /* =========================================
     * Budget Insights
     * ========================================= */

    const exceededBudgets =
        budgets.filter(
            (budget) => budget.isExceeded
        );

    if (exceededBudgets.length > 0) {
        insights.push({
            id: "budget-exceeded",

            title: "Budget Exceeded",

            description:
                exceededBudgets.length === 1
                    ? `You've exceeded your "${exceededBudgets[0].categoryName}" budget.`
                    : `You've exceeded ${exceededBudgets.length} budgets.`,

            type: "error",
        });
    }

    const nearlyExceededBudgets =
        budgets.filter(
            (budget) =>
                !budget.isExceeded &&
                budget.progress >= 80
        );

    if (nearlyExceededBudgets.length > 0) {
        insights.push({
            id: "budget-warning",

            title: "Budget Alert",

            description:
                nearlyExceededBudgets.length === 1
                    ? `"${nearlyExceededBudgets[0].categoryName}" budget is over 80% used.`
                    : `${nearlyExceededBudgets.length} budgets are over 80% utilized.`,

            type: "warning",
        });
    }

    /* =========================================
     * Goal Insights
     * ========================================= */

    const completedGoals =
        goals.filter(
            (goal) => goal.completed
        );

    if (completedGoals.length > 0) {
        insights.push({
            id: "goal-completed",

            title: "Goals Achieved",

            description:
                completedGoals.length === 1
                    ? `Congratulations! You've completed "${completedGoals[0].name}".`
                    : `Congratulations! You've completed ${completedGoals.length} goals.`,

            type: "success",
        });
    }

    const nearlyCompletedGoals =
        goals.filter(
            (goal) =>
                !goal.completed &&
                goal.progress >= 80
        );

    if (nearlyCompletedGoals.length > 0) {
        insights.push({
            id: "goal-progress",

            title: "Almost There",

            description:
                nearlyCompletedGoals.length === 1
                    ? `"${nearlyCompletedGoals[0].name}" is over 80% complete.`
                    : `${nearlyCompletedGoals.length} goals are over 80% complete.`,

            type: "info",
        });
    }

    const overdueGoals =
        goals.filter(
            (goal) =>
                !goal.completed &&
                goal.deadlineState ===
                    GoalDeadlineState.OVERDUE
        );

    if (overdueGoals.length > 0) {
        insights.push({
            id: "goal-overdue",

            title: "Goal Deadline Missed",

            description:
                overdueGoals.length === 1
                    ? `"${overdueGoals[0].name}" has passed its target date.`
                    : `${overdueGoals.length} goals have passed their target dates.`,

            type: "error",
        });
    }

    const warningGoals =
        goals.filter(
            (goal) =>
                !goal.completed &&
                goal.deadlineState ===
                    GoalDeadlineState.WARNING
        );

    if (warningGoals.length > 0) {
        insights.push({
            id: "goal-warning",

            title: "Goal Deadlines Approaching",

            description:
                warningGoals.length === 1
                    ? `"${warningGoals[0].name}" is approaching its target date.`
                    : `${warningGoals.length} goals are approaching their target dates.`,

            type: "warning",
        });
    }

    /* =========================================
     * Empty State
     * ========================================= */

    if (insights.length === 0) {
        insights.push({
            id: "healthy",

            title: "Everything Looks Great",

            description:
                "You're staying on top of your budgets and goals. Keep up the great work!",

            type: "success",
        });
    }

    return insights;
}