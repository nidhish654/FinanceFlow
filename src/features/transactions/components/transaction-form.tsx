"use client";

import { useEffect, useMemo, useRef } from "react";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Priority,
    TransactionType,
} from "@prisma/client";

import FormField from "@/components/forms/FormField";
import SelectField, {
    SelectOption,
} from "@/components/forms/SelectField";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
    transactionSchema,
    TransactionFormInput,
    TransactionFormValues,
} from "../schemas/transaction.schema";

interface TransactionFormProps {
    defaultValues?: Partial<TransactionFormInput>;

    accountOptions: SelectOption[];

    categoryOptions: SelectOption[];

    submitLabel: string;

    onSubmit: (
        values: TransactionFormInput
    ) => Promise<void>;
}

const TRANSACTION_TYPE_OPTIONS: SelectOption<TransactionType>[] = [
    {
        label: "Income",
        value: TransactionType.INCOME,
    },
    {
        label: "Expense",
        value: TransactionType.EXPENSE,
    },
    {
        label: "Transfer",
        value: TransactionType.TRANSFER,
    },
];

const PRIORITY_OPTIONS: SelectOption<Priority>[] = [
    {
        label: "Need",
        value: Priority.NEED,
    },
    {
        label: "Want",
        value: Priority.WANT,
    },
    {
        label: "Savings",
        value: Priority.SAVINGS,
    },
];

