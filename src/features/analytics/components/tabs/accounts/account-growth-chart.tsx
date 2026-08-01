"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { AnalyticsAccountGrowth } from "../../../types/analytics-view";
import { formatCurrency } from "@/features/dashboard/lib/dashboard-formatters";

interface AccountGrowthChartProps {
    growth: AnalyticsAccountGrowth[];
    currency: string;
}

const ACCOUNT_COLORS = [
    "#3730a3", // Indigo
    "#22d3ee", // Cyan
    "#7e22ce", // Purple
    "#60a5fa", // Sky
    "#0f766e", // Teal
    "#c084fc", // Violet
];

export default function AccountGrowthChart({
    growth,
    currency,
}: AccountGrowthChartProps) {
    if (growth.length === 0) {
        return (
            <Card className="rounded-2xl border shadow-sm">
                <CardHeader>
                    <CardTitle>Account Growth</CardTitle>
                    <CardDescription>
                        Historical balance trends
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex h-[300px] items-center justify-center text-muted-foreground">
                    No growth data available for this period.
                </CardContent>
            </Card>
        );
    }

    const accountKeys = Object.keys(growth[0]).filter(
        (key) => key !== "date"
    );

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle>Account Growth</CardTitle>

                <CardDescription>
                    Historical balance trends
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={growth}
                            margin={{
                                top: 12,
                                right: 8,
                                left: -10,
                                bottom: 0,
                            }}
                        >
                            <defs>
                                {accountKeys.map((key, index) => (
                                    <linearGradient
                                        key={key}
                                        id={`color-${key}`}
                                        x1="0"
                                        y1="0"
                                        x2="0"
                                        y2="1"
                                    >
                                        <stop
                                            offset="5%"
                                            stopColor={
                                                ACCOUNT_COLORS[
                                                    index %
                                                        ACCOUNT_COLORS.length
                                                ]
                                            }
                                            stopOpacity={0.12}
                                        />

                                        <stop
                                            offset="95%"
                                            stopColor={
                                                ACCOUNT_COLORS[
                                                    index %
                                                        ACCOUNT_COLORS.length
                                                ]
                                            }
                                            stopOpacity={0}
                                        />
                                    </linearGradient>
                                ))}
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                opacity={0.35}
                            />

                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#9ca3af",
                                    fontSize: 12,
                                }}
                                tickMargin={8}
                            />

                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{
                                    fill: "#9ca3af",
                                    fontSize: 12,
                                }}
                                tickMargin={8}
                                tickFormatter={(value) =>
                                    `₹${(Number(value) / 1000).toFixed(0)}k`
                                }
                            />

                            <Tooltip
                                formatter={(value: any, name: any) => [
                                    formatCurrency(value, currency),
                                    name,
                                ]}
                                contentStyle={{
                                    backgroundColor: "#ffffffff",
                                    border: "1px solid #374151",
                                    borderRadius: "12px",
                                    color: "#000000",
                                }}
                                labelStyle={{
                                    color: "#000000",
                                }}
                            />

                            <Legend
                                verticalAlign="top"
                                align="center"
                                iconType="circle"
                                height={40}
                                wrapperStyle={{
                                    paddingBottom: "12px",
                                }}
                            />

                            {accountKeys.map((key, index) => (
                                <Area
                                    key={key}
                                    type="monotone"
                                    dataKey={key}
                                    stroke={
                                        ACCOUNT_COLORS[
                                            index % ACCOUNT_COLORS.length
                                        ]
                                    }
                                    strokeWidth={3}
                                    // fill={`url(#color-${key})`}
                                    fill="none"
                                    fillOpacity={1}
                                    activeDot={{
                                        r: 5,
                                        strokeWidth: 2,
                                    }}
                                />
                            ))}
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}