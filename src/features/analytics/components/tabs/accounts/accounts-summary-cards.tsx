"use client";

import {
    Wallet,
    Landmark,
    Hash,
    Calculator,
} from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    AnalyticsAccountSummary,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface AccountsSummaryCardsProps {
    summary: AnalyticsAccountSummary;
    currency: string;
}

export default function AccountsSummaryCards({
    summary,
    currency,
}: AccountsSummaryCardsProps) {
    const cards = [
        {
            title: "Total Balance",
            value: formatCurrency(summary.totalBalance, currency),
            subtitle: "Across all accounts",
            icon: Wallet,
            color: "text-emerald-500",
        },
        {
            title: "Largest Account",
            value: summary.largestAccount?.name ?? "—",
            subtitle: summary.largestAccount ? formatCurrency(summary.largestAccount.balance, currency) : "No account data",
            icon: Landmark,
            color: "text-blue-500",
        },
        {
            title: "Number of Accounts",
            value: summary.numberOfAccounts.toString(),
            subtitle: "Active accounts",
            icon: Hash,
            color: "text-violet-500",
        },
        {
            title: "Average Account Balance",
            value: formatCurrency(summary.averageBalance, currency),
            subtitle: "Per account",
            icon: Calculator,
            color: "text-amber-500",
        },
    ];

    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map((card) => {
                const Icon = card.icon;
                return (
                    <Card key={card.title} className="rounded-2xl border shadow-sm">
                        <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-muted-foreground">
                                        {card.title}
                                    </p>
                                    <p className="mt-3 truncate text-2xl font-bold tracking-tight tabular-nums">
                                        {card.value}
                                    </p>
                                    <p className="mt-2 text-xs text-muted-foreground">
                                        {card.subtitle}
                                    </p>
                                </div>
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted ${card.color}`}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </section>
    );
}
