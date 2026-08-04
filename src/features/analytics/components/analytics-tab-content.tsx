"use client";

import OverviewTab from "./tabs/overview/overview-tab";
import ExpenseTab from "./tabs/expenses/expense-tab";
import IncomeTab from "./tabs/income/income-tab";
import CashFlowTab from "./tabs/cash-flow/cashflow-tab";
import AccountsTab from "./tabs/accounts/accounts-tab";
import BudgetTab from "./tabs/budgets/budget-tab";
import GoalTab from "./tabs/goals/goal-tab";
import CategoryTab from "./tabs/categories/category-tab";

import {
    AnalyticsTab,
    AnalyticsView,
} from "../types/analytics-view";

interface AnalyticsTabContentProps {
    tab: AnalyticsTab;

    analytics: AnalyticsView;
}

export default function AnalyticsTabContent({
    tab,
    analytics,
}: AnalyticsTabContentProps) {
    switch (tab) {
        case "overview":
            return (
                <OverviewTab
                    analytics={analytics}
                />
            );

        case "expenses":
            return (
                <ExpenseTab
                    analysis={analytics.expenseAnalysis}
                    monthlyCashFlow={analytics.monthlyCashFlow}
                    currency={analytics.currency}
                />
            );

        case "income":
            return (
                <IncomeTab
                    analysis={
                        analytics.incomeAnalysis
                    }
                    monthlyCashFlow={
                        analytics.monthlyCashFlow
                    }
                    currency={
                        analytics.currency
                    }
                />
            );

        case "cash-flow":
            return (
                <CashFlowTab
                    analysis={
                        analytics.cashFlowAnalysis
                    }
                    currency={
                        analytics.currency
                    }
                />
            );

        case "accounts":
            return (
                <AccountsTab
                    data={analytics.accountAnalysis}
                    currency={analytics.currency}
                />
            );

        case "budgets":
            return (
                <BudgetTab
                    analysis={analytics.budgetAnalysis}
                    currency={analytics.currency}
                />
            );

        case "goals":
            return (
                <GoalTab
                    analysis={analytics.goalAnalysis}
                    currency={analytics.currency}
                />
            );
        case "categories":
            return (
                <CategoryTab
                    transactions={analytics.transactions}
                    currency={analytics.currency}
                />
            );

        default:
            return null;
    }
}