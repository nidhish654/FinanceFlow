"use client";

import OverviewTab from "./tabs/overview/overview-tab";
import ExpenseTab from "./tabs/expenses/expense-tab";
import IncomeTab from "./tabs/income/income-tab";
import CashFlowTab from "./tabs/cash-flow/cashflow-tab";
import AccountsTab from "./tabs/accounts/accounts-tab";

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
        case "goals":
        case "merchants":
            return (
                <div
                    className="
                        flex
                        h-72
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-dashed
                    "
                >
                    <div className="text-center">

                        <h2 className="text-xl font-semibold">
                            Coming Soon
                        </h2>

                        <p
                            className="
                                mt-2
                                text-sm
                                text-muted-foreground
                            "
                        >
                            This analytics section
                            will be implemented in
                            the next phase.
                        </p>

                    </div>

                </div>
            );

        default:
            return null;
    }
}