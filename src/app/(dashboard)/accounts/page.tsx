import AccountCard from "@/features/accounts/components/account-card";
import { getAccounts } from "@/features/accounts/services/account.service";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/common/StatCard";
import { Wallet } from "lucide-react";
import CurrencyAmount from "@/components/common/CurrencyAmount";
import CreateAccountDialog from "@/features/accounts/components/create-account-dialog";



export default async function AccountsPage() {
    const accounts = await getAccounts();
    const totalBalance = accounts.reduce(
        (sum, account) => sum + Number(account.openingBalance),
        0
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
                <div className="rounded-xl border border-dashed p-12 text-center">
                    <h2 className="text-lg font-semibold">
                        No accounts found
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        Create your first account to start tracking your finances.
                    </p>
                </div>
            ) : (
                <>
                <StatCard
                    title="Total Balance"
                    value={<CurrencyAmount amount={totalBalance} currency="INR" />}
                    subtitle={`${accounts.length} Account${accounts.length !== 1 ? "s" : ""}`}
                    icon={<Wallet className="h-5 w-5" />}
                />
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            name={account.name}
                            type={account.type}
                            balance={Number(account.openingBalance)}
                        />
                    ))}
                </div>
            </>
            )}
        </main>
    );
}

