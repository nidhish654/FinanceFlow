"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Category } from "@prisma/client";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import CategoryForm from "../components/category-form";

import { updateCategory } from "../actions/update-category";

import type { CategoryFormInput } from "../schemas/category.schema";


interface EditCategoryDialogProps {
    category: Category;
    children?: React.ReactNode;
}

export default function EditCategoryDialog({
    category,
    children,
}: EditCategoryDialogProps) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const isSubcategory = !!category.parentCategoryId;

    async function handleUpdate(
        values: CategoryFormInput
    ) {
        const result =
            await updateCategory(
                category.id,
                values
            );

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setOpen(false);

        router.refresh();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                {children ?? (
                    <Button variant="outline">
                        Edit
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Category
                    </DialogTitle>
                </DialogHeader>

                <CategoryForm
                    defaultValues={{
                        name: category.name,
                        description:
                            category.description ??
                            "",
                        type: category.type,
                        icon:
                            category.icon ?? "",
                        color:
                            category.color ??
                            "#6366F1",
                        parentCategoryId: category.parentCategoryId ?? undefined,
                    }}
                    submitLabel="Save Changes"
                    onSubmit={handleUpdate}
                    isSubcategory={isSubcategory}
                />
            </DialogContent>
        </Dialog>
    );
}