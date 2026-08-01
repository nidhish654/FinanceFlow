"use client";

import {
    PiggyBank,
    TrendingDown,
    TrendingUp,
    Wallet,
    WalletCards,
} from "lucide-react";

import DashboardSummaryCard from "./dashboard-summary-card";

import { DashboardSummary } from "../../types/dashboard-view";

interface DashboardSummaryGridProps {
    summary: DashboardSummary;
}

export default function DashboardSummaryGrid({
    summary,
}: DashboardSummaryGridProps) {
    return (
        <section>
            <div
                className="
                    grid
                    gap-5

                    sm:grid-cols-2

                    lg:grid-cols-3

                    xl:grid-cols-5
                "
            >
                <DashboardSummaryCard
                    title="Total Balance"
                    value={
                        summary.formattedTotalBalance
                    }
                    icon={
                        <Wallet className="h-5 w-5" />
                    }
                    iconColor="
                    text-blue-500
                    dark:text-blue-400
                    "
                    description="Across all accounts"
                />

                <DashboardSummaryCard
                    title="Monthly Income"
                    value={
                        summary.formattedMonthlyIncome
                    }
                    icon={
                        <TrendingUp className="h-5 w-5" />
                    }
                    iconColor="
                    text-emerald-500
                    dark:text-emerald-400
                    "
                    description="Current month"
                />

                <DashboardSummaryCard
                    title="Monthly Expense"
                    value={
                        summary.formattedMonthlyExpense
                    }
                    icon={
                        <TrendingDown className="h-5 w-5" />
                    }
                    iconColor="
                    text-red-500
                    dark:text-red-400
                    "
                    description="Current month"
                />

                <DashboardSummaryCard
                    title="Total Savings"
                    value={
                        summary.formattedTotalSavings
                    }
                    icon={
                        <PiggyBank className="h-5 w-5" />
                    }
                    iconColor="
                    text-violet-500
                    dark:text-violet-400
                    "
                    description="Savings accounts"
                />

                <DashboardSummaryCard
                    title="Net Cash Flow"
                    value={
                        summary.formattedNetCashFlow
                    }
                    icon={
                        <WalletCards className="h-5 w-5" />
                    }
                    iconColor="
                    text-orange-500
                    dark:text-orange-400
                    "
                    description="Income minus expenses"
                />

            </div>
        </section>
    );
}