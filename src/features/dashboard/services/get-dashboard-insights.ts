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

            title:
                exceededBudgets.length === 1
                    ? `${exceededBudgets[0].categoryName} went over budget`
                    : "Multiple budgets exceeded",

            description:
                exceededBudgets.length === 1
                    ? `You've exceeded your ${exceededBudgets[0].categoryName} budget. Review your recent spending or consider increasing the budget if needed.`
                    : `${exceededBudgets.length} budgets have gone over their spending limits. Reviewing them now can help prevent further overspending.`,

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

            title:
                nearlyExceededBudgets.length === 1
                    ? `${nearlyExceededBudgets[0].categoryName} budget is almost full`
                    : "Spending is getting close",

            description:
                nearlyExceededBudgets.length === 1
                    ? `You've already used ${Math.round(
                        nearlyExceededBudgets[0].progress
                    )}% of your ${nearlyExceededBudgets[0].categoryName} budget. Keep an eye on upcoming expenses.`
                    : `${nearlyExceededBudgets.length} budgets have already crossed 80% of their limits. A little caution now can help you stay within budget.`,

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

            title:
                completedGoals.length === 1
                    ? "Goal completed 🎉"
                    : "Goals completed 🎉",

            description:
                completedGoals.length === 1
                    ? `You successfully achieved "${completedGoals[0].name}". Celebrate this milestone and start planning your next financial goal.`
                    : `Fantastic work! You've completed ${completedGoals.length} financial goals. Keep the momentum going.`,

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

            title:
                nearlyCompletedGoals.length === 1
                    ? "You're almost there"
                    : "Several goals are nearly complete",

            description:
                nearlyCompletedGoals.length === 1
                    ? `"${nearlyCompletedGoals[0].name}" is already ${Math.round(
                        nearlyCompletedGoals[0].progress
                    )}% complete. Just a little more to reach your target.`
                    : `${nearlyCompletedGoals.length} goals have crossed the 80% mark. A few more contributions could complete them soon.`,

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

            title:
                overdueGoals.length === 1
                    ? "A goal needs attention"
                    : "Some goals need attention",

            description:
                overdueGoals.length === 1
                    ? `"${overdueGoals[0].name}" has passed its target date. Consider extending the deadline or increasing your monthly savings.`
                    : `${overdueGoals.length} goals have passed their target dates. Reviewing your savings plans can help get them back on track.`,

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

            title:
                warningGoals.length === 1
                    ? "A deadline is approaching"
                    : "Goal deadlines are approaching",

            description:
                warningGoals.length === 1
                    ? `"${warningGoals[0].name}" is due soon. Adding a little extra this month could help you reach it on time.`
                    : `${warningGoals.length} goals have upcoming deadlines. Small additional contributions now can make a big difference.`,

            type: "warning",
        });
    }

    /* =========================================
     * Empty State
     * ========================================= */

    if (insights.length === 0) {
        insights.push({
            id: "healthy",

            title: "You're in great shape 🎉",

            description:
                "Your budgets are under control and your financial goals are progressing well. Keep up the great work!",

            type: "success",
        });
    }

    return insights;
}