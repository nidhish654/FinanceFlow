import { BudgetPeriod } from "@prisma/client";
import { z } from "zod";

export const budgetSchema = z
    .object({
        categoryId: z.union([
            z.literal(""),
            z.string().uuid("Invalid category."),
        ]),

        amount: z
            .number({
                error: "Budget amount is required.",
            })
            .positive("Budget amount must be greater than zero."),

        period: z.nativeEnum(BudgetPeriod),

        startDate: z.date(),

        endDate: z.date(),

        notes: z
            .string()
            .trim()
            .max(500, "Notes cannot exceed 500 characters.")
            .optional(),
    })
    .refine(
        (data) => data.endDate >= data.startDate,
        {
            message:
                "End date must be after the start date.",
            path: ["endDate"],
        }
    );

export type BudgetSchema = z.infer<typeof budgetSchema>;