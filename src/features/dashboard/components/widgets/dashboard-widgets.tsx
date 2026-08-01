"use client";

import AccountsWidget from "./accounts-widget";
import BudgetWidget from "./budget-widget";
import GoalsWidget from "./goals-widget";
import RecentTransactionsWidget from "./recent-transactions-widget";

import { DashboardWidgets as DashboardWidgetsData } from "../../types/dashboard-view";

interface DashboardWidgetsProps {
    widgets: DashboardWidgetsData;

    currency: string;
}

export default function DashboardWidgets({
    widgets,
    currency,
}: DashboardWidgetsProps) {
    return (
        <section
            className="
                grid
                gap-6
                items-stretch

                xl:grid-cols-2
            "
        >
            {/* ================= Recent Transactions ================= */}

            <RecentTransactionsWidget
                transactions={
                    widgets.recentTransactions
                }
                currency={currency}
            />

            {/* ================= Accounts ================= */}

            <AccountsWidget
                accounts={widgets.accounts}
                currency={currency}
            />

            {/* ================= Budgets ================= */}

            <BudgetWidget
                budgets={widgets.budgets}
                currency={currency}
            />

            {/* ================= Goals ================= */}

            <GoalsWidget
                goals={widgets.goals}
                currency={currency}
            />

        </section>
    );
}
