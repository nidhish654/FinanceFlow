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

import { deleteGoal } from "../actions/delete-goal";

interface DeleteGoalDialogProps {
    goalId: string;

    goalName: string;

    trigger: React.ReactNode;
}

export default function DeleteGoalDialog({
    goalId,
    goalName,
    trigger,
}: DeleteGoalDialogProps) {
    const router = useRouter();

    const [loading, setLoading] =
        useState(false);

    async function handleDelete() {
        try {
            setLoading(true);

            const result =
                await deleteGoal(goalId);

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to delete goal."
                );

                return;
            }

            toast.success(
                "Goal deleted successfully."
            );

            router.refresh();
        } catch {
            toast.error(
                "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {trigger}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Goal?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Are you sure you want
                        to delete{" "}
                        <span className="font-medium text-foreground">
                            {goalName}
                        </span>
                        ? This action cannot
                        be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel
                        disabled={loading}
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault();
                            handleDelete();
                        }}
                        disabled={loading}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete Goal"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}