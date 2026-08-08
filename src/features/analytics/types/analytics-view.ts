import { TransactionDto } from "@/features/transactions/types/transaction";

export const ANALYTICS_RANGES = [
    "1M",
    "3M",
    "6M",
    "YTD",
    "12M",
    "CUSTOM",
] as const;

export type AnalyticsRange =
    (typeof ANALYTICS_RANGES)[number];

export const ANALYTICS_TABS = [
    "overview",
    "expenses",
    "income",
    "categories",
    "cash-flow",
    "accounts",
    "budgets",
    "goals",
] as const;

export interface AnalyticsDateRange {
    startDate: Date;
    endDate: Date;
}

export type AnalyticsTab =
    (typeof ANALYTICS_TABS)[number];

export interface SummaryComparison {
    current: number;
    previous: number;
    change: number;
    percentage: number;
    trend: "up" | "down" | "neutral";
}

export interface AnalyticsSummary {
    income: SummaryComparison;
    expense: SummaryComparison;
    netCashFlow: SummaryComparison;
    savingsRate: SummaryComparison;
    highestIncomeMonth: string;
    highestIncomeAmount: number;
    highestExpenseMonth: string;
    highestExpenseAmount: number;
    insights: string[];
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
    subcategories?: { id: string; name: string; amount: number }[];
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

export interface AnalyticsPeriodInfo {
    label: string;
    comparisonLabel: string;
}

export interface AnalyticsView {
    range: AnalyticsRange;

    customRange?: AnalyticsDateRange;

    period: AnalyticsPeriodInfo;

    currency: string;
    financeProfileId: string;

    summary: AnalyticsSummary;

    monthlyCashFlow: AnalyticsMonthlyPoint[];

    topCategories: AnalyticsCategoryPoint[];

    allTransactions: TransactionDto[];

    allPreviousTransactions: TransactionDto[];

    accountAnalysis: AnalyticsAccountAnalysis;

    budgetAnalysis: AnalyticsBudgetAnalysis;

    expenseAnalysis: AnalyticsExpenseAnalysis;

    incomeAnalysis: AnalyticsIncomeAnalysis;

    cashFlowAnalysis: AnalyticsCashFlowAnalysis;

    goalAnalysis: AnalyticsGoalAnalysis;

    categoryAnalysis: CategoryPeriodAnalysis;

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

// ─── Goal Analytics ────────────────────────────────────────────────────────

export type GoalHealthStatus =
    | "Excellent"
    | "Good"
    | "Needs Attention"
    | "Critical";

export interface AnalyticsGoalSummary {
    totalGoals: number;
    activeGoals: number;
    completedGoals: number;
    totalTarget: number;
    totalSaved: number;
    totalRemaining: number;
    completionPercentage: number;
    healthStatus: GoalHealthStatus;
}

export interface AnalyticsGoal {
    id: string;
    name: string;
    icon: string | null;
    targetAmount: number;
    savedAmount: number;
    remainingAmount: number;
    completionPercentage: number;
    isCompleted: boolean;
    isOverdue: boolean;
    targetDate: Date | null;
    daysRemaining: number | null;
    healthStatus: GoalHealthStatus;
}

export interface AnalyticsGoalAnalysis {
    summary: AnalyticsGoalSummary;
    goals: AnalyticsGoal[];
    needsAttention: AnalyticsGoal[];
    insights: string[];
}// --- Category Analytics --------------------------------------------------------

export interface CategoryPoint {
    id: string;
    name: string;
    icon: string | null;
    color: string | null;
    amount: number;
    transactionCount: number;
    subcategories: SubcategoryPoint[];
    generalAmount: number;
    generalTransactionCount: number;
    percentage: number;
    recentTransactions: TransactionDto[];
}

export interface SubcategoryPoint {
    id: string;
    name: string;
    amount: number;
    transactionCount: number;
}

export interface CategorySummary {
    categoriesUsed: number;
    subcategoriesUsed: number;
    topCategory: { name: string; amount: number } | null;
    topSubcategory: { name: string; amount: number } | null;
}

export interface CategoryConcentration {
    top3Percentage: number;
    top5Percentage: number;
    remainingPercentage: number;
}

export interface CategoryGrowth {
    mostIncreased: { name: string; percentage: number; oldAmount: number; newAmount: number } | null;
    mostDecreased: { name: string; percentage: number; oldAmount: number; newAmount: number } | null;
}

export interface CategoryPeriodAnalysis {
    summary: CategorySummary;
    categories: CategoryPoint[];
    topSubcategories: SubcategoryPoint[];
    concentration: CategoryConcentration;
    growth: CategoryGrowth;
    insights: string[];
}


