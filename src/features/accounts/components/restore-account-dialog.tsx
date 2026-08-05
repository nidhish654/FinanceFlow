"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { restoreAccount } from "../actions/restore-account";

interface RestoreAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    accountId: string;
    accountName: string;
}

export default function RestoreAccountDialog({
    open,
    onOpenChange,
    accountId,
    accountName,
}: RestoreAccountDialogProps) {
    const [isPending, setIsPending] = useState(false);

    async function handleRestore() {
        setIsPending(true);

        const result = await restoreAccount(accountId);

        setIsPending(false);

        if (result.success) {
            toast.success(result.message);
            onOpenChange(false);
        } else {
            toast.error(result.message);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Restore Account</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to restore{" "}
                        <span className="font-semibold text-foreground">
                            {accountName}
                        </span>
                        ?
                        <br />
                        <br />
                        This account will become active again and will be available for new transactions.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleRestore}
                        disabled={isPending}
                    >
                        {isPending ? (
                            "Restoring..."
                        ) : (
                            <>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Restore Account
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
