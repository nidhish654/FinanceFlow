"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";

import GoalDialog from "./goal-dialog";
import GoalForm from "./goal-form";

import { createGoal } from "../actions/create-goal";

import { GoalFormData } from "../types/goal";

interface AddGoalDialogProps {
    trigger: React.ReactNode;

    currency: string;
}

export default function AddGoalDialog({
    trigger,
    currency,
}: AddGoalDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    async function handleSubmit(
        values: GoalFormData
    ) {
        try {
            const result =
                await createGoal(values);

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to create goal."
                );

                return;
            }

            toast.success(
                "Goal created successfully."
            );

            setOpen(false);

            router.refresh();
        } catch {
            toast.error(
                "Something went wrong."
            );
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <GoalDialog
                title="Create Goal"
                description="Create a new savings goal."
            >
                <GoalForm
                    submitLabel="Create Goal"
                    currency={currency}
                    onSubmit={
                        handleSubmit
                    }
                />
            </GoalDialog>
        </Dialog>
    );
}