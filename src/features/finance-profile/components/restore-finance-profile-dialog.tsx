"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

import { restoreFinanceProfile } from "../actions/restore-finance-profile";

interface RestoreFinanceProfileDialogProps {
    profileId: string;
    disabled?: boolean;
}

export default function RestoreFinanceProfileDialog({
    profileId,
    disabled = false,
}: RestoreFinanceProfileDialogProps) {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] =
        useState(false);

    async function handleRestore() {
        setLoading(true);

        const result =
            await restoreFinanceProfile(
                profileId
            );

        setLoading(false);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setOpen(false);

        router.refresh();
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild>
                <Button
                    variant="destructive"
                    disabled={disabled}
                >
                    Restore
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Archive Finance Profile?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This profile will be hidden
                        from your active finance
                        profiles.

                        <br />
                        <br />

                        You can restore it later.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={loading}
                        onClick={(e) => {
                            e.preventDefault();
                            handleRestore();
                        }}
                    >
                        {loading
                            ? "Archiving..."
                            : "Restore"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}