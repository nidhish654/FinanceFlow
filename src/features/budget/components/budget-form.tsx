"use client";

import { useMemo } from "react";

import { Controller, useForm } from "react-hook-form";
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

import FormField from "@/components/forms/FormField";

import SelectField, {
    SelectOption,
} from "@/components/forms/SelectField";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import { formatShortDate } from "../lib/formatters";
import BudgetCard from "./budget-card";

interface BudgetFormProps {
    defaultValues?: Partial<BudgetFormData>;

    submitLabel?: string;

    currency: string;

    categoryOptions: SelectOption[];

    onSubmit: (
        values: BudgetSchema
    ) => Promise<void>;
}

const PERIOD_OPTIONS: SelectOption<BudgetPeriod>[] = [
    {
        label: "Weekly",
        value: BudgetPeriod.WEEKLY,
    },
    {
        label: "Monthly",
        value: BudgetPeriod.MONTHLY,
    },
    {
        label: "Yearly",
        value: BudgetPeriod.YEARLY,
    },
    {
        label: "Custom",
        value: BudgetPeriod.CUSTOM,
    },
];

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
        resolver: zodResolver(budgetSchema),

        defaultValues: {
            categoryId: "",

            amount: undefined,

            period: BudgetPeriod.MONTHLY,

            startDate: new Date(),

            endDate: new Date(),

            notes: "",

            ...defaultValues,
        },
    });

    const amount =
        watch("amount");

    const period =
        watch("period");

    const categoryId =
        watch("categoryId");

    const startDate =
        watch("startDate");

    const endDate =
        watch("endDate");

    const notes =
        watch("notes");

    const selectedCategory =
        useMemo(() => {
            if (!categoryId) {
                return OVERALL_CATEGORY;
            }

            return (
                categoryOptions.find(
                    (category) =>
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
                    categoryId: categoryId || null,

                    notes,

                    categoryName:
                        selectedCategory.label,

                    amount,

                    currency,

                    period,

                    startDate,

                    endDate,
                }),
            [
                selectedCategory,
                categoryId,
                amount,
                currency,
                period,
                startDate,
                endDate,
                notes,
            ]
        );

    async function submit(
        values: BudgetSchema
    ) {
        await onSubmit(values);

        if (!defaultValues) {
            reset({
                categoryId: "",

                amount: undefined,

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
            className="space-y-6"
        >
            <div className="grid gap-5 md:grid-cols-2">

                <FormField
                    label="Budget Amount"
                    required
                    error={errors.amount?.message}
                >
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register("amount", {
                            valueAsNumber: true,
                        })}
                    />
                </FormField>

                <FormField
                    label="Budget Period"
                    required
                    error={errors.period?.message}
                >
                    <Controller
                        control={control}
                        name="period"
                        render={({ field }) => (
                            <SelectField
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select budget period"
                                options={PERIOD_OPTIONS}
                            />
                        )}
                    />
                </FormField>

                <FormField
                    label="Start Date"
                    required
                    error={errors.startDate?.message}
                >
                    <Input
                        type="date"
                        {...register("startDate", {
                            valueAsDate: true,
                        })}
                    />
                </FormField>

                <FormField
                    label="End Date"
                    required
                    error={errors.endDate?.message}
                >
                    <Input
                        type="date"
                        min={
                            startDate
                                ? startDate
                                    .toISOString()
                                    .split("T")[0]
                                : undefined
                        }
                        {...register("endDate", {
                            valueAsDate: true,
                        })}
                    />
                </FormField>

                <FormField
                    label="Category"
                    error={errors.categoryId?.message}
                >
                    <Controller
                        control={control}
                        name="categoryId"
                        render={({ field }) => (
                            <SelectField
                                value={field.value ?? ""}
                                onValueChange={field.onChange}
                                placeholder="Select category"
                                options={[
                                    OVERALL_CATEGORY,
                                    ...categoryOptions,
                                ]}
                            />
                        )}
                    />
                </FormField>

                <FormField
                    label="Duration"
                >
                    <div className="flex h-10 items-center rounded-md border bg-muted/30 px-3 text-sm">

                        <div className="flex flex-col">

                            <span className="font-medium">
                                {preview.durationDays}{" "}
                                {preview.durationDays === 1
                                    ? "Day"
                                    : "Days"}
                            </span>

                            <span className="text-xs text-muted-foreground">
                                {`${formatShortDate(preview.startDate)} → ${formatShortDate(preview.endDate)}`}
                            </span>

                        </div>

                    </div>
                </FormField>

            </div>

            <FormField
                label="Notes"
                error={errors.notes?.message}
            >
                <Textarea
                    rows={4}
                    placeholder="Optional notes..."
                    {...register("notes")}
                />
            </FormField>

            <div className="space-y-3">
                <h3 className="text-lg font-semibold">
                    Budget Preview
                </h3>

                <BudgetCard
                    budget={preview}
                    preview
                />
            </div>

            <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? "Saving..."
                        : submitLabel}
                </Button>
            </div>

        </form>
    );
}