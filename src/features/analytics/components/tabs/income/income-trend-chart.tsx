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

interface IncomeTrendChartProps {
    data: AnalyticsMonthlyPoint[];

    currency: string;
}

export default function IncomeTrendChart({
    data,
    currency,
}: IncomeTrendChartProps) {
    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle>
                    Income Trend
                </CardTitle>

                <CardDescription>
                    Track how your income has changed over time.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {data.length === 0 ? (
                    <div className="flex h-[460px] items-center justify-center text-sm text-muted-foreground">
                        No income trend available.
                    </div>
                ) : (
                    <div className="h-[460px] w-full">
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
                                        id="incomeGradient"
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor="#22c55e"
                                            stopOpacity={0.35}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor="#22c55e"
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
                                        "Income",
                                    ]}
                                />

                                <Area
                                    type="monotone"
                                    dataKey="income"
                                    stroke="#22c55e"
                                    strokeWidth={3}
                                    fill="url(#incomeGradient)"
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