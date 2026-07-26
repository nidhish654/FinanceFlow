"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";

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

    const [open, setOpen] = useState(false);

    const [confirmOpen, setConfirmOpen] =
        useState(false);

    const [pendingValues, setPendingValues] =
        useState<BudgetFormData | null>(null);

    async function handleSubmit(
        values: BudgetFormData
    ) {
        setPendingValues(values);

        setConfirmOpen(true);
    }

    async function handleConfirm() {
        if (!pendingValues) return;

        try {
            const result =
                await createBudget(
                    pendingValues
                );

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

            setConfirmOpen(false);

            setOpen(false);

            setPendingValues(null);

            router.refresh();
        } catch {
            toast.error(
                "Something went wrong."
            );
        }
    }

    return (
        <>
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

                <DialogContent
                    className="
                        flex
                        h-[90vh]
                        max-h-[90vh]
                        max-w-3xl
                        flex-col
                        overflow-hidden
                        p-0
                    "
                >
                    <DialogHeader
                        className="
                            shrink-0
                            border-b
                            px-6
                            py-5
                        "
                    >
                        <DialogTitle>
                            Create Budget
                        </DialogTitle>

                        <DialogDescription>
                            Create a new budget to monitor your
                            spending.
                        </DialogDescription>
                    </DialogHeader>

                    <div
                        className="
                            flex-1
                            overflow-y-auto
                            px-6
                            py-6
                        "
                    >
                        <BudgetForm
                            currency={currency}
                            categoryOptions={categoryOptions}
                            submitLabel="Create Budget"
                            onSubmit={handleSubmit}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <AlertDialog
                open={confirmOpen}
                onOpenChange={
                    setConfirmOpen
                }
            >
                <AlertDialogContent>

                    <AlertDialogHeader>

                        <AlertDialogTitle>
                            Create this budget?
                        </AlertDialogTitle>

                        <AlertDialogDescription>
                            Please confirm that you
                            want to create this
                            budget.
                        </AlertDialogDescription>

                    </AlertDialogHeader>

                    <AlertDialogFooter>

                        <AlertDialogCancel>
                            Cancel
                        </AlertDialogCancel>

                        <AlertDialogAction
                            onClick={
                                handleConfirm
                            }
                        >
                            Create Budget
                        </AlertDialogAction>

                    </AlertDialogFooter>

                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}