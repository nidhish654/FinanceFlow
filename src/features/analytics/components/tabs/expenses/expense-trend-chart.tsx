"use client";

import {
    Area,
    AreaChart,
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

interface ExpenseTrendChartProps {
    data: AnalyticsMonthlyPoint[];

    currency: string;
}

export default function ExpenseTrendChart({
    data,
    currency,
}: ExpenseTrendChartProps) {
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
                    Expense Trend
                </CardTitle>

                <CardDescription>
                    Track how your expenses have changed over time.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {data.length === 0 ? (
                    <div
                        className="
                            flex
                            h-[375px]
                            items-center
                            justify-center
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No expense trend available.
                    </div>
                ) : (
                    <div className="h-[375px] w-full">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >
                            <AreaChart
                                data={data}
                                margin={{
                                    top: 8,
                                    right: 4,
                                    left: -8,
                                    bottom: 0,
                                }}
                            >
                                <defs>

                                    <linearGradient
                                        id="expenseGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#ef4444"
                                            stopOpacity={0.35}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#ef4444"
                                            stopOpacity={0}
                                        />

                                    </linearGradient>

                                </defs>

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
                                    formatter={(value) => [
                                        formatCurrency(
                                            Number(value),
                                            currency
                                        ),
                                        "Expenses",
                                    ]}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="expense"
                                    stroke="#ef4444"
                                    strokeWidth={3}
                                    fill="url(#expenseGradient)"
                                    activeDot={{
                                        r: 5,
                                    }}
                                />

                            </AreaChart>

                        </ResponsiveContainer>

                    </div>
                )}

            </CardContent>

        </Card>
    );
}