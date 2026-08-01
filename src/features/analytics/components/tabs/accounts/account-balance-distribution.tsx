"use client";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { AnalyticsAccountDistribution } from "../../../types/analytics-view";
import { formatCurrency } from "@/features/dashboard/lib/dashboard-formatters";

interface AccountBalanceDistributionProps {
    distribution: AnalyticsAccountDistribution[];
    currency: string;
}

const EXPENSE_COLORS = [
    "#3730a3", // Deep Indigo (Dark)
    "#22d3ee", // Bright Cyan (Light)
    "#7e22ce", // Deep Purple (Dark)
    "#60a5fa", // Soft Sky Blue (Light)
    "#0f766e", // Dark Teal (Dark)
    "#c084fc", // Soft Violet (Light)
];

export default function AccountBalanceDistribution({
    distribution,
    currency,
}: AccountBalanceDistributionProps) {
    if (distribution.length === 0) {
        return null;
    }

    return (
        <Card className="rounded-2xl border shadow-sm h-full">
            <CardHeader>
                <CardTitle>Balance Distribution</CardTitle>
                <CardDescription>Where your money is allocated</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={distribution}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={2}
                                dataKey="balance"
                                nameKey="name"
                            >
                                {distribution.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={EXPENSE_COLORS[index % EXPENSE_COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: any) =>
                                    formatCurrency(value as number, currency)
                                }
                                contentStyle={{
                                    borderRadius: "8px",
                                    border: "1px solid hsl(var(--border))",
                                    backgroundColor: "hsl(var(--background))",
                                }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="circle"
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
