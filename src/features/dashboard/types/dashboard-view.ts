import { AccountDto } from "@/features/accounts/types/account";

import { BudgetView } from "@/features/planning/budget/types/budget-view";
import { GoalView } from "@/features/planning/goal/types/goal-view";

import { TransactionDto } from "@/features/transactions/types/transaction";

/* =========================================
 * Dashboard View
 * ========================================= */

export interface DashboardView {
    currency: string;

    summary: DashboardSummary;

    charts: DashboardCharts;

    widgets: DashboardWidgets;

    insights: DashboardInsight[];
}

/* =========================================
 * Summary Cards
 * ========================================= */

export interface DashboardSummary {
    totalBalance: number;

    formattedTotalBalance: string;

    monthlyIncome: number;

    formattedMonthlyIncome: string;

    monthlyExpense: number;

    formattedMonthlyExpense: string;

    netCashFlow: number;

    formattedNetCashFlow: string;

    totalSavings: number;

    formattedTotalSavings: string;
}

/* =========================================
 * Charts
 * ========================================= */

export interface DashboardCharts {
    expenseByCategory: CategoryChartPoint[];

    incomeVsExpense: IncomeExpenseChartPoint[];

    cashFlowTrend: CashFlowChartPoint[];
}

export interface CategoryChartPoint {
    categoryId: string;

    categoryName: string;

    color: string;

    amount: number;
}

export interface IncomeExpenseChartPoint {
    month: string;

    income: number;

    expense: number;
}

export interface CashFlowChartPoint {
    month: string;

    balance: number;
}

/* =========================================
 * Widgets
 * ========================================= */

export interface DashboardWidgets {
    recentTransactions: TransactionDto[];

    budgets: BudgetView[];

    goals: GoalView[];

    accounts: AccountDto[];
}

/* =========================================
 * Smart Insights
 * ========================================= */

export type DashboardInsightType =
    | "info"
    | "success"
    | "warning"
    | "error";

export interface DashboardInsight {
    id: string;

    title: string;

    description: string;

    type: DashboardInsightType;
}