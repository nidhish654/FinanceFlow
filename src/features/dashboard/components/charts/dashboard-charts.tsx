"use client";

import ExpenseCategoryChart from "./expense-category-chart";
import IncomeExpenseChart from "./income-expense-chart";
import CashFlowChart from "./cash-flow-chart";

import { DashboardCharts as DashboardChartsData } from "../../types/dashboard-view";

interface DashboardChartsProps {
    charts: DashboardChartsData;

    currency: string;
}

export default function DashboardCharts({
    charts,
    currency,
}: DashboardChartsProps) {
    return (
        <section
            className="
                grid
                gap-6

                xl:grid-cols-2
            "
        >
            {/* ================= Expense by Category ================= */}

            <ExpenseCategoryChart
                data={charts.expenseByCategory}
                currency={currency}
            />

            {/* ================= Income vs Expense ================= */}

            <IncomeExpenseChart
                data={charts.incomeVsExpense}
                currency={currency}
            />

            {/* ================= Cash Flow Trend ================= */}

            <div className="xl:col-span-2">

                <CashFlowChart
                    data={charts.cashFlowTrend}
                    currency={currency}
                />

            </div>

        </section>
    );
}