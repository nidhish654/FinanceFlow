"use client";

import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { BudgetPeriod } from "@prisma/client";

import {
    BudgetFormData,
} from "../types/budget";

import {
    budgetSchema,
    type BudgetSchema,
} from "../schemas/budget-schema";

import {
    buildBudgetPreview,
} from "../lib/budget-preview";

import BudgetFormFields from "./budget-form-fields";
import BudgetPreview from "./budget-preview";

import { Button } from "@/components/ui/button";

import {
    SelectOption,
} from "@/components/forms/SelectField";

import BudgetInsightCard from "./budget-insight-card";

interface BudgetFormProps {
    defaultValues?: Partial<BudgetFormData>;

    submitLabel?: string;

    currency: string;

    categoryOptions: SelectOption[];

    onSubmit: (
        values: BudgetSchema
    ) => Promise<void>;
}

const OVERALL_CATEGORY: SelectOption = {
    label: "Overall Budget",
    value: "",
};

export default function BudgetForm({
    defaultValues,
    submitLabel = "Create Budget",
    currency,
    categoryOptions,
    onSubmit,
}: BudgetFormProps) {
    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<BudgetFormData>({
        resolver: zodResolver(
            budgetSchema
        ),

        defaultValues: {
            categoryId: "",

            amount: undefined,

            period:
                BudgetPeriod.MONTHLY,

            startDate:
                new Date(),

            endDate:
                new Date(),

            notes: "",

            ...defaultValues,
        },
    });

    const values = watch();

    const {
        amount,
        period,
        categoryId,
        startDate,
        endDate,
        notes,
    } = values;

    const selectedCategory =
        useMemo(() => {
            if (!categoryId) {
                return OVERALL_CATEGORY;
            }

            return (
                categoryOptions.find(
                    (
                        category
                    ) =>
                        category.value ===
                        categoryId
                ) ??
                OVERALL_CATEGORY
            );
        }, [
            categoryId,
            categoryOptions,
        ]);

    const preview =
        useMemo(
            () =>
                buildBudgetPreview({
                    categoryId:
                        categoryId ||
                        null,

                    categoryName:
                        selectedCategory.label,

                    notes,

                    amount:
                        Number.isFinite(
                            amount
                        )
                            ? amount
                            : 0,

                    currency,

                    period,

                    startDate,

                    endDate,
                }),
            [
                amount,
                categoryId,
                currency,
                endDate,
                notes,
                period,
                selectedCategory,
                startDate,
            ]
        );

    async function submit(
        values: BudgetSchema
    ) {
        await onSubmit(values);

        if (!defaultValues) {
            reset({
                categoryId: "",

                amount:
                    undefined,

                period:
                    BudgetPeriod.MONTHLY,

                startDate:
                    new Date(),

                endDate:
                    new Date(),

                notes: "",
            });
        }
    }

        return (
            <form
                onSubmit={handleSubmit(submit)}
                className="
                    flex
                    flex-col
                    gap-8
                    xl:grid
                    xl:grid-cols-2
                    xl:items-start
                "
            >
                {/* ================= Left ================= */}

                <div className="space-y-6">

                    <BudgetFormFields
                        register={register}
                        control={control}
                        errors={errors}
                        categoryOptions={categoryOptions}
                        startDate={startDate}
                        durationDays={preview.durationDays}
                        previewStartDate={preview.startDate}
                        previewEndDate={preview.endDate}
                    />

                    {/* Desktop only */}
                    <div className="hidden xl:block">

                        <BudgetInsightCard
                            budget={preview}
                        />

                    </div>

                    <div className="border-t pt-4">

                        <div className="hidden xl:flex justify-end pt-4">

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="min-w-40"
                            >
                                {isSubmitting
                                    ? "Saving..."
                                    : submitLabel}
                            </Button>

                        </div>

                    </div>

                </div>

                {/* ================= Right ================= */}

                <div className="space-y-6 xl:sticky xl:top-0">

                    <BudgetPreview
                        budget={preview}
                    />

                    {/* Mobile & Tablet only */}
                    <div className="xl:hidden">

                        <BudgetInsightCard
                            budget={preview}
                        />

                    </div>

                </div>
                <div className="xl:hidden border-t pt-4">

                        <div className="flex justify-end">

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="min-w-40"
                            >
                                {isSubmitting
                                    ? "Saving..."
                                    : submitLabel}
                            </Button>

                        </div>

                </div>

            </form>
        );
}