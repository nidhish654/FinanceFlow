import { TransactionDto } from "@/features/transactions/types/transaction";

export const ANALYTICS_RANGES = [
    "3M",
    "6M",
    "YTD",
    "12M",
] as const;

export type AnalyticsRange =
    (typeof ANALYTICS_RANGES)[number];

export const ANALYTICS_TABS = [
    "overview",
    "expenses",
    "income",
    "cash-flow",
    "accounts",
    "budgets",
    "goals",
    "merchants",
] as const;

export type AnalyticsTab =
    (typeof ANALYTICS_TABS)[number];

export interface AnalyticsSummary {
    income: number;
    expense: number;
    netCashFlow: number;
    savingsRate: number | null;
    incomeChange: number | null;
    expenseChange: number | null;
}

export interface AnalyticsMonthlyPoint {
    month: string;
    income: number;
    expense: number;
    netCashFlow: number;
}

export interface AnalyticsCategoryPoint {
    id: string;
    name: string;
    amount: number;
}

export interface AnalyticsMerchantPoint {
    name: string;
    amount: number;
    transactionCount: number;
}

export interface AnalyticsExpensePeriod {
    id: string;
    label: string;
    income: number;
    expense: number;
    netCashFlow: number;
    categories: AnalyticsCategoryPoint[];
}

export interface AnalyticsIncomePeriod {
    id: string;

    label: string;

    income: number;

    expense: number;

    netCashFlow: number;

    sources: AnalyticsCategoryPoint[];
}

export interface AnalyticsWeekdayPoint {
    day: string;
    amount: number;
}

export interface AnalyticsExpenseSummary {
    totalExpense: number;

    averageMonthlyExpense: number;

    highestCategory: AnalyticsCategoryPoint | null;

    highestMonth: AnalyticsExpensePeriod | null;
}

export interface AnalyticsExpenseAnalysis {
    summary: AnalyticsExpenseSummary;

    categories: AnalyticsCategoryPoint[];

    monthly: AnalyticsExpensePeriod[];

    weekly: AnalyticsExpensePeriod[];

    weekdaySpending: AnalyticsWeekdayPoint[];

    largestTransactions: TransactionDto[];

    insights: string[];
}

export interface AnalyticsView {
    range: AnalyticsRange;

    currency: string;

    summary: AnalyticsSummary;

    monthlyCashFlow: AnalyticsMonthlyPoint[];

    topCategories: AnalyticsCategoryPoint[];

    topMerchants: AnalyticsMerchantPoint[];

    accountAnalysis: AnalyticsAccountAnalysis;

    budgetAnalysis: AnalyticsBudgetAnalysis;

    expenseAnalysis: AnalyticsExpenseAnalysis;

    incomeAnalysis: AnalyticsIncomeAnalysis;

    cashFlowAnalysis: AnalyticsCashFlowAnalysis;

    // financialHealth:
    //     AnalyticsFinancialHealth;
}

export interface AnalyticsIncomeSummary {
    totalIncome: number;

    averageMonthlyIncome: number;

    highestSource: AnalyticsCategoryPoint | null;

    highestMonth: AnalyticsIncomePeriod | null;
}

export interface AnalyticsIncomeAnalysis {
    summary: AnalyticsIncomeSummary;

    sources: AnalyticsCategoryPoint[];

    monthly: AnalyticsIncomePeriod[];

    quarterly: AnalyticsIncomePeriod[];

    yearly: AnalyticsIncomePeriod[];

    largestTransactions: TransactionDto[];

    insights: string[];
}

export interface AnalyticsCashFlowSummary {
    openingBalance: number;

    closingBalance: number;

    netCashFlow: number;

    averageMonthlyCashFlow: number;

    highestInflowMonth: AnalyticsCashFlowPeriod | null;

    highestOutflowMonth: AnalyticsCashFlowPeriod | null;
}

export interface AnalyticsCashFlowPeriod {
    id: string;

    label: string;

    openingBalance: number;

    income: number;

    expense: number;

    closingBalance: number;

    netCashFlow: number;
}

export interface AnalyticsCashFlowAnalysis {
    summary: AnalyticsCashFlowSummary;

    monthly: AnalyticsCashFlowPeriod[];

    largestInflows: TransactionDto[];

    largestOutflows: TransactionDto[];

    insights: string[];
}

export interface AnalyticsFinancialHealth {

    score: number;

    grade: "Excellent"
        | "Good"
        | "Fair"
        | "Poor";

    reasons: string[];
}

export interface AnalyticsAccountSummary {
    totalBalance: number;
    largestAccount: { id: string; name: string; balance: number } | null;
    numberOfAccounts: number;
    averageBalance: number;
}

export interface AnalyticsAccountPeriod {
    id: string;
    name: string;
    openingBalance: number;
    income: number;
    expense: number;
    closingBalance: number;
}

export interface AnalyticsAccountGrowth {
    date: string;
    [accountId: string]: number | string;
}

export interface AnalyticsTransfer {
    sourceAccountId: string;
    sourceAccountName: string;
    destinationAccountId: string;
    destinationAccountName: string;
    amount: number;
    count: number;
}

export interface AnalyticsAccountUsage {
    id: string;
    name: string;
    balance: number;
    inflow: number;
    outflow: number;
    transactionCount: number;
}

export interface AnalyticsAccountDistribution {
    id: string;
    name: string;
    balance: number;
    percentage: number;
}

export interface AnalyticsAccountAnalysis {
    summary: AnalyticsAccountSummary;
    distribution: AnalyticsAccountDistribution[];
    growth: AnalyticsAccountGrowth[];
    usage: AnalyticsAccountUsage[];
    transfers: AnalyticsTransfer[];
    history: AnalyticsAccountPeriod[];
    insights: string[];
}

// ─── Budget Analytics ────────────────────────────────────────────────────────

export type BudgetHealthStatus =
    | "Excellent"
    | "Good"
    | "Warning"
    | "Exceeded";

export interface AnalyticsBudgetSummary {
    totalBudgeted: number;
    totalSpent: number;
    totalRemaining: number;
    budgetCount: number;
    exceededCount: number;
    overallUtilization: number;
    healthStatus: BudgetHealthStatus;
}

export interface AnalyticsBudget {
    id: string;
    name: string;
    categoryId: string | null;
    amount: number;
    spent: number;
    remaining: number;
    utilization: number;
    isExceeded: boolean;
    overBy: number;
    healthStatus: BudgetHealthStatus;
    period: string;
    startDate: Date;
    endDate: Date;
}

export interface AnalyticsBudgetMonth {
    label: string;
    month: string;
    totalBudgeted: number;
    totalSpent: number;
    totalRemaining: number;
    utilizationRate: number;
    healthStatus: BudgetHealthStatus;
}

export interface AnalyticsBudgetAnalysis {
    summary: AnalyticsBudgetSummary;
    budgets: AnalyticsBudget[];
    overspent: AnalyticsBudget[];
    monthly: AnalyticsBudgetMonth[];
    insights: string[];
}