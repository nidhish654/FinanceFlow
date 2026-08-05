import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import TransactionTable from "@/features/transactions/components/transaction-table";
import TransactionEmptyState from "@/features/transactions/components/transaction-empty-state";

import { getTransactions } from "@/features/transactions/services/get-transactions";
import { getAccounts } from "@/features/accounts/actions/getAccounts";
import { getCategories } from "@/features/categories/services/get-categories";

export default async function TransactionsPage() {
    const [
        transactions,
        accounts,
        categories,
    ] = await Promise.all([
        getTransactions(),
        getAccounts(),
        getCategories(),
    ]);

    const openingBalance = accounts.reduce(
        (sum, account) =>
            sum + Number(account.openingBalance),
        0
    );

    const income = transactions
        .filter((t) => t.type === "INCOME")
        .reduce(
            (sum, t) => sum + t.amount,
            0
        );

    const expenses = transactions
        .filter((t) => t.type === "EXPENSE")
        .reduce(
            (sum, t) => sum + t.amount,
            0
        );

    const currentBalance =
        openingBalance +
        income -
        expenses;

    const accountOptions = accounts.map(
        (account) => ({
            value: account.id,
            label: account.name,
        })
    );

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name,
        type: category.type,
        parentCategoryId: category.parentCategoryId,
    }));

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Transactions
                    </h1>

                    <p className="text-muted-foreground">
                        View, manage and organize all your financial
                        transactions.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/transactions/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Transaction
                    </Link>
                </Button>
            </div>

            {transactions.length === 0 ? (
                <TransactionEmptyState variant="empty" />
            ) : (
                <TransactionTable
                    transactions={transactions}
                    currentBalance={currentBalance}
                    accountOptions={accountOptions}
                    categoryOptions={categoryOptions}
                    rawAccounts={accounts}
                    rawCategories={categories}
                />
            )}
        </div>
    );
}