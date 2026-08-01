"use client";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { AnalyticsTransfer } from "../../../types/analytics-view";
import { formatCurrency } from "@/features/dashboard/lib/dashboard-formatters";
import { ArrowRightLeft } from "lucide-react";

interface AccountTransferAnalysisProps {
    transfers: AnalyticsTransfer[];
    currency: string;
}

export default function AccountTransferAnalysis({
    transfers,
    currency,
}: AccountTransferAnalysisProps) {
    if (transfers.length === 0) {
        return (
            <Card className="rounded-2xl border shadow-sm">
                <CardHeader>
                    <CardTitle>Transfers</CardTitle>
                    <CardDescription>Movement between your accounts</CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                    No transfers found in this period.
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader>
                <CardTitle>Transfers</CardTitle>
                <CardDescription>Movement between your accounts</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {transfers.map((transfer, index) => (
                        <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/10 text-blue-500">
                                    <ArrowRightLeft className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <span>{transfer.sourceAccountName}</span>
                                        <span className="text-muted-foreground text-xs">→</span>
                                        <span>{transfer.destinationAccountName}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {transfer.count} transfer{transfer.count !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                            <div className="font-medium">
                                {formatCurrency(transfer.amount, currency)}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