export default function TransactionForm({
    defaultValues,
    accountOptions,
    categoryOptions,
    submitLabel,
    onSubmit,
}: TransactionFormProps) {
        const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        setValue,
        getValues,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm<
            TransactionFormValues,
            unknown,
            TransactionFormInput
        >({
        resolver: zodResolver(transactionSchema),

        defaultValues: {
            accountId: "",
            transferAccountId: "",
            categoryId: "",
            type: TransactionType.EXPENSE,
            priority: Priority.NEED,
            amount: undefined,
            description: "",
            merchant: "",
            notes: "",
            referenceNumber: "",
            transactionDate: new Date(),

            ...defaultValues,
        },
    });

    const transactionType = watch("type");
    const categoryId = watch("categoryId");

    const descriptionEdited = useRef(false);

    const isTransfer =
        transactionType ===
        TransactionType.TRANSFER;

    const filteredCategoryOptions = useMemo(
        () =>
            categoryOptions.filter(
                (category) =>
                    category.type === transactionType
            ),
        [categoryOptions, transactionType]
    );
    console.log({
        transactionType,
        categoryOptions,
        filteredCategoryOptions,
    });
    useEffect(() => {
        if (
            defaultValues ||
            isTransfer ||
            !categoryId ||
            descriptionEdited.current
        ) {
            return;
        }

        const category = categoryOptions.find(
            (option) => option.value === categoryId
        );

        if (!category) {
            return;
        }

        if (getValues("description")) {
            return;
        }

        setValue("description", category.label, {
            shouldDirty: false,
            shouldValidate: true,
        });
    }, [
        categoryId,
        categoryOptions,
        defaultValues,
        getValues,
        isTransfer,
        setValue,
    ]);

    const initialized = useRef(false);

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            return;
        }

        if (isTransfer) {
            setValue("categoryId", "", {
                shouldDirty: true,
                shouldTouch: false,
                shouldValidate: false,
            });

            setValue("priority", undefined, {
                shouldDirty: true,
                shouldTouch: false,
                shouldValidate: false,
            });

            return;
        }

        setValue("categoryId", "", {
            shouldDirty: true,
            shouldTouch: false,
            shouldValidate: false,
        });

        descriptionEdited.current = false;
    }, [
        transactionType,
        isTransfer,
        setValue,
    ]);

    useEffect(() => {
        if (defaultValues) {
            reset({
                accountId: "",
                transferAccountId: "",
                categoryId: "",
                type: TransactionType.EXPENSE,
                priority: Priority.NEED,
                amount: undefined,
                description: "",
                merchant: "",
                notes: "",
                referenceNumber: "",
                transactionDate: new Date(),
                ...defaultValues,
            });
            descriptionEdited.current = Boolean(
                defaultValues?.description
            );
        }
    }, [defaultValues, reset]);

    async function submit(
        values: TransactionFormInput
    ) {
        await onSubmit(values);

        if (!defaultValues) {
            reset({
                accountId: "",
                transferAccountId: "",
                categoryId: "",
                type: TransactionType.EXPENSE,
                priority: Priority.NEED,
                amount: undefined,
                description: "",
                merchant: "",
                notes: "",
                referenceNumber: "",
                transactionDate: new Date(),
            });
            descriptionEdited.current = false;
        }
    }
    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-6"
        >
            <div className="grid gap-4 md:grid-cols-2">
                <FormField
                    label="Transaction Type"
                    required
                    error={errors.type?.message}
                >
                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => (
                            <SelectField
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select transaction type"
                                options={TRANSACTION_TYPE_OPTIONS}
                            />
                        )}
                    />
                </FormField>

                <FormField
                    label="Amount"
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
                    label="Account"
                    required
                    error={errors.accountId?.message}
                >
                    <Controller
                        control={control}
                        name="accountId"
                        render={({ field }) => (
                            <SelectField
                                value={field.value}
                                onValueChange={field.onChange}
                                placeholder="Select account"
                                options={accountOptions}
                            />
                        )}
                    />
                </FormField>

                <FormField
                    label="Transaction Date"
                    required
                    error={errors.transactionDate?.message}
                >
                    <Input
                        type="date"
                        {...register("transactionDate", {
                            valueAsDate: true,
                        })}
                    />
                </FormField>
                    {isTransfer ? (
                        <FormField
                            label="Transfer To"
                            required
                            error={errors.transferAccountId?.message}
                        >
                            <Controller
                                control={control}
                                name="transferAccountId"
                                render={({ field }) => (
                                    <SelectField
                                        value={field.value}
                                        onValueChange={field.onChange}
                                        placeholder="Select destination account"
                                        options={accountOptions}
                                    />
                                )}
                            />
                        </FormField>
                    ) : (
                        <>
                            <FormField
                                label="Category"
                                required
                                error={errors.categoryId?.message}
                            >
                                <Controller
                                    control={control}
                                    name="categoryId"
                                    render={({ field }) => (
                                        <SelectField
                                            value={field.value}
                                            onValueChange={field.onChange}
                                            placeholder="Select category"
                                            options={filteredCategoryOptions}
                                        />
                                    )}
                                />
                            </FormField>

                            <FormField
                                label="Priority"
                                required
                                error={errors.priority?.message}
                            >
                                <Controller
                                    control={control}
                                    name="priority"
                                    render={({ field }) => (
                                        <SelectField
                                            value={field.value ?? ""}
                                            onValueChange={field.onChange}
                                            placeholder="Select priority"
                                            options={PRIORITY_OPTIONS}
                                        />
                                    )}
                                />
                            </FormField>

                            <FormField
                                label="Merchant"
                                error={errors.merchant?.message}
                            >
                                <Input
                                    placeholder="Merchant"
                                    {...register("merchant")}
                                />
                            </FormField>

                            <FormField
                                label="Reference Number"
                                error={errors.referenceNumber?.message}
                            >
                                <Input
                                    placeholder="Reference Number"
                                    {...register("referenceNumber")}
                                />
                            </FormField>
                        </>
                    )}
            </div>
        {!isTransfer && (
            <FormField
                label="Description"
                error={errors.description?.message}
            >
                <Input
                    placeholder="Description"
                    {...register("description", {
                        onChange: () => {
                            descriptionEdited.current = true;
                        },
                    })}
                />
            </FormField>
        )}

        <FormField
            label="Notes"
            error={errors.notes?.message}
        >
            <Textarea
                rows={4}
                placeholder="Additional notes..."
                {...register("notes")}
            />
        </FormField>

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
