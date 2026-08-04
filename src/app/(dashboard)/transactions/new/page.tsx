import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import CreateTransactionForm from "@/features/transactions/components/create-transaction-form";

import { getAccountOptions } from "@/services/options/account-options.service";
import { getCategoryOptions } from "@/services/options/category-options.service";
import { getSettings } from "@/features/settings/services/get-settings";

export default async function NewTransactionPage() {
    const [accountOptions, categoryOptions, settings] =
        await Promise.all([
            getAccountOptions(),
            getCategoryOptions(),
            getSettings()
        ]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        New Transaction
                    </h1>

                    <p className="text-muted-foreground">
                        Create a new income,
                        expense or transfer.
                    </p>
                </div>

                <Button
                    asChild
                    variant="outline"
                >
                    <Link href="/transactions">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>

            <CreateTransactionForm
                accountOptions={accountOptions}
                categoryOptions={categoryOptions}
                defaultAccountId={settings?.defaultAccountId}
            />
        </div>
    );
}