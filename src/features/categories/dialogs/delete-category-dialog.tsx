"use client";

import { useEffect, useState } from "react";
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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    SelectGroup,
    SelectLabel,
    SelectSeparator,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { deleteCategory } from "../actions/delete-category";
import { getCategoryDeleteDialogData } from "../actions/get-category-delete-dialog-data";
import { CategoryType } from "@prisma/client";

interface DeleteCategoryDialogProps {
    categoryId: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

interface DeleteDialogData {
    category: {
        id: string;
        name: string;
        type: string;
    };
    transactionCount: number;
    budgetCount: number;
    childCount: number;
    replacementCategories: {
        value: string;
        label: string;
        type: CategoryType;
    }[];
}

export default function DeleteCategoryDialog({
    categoryId,
    disabled = false,
    children,
}: DeleteCategoryDialogProps) {
    const router = useRouter();

    const [open, setOpen] = useState(false);

    const [loading, setLoading] =
        useState(false);

    const [dialogData, setDialogData] =
        useState<DeleteDialogData | null>(
            null
        );

    const [
        replacementCategoryId,
        setReplacementCategoryId,
    ] = useState("");

    useEffect(() => {
        if (!open) return;

        async function load() {
            setLoading(true);

            const result =
                await getCategoryDeleteDialogData(
                    categoryId
                );

            if (!result.success) {
                toast.error(result.message);

                setOpen(false);

                setLoading(false);

                return;
            }

            setDialogData(
                result.data as DeleteDialogData
            );

            setLoading(false);
        }

        load();
    }, [open, categoryId]);

    async function handleDelete() {
        if (!dialogData) return;

        setLoading(true);

        const result =
            await deleteCategory({
                categoryId,

                replacementCategoryId:
                    replacementCategoryId ||
                    undefined,
            });

        setLoading(false);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setDialogData(null);
        setReplacementCategoryId("");

        setOpen(false);

        router.refresh();
    }

    const deleteDisabled =
        loading ||
        !dialogData ||
        dialogData.childCount > 0 ||
        dialogData.budgetCount > 0 ||
        (dialogData.transactionCount > 0 &&
            !replacementCategoryId);

    return (
        <AlertDialog
            open={open}
            onOpenChange={(value) => {
                setOpen(value);

                if (!value) {
                    setDialogData(null);
                    setReplacementCategoryId("");
                }
            }}
        >
            <AlertDialogTrigger asChild>
                {children ?? (
                    <Button
                        variant="destructive"
                        disabled={disabled}
                    >
                        Delete
                    </Button>
                )}
            </AlertDialogTrigger>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Delete Category
                    </AlertDialogTitle>

                    <AlertDialogDescription className="sr-only">
                        Delete category confirmation dialog.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="mt-4 space-y-4">
                    {loading && (
                        <p className="text-sm text-muted-foreground">
                            Loading category information...
                        </p>
                    )}

                    {!loading && dialogData && (
                        <>
                            <div>
                                <h4 className="font-medium">
                                    {dialogData.category.name}
                                </h4>
                            </div>

                            {dialogData.childCount > 0 && (
                                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm">
                                    Delete child categories before deleting this category.
                                </div>
                            )}

                            {dialogData.budgetCount > 0 && (
                                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm">
                                    This category is currently used in one or more budgets.
                                    Remove it from those budgets before deleting.
                                </div>
                            )}

                            {dialogData.childCount === 0 &&
                                dialogData.budgetCount === 0 &&
                                dialogData.transactionCount === 0 && (
                                    <p className="text-sm text-muted-foreground">
                                        This category isn't used by any transactions and will
                                        be permanently deleted.
                                    </p>
                                )}

                            {dialogData.childCount === 0 &&
                                dialogData.budgetCount === 0 &&
                                dialogData.transactionCount > 0 && (
                                <div className="space-y-4">

                                    <p className="text-sm text-muted-foreground">
                                        This category is currently assigned to{" "}
                                        <span className="font-semibold text-foreground">
                                            {dialogData.transactionCount}
                                        </span>{" "}
                                        transaction
                                        {dialogData.transactionCount !== 1 ? "s" : ""}.
                                    </p>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">
                                            Move transactions to
                                        </label>

                                        <Select
                                            value={replacementCategoryId}
                                            onValueChange={
                                                setReplacementCategoryId
                                            }
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select a category" />
                                            </SelectTrigger>

                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Expense Categories
                                                    </SelectLabel>

                                                    {dialogData.replacementCategories
                                                        .filter(
                                                            (category) =>
                                                                category.type ===
                                                                "EXPENSE"
                                                        )
                                                        .map((category) => (
                                                            <SelectItem
                                                                key={category.value}
                                                                value={
                                                                    category.value
                                                                }
                                                            >
                                                                {category.label}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>

                                                <SelectSeparator />

                                                <SelectGroup>
                                                    <SelectLabel>
                                                        Income Categories
                                                    </SelectLabel>

                                                    {dialogData.replacementCategories
                                                        .filter(
                                                            (category) =>
                                                                category.type ===
                                                                "INCOME"
                                                        )
                                                        .map((category) => (
                                                            <SelectItem
                                                                key={category.value}
                                                                value={
                                                                    category.value
                                                                }
                                                            >
                                                                {category.label}
                                                            </SelectItem>
                                                        ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                </div>
                            )}
                        </>
                    )}
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        disabled={deleteDisabled}
                        onClick={(e) => {
                            e.preventDefault();

                            handleDelete();
                        }}
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}