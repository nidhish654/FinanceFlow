import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/common/StatCard";
import CurrencyAmount from "@/components/common/CurrencyAmount";

import {
    Wallet,
    WalletCards,
} from "lucide-react";

import CreateAccountDialog from "@/features/accounts/components/create-account-dialog";
import AccountCard from "@/features/accounts/components/account-card";
import { getAccounts } from "@/features/accounts/actions/getAccounts";
import { calculateTotalBalance } from "@/features/finance/services/balance.service";
import { getActiveFinanceProfile } from "@/features/finance-profile/services";

export default async function AccountsPage() {
    const accounts = await getAccounts();

    const activeFinanceProfile = await getActiveFinanceProfile();

    const totalBalance = calculateTotalBalance(
        accounts.map((account) => account.currentBalance)
    );

    return (
        <main className="space-y-8">
            <PageHeader
                title="Accounts"
                description="Manage all of your financial accounts."
            >
                <CreateAccountDialog />
            </PageHeader>

            {accounts.length === 0 ? (
                <div
                    className="
                        flex flex-col items-center justify-center
                        rounded-xl border border-dashed
                        bg-card
                        px-8 py-20
                        text-center
                    "
                >
                    <div
                        className="
                            mb-8
                            flex h-24 w-24 items-center justify-center
                            rounded-full
                            bg-primary/10
                            text-primary
                        "
                    >
                        <WalletCards className="h-12 w-12" />
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight">
                        No Accounts Yet
                    </h2>

                    <p
                        className="
                            mt-4
                            max-w-md
                            text-sm leading-7
                            text-muted-foreground
                        "
                    >
                        Create your first account to start tracking your
                        finances. Add your bank accounts, cash, credit cards,
                        savings accounts, and digital wallets to see all your
                        balances in one place.
                    </p>

                    <div className="mt-8">
                        <CreateAccountDialog />
                    </div>
                </div>
            ) : (
                <>
                    <StatCard
                        title="Total Balance"
                        value={
                            <CurrencyAmount
                                amount={totalBalance}
                                currency={activeFinanceProfile?.baseCurrency ?? "INR"}
                            />
                        }
                        subtitle={`${accounts.length} Account${
                            accounts.length !== 1 ? "s" : ""
                        }`}
                        icon={<Wallet className="h-5 w-5" />}
                    />

                    <div
                        className="
                            grid
                            md:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]
                            justify-items-center
                            gap-5
                            lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]
                            lg:justify-items-start
                        "
                    >
                        {accounts.map((account) => (
                            <AccountCard
                                key={account.id}
                                account={account}
                            />
                        ))}
                    </div>
                </>
            )}
        </main>
    );
}