"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType } from "@prisma/client";

import {
    categorySchema,
    CategoryFormInput,
} from "../schemas/category.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import IconPicker from "@/components/common/icon-picker";
import { Textarea } from "@/components/ui/textarea";

import {
    FormField,
    SelectField,
} from "@/components/forms";
import ColorPicker from "@/components/common/color-picker";

const CATEGORY_TYPE_OPTIONS = [
    {
        label: "Income",
        value: CategoryType.INCOME,
    },
    {
        label: "Expense",
        value: CategoryType.EXPENSE,
    },
];

interface CategoryFormProps {
    defaultValues?: Partial<CategoryFormInput>;

    submitLabel?: string;

    onSubmit: (
        values: CategoryFormInput
    ) => Promise<void>;
}

export default function CategoryForm({
    defaultValues,
    submitLabel = "Create Category",
    onSubmit,
}: CategoryFormProps) {
    const form = useForm<CategoryFormInput>({
        resolver: zodResolver(categorySchema),

        defaultValues: {
            name: "",
            description: "",
            type: CategoryType.EXPENSE,
            icon: "utensils-crossed",
            color: "#6366F1",

            ...defaultValues,
        },
    });

    const {
        register,
        control,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = form;

    async function handleFormSubmit(
        values: CategoryFormInput
    ) {
        await onSubmit(values);

        form.reset();
    }

    return (
        <form
            onSubmit={handleSubmit(
                handleFormSubmit
            )}
            className="space-y-5"
        >
            <FormField
                label="Category Name"
                required
                error={errors.name?.message}
            >
                <Input
                    placeholder="Food & Dining"
                    {...register("name")}
                />
            </FormField>

            <FormField
                label="Description"
                error={errors.description?.message}
            >
                <Textarea
                    rows={3}
                    placeholder="Optional"
                    {...register("description")}
                />
            </FormField>

            <Controller
                control={control}
                name="type"
                render={({ field }) => (
                    <FormField
                        label="Category Type"
                        required
                        error={
                            errors.type?.message
                        }
                    >
                        <SelectField
                            value={field.value}
                            onValueChange={
                                field.onChange
                            }
                            placeholder="Select category type"
                            options={
                                CATEGORY_TYPE_OPTIONS
                            }
                        />
                    </FormField>
                )}
            />

            <Controller
                control={control}
                name="icon"
                render={({ field }) => (
                    <FormField
                        label="Category Icon"
                        error={errors.icon?.message}
                    >
                        <IconPicker
                            value={field.value}
                            onChange={field.onChange}
                        />
                    </FormField>
                )}
            />

            <Controller
                control={control}
                name="color"
                render={({ field }) => (
                    <FormField
                        label="Accent Color"
                        error={errors.color?.message}
                    >
                        <ColorPicker
                            value={field.value}
                            onChange={field.onChange}
                        />
                    </FormField>
                )}
            />

            <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
            >
                {isSubmitting
                    ? "Saving..."
                    : submitLabel}
            </Button>
        </form>
    );
}