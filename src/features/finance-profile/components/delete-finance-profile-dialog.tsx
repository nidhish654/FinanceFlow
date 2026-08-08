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

import { deleteFinanceProfile } from "../actions/delete-finance-profile";

interface DeleteFinanceProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    profileId: string;
    disabled?: boolean;
}

export default function DeleteFinanceProfileDialog({
    open,
    onOpenChange,
    profileId,
    disabled = false,
}: DeleteFinanceProfileDialogProps) {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    async function handleDelete() {
        setLoading(true);

        const result =
            await deleteFinanceProfile(profileId);

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
                        Permanently Delete?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be
                        undone.

                        <br />
                        <br />

                        The finance profile must
                        already be archived and
                        contain no accounts.
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
                            handleDelete();
                        }}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}