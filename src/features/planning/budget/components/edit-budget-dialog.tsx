"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog";

import BudgetDialog from "./budget-dialog";
import BudgetForm from "./budget-form";

import { updateBudget } from "../actions/update-budget";

import { BudgetFormData } from "../types/budget";

import { SelectOption } from "@/components/forms/SelectField";

interface EditBudgetDialogProps {
    budgetId: string;

    defaultValues: Partial<BudgetFormData>;

    currency: string;

    categoryOptions: SelectOption[];

    trigger: React.ReactNode;
}

export default function EditBudgetDialog({
    budgetId,
    defaultValues,
    currency,
    categoryOptions,
    trigger,
}: EditBudgetDialogProps) {
    const router = useRouter();

    const [open, setOpen] =
        useState(false);

    async function handleSubmit(
        values: BudgetFormData
    ) {
        try {
            const result =
                await updateBudget(
                    budgetId,
                    values
                );

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to update budget."
                );

                return;
            }

            toast.success(
                "Budget updated successfully."
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

            <BudgetDialog
                title="Edit Budget"
                description="Update your budget details."
            >
                <BudgetForm
                    defaultValues={
                        defaultValues
                    }
                    currency={currency}
                    categoryOptions={
                        categoryOptions
                    }
                    submitLabel="Save Changes"
                    onSubmit={
                        handleSubmit
                    }
                />
            </BudgetDialog>
        </Dialog>
    );
}