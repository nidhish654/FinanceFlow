"use client";

import { ReactNode, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import GoalMoneyForm from "./goal-money-form";

import { addMoney } from "../actions/add-money";

import {
    GoalMoneySchema,
} from "../schemas/goal-money-schema";

interface AddMoneyDialogProps {
    goalId: string;

    goalName: string;

    trigger: ReactNode;
}

export default function AddMoneyDialog({
    goalId,
    goalName,
    trigger,
}: AddMoneyDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    async function handleSubmit(
        values: GoalMoneySchema
    ) {
        try {
            const result =
                await addMoney(
                    goalId,
                    values
                );

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to add money."
                );

                return;
            }

            toast.success(
                "Money added successfully."
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

            <DialogContent className="sm:max-w-md">

                <DialogHeader>

                    <DialogTitle
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <Plus className="h-5 w-5" />

                        Add Money

                    </DialogTitle>

                    <DialogDescription>

                        Add money to{" "}
                        <span className="font-medium">
                            {goalName}
                        </span>

                    </DialogDescription>

                </DialogHeader>

                <GoalMoneyForm
                    mode="deposit"
                    submitLabel="Add Money"
                    onSubmit={handleSubmit}
                />

            </DialogContent>

        </Dialog>
    );
}