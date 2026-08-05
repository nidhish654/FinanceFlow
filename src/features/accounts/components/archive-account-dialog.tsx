"use client";

import { useState } from "react";
import { Archive } from "lucide-react";
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
import { archiveAccount } from "../actions/archive-account";

interface ArchiveAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    accountId: string;
    accountName: string;
}

export default function ArchiveAccountDialog({
    open,
    onOpenChange,
    accountId,
    accountName,
}: ArchiveAccountDialogProps) {
    const [isPending, setIsPending] = useState(false);

    async function handleArchive() {
        setIsPending(true);

        const result = await archiveAccount(accountId);

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
                    <DialogTitle>Archive Account</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to archive{" "}
                        <span className="font-semibold text-foreground">
                            {accountName}
                        </span>
                        ?
                        <br />
                        <br />
                        This account will be hidden from selections when creating new transactions,
                        but its historical data will remain intact.
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
                        onClick={handleArchive}
                        disabled={isPending}
                    >
                        {isPending ? (
                            "Archiving..."
                        ) : (
                            <>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive Account
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
