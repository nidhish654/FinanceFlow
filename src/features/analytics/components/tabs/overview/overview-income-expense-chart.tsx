"use client";

import {
    Bar,
    BarChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AnalyticsMonthlyPoint,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface OverviewIncomeExpenseChartProps {
    data: AnalyticsMonthlyPoint[];

    currency: string;
}

export default function OverviewIncomeExpenseChart({
    data,
    currency,
}: OverviewIncomeExpenseChartProps) {
    return (
        <Card
            className="
                rounded-2xl
                border
                shadow-sm
            "
        >
            <CardHeader>

                <CardTitle>
                    Income vs Expenses
                </CardTitle>

                <CardDescription>
                    Monthly activity across the selected period.
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="h-80 w-full">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart
                            data={data}
                            margin={{
                                top: 8,
                                right: 4,
                                left: -8,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                opacity={0.45}
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    Number(
                                        value
                                    ).toLocaleString()
                                }
                            />

                            <Tooltip
                                formatter={(
                                    value,
                                    name
                                ) => [
                                    formatCurrency(
                                        Number(
                                            value
                                        ),
                                        currency
                                    ),
                                    name ===
                                    "income"
                                        ? "Income"
                                        : "Expenses",
                                ]}
                            />

                            <Bar
                                dataKey="income"
                                fill="#22c55e"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0,
                                ]}
                            />

                            <Bar
                                dataKey="expense"
                                fill="#f43f5e"
                                radius={[
                                    5,
                                    5,
                                    0,
                                    0,
                                ]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>

            </CardContent>

        </Card>
    );
}