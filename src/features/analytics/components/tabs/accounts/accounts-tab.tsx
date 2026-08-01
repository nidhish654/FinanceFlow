"use client";

import { AnalyticsAccountAnalysis } from "../../../types/analytics-view";
import AccountsSummaryCards from "./accounts-summary-cards";
import AccountBalanceDistribution from "./account-balance-distribution";
import AccountGrowthChart from "./account-growth-chart";
import AccountUsage from "./account-usage";
import AccountTransferAnalysis from "./account-transfer-analysis";
import AccountBalanceHistory from "./account-balance-history";
import AccountInsights from "./account-insights";

interface AccountsTabProps {
    data: AnalyticsAccountAnalysis;
    currency: string;
}

export default function AccountsTab({ data, currency }: AccountsTabProps) {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <AccountsSummaryCards summary={data.summary} currency={currency} />

            {data.insights.length > 0 && (
                <AccountInsights insights={data.insights} />
            )}

            <div className="grid gap-6 lg:grid-cols-7">
                <div className="lg:col-span-4">
                    <AccountGrowthChart growth={data.growth} currency={currency} />
                </div>
                <div className="lg:col-span-3">
                    <AccountBalanceDistribution distribution={data.distribution} currency={currency} />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <AccountUsage usage={data.usage} currency={currency} />
                <AccountTransferAnalysis transfers={data.transfers} currency={currency} />
            </div>

            <AccountBalanceHistory history={data.history} currency={currency} />
        </div>
    );
}
