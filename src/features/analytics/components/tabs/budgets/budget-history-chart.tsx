"use client";

import {
    Area,
    AreaChart,
    CartesianGrid,
    Legend,
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

import { AnalyticsBudgetMonth } from "@/features/analytics/types/analytics-view";
import { formatCurrency } from "@/lib/formatters";

interface BudgetHistoryChartProps {
    monthly: AnalyticsBudgetMonth[];
    currency: string;
}

const BUDGET_COLOR = "#3730a3"; // Deep Indigo
const SPENT_COLOR  = "#22d3ee"; // Bright Cyan

export default function BudgetHistoryChart({
    monthly,
    currency,
}: BudgetHistoryChartProps) {
    const nonEmpty = monthly.filter(
        (m) => m.totalBudgeted > 0 || m.totalSpent > 0
    );

    if (nonEmpty.length === 0) {
        return (
            <Card className="rounded-2xl border shadow-sm">
                <CardHeader>
                    <CardTitle>Historical Performance</CardTitle>
                    <CardDescription>Month-by-month budget vs spending</CardDescription>
                </CardHeader>
                <CardContent className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
                    No historical data for this period.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle>Historical Performance</CardTitle>
                <CardDescription>
                    Month-by-month budget vs spending — are you improving?
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={nonEmpty}
                            margin={{ top: 12, right: 8, left: -10, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="budgetHistGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%"  stopColor={BUDGET_COLOR} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={BUDGET_COLOR} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="spentHistGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%"  stopColor={SPENT_COLOR} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={SPENT_COLOR} stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                opacity={0.35}
                            />

                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#9ca3af", fontSize: 12 }}
                                tickMargin={8}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: "#9ca3af", fontSize: 12 }}
                                tickMargin={8}
                                tickFormatter={(v) =>
                                    `₹${(Number(v) / 1000).toFixed(0)}k`
                                }
                            />

                            <Tooltip
                                formatter={(value: any, name: any) => [
                                    formatCurrency(Number(value), currency),
                                    name === "totalBudgeted" ? "Budget" : "Spent",
                                ]}
                                contentStyle={{
                                    backgroundColor: "#ffffff",
                                    border: "1px solid #374151",
                                    borderRadius: "12px",
                                    color: "#000000",
                                }}
                                labelStyle={{ color: "#000000" }}
                            />

                            <Legend
                                verticalAlign="top"
                                align="center"
                                iconType="circle"
                                height={36}
                                formatter={(value) =>
                                    value === "totalBudgeted" ? "Budget" : "Spent"
                                }
                            />

                            <Area
                                type="monotone"
                                dataKey="totalBudgeted"
                                stroke={BUDGET_COLOR}
                                strokeWidth={2.5}
                                fill="url(#budgetHistGrad)"
                                activeDot={{ r: 5, strokeWidth: 2 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="totalSpent"
                                stroke={SPENT_COLOR}
                                strokeWidth={2.5}
                                fill="url(#spentHistGrad)"
                                activeDot={{ r: 5, strokeWidth: 2 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
