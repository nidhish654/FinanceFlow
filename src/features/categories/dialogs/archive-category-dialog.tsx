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

import { archiveCategory } from "../actions/archive-category";

import { DialogTrigger } from "@/components/ui/dialog";

interface ArchiveCategoryDialogProps {
    categoryId: string;

    disabled?: boolean;

    children?: React.ReactNode;
}

export default function ArchiveCategoryDialog({
    categoryId,
    disabled = false,
    children,
}: ArchiveCategoryDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    const [loading, setLoading] =
        useState(false);

    async function handleArchive() {
        setLoading(true);

        const result =
            await archiveCategory(
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
                    <Button
                        variant="destructive"
                        disabled={disabled}
                    >
                        Archive
                    </Button>
                )}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Archive Category?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This category will no
                        longer appear when
                        creating transactions.

                        <br />
                        <br />

                        You can restore it
                        later.
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