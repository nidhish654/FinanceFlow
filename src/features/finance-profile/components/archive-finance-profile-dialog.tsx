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

import { archiveFinanceProfile } from "../actions/archive-finance-profile";

interface ArchiveFinanceProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profileId: string;
    disabled?: boolean;
}

export default function ArchiveFinanceProfileDialog({
    open,
    onOpenChange,
    profileId,
    disabled = false,
}: ArchiveFinanceProfileDialogProps) {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    async function handleArchive() {
        setLoading(true);

        const result =
            await archiveFinanceProfile(
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
                            handleArchive();
                        }}
                    >
                        {loading
                            ? "Archiving..."
                            : "Archive"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}