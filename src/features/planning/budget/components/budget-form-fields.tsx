"use client";

import { Controller, Control, FieldErrors, UseFormRegister } from "react-hook-form";

import { BudgetPeriod } from "@prisma/client";

import { BudgetFormData } from "../types/budget";

import FormField from "@/components/forms/FormField";

import SelectField, {
    SelectOption,
} from "@/components/forms/SelectField";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { formatShortDate } from "../lib/formatters";

interface BudgetFormFieldsProps {
    register: UseFormRegister<BudgetFormData>;

    control: Control<BudgetFormData>;

    errors: FieldErrors<BudgetFormData>;

    categoryOptions: SelectOption[];

    startDate?: Date;

    durationDays: number;

    previewStartDate: Date;

    previewEndDate: Date;
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

export default function BudgetFormFields({
    register,
    control,
    errors,
    categoryOptions,
    startDate,
    durationDays,
    previewStartDate,
    previewEndDate,
}: BudgetFormFieldsProps) {
    return (
        <>
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
                    <Controller
                        control={control}
                        name="startDate"
                        render={({ field }) => (
                            <Input
                                type="date"
                                value={
                                    field.value
                                        ? field.value
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    field.onChange(
                                        e.target.value
                                            ? new Date(e.target.value)
                                            : undefined
                                    )
                                }
                            />
                        )}
                    />
                </FormField>

                <FormField
                    label="End Date"
                    required
                    error={errors.endDate?.message}
                >
                    <Controller
                        control={control}
                        name="endDate"
                        render={({ field }) => (
                            <Input
                                type="date"
                                min={
                                    startDate
                                        ? startDate
                                            .toISOString()
                                            .split("T")[0]
                                        : undefined
                                }
                                value={
                                    field.value
                                        ? field.value
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }
                                onChange={(e) =>
                                    field.onChange(
                                        e.target.value
                                            ? new Date(e.target.value)
                                            : undefined
                                    )
                                }
                            />
                        )}
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

                <FormField label="Duration">
                    <div className="flex h-10 items-center rounded-md border bg-muted/30 px-3 text-sm">

                        <div className="flex flex-col">

                            <span className="font-medium">
                                {durationDays}{" "}
                                {durationDays === 1
                                    ? "Day"
                                    : "Days"}
                            </span>

                            <span className="text-xs text-muted-foreground">
                                {`${formatShortDate(previewStartDate)} → ${formatShortDate(previewEndDate)}`}
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
        </>
    );
}