import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import CurrencyAmount from "@/components/common/CurrencyAmount";

import {
    Wallet,
    WalletCards,
} from "lucide-react";

import CreateAccountDialog from "@/features/accounts/components/create-account-dialog";
import AccountList from "@/features/accounts/components/account-list";
import { getAccounts } from "@/features/accounts/actions/getAccounts";
import { calculateTotalBalance } from "@/features/finance/services/balance.service";
import { getActiveFinanceProfile } from "@/features/finance-profile/services";

export default async function AccountsPage() {
    const accounts = await getAccounts();

    const activeFinanceProfile = await getActiveFinanceProfile();

    const totalBalance = calculateTotalBalance(
        accounts.filter(a => !a.isArchived).map((account) => account.currentBalance)
    );

    return (
        <main className="space-y-8">
            <PageHeader
                title="Accounts"
                description="Manage all of your financial accounts."
            >
                <CreateAccountDialog />
            </PageHeader>

            <StatCard
                title="Total Balance (Active)"
                value={
                    <CurrencyAmount
                        amount={totalBalance}
                        currency={activeFinanceProfile?.baseCurrency ?? "INR"}
                    />
                }
                subtitle={`${accounts.filter(a => !a.isArchived).length} Active Account${
                    accounts.filter(a => !a.isArchived).length !== 1 ? "s" : ""
                }`}
                icon={<Wallet className="h-5 w-5" />}
            />

            <AccountList accounts={accounts} />
        </main>
    );
}