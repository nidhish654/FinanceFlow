import { TransactionDto } from "@/features/transactions/types/transaction";
import { BudgetWithCategory } from "@/features/planning/budget/types/budget-query";
import {
    AnalyticsBudgetAnalysis,
    AnalyticsBudget,
    AnalyticsBudgetMonth,
    BudgetHealthStatus,
} from "../types/analytics-view";

interface BuildBudgetAnalysisParams {
    budgets: BudgetWithCategory[];
    transactions: TransactionDto[];
    currency: string;
}

function getHealthStatus(utilization: number): BudgetHealthStatus {
    if (utilization <= 70) return "Excellent";
    if (utilization <= 90) return "Good";
    if (utilization <= 100) return "Warning";
    return "Exceeded";
}

export function buildBudgetAnalysis({
    budgets,
    transactions,
    currency,
}: BuildBudgetAnalysisParams): AnalyticsBudgetAnalysis {
    // Process every budget based on its own specific lifecycle
    const analyticsBudgets: AnalyticsBudget[] = budgets.map((budget) => {
        const amount = Number(budget.amount);
        const budgetStart = new Date(budget.startDate);
        const budgetEnd = new Date(budget.endDate);

        // Find relevant expenses STRICTLY within the budget's own dates
        const expenses = transactions.filter((t) => {
            if (t.type !== "EXPENSE") return false;

            const tDate = new Date(t.transactionDate);
            if (tDate < budgetStart || tDate > budgetEnd) return false;

            if (budget.categoryId) {
                return (
                    t.categoryId === budget.categoryId ||
                    t.category?.parent?.id === budget.categoryId
                );
            }
            return true; // Overall budget
        });

        const spent = expenses.reduce((sum, t) => sum + t.amount, 0);
        const remaining = Math.max(amount - spent, 0);
        const utilization = amount > 0 ? (spent / amount) * 100 : 0;
        const isExceeded = spent > amount;
        const overBy = isExceeded ? spent - amount : 0;

        return {
            id: budget.id,
            name: budget.category?.name ?? "Overall Budget",
            categoryId: budget.categoryId,
            amount,
            spent,
            remaining,
            utilization,
            isExceeded,
            overBy,
            healthStatus: getHealthStatus(utilization),
            period: budget.period,
            startDate: budget.startDate,
            endDate: budget.endDate,
        };
    });

    const overspent = analyticsBudgets.filter((b) => b.isExceeded);
    const totalBudgeted = analyticsBudgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = analyticsBudgets.reduce((sum, b) => sum + b.spent, 0);
    const totalRemaining = Math.max(totalBudgeted - totalSpent, 0);
    const overallUtilization = totalBudgeted > 0 ? (totalSpent / totalBudgeted) * 100 : 0;

    const fmt = (v: number) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency,
            maximumFractionDigits: 0,
        }).format(v);

    const activeBudgets = analyticsBudgets.filter((b) => {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const start = new Date(new Date(b.startDate).getFullYear(), new Date(b.startDate).getMonth(), new Date(b.startDate).getDate());
        const end = new Date(new Date(b.endDate).getFullYear(), new Date(b.endDate).getMonth(), new Date(b.endDate).getDate());
        return start <= today && end >= today;
    });

    const insights: string[] = [];
    if (overspent.length > 0) {
        insights.push(`${overspent.length} out of ${analyticsBudgets.length} budgets were exceeded this period.`);
        insights.push(`Your most overspent category was ${overspent[0].name} by ${fmt(overspent[0].overBy)}.`);
    } else if (analyticsBudgets.length > 0) {
        insights.push(`Great job! You stayed within budget for all ${analyticsBudgets.length} tracked categories.`);
    }

    if (totalRemaining > 0) {
        const remPct = totalBudgeted > 0 ? (totalRemaining / totalBudgeted) * 100 : 0;
        insights.push(`You still have ${fmt(totalRemaining)} available across all budgets (${remPct.toFixed(0)}% remaining).`);
    }

    const underutilized = [...analyticsBudgets].sort((a, b) => a.utilization - b.utilization);
    if (underutilized.length > 0 && underutilized[0].utilization < 50) {
        const un = underutilized[0];
        const unRemPct = un.amount > 0 ? (un.remaining / un.amount) * 100 : 0;
        insights.push(`${un.name} still has ${fmt(un.remaining)} available (${unRemPct.toFixed(0)}% remaining).`);
    }

    return {
        summary: {
            totalBudgeted,
            totalSpent,
            totalRemaining,
            budgetCount: activeBudgets.length, // Now explicitly Active Budgets count
            exceededCount: overspent.length,
            overallUtilization,
            healthStatus: getHealthStatus(overallUtilization),
        },
        budgets: analyticsBudgets,
        overspent,
        monthly: [], // Deprecated, but keeping the empty array to not break types for now
        insights,
    };
}
