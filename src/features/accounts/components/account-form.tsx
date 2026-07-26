"use client";

import { AccountType } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import {
    AccountFormInput,
    accountSchema,
} from "../schemas/account.schema";

import {
    ACCOUNT_TYPE_OPTIONS,
} from "../constants/account-options";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FormField, SelectField } from "@/components/forms";

interface AccountFormProps {
    defaultValues?: Partial<AccountFormInput>;
    submitLabel?: string;
    onSubmit: (values: AccountFormInput) => Promise<void>;
}

export default function AccountForm({
    defaultValues,
    submitLabel = "Create Account",
    onSubmit,
}: AccountFormProps) {
    const form = useForm<AccountFormInput>({
        resolver: zodResolver(accountSchema),

        defaultValues: {
            name: "",
            type: AccountType.CASH,
            openingBalance: 0,
            ...defaultValues,
        },
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = form;

    async function handleFormSubmit(values: AccountFormInput) {
        await onSubmit(values);

        form.reset();
    }

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-5"
        >
            <FormField
                label="Account Name"
                required
                error={errors.name?.message}
            >
                <Input
                    placeholder="Cash Wallet"
                    {...register("name")}
                />
            </FormField>

            <Controller
                control={control}
                name="type"
                render={({ field }) => (
                    <FormField
                        label="Account Type"
                        required
                        error={errors.type?.message}
                    >
                        <SelectField
                            value={field.value}
                            onValueChange={field.onChange}
                            placeholder="Select account type"
                            options={ACCOUNT_TYPE_OPTIONS}
                        />
                    </FormField>
                )}
            />

            <FormField
                label="Opening Balance"
                required
                error={errors.openingBalance?.message}
            >
                <Input
                    type="number"
                    step="0.01"
                    {...register("openingBalance", {
                        valueAsNumber: true,
                    })}
                />
            </FormField>

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