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

import { updateGoal } from "../actions/update-goal";

import { GoalFormData } from "../types/goal";

interface EditGoalDialogProps {
    goalId: string;

    currency: string;

    defaultValues: Partial<GoalFormData>;

    trigger: React.ReactNode;
}

export default function EditGoalDialog({
    goalId,
    currency,
    defaultValues,
    trigger,
}: EditGoalDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    async function handleSubmit(
        values: GoalFormData
    ) {
        try {
            const result =
                await updateGoal(
                    goalId,
                    values
                );

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to update goal."
                );

                return;
            }

            toast.success(
                "Goal updated successfully."
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
                title="Edit Goal"
                description="Update your goal details."
            >
                <GoalForm
                    defaultValues={
                        defaultValues
                    }
                    currency={currency}
                    submitLabel="Save Changes"
                    onSubmit={
                        handleSubmit
                    }
                />
            </GoalDialog>
        </Dialog>
    );
}