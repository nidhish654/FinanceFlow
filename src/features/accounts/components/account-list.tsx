"use client";

import { useMemo, useState } from "react";
import CardSelector from "@/components/common/CardSelector";
import AccountCard from "./account-card";
import { AccountDto } from "../types/account";
import { WalletCards } from "lucide-react";
import CreateAccountDialog from "./create-account-dialog";

interface AccountListProps {
    accounts: AccountDto[];
}

export default function AccountList({ accounts }: AccountListProps) {
    const [view, setView] = useState<"active" | "archived">("active");

    const activeAccounts = useMemo(() => accounts.filter((a) => !a.isArchived), [accounts]);
    const archivedAccounts = useMemo(() => accounts.filter((a) => a.isArchived), [accounts]);

    const displayedAccounts = view === "active" ? activeAccounts : archivedAccounts;

    return (
        <div className="space-y-12">
            <CardSelector
                items={[
                    {
                        value: "active",
                        label: "Active",
                        count: activeAccounts.length,
                    },
                    {
                        value: "archived",
                        label: "Archived",
                        count: archivedAccounts.length,
                    },
                ]}
                value={view}
                onValueChange={setView}
            />

            {displayedAccounts.length === 0 ? (
                <div
                    className="
                        flex flex-col items-center justify-center
                        rounded-xl border border-dashed
                        bg-card
                        px-8 py-20
                        text-center
                    "
                >
                    {view === "active" ? (
                        <>
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
                                No active accounts.
                            </h2>

                            <p
                                className="
                                    mt-4
                                    max-w-md
                                    text-sm leading-7
                                    text-muted-foreground
                                "
                            >
                                Create your first account. Add your bank accounts, cash, credit cards,
                                savings accounts, and digital wallets to see all your
                                balances in one place.
                            </p>

                            <div className="mt-8">
                                <CreateAccountDialog />
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <h2 className="text-xl font-semibold">No archived accounts.</h2>
                        </div>
                    )}
                </div>
            ) : (
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
                    {displayedAccounts.map((account) => (
                        <AccountCard key={account.id} account={account} />
                    ))}
                </div>
            )}
        </div>
    );
}
