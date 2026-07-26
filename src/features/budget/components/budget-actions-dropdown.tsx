"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
    MoreHorizontal,
    Pencil,
    Archive,
    RotateCcw,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

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

import { archiveBudget } from "../actions/archive-budget";
import { restoreBudget } from "../actions/restore-budget";
import { deleteBudget } from "../actions/delete-budget";

import EditBudgetDialog from "./edit-budget-dialog";

import { BudgetFormData } from "../types/budget";

import { SelectOption } from "@/components/forms/SelectField";

interface BudgetActionsDropdownProps {
    budgetId: string;

    archived: boolean;

    defaultValues: Partial<BudgetFormData>;

    currency: string;

    categoryOptions: SelectOption[];
}

export default function BudgetActionsDropdown({
    budgetId,
    archived,
    defaultValues,
    currency,
    categoryOptions,
}: BudgetActionsDropdownProps) {
    const router = useRouter();

    const [pending, startTransition] =
        useTransition();

    async function handleArchive() {
        startTransition(async () => {
            const result = archived
                ? await restoreBudget(budgetId)
                : await archiveBudget(budgetId);

            if (!result.success) {
                toast.error(result.message);

                return;
            }

            toast.success(result.message);

            router.refresh();
        });
    }

    async function handleDelete() {
        startTransition(async () => {
            const result =
                await deleteBudget(
                    budgetId
                );

            if (!result.success) {
                toast.error(result.message);

                return;
            }

            toast.success(result.message);

            router.refresh();
        });
    }

    return (
        <AlertDialog>

            <DropdownMenu>

                <DropdownMenuTrigger asChild>

                    <Button
                        variant="ghost"
                        size="icon"
                    >
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>

                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                >

                    <EditBudgetDialog
                        budgetId={budgetId}
                        defaultValues={defaultValues}
                        currency={currency}
                        categoryOptions={categoryOptions}
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <Pencil className="mr-2 h-4 w-4" />

                                Edit
                            </DropdownMenuItem>
                        }
                    />

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        disabled={pending}
                        onClick={
                            handleArchive
                        }
                    >
                        {archived ? (
                            <>
                                <RotateCcw className="mr-2 h-4 w-4" />

                                Restore
                            </>
                        ) : (
                            <>
                                <Archive className="mr-2 h-4 w-4" />

                                Archive
                            </>
                        )}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <AlertDialogTrigger asChild>

                        <DropdownMenuItem
                            className="text-destructive"
                            onSelect={(e) =>
                                e.preventDefault()
                            }
                        >
                            <Trash2 className="mr-2 h-4 w-4" />

                            Delete
                        </DropdownMenuItem>

                    </AlertDialogTrigger>

                </DropdownMenuContent>

            </DropdownMenu>

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>
                        Delete Budget?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        This action cannot be
                        undone.
                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={
                            handleDelete
                        }
                    >
                        Delete
                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>
    );
}