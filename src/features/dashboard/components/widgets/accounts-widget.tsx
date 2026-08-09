"use client";

import DashboardWidgetCard from "./dashboard-widget-card";

import { Button } from "@/components/ui/button";

import { AccountDto } from "@/features/accounts/types/account";

import {
    formatCurrency,
} from "../../lib/dashboard-formatters";

import {
    getAccountTypeConfig,
} from "@/features/accounts/constants/account-icons";

import Link from "next/link";

interface AccountsWidgetProps {
    accounts: AccountDto[];
    currency: string;
}

export default function AccountsWidget({
    accounts,
    currency,
}: AccountsWidgetProps) {
    const recentAccounts = accounts.slice(0, 5);

    return (
        <DashboardWidgetCard
            title="Accounts"
            description="Current balances across your accounts."
            actions={
                <Button asChild variant="link" size="sm">
                    <Link href="/accounts">
                        View all
                    </Link>
                </Button>
            }
        >
            {recentAccounts.length === 0 ? (
                <div
                    className="
                        flex
                        h-40
                        items-center
                        justify-center
                        text-sm
                        text-muted-foreground
                    "
                >
                    No accounts found.
                </div>
            ) : (
                <div className="space-y-4">
                    {recentAccounts.map((account) => {
                        const {
                            icon: Icon,
                            iconClassName,
                        } = getAccountTypeConfig(
                            account.type
                        );

                        return (
                            <div
                                key={account.id}
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    gap-4
                                "
                            >
                                {/* Left */}

                                <div className="flex min-w-0 items-center gap-3">

                                    <div
                                        className={`
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-full
                                            ${iconClassName}
                                        `}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">

                                        <p className="truncate font-medium">
                                            {account.name}
                                        </p>

                                        <p
                                            className="
                                                text-xs
                                                text-muted-foreground
                                            "
                                        >
                                            {account.type.replaceAll(
                                                "_",
                                                " "
                                            )}
                                        </p>

                                    </div>

                                </div>

                                {/* Right */}

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        tabular-nums
                                    "
                                >
                                    {formatCurrency(
                                        account.currentBalance,
                                        currency
                                    )}
                                </p>

                            </div>
                        );
                    })}
                </div>
            )}
        </DashboardWidgetCard>
    );
}