"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { AnalyticsAccountPeriod } from "../../../types/analytics-view";
import { formatCurrency } from "@/features/dashboard/lib/dashboard-formatters";
import {
    ArrowDownRight,
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Minus,
    Wallet,
} from "lucide-react";

interface AccountBalanceHistoryProps {
    history: AnalyticsAccountPeriod[];
    currency: string;
}

export default function AccountBalanceHistory({
    history,
    currency,
}: AccountBalanceHistoryProps) {
    if (history.length === 0) {
        return null;
    }

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle>Balance History</CardTitle>
                <CardDescription>Period changes per account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                    {history.map((period) => {
                        const net = period.closingBalance - period.openingBalance;
                        const isPositive = net > 0;
                        const isNeutral = net === 0;
                        const totalFlow = period.income + period.expense;
                        const incomeRatio = totalFlow > 0 ? (period.income / totalFlow) * 100 : 50;

                        return (
                            <div
                                key={period.id}
                                className="relative rounded-xl border bg-card overflow-hidden"
                            >
                                {/* Top accent bar */}
                                <div
                                    className="h-1 w-full"
                                    style={{
                                        background: isNeutral
                                            ? "hsl(var(--muted-foreground))"
                                            : isPositive
                                            ? "linear-gradient(to right, #10b981, #34d399)"
                                            : "linear-gradient(to right, #f43f5e, #fb7185)",
                                    }}
                                />

                                <div className="p-4 space-y-4">
                                    {/* Account name + net change badge */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                                                <Wallet className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <span className="font-semibold text-sm">
                                                {period.name}
                                            </span>
                                        </div>

                                        {/* Net change badge */}
                                        <div
                                            className="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
                                            style={{
                                                backgroundColor: isNeutral
                                                    ? "hsl(var(--muted))"
                                                    : isPositive
                                                    ? "rgba(16,185,129,0.1)"
                                                    : "rgba(244,63,94,0.1)",
                                                color: isNeutral
                                                    ? "hsl(var(--muted-foreground))"
                                                    : isPositive
                                                    ? "#10b981"
                                                    : "#f43f5e",
                                            }}
                                        >
                                            {isNeutral ? (
                                                <Minus className="h-3 w-3" />
                                            ) : isPositive ? (
                                                <TrendingUp className="h-3 w-3" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3" />
                                            )}
                                            {isPositive ? "+" : ""}
                                            {formatCurrency(net, currency)}
                                        </div>
                                    </div>

                                    {/* 4 metrics */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {/* Opening */}
                                        <div className="rounded-lg bg-muted/40 p-3 space-y-1">
                                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                                                Opening
                                            </p>
                                            <p className="text-base font-bold">
                                                {formatCurrency(period.openingBalance, currency)}
                                            </p>
                                        </div>

                                        {/* Closing */}
                                        <div className="rounded-lg bg-muted/40 p-3 space-y-1">
                                            <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                                                Closing
                                            </p>
                                            <p className="text-base font-bold">
                                                {formatCurrency(period.closingBalance, currency)}
                                            </p>
                                        </div>

                                        {/* Income */}
                                        <div className="rounded-lg bg-emerald-500/5 border border-emerald-500/10 p-3 space-y-1">
                                            <div className="flex items-center gap-1">
                                                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                                                <p className="text-[11px] text-emerald-500 uppercase tracking-wider font-medium">
                                                    Income
                                                </p>
                                            </div>
                                            <p className="text-base font-bold text-emerald-500">
                                                +{formatCurrency(period.income, currency)}
                                            </p>
                                        </div>

                                        {/* Expense */}
                                        <div className="rounded-lg bg-rose-500/5 border border-rose-500/10 p-3 space-y-1">
                                            <div className="flex items-center gap-1">
                                                <ArrowDownRight className="h-3 w-3 text-rose-500" />
                                                <p className="text-[11px] text-rose-500 uppercase tracking-wider font-medium">
                                                    Expense
                                                </p>
                                            </div>
                                            <p className="text-base font-bold text-rose-500">
                                                -{formatCurrency(period.expense, currency)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Income vs Expense flow bar */}
                                    {totalFlow > 0 && (
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-[11px] text-muted-foreground">
                                                <span>Income ratio</span>
                                                <span>{incomeRatio.toFixed(0)}%</span>
                                            </div>
                                            <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted">
                                                <div
                                                    className="h-full bg-emerald-500 transition-all"
                                                    style={{ width: `${incomeRatio}%` }}
                                                />
                                                <div
                                                    className="h-full bg-rose-500 transition-all"
                                                    style={{ width: `${100 - incomeRatio}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}
