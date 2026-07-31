"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    GoalMoneyData,
    GoalMoneySchema,
    goalMoneySchema,
} from "../schemas/goal-money-schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import FormField from "@/components/forms/FormField";

interface GoalMoneyFormProps {
    mode: "deposit" | "withdraw";

    submitLabel?: string;

    defaultValues?: Partial<GoalMoneySchema>;

    onSubmit: (
        values: GoalMoneySchema
    ) => Promise<void>;
}

export default function GoalMoneyForm({
    mode,
    submitLabel,
    defaultValues,
    onSubmit,
}: GoalMoneyFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<
        GoalMoneyData,
        unknown,
        GoalMoneySchema
    >({
        resolver: zodResolver(goalMoneySchema),

        defaultValues: {
            amount: "" as any,
            note: "",
            ...defaultValues,
        },
    });

    async function submit(
        values: GoalMoneySchema
    ) {
        await onSubmit(values);

        reset({
            amount: "" as any,
            note: "",
        });
    }

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-7"
        >
            <FormField
                label="Amount"
                required
                error={errors.amount?.message}
            >
                <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    {...register("amount")}
                />
            </FormField>

            <FormField
                label="Note"
                error={errors.note?.message}
            >
                <Textarea
                    rows={4}
                    placeholder="Optional note..."
                    {...register("note")}
                />
            </FormField>

            <div className="flex justify-end border-t pt-5">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-40"
                >
                    {isSubmitting
                        ? "Saving..."
                        : submitLabel ??
                        (mode === "deposit"
                            ? "Add Money"
                            : "Withdraw Money")}
                </Button>
            </div>
        </form>
    );
}