"use client";

import ExpenseSummaryCards from "./expense-summary-cards";
import ExpenseCategoryBreakdown from "./expense-category-breakdown";
import ExpenseTrendChart from "./expense-trend-chart";
import ExpenseCadence from "./expense-cadence";
import ExpenseLargestTransactions from "./expense-largest-transactions";
import ExpenseInsights from "./expense-insights";

import {
    AnalyticsExpenseAnalysis,
    AnalyticsMonthlyPoint,
} from "../../../types/analytics-view";

interface ExpenseTabProps {
    analysis: AnalyticsExpenseAnalysis;

    monthlyCashFlow: AnalyticsMonthlyPoint[];

    currency: string;
}

export default function ExpenseTab({
    analysis,
    monthlyCashFlow,
    currency,
}: ExpenseTabProps) {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-800">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h2 className="text-xl font-semibold tracking-tight">
                        Expense Analytics
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Analyze your spending trends.
                    </p>
                </div>
            </div>

            {/* =========================================
             * Expense Summary
             * ========================================= */}

            <ExpenseSummaryCards
                summary={analysis.summary}
                currency={currency}
            />

            <ExpenseInsights
                insights={
                    analysis.insights
                }
            />

            {/* =========================================
             * Trend + Category Breakdown
             * ========================================= */}

            <section
                className="
                    grid
                    gap-6

                    xl:grid-cols-[minmax(0,1.6fr)_420px]
                "
            >
                <ExpenseTrendChart
                    data={monthlyCashFlow}
                    currency={currency}
                />

                <ExpenseCategoryBreakdown
                    categories={analysis.categories}
                    totalExpense={
                        analysis.summary.totalExpense
                    }
                    currency={currency}
                />

            </section>

            {/* =========================================
             * Spending Cadence
             * ========================================= */}

            <ExpenseCadence
                analysis={analysis}
                currency={currency}
            />

            {/* =========================================
            * Largest Transactions + Insights
            * ========================================= */}

            <ExpenseLargestTransactions
                transactions={
                    analysis.largestTransactions
                }
                currency={currency}
            />

            {/* <section
                className="
                    grid
                    gap-6

                    xl:grid-cols-[minmax(0,1.75fr)_400px]
                    items-start
                "
            >
            </section> */}

        </div>
    );
}