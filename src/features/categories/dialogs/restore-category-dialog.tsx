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

import { restoreCategory } from "../actions/restore-category";
    
import { DialogTrigger } from "@/components/ui/dialog";

interface RestoreCategoryDialogProps {
    categoryId: string;
    children?: React.ReactNode;
}

export default function RestoreCategoryDialog({
    categoryId,
    children,
}: RestoreCategoryDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    async function handleRestore() {
        setLoading(true);

        const result =
            await restoreCategory(
                categoryId
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
                {children ?? (
                    <Button>
                        Restore
                    </Button>
                )}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Restore Category?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This category will
                        become available again
                        for transactions and
                        budgets.
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
                            ? "Restoring..."
                            : "Restore"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}