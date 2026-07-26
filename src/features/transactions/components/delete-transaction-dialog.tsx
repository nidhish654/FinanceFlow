"use client";

import { useTransition } from "react";

import { toast } from "sonner";

import {
    AlertTriangle,
    Trash2,
} from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteTransaction } from "../actions/delete-transaction";
import { TransactionDto } from "../types/transaction";

interface DeleteTransactionDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    transaction: TransactionDto;
}

export default function DeleteTransactionDialog({
    open,
    onOpenChange,
    transaction,
}: DeleteTransactionDialogProps) {
    const [isPending, startTransition] =
        useTransition();

    function handleDelete() {
        startTransition(async () => {
            const result =
                await deleteTransaction(transaction.id);

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            onOpenChange(false);
        });
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                        <AlertTriangle className="h-6 w-6 text-destructive" />
                    </div>

                    <AlertDialogTitle className="text-center">
                        Delete Transaction
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-center">
                        Are you sure you want to delete this
                        transaction?
                        <br />
                        <span className="mt-2 block font-medium text-foreground">
                            "{transaction.description ||
                                "Untitled Transaction"}"
                        </span>
                        <span className="mt-1 block text-sm">
                            This action cannot be undone.
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isPending}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={isPending}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />

                        {isPending
                            ? "Deleting..."
                            : "Delete Transaction"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}