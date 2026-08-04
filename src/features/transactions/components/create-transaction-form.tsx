"use client";

import { useRouter } from "next/navigation";

import { SelectOption } from "@/components/forms/SelectField";

import TransactionForm from "./transaction-form";

import { createTransaction } from "../actions/create-transaction";
import { TransactionFormInput } from "../schemas/transaction.schema";

interface CreateTransactionFormProps {
    accountOptions: SelectOption[];
    categoryOptions: SelectOption[];
    defaultAccountId?: string | null;
}

export default function CreateTransactionForm({
    accountOptions,
    categoryOptions,
    defaultAccountId,
}: CreateTransactionFormProps) {
    const router = useRouter();

    async function handleSubmit(
        values: TransactionFormInput
    ) {
        const result =
            await createTransaction(values);

        if (result.success) {
            router.push("/transactions");
            router.refresh();
            return;
        }

        console.error(result.message);
    }

    return (
        <TransactionForm
            accountOptions={accountOptions}
            categoryOptions={categoryOptions}
            submitLabel="Create Transaction"
            onSubmit={handleSubmit}
            defaultValues={defaultAccountId ? { accountId: defaultAccountId } : undefined}
        />
    );
}