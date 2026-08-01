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

import DashboardChartCard from "./dashboard-chart-card";

import { CashFlowChartPoint } from "../../types/dashboard-view";

import {
    formatCurrency,
} from "../../lib/dashboard-formatters";

interface CashFlowChartProps {
    data: CashFlowChartPoint[];

    currency: string;
}

export default function CashFlowChart({
    data,
    currency,
}: CashFlowChartProps) {
    if (data.length === 0) {
        return (
            <DashboardChartCard
                title="Cash Flow Trend"
                description="Cumulative net cash flow through the current month."
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
                    No cash flow data available.
                </div>
            </DashboardChartCard>
        );
    }

    return (
        <DashboardChartCard
            title="Cash Flow Trend"
            description="Cumulative net cash flow through the current month."
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <AreaChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 10,
                    }}
                >
                    <defs>
                        <linearGradient
                            id="cash-flow-gradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.02} />
                        </linearGradient>
                    </defs>

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        opacity={0.5}
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
                        formatter={(value) => [
                            formatCurrency(
                                Number(value),
                                currency
                            ),
                            "Net cash flow",
                        ]}
                    />

                    <Area
                        type="monotone"
                        dataKey="balance"
                        name="Net cash flow"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        fill="url(#cash-flow-gradient)"
                        dot={{
                            r: 3,
                            fill: "#3b82f6",
                            strokeWidth: 2,
                        }}
                        activeDot={{
                            r: 6,
                        }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </DashboardChartCard>
    );
}
