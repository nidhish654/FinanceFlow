"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import TransactionForm from "./transaction-form";

import { updateTransaction } from "../actions/update-transaction";

import { TransactionDto } from "../types/transaction";

import { SelectOption } from "@/components/forms/SelectField";

import { format } from "date-fns";

interface EditTransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    transaction: TransactionDto;

    accountOptions: SelectOption[];
    categoryOptions: SelectOption[];
}

export default function EditTransactionDialog({
    open,
    onOpenChange,
    transaction,
    accountOptions,
    categoryOptions,
}: EditTransactionDialogProps) {
    const [, startTransition] = useTransition();

    async function handleSubmit(values: any) {
        startTransition(async () => {
            const result = await updateTransaction(
                transaction.id,
                values
            );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            onOpenChange(false);
        });
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-hidden rounded-xl p-0">
                <DialogHeader className="border-b px-5 py-5 md:px-6 md:py-6">
                    <DialogTitle className="text-2xl font-bold md:text-3xl">
                        Edit Transaction
                    </DialogTitle>

                    <DialogDescription className="mt-1 text-sm md:text-base">
                        Update your transaction details.
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[80vh] overflow-y-auto px-4 py-4 md:px-6 md:py-6">
                                        <TransactionForm
                        submitLabel="Save Changes"
                        accountOptions={accountOptions}
                        categoryOptions={categoryOptions}
                        onSubmit={handleSubmit}
                        defaultValues={{
                            accountId: transaction.accountId,

                            transferAccountId:
                                transaction.transferAccountId ??
                                "",

                            categoryId:
                                transaction.categoryId ??
                                "",

                            type: transaction.type,

                            priority:
                                transaction.priority ??
                                undefined,

                            amount: transaction.amount,

                            description:
                                transaction.description ??
                                "",

                            merchant:
                                transaction.merchant ?? "",

                            notes:
                                transaction.notes ?? "",

                            referenceNumber:
                                transaction.referenceNumber ??
                                "",

                            transactionDate: format(
                                new Date(
                                    transaction.transactionDate
                                ),
                                "yyyy-MM-dd"
                            ) as any,
                        }}
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}