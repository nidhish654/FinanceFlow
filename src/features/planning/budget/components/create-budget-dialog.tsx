"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import BudgetDialog from "./budget-dialog";
import BudgetForm from "./budget-form";

import { BudgetFormData } from "../types/budget";

import { createBudget } from "../actions/create-budget";

import { SelectOption } from "@/components/forms/SelectField";

interface CreateBudgetDialogProps {
    currency: string;

    categoryOptions: SelectOption[];

    trigger?: React.ReactNode;
}

export default function CreateBudgetDialog({
    currency,
    categoryOptions,
    trigger,
}: CreateBudgetDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    async function handleSubmit(
        values: BudgetFormData
    ) {
        try {
            const result =
                await createBudget(values);

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to create budget."
                );

                return;
            }

            toast.success(
                "Budget created successfully."
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
                {trigger ?? (
                    <Button>
                        Create Budget
                    </Button>
                )}
            </DialogTrigger>

            <BudgetDialog
                title="Create Budget"
                description="Create a new budget to monitor your spending."
            >
                <BudgetForm
                    currency={currency}
                    categoryOptions={
                        categoryOptions
                    }
                    submitLabel="Create Budget"
                    onSubmit={
                        handleSubmit
                    }
                />
            </BudgetDialog>
        </Dialog>
    );
}