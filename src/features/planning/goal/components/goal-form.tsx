"use client";

import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    GoalFormData,
} from "../types/goal";

import {
    goalSchema,
    type GoalSchema,
} from "../schemas/goal-schema";

import {
    buildGoalPreview,
} from "../lib/goal-preview";

import GoalFormFields from "./goal-form-fields";
import GoalPreview from "./goal-preview";

import { Button } from "@/components/ui/button";

interface GoalFormProps {
    defaultValues?: Partial<GoalFormData>;

    submitLabel?: string;

    currency: string;

    onSubmit: (
        values: GoalSchema
    ) => Promise<void>;
}

export default function GoalForm({
    defaultValues,
    submitLabel = "Create Goal",
    currency,
    onSubmit,
}: GoalFormProps) {
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
    } = useForm<GoalFormData>({
        resolver:
            zodResolver(goalSchema),

        defaultValues: {
            name: "",

            icon: "",

            targetAmount:
                undefined,

            targetDate:
                undefined,

            notes: "",

            ...defaultValues,
        },
    });

    const {
        name,
        icon,
        targetAmount,
        targetDate,
        notes,
    } = watch();

    const preview = useMemo(
        () =>
            buildGoalPreview({
                name:
                    name ||
                    "Untitled Goal",

                icon,

                targetAmount:
                    targetAmount ?? 0,

                savedAmount: 0,

                targetDate:
                    targetDate ?? null,

                notes,

                currency,
            }),
        [
            name,
            icon,
            targetAmount,
            targetDate,
            notes,
            currency,
        ]
    );

    async function submit(
        values: GoalSchema
    ) {
        await onSubmit(values);

        if (!defaultValues) {
            reset({
                name: "",

                icon: "",

                targetAmount:
                    undefined,

                targetDate:
                    undefined,

                notes: "",
            });
        }
    }

    return (
        <form
            onSubmit={handleSubmit(
                submit
            )}
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

                <GoalFormFields
                    register={
                        register
                    }
                    control={control}
                    errors={errors}
                />

                <div className="hidden xl:flex justify-end border-t pt-4">

                    <Button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="min-w-40"
                    >
                        {isSubmitting
                            ? "Saving..."
                            : submitLabel}
                    </Button>

                </div>

            </div>

            {/* ================= Right ================= */}

            <div className="space-y-6 xl:sticky xl:top-0">

                <GoalPreview
                    goal={preview}
                />

            </div>

            {/* ================= Mobile ================= */}

            <div className="xl:hidden border-t pt-4">

                <div className="flex justify-end">

                    <Button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
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