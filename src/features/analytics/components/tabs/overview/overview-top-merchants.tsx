"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import {
    AnalyticsMerchantPoint,
} from "../../../types/analytics-view";

import {
    formatCurrency,
} from "@/features/dashboard/lib/dashboard-formatters";

interface OverviewTopMerchantsProps {
    merchants: AnalyticsMerchantPoint[];

    currency: string;
}

export default function OverviewTopMerchants({
    merchants,
    currency,
}: OverviewTopMerchantsProps) {
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
                    Top Merchants
                </CardTitle>

                <CardDescription>
                    Where your recorded spending is concentrated.
                </CardDescription>

            </CardHeader>

            <CardContent>

                {merchants.length === 0 ? (
                    <p
                        className="
                            text-sm
                            text-muted-foreground
                        "
                    >
                        No merchant data in this period.
                    </p>
                ) : (
                    <div className="divide-y">

                        {merchants.map(
                            (merchant) => (
                                <div
                                    key={
                                        merchant.name
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                        py-3
                                        first:pt-0
                                        last:pb-0
                                    "
                                >
                                    <div className="min-w-0">

                                        <p
                                            className="
                                                truncate
                                                font-medium
                                            "
                                        >
                                            {
                                                merchant.name
                                            }
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            {
                                                merchant.transactionCount
                                            }{" "}
                                            {merchant.transactionCount ===
                                            1
                                                ? "transaction"
                                                : "transactions"}
                                        </p>

                                    </div>

                                    <p
                                        className="
                                            shrink-0
                                            font-semibold
                                            tabular-nums
                                        "
                                    >
                                        {formatCurrency(
                                            merchant.amount,
                                            currency
                                        )}
                                    </p>

                                </div>
                            )
                        )}

                    </div>
                )}

            </CardContent>

        </Card>
    );
}