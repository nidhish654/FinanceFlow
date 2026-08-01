"use client";

import {
    Cell,
    Label,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

import DashboardChartCard from "./dashboard-chart-card";

import { CategoryChartPoint } from "../../types/dashboard-view";

import {
    formatCurrency,
} from "../../lib/dashboard-formatters";

interface ExpenseCategoryChartProps {
    data: CategoryChartPoint[];

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

const OTHER_COLOR = "#64748b";

export default function ExpenseCategoryChart({
    data,
    currency,
}: ExpenseCategoryChartProps) {
    const totalExpenses = data.reduce(
        (total, category) => total + category.amount,
        0
    );

    const topCategories = data.slice(0, 5);
    const otherAmount = data
        .slice(5)
        .reduce((total, category) => total + category.amount, 0);

    const displayedCategories = [
        ...topCategories.map((category, index) => ({
            ...category,
            displayColor: EXPENSE_COLORS[index],
        })),
        ...(otherAmount > 0
            ? [{
                categoryId: "other",
                categoryName: "Other",
                amount: otherAmount,
                color: OTHER_COLOR,
                displayColor: OTHER_COLOR,
            }]
            : []),
    ];

    if (data.length === 0) {
        return (
            <DashboardChartCard
                title="Expenses by Category"
                description="See where your money is going."
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
                    No expense data available.
                </div>
            </DashboardChartCard>
        );
    }

    return (
        <DashboardChartCard
            title="Expenses by Category"
            description="Breakdown of expenses by category."
        >
            <div className="grid h-full grid-rows-[180px_minmax(0,1fr)] gap-4 md:grid-cols-[minmax(0,0.9fr)_minmax(220px,1.1fr)] md:grid-rows-1 md:items-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={displayedCategories}
                            dataKey="amount"
                            nameKey="categoryName"
                            innerRadius={62}
                            outerRadius={92}
                            paddingAngle={3}
                            strokeWidth={2}
                            stroke="var(--card)"
                        >
                            <Label
                                value={formatCurrency(totalExpenses, currency)}
                                position="center"
                                dy={-10}
                                fill="currentColor"
                                style={{ fontSize: 18, fontWeight: 700 }}
                            />

                            <Label
                                value="Total spent"
                                position="center"
                                dy={14}
                                fill="currentColor"
                                style={{ fontSize: 12, opacity: 0.65 }}
                            />

                            {displayedCategories.map((entry) => (
                                <Cell
                                    key={entry.categoryId}
                                    fill={entry.displayColor}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) => [
                                formatCurrency(
                                    Number(value),
                                    currency
                                ),
                                "Spent",
                            ]}
                        />
                    </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                    {displayedCategories.map((category) => {
                        const percentage =
                            (category.amount / totalExpenses) * 100;

                        const color = category.displayColor;

                        return (
                            <div
                                key={category.categoryId}
                                className="space-y-1.5"
                            >
                                <div className="flex items-center justify-between gap-3 text-sm">
                                    <div className="flex min-w-0 items-center gap-2">
                                        <span
                                            aria-hidden="true"
                                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                                            style={{ backgroundColor: color }}
                                        />

                                        <span className="truncate font-medium">
                                            {category.categoryName}
                                        </span>
                                    </div>

                                    <span className="shrink-0 text-xs font-semibold tabular-nums">
                                        {formatCurrency(
                                            category.amount,
                                            currency
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${percentage}%`,
                                                backgroundColor: color,
                                            }}
                                        />
                                    </div>

                                    <span className="w-9 text-right text-xs tabular-nums text-muted-foreground">
                                        {percentage.toFixed(0)}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </DashboardChartCard>
    );
}
