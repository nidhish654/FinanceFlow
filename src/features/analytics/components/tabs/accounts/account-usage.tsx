"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { AnalyticsAccountUsage } from "../../../types/analytics-view";
import { formatCurrency } from "@/features/dashboard/lib/dashboard-formatters";
import { ArrowDownRight, ArrowUpRight, Activity } from "lucide-react";

interface AccountUsageProps {
    usage: AnalyticsAccountUsage[];
    currency: string;
}

export default function AccountUsage({
    usage,
    currency,
}: AccountUsageProps) {
    if (usage.length === 0) {
        return null;
    }

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle>Account Usage</CardTitle>
                <CardDescription>Transaction activity per account</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {usage.map((account) => (
                        <div key={account.id} className="flex flex-col gap-2 border-b pb-4 last:border-0 last:pb-0">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{account.name}</span>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Activity className="h-3 w-3" />
                                    {account.transactionCount} transactions
                                </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Inflow</p>
                                        <p className="text-sm font-medium">{formatCurrency(account.inflow, currency)}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                                        <ArrowDownRight className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Outflow</p>
                                        <p className="text-sm font-medium">{formatCurrency(account.outflow, currency)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Ratio Bar */}
                            {(account.inflow > 0 || account.outflow > 0) && (
                                <div className="mt-4 flex w-full h-1.5 rounded-full overflow-hidden bg-muted">
                                    {account.inflow > 0 && (
                                        <div 
                                            className="bg-emerald-500 h-full transition-all" 
                                            style={{ width: `${(account.inflow / (account.inflow + account.outflow)) * 100}%` }}
                                        />
                                    )}
                                    {account.outflow > 0 && (
                                        <div 
                                            className="bg-rose-500 h-full transition-all" 
                                            style={{ width: `${(account.outflow / (account.inflow + account.outflow)) * 100}%` }}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
