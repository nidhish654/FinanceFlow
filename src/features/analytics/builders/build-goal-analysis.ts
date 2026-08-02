import { GoalWithHistoryCount } from "@/features/planning/goal/types/goal-query";
import {
    AnalyticsGoalAnalysis,
    AnalyticsGoal,
    GoalHealthStatus,
} from "../types/analytics-view";

interface BuildGoalAnalysisParams {
    goals: GoalWithHistoryCount[];
    currency: string;
}

export function buildGoalAnalysis({
    goals,
    currency,
}: BuildGoalAnalysisParams): AnalyticsGoalAnalysis {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const analyticsGoals: AnalyticsGoal[] = goals.map((goal) => {
        const targetAmount = Number(goal.targetAmount);
        const savedAmount = Number(goal.savedAmount);
        const remainingAmount = Math.max(targetAmount - savedAmount, 0);
        const completionPercentage = targetAmount > 0 ? (savedAmount / targetAmount) * 100 : 0;
        
        let daysRemaining: number | null = null;
        let isOverdue = false;

        if (goal.targetDate) {
            const target = new Date(goal.targetDate);
            target.setHours(0, 0, 0, 0);
            const diffTime = target.getTime() - today.getTime();
            daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (daysRemaining < 0 && !goal.completedAt) {
                isOverdue = true;
            }
        }

        let healthStatus: GoalHealthStatus = "Good";
        if (goal.completedAt) {
            healthStatus = "Excellent";
        } else if (isOverdue) {
            healthStatus = "Critical";
        } else if (completionPercentage >= 90) {
            healthStatus = "Excellent";
        } else if (daysRemaining !== null && daysRemaining <= 7 && completionPercentage < 50) {
            healthStatus = "Critical";
        } else if (daysRemaining !== null && daysRemaining <= 14 && completionPercentage < 80) {
            healthStatus = "Needs Attention";
        }

        return {
            id: goal.id,
            name: goal.name,
            icon: goal.icon ?? null,
            targetAmount,
            savedAmount,
            remainingAmount,
            completionPercentage,
            isCompleted: !!goal.completedAt,
            isOverdue,
            targetDate: goal.targetDate ? new Date(goal.targetDate) : null,
            daysRemaining,
            healthStatus,
        };
    });

    const activeGoalsCount = analyticsGoals.filter(g => !g.isCompleted).length;
    const completedGoalsCount = analyticsGoals.filter(g => g.isCompleted).length;
    const totalTarget = analyticsGoals.reduce((sum, g) => sum + g.targetAmount, 0);
    const totalSaved = analyticsGoals.reduce((sum, g) => sum + g.savedAmount, 0);
    const totalRemaining = Math.max(totalTarget - totalSaved, 0);
    const overallCompletion = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

    let overallHealth: GoalHealthStatus = "Good";
    const criticalCount = analyticsGoals.filter(g => g.healthStatus === "Critical").length;
    const needsAttentionCount = analyticsGoals.filter(g => g.healthStatus === "Needs Attention").length;
    
    if (criticalCount > 0) {
        overallHealth = "Critical";
    } else if (needsAttentionCount > 0) {
        overallHealth = "Needs Attention";
    } else if (overallCompletion >= 80 || (completedGoalsCount > 0 && activeGoalsCount === 0)) {
        overallHealth = "Excellent";
    }

    const fmt = (v: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(v);

    const insights: string[] = [];
    if (completedGoalsCount > 0) {
        insights.push(`You have completed ${completedGoalsCount} out of ${analyticsGoals.length} goals.`);
    }
    
    const overdueGoals = analyticsGoals.filter(g => g.isOverdue);
    if (overdueGoals.length > 0) {
        insights.push(`${overdueGoals[0].name} is overdue by ${Math.abs(overdueGoals[0].daysRemaining!)} days.`);
    }

    const almostDone = analyticsGoals.filter(g => !g.isCompleted && g.completionPercentage >= 90);
    if (almostDone.length > 0) {
        const top = almostDone[0];
        insights.push(`${top.name} is ${top.completionPercentage.toFixed(0)}% complete.`);
        insights.push(`Only ${fmt(top.remainingAmount)} remains to complete ${top.name}.`);
    }

    if (totalSaved > 0) {
        insights.push(`You have saved ${fmt(totalSaved)} across all goals.`);
    }

    if (activeGoalsCount > 0) {
        insights.push(`${activeGoalsCount} goal${activeGoalsCount > 1 ? 's are' : ' is'} still in progress.`);
    }

    // Priorities: Overdue -> Almost Completed (>90) -> Normal Active -> Completed
    const getPriorityRank = (g: AnalyticsGoal) => {
        if (g.isOverdue) return 1;
        if (!g.isCompleted && g.completionPercentage >= 90) return 2;
        if (!g.isCompleted) return 3;
        return 4;
    };

    const sortedGoals = [...analyticsGoals].sort((a, b) => {
        const rankA = getPriorityRank(a);
        const rankB = getPriorityRank(b);
        if (rankA !== rankB) return rankA - rankB;
        return b.completionPercentage - a.completionPercentage;
    });

    const needsAttention = sortedGoals.filter(g => !g.isCompleted && (g.healthStatus === "Critical" || g.healthStatus === "Needs Attention" || g.isOverdue));

    return {
        summary: {
            totalGoals: analyticsGoals.length,
            activeGoals: activeGoalsCount,
            completedGoals: completedGoalsCount,
            totalTarget,
            totalSaved,
            totalRemaining,
            completionPercentage: overallCompletion,
            healthStatus: overallHealth,
        },
        goals: sortedGoals,
        needsAttention,
        insights,
    };
}
