"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Currency } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
    financeProfileSchema,
    type FinanceProfileSchema,
} from "../schemas/finance-profile.schema";

interface FinanceProfileFormProps {
    defaultValues?: Partial<FinanceProfileSchema>;
    submitLabel?: string;
    loadingLabel?: string;
    title?: string;
    description?: string;
    disableCurrency?: boolean;
    onSubmit: (
        values: FinanceProfileSchema
    ) => Promise<void>;
}

export default function FinanceProfileForm({
    defaultValues,
    submitLabel = "Create Finance Profile",
    loadingLabel = "Creating...",
    title = "Finance Profile",
    description = "Create a finance profile.",
    disableCurrency = false,
    onSubmit,
}: FinanceProfileFormProps) {
    const [isPending, startTransition] = useTransition();

    const [currency, setCurrency] = useState<Currency>(
        defaultValues?.baseCurrency ?? Currency.INR
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FinanceProfileSchema>({
        resolver: zodResolver(financeProfileSchema),
        defaultValues: {
            name: "",
            description: "",
            baseCurrency: Currency.INR,
            ...defaultValues,
        },
    });

    async function handleFormSubmit(
        values: FinanceProfileSchema
    ) {
        startTransition(async () => {
            await onSubmit(values);
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>

                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Profile Name
                        </Label>

                        <Input
                            id="name"
                            placeholder="Personal"
                            {...register("name")}
                        />

                        {errors.name && (
                            <p className="text-sm text-destructive">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">
                            Description
                        </Label>

                        <Textarea
                            id="description"
                            rows={3}
                            placeholder="Optional"
                            {...register("description")}
                        />

                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>
                            Base Currency
                        </Label>

                        <Select
                            disabled={disableCurrency}
                            value={currency}
                            onValueChange={(value) => {
                                const selected =
                                    value as Currency;

                                setCurrency(selected);

                                setValue(
                                    "baseCurrency",
                                    selected
                                );
                            }}
                        >
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {Object.values(Currency).map(
                                    (currency) => (
                                        <SelectItem
                                            key={currency}
                                            value={currency}
                                        >
                                            {currency}
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>

                        {errors.baseCurrency && (
                            <p className="text-sm text-destructive">
                                {
                                    errors.baseCurrency
                                        .message
                                }
                            </p>
                        )}
                    </div>
                </CardContent>

                <CardFooter>
                    <Button
                        type="submit"
                        disabled={isPending}
                        className="w-full"
                    >
                        {isPending
                            ? loadingLabel
                            : submitLabel}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}