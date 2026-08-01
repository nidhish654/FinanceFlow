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
    AnalyticsCashFlowPeriod,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface CashFlowRunningBalanceChartProps {
    data: AnalyticsCashFlowPeriod[];

    currency: string;
}

export default function CashFlowRunningBalanceChart({
    data,
    currency,
}: CashFlowRunningBalanceChartProps) {

    if (data.length === 0) {
        return (
            <Card
                className="
                    rounded-2xl
                    border
                    shadow-sm
                "
            >
                <CardContent
                    className="
                        flex
                        h-96
                        items-center
                        justify-center
                        text-sm
                        text-muted-foreground
                    "
                >
                    No cash flow data available.
                </CardContent>
            </Card>
        );
    }

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
                    Running Balance
                </CardTitle>

                <CardDescription>
                    Track how your balance changed throughout the selected period.
                </CardDescription>

            </CardHeader>

            <CardContent>

                <div className="h-96 w-full">

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={data}
                            margin={{
                                top: 12,
                                right: 8,
                                left: -10,
                                bottom: 0,
                            }}
                        >

                            <defs>

                                <linearGradient
                                    id="cashFlowGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="5%"
                                        stopColor="#10b981"
                                        stopOpacity={0.35}
                                    />

                                    <stop
                                        offset="95%"
                                        stopColor="#10b981"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                opacity={0.4}
                            />

                            <XAxis
                                dataKey="label"
                                tickLine={false}
                                axisLine={false}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) =>
                                    Number(value).toLocaleString()
                                }
                            />

                            <Tooltip
                                formatter={(value) => [
                                    formatCurrency(
                                        Number(value),
                                        currency
                                    ),
                                    "Closing Balance",
                                ]}
                            />

                            <Area
                                type="monotone"
                                dataKey="closingBalance"
                                stroke="#10b981"
                                strokeWidth={3}
                                fill="url(#cashFlowGradient)"
                                activeDot={{
                                    r: 5,
                                }}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                </div>

            </CardContent>

        </Card>
    );
}