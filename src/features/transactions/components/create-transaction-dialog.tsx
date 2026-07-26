"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import TransactionForm from "./transaction-form";

import { createTransaction } from "../actions/create-transaction";
import { TransactionFormInput } from "../schemas/transaction.schema";

interface CreateTransactionDialogProps {
    accountOptions: {
        value: string;
        label: string;
    }[];

    categoryOptions: {
        value: string;
        label: string;
    }[];
}

export default function CreateTransactionDialog({
    accountOptions,
    categoryOptions,
}: CreateTransactionDialogProps) {
    const [open, setOpen] = useState(false);

    async function handleSubmit(
        values: TransactionFormInput
    ) {
        const result =
            await createTransaction(values);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button>Add Transaction</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>
                        Create Transaction
                    </DialogTitle>
                </DialogHeader>

                <TransactionForm
                    accountOptions={accountOptions}
                    categoryOptions={categoryOptions}
                    submitLabel="Create Transaction"
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}