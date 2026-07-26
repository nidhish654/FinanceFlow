"use client";

import { useRouter } from "next/navigation";

import { toast } from "sonner";

import CategoryForm from "./category-form";

import { createCategory } from "../actions/create-category";
import { CategoryFormInput } from "../schemas/category.schema";

interface CreateCategoryFormProps {
    onSuccess?: () => void;
}

export default function CreateCategoryForm({
    onSuccess,
}: CreateCategoryFormProps) {
    const router = useRouter();

    async function handleSubmit(
        values: CategoryFormInput
    ) {
        const result =
            await createCategory(values);

        if (result.success) {
            toast.success(
                "Category created successfully."
            );

            router.refresh();

            onSuccess?.();

            return;
        }

        toast.error(result.message);
    }

    return (
        <CategoryForm
            submitLabel="Create Category"
            onSubmit={handleSubmit}
        />
    );
}