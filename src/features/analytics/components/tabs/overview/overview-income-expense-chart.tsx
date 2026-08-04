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

import { AnalyticsMonthlyPoint, AnalyticsSummary } from "../../../types/analytics-view";

import { formatCurrency } from "@/features/dashboard/lib/dashboard-formatters";
import { cn } from "@/lib/utils";

interface OverviewIncomeExpenseChartProps {
    data: AnalyticsMonthlyPoint[];
    summary: AnalyticsSummary;
    currency: string;
}

function CustomTooltip({ active, payload, label, currency }: any) {
    if (active && payload && payload.length) {
        const income = payload.find((p: any) => p.dataKey === "income")?.value || 0;
        const expense = payload.find((p: any) => p.dataKey === "expense")?.value || 0;
        const net = income - expense;

        return (
            <div className="rounded-xl border bg-background p-3 shadow-md space-y-1.5">
                <p className="font-semibold text-sm mb-2">{label}</p>
                <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Income
                    </span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        {formatCurrency(income, currency)}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                        <span className="h-2 w-2 rounded-full bg-rose-500" />
                        Expenses
                    </span>
                    <span className="font-medium text-rose-600 dark:text-rose-400">
                        {formatCurrency(expense, currency)}
                    </span>
                </div>
                <div className="pt-2 mt-2 border-t flex items-center justify-between gap-4 text-sm font-bold">
                    <span>Net</span>
                    <span className={net >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                        {formatCurrency(net, currency)}
                    </span>
                </div>
            </div>
        );
    }
    return null;
}

export default function OverviewIncomeExpenseChart({
    data,
    summary,
    currency,
}: OverviewIncomeExpenseChartProps) {
    const hasData = data.some((point) => point.income > 0 || point.expense > 0);

    return (
        <Card className="rounded-2xl border shadow-sm flex flex-col">
            <CardHeader className="pb-2">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <CardTitle>Income vs Expenses</CardTitle>
                        <CardDescription>
                            Monthly activity across the selected period.
                        </CardDescription>
                        {/* Legend */}
                        {hasData && (
                            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    <span>Income</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                                    <span>Expense</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* KPIs */}
                    {hasData && (
                        <div className="flex flex-col gap-2 shrink-0">
                            {summary.highestIncomeAmount > 0 && (
                                <div className="flex items-center justify-between gap-3 rounded-full border px-3 py-1.5 text-xs">
                                    <span className="text-muted-foreground">Highest Income</span>
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                                        {summary.highestIncomeMonth}
                                    </span>
                                </div>
                            )}
                            {summary.highestExpenseAmount > 0 && (
                                <div className="flex items-center justify-between gap-3 rounded-full border px-3 py-1.5 text-xs">
                                    <span className="text-muted-foreground">Highest Expense</span>
                                    <span className="font-semibold text-rose-600 dark:text-rose-400">
                                        {summary.highestExpenseMonth}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </CardHeader>

            <CardContent className="flex-1 mt-4">
                {!hasData ? (
                    <div className="flex h-64 flex-col items-center justify-center text-muted-foreground text-center">
                        <p className="font-medium">No financial activity during this period.</p>
                        <p className="text-sm mt-1">Income and expense charts will appear here.</p>
                    </div>
                ) : (
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{ top: 8, right: 4, left: -8, bottom: 0 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.45} />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => Number(value).toLocaleString()}
                                />
                                <Tooltip
                                    content={<CustomTooltip currency={currency} />}
                                    cursor={{ fill: "var(--muted)", opacity: 0.4 }}
                                />
                                <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                <Bar dataKey="expense" fill="#f43f5e" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}