"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import DashboardChartCard from "./dashboard-chart-card";

import { IncomeExpenseChartPoint } from "../../types/dashboard-view";

import {
    formatCurrency,
} from "../../lib/dashboard-formatters";

interface IncomeExpenseChartProps {
    data: IncomeExpenseChartPoint[];

    currency: string;
}

export default function IncomeExpenseChart({
    data,
    currency,
}: IncomeExpenseChartProps) {
    if (data.length === 0) {
        return (
            <DashboardChartCard
                title="Income vs Expense"
                description="Compare monthly income and expenses."
            >
                <div
                    className="
                        flex
                        h-full
                        items-center
                        justify-center
                        text-sm
                        text-muted-foreground
                    "
                >
                    No income or expense data available.
                </div>
            </DashboardChartCard>
        );
    }

    return (
        <DashboardChartCard
            title="Income vs Expense"
            description="Monthly comparison of income and expenses."
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                    />

                    <YAxis
                        tickFormatter={(value) =>
                            Number(value).toLocaleString()
                        }
                        tickLine={false}
                        axisLine={false}
                    />

                    <Tooltip
                        formatter={(value, name) => [
                            formatCurrency(
                                Number(value),
                                currency
                            ),
                            name === "income"
                                ? "Income"
                                : "Expense",
                        ]}
                    />

                    <Legend />

                    <Bar
                        dataKey="income"
                        name="Income"
                        radius={[6, 6, 0, 0]}
                        fill="#22c55e"
                    />

                    <Bar
                        dataKey="expense"
                        name="Expense"
                        radius={[6, 6, 0, 0]}
                        fill="#ef4444"
                    />
                </BarChart>
            </ResponsiveContainer>
        </DashboardChartCard>
    );
}