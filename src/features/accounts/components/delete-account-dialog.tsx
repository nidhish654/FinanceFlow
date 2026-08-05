"use client";

import { useTransition, useState } from "react";
import { toast } from "sonner";

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
import { Button } from "@/components/ui/button";

import { deleteAccount } from "../actions/delete-account";
import { archiveAccount } from "../actions/archive-account";

interface DeleteAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    accountId: string;
    accountName: string;
}

export default function DeleteAccountDialog({
    open,
    onOpenChange,
    accountId,
    accountName,
}: DeleteAccountDialogProps) {
    const [isPending, startTransition] = useTransition();
    const [hasTransactions, setHasTransactions] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Reset state when opened
    if (open && hasTransactions && !isPending) {
        setHasTransactions(false);
    }

    function handleDelete() {
        startTransition(async () => {
            const result = await deleteAccount(accountId);

            if (result.success) {
                toast.success(result.message);
                onOpenChange(false);
            } else if (result.reason === "HAS_TRANSACTIONS") {
                setHasTransactions(true);
                setErrorMessage(result.message);
            } else {
                toast.error(result.message);
            }
        });
    }

    function handleArchiveInstead() {
        startTransition(async () => {
            const result = await archiveAccount(accountId);
            if (result.success) {
                toast.success(result.message);
                onOpenChange(false);
            } else {
                toast.error(result.message);
            }
        });
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {hasTransactions ? "Cannot Delete" : "Delete Account?"}
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        {hasTransactions ? (
                            <>
                                {errorMessage}
                                <br />
                                <br />
                                Archive it instead to hide it from menus while keeping your historical data.
                            </>
                        ) : (
                            <>
                                Are you sure you want to delete{" "}
                                <strong>{accountName}</strong>?
                                <br />
                                <br />
                                This action cannot be undone.
                            </>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={isPending}
                    >
                        Cancel
                    </AlertDialogCancel>

                    {hasTransactions ? (
                        <Button
                            onClick={handleArchiveInstead}
                            disabled={isPending}
                        >
                            {isPending ? "Archiving..." : "Archive Account"}
                        </Button>
                    ) : (
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            {isPending
                                ? "Deleting..."
                                : "Delete"}
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}