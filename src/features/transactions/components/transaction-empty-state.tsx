"use client";

import Link from "next/link";
import { SearchX, ReceiptText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface TransactionEmptyStateProps {
    variant: "empty" | "filtered";
}

export default function TransactionEmptyState({
    variant,
}: TransactionEmptyStateProps) {
    if (variant === "empty") {
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">

                <ReceiptText className="mb-5 h-14 w-14 text-muted-foreground" />

                <h2 className="text-2xl font-semibold">
                    No transactions yet
                </h2>

                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                    Start tracking your income, expenses and transfers by creating your first transaction.
                </p>

                <Button
                    asChild
                    className="mt-6"
                >
                    <Link href="/transactions/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Transaction
                    </Link>
                </Button>

            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed bg-card px-6 py-16 text-center">

            <SearchX className="mb-5 h-14 w-14 text-muted-foreground" />

            <h2 className="text-2xl font-semibold">
                No matching transactions
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
                Try changing your search, filters or date range.
            </p>

        </div>
    );
}