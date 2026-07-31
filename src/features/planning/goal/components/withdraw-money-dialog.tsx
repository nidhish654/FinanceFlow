"use client";

import { ReactNode, useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import { Minus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import GoalMoneyForm from "./goal-money-form";

import { withdrawMoney } from "../actions/withdraw-money";

import {
    GoalMoneySchema,
} from "../schemas/goal-money-schema";

interface WithdrawMoneyDialogProps {
    goalId: string;

    goalName: string;

    trigger: ReactNode;
}

export default function WithdrawMoneyDialog({
    goalId,
    goalName,
    trigger,
}: WithdrawMoneyDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    async function handleSubmit(
        values: GoalMoneySchema
    ) {
        try {
            const result =
                await withdrawMoney(
                    goalId,
                    values
                );

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to withdraw money."
                );

                return;
            }

            toast.success(
                "Money withdrawn successfully."
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
                            gap-2
                        "
                    >
                        <Minus className="h-5 w-5" />

                        Withdraw Money

                    </DialogTitle>

                    <DialogDescription>

                        Withdraw money from{" "}
                        <span className="font-medium">
                            {goalName}
                        </span>

                    </DialogDescription>

                </DialogHeader>

                <GoalMoneyForm
                    mode="withdraw"
                    submitLabel="Withdraw Money"
                    onSubmit={handleSubmit}
                />

            </DialogContent>

        </Dialog>
    );
}