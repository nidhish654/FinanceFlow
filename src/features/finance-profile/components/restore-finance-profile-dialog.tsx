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
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profileId: string;
    disabled?: boolean;
}

export default function RestoreFinanceProfileDialog({
    open,
    onOpenChange,
    profileId,
    disabled = false,
}: RestoreFinanceProfileDialogProps) {
    const router = useRouter();

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

        onOpenChange(false);

        router.refresh();
    }

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Restore Finance Profile?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This profile will be shown
                        in your active finance
                        profiles.
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