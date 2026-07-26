import {
    Landmark,
    Wallet,
    TrendingDown,
    TrendingUp,
} from "lucide-react";

import CurrencyAmount from "@/components/common/CurrencyAmount";
import StatCard from "@/components/common/StatCard";

interface Props {
    totalBalance: number;
    accountCount: number;
}

export default function DashboardStats({
    totalBalance,
    accountCount,
}: Props) {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Total Balance"
                value={
                    <CurrencyAmount
                        amount={totalBalance}
                        currency="INR"
                    />
                }
                subtitle="Across all accounts"
                icon={<Wallet className="h-5 w-5" />}
            />

            <StatCard
                title="Accounts"
                value={accountCount}
                subtitle="Active accounts"
                icon={<Landmark className="h-5 w-5" />}
            />

            <StatCard
                title="Income"
                value={
                    <CurrencyAmount
                        amount={0}
                        currency="INR"
                    />
                }
                subtitle="Coming soon"
                icon={<TrendingUp className="h-5 w-5" />}
            />

            <StatCard
                title="Expenses"
                value={
                    <CurrencyAmount
                        amount={0}
                        currency="INR"
                    />
                }
                subtitle="Coming soon"
                icon={<TrendingDown className="h-5 w-5" />}
            />
        </div>
    );
}