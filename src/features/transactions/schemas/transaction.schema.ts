import { Priority, TransactionType } from "@prisma/client";
import { z } from "zod";

export const transactionSchema = z
    .object({
        accountId: z
            .string()
            .uuid("Invalid account selected."),

        transferAccountId: z
            .string()
            .uuid()
            .optional()
            .or(z.literal("")),

        categoryId: z
            .string()
            .uuid()
            .optional()
            .or(z.literal("")),

        subcategoryId: z
            .string()
            .uuid()
            .optional()
            .or(z.literal("")),

        type: z.nativeEnum(TransactionType),

        priority: z.nativeEnum(Priority).optional(),

        amount: z.coerce
            .number()
            .positive("Amount must be greater than 0."),

        description: z.string().max(255).optional(),

        merchant: z.string().max(100).optional(),

        notes: z.string().max(1000).optional(),

        referenceNumber: z.string().max(100).optional(),

        transactionDate: z.coerce.date(),
    })
    .superRefine((data, ctx) => {
        if (
            data.type !== TransactionType.TRANSFER &&
            !data.categoryId
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["categoryId"],
                message: "Category is required.",
            });
        }
        if (
            data.type !== TransactionType.TRANSFER &&
            !data.priority
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["priority"],
                message: "Priority is required.",
            });
        }

        if (
            data.type === TransactionType.TRANSFER &&
            !data.transferAccountId
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["transferAccountId"],
                message: "Select destination account.",
            });
        }

        if (
            data.type === TransactionType.TRANSFER &&
            data.transferAccountId === data.accountId
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["transferAccountId"],
                message:
                    "Source and destination accounts cannot be the same.",
            });
        }
    });

export type TransactionFormInput = z.output<
    typeof transactionSchema
>;

export type TransactionFormValues = z.input<
    typeof transactionSchema
>;