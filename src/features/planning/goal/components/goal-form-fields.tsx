"use client";

import {
    Control,
    Controller,
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";

import { GoalFormData } from "../types/goal";

import FormField from "@/components/forms/FormField";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import IconPicker from "@/components/common/icon-picker";

interface GoalFormFieldsProps {
    register: UseFormRegister<GoalFormData>;

    control: Control<GoalFormData>;

    errors: FieldErrors<GoalFormData>;
}

export default function GoalFormFields({
    register,
    control,
    errors,
}: GoalFormFieldsProps) {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const minDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(
            2,
            "0"
        ),
        String(today.getDate()).padStart(
            2,
            "0"
        ),
    ].join("-");

    function formatDate(
        date: Date
    ): string {
        return [
            date.getFullYear(),
            String(
                date.getMonth() + 1
            ).padStart(2, "0"),
            String(
                date.getDate()
            ).padStart(2, "0"),
        ].join("-");
    }

    return (
        <>
            <div className="grid gap-5 md:grid-cols-2">

                <FormField
                    label="Goal Name"
                    required
                    error={errors.name?.message}
                >
                    <Input
                        placeholder="Emergency Fund"
                        {...register("name")}
                    />
                </FormField>

                <Controller
                    control={control}
                    name="icon"
                    render={({ field }) => (
                        <FormField
                            label="Goal Icon"
                            error={errors.icon?.message}
                        >
                            <IconPicker
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </FormField>
                    )}
                />

                <FormField
                    label="Target Amount"
                    required
                    error={
                        errors.targetAmount
                            ?.message
                    }
                >
                    <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        {...register(
                            "targetAmount",
                            {
                                valueAsNumber: true,
                            }
                        )}
                    />
                </FormField>

                <FormField
                    label="Target Date"
                    error={
                        errors.targetDate
                            ?.message
                    }
                >
                    <Controller
                        control={control}
                        name="targetDate"
                        render={({ field }) => (
                            <Input
                                type="date"
                                min={minDate}
                                value={
                                    field.value
                                        ? formatDate(
                                            field.value
                                        )
                                        : ""
                                }
                                onChange={(
                                    e
                                ) =>
                                    field.onChange(
                                        e.target
                                            .value
                                            ? new Date(
                                                e.target.value
                                            )
                                            : undefined
                                    )
                                }
                            />
                        )}
                    />
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