import { z } from "zod";

/**
 * Create / Update Goal
 */
export const goalSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Goal name is required.")
        .max(100, "Goal name cannot exceed 100 characters."),

    icon: z
        .string()
        .trim()
        .max(10, "Icon cannot exceed 10 characters.")
        .optional(),

    targetAmount: z
        .number({
            error: "Target amount is required.",
        })
        .positive("Target amount must be greater than zero."),

    targetDate: z
        .date()
        .nullable()
        .optional()
        .refine(
            (date) => {
                if (!date) return true;

                const today = new Date();

                today.setHours(0, 0, 0, 0);

                const target = new Date(date);

                target.setHours(0, 0, 0, 0);

                return target >= today;
            },
            {
                message:
                    "Target date cannot be in the past.",
            }
        ),

    notes: z
        .string()
        .trim()
        .max(500, "Notes cannot exceed 500 characters.")
        .optional(),
});

export type GoalSchema = z.infer<typeof goalSchema>;

/**
 * Add Money
 */
export const addMoneySchema = z.object({
    amount: z
        .number({
            error: "Amount is required.",
        })
        .positive("Amount must be greater than zero."),

    note: z
        .string()
        .trim()
        .max(500, "Note cannot exceed 500 characters.")
        .optional(),
});

export type AddMoneySchema = z.infer<typeof addMoneySchema>;

/**
 * Withdraw Money
 */
export const withdrawMoneySchema = z.object({
    amount: z
        .number({
            error: "Amount is required.",
        })
        .positive("Amount must be greater than zero."),

    note: z
        .string()
        .trim()
        .max(500, "Note cannot exceed 500 characters.")
        .optional(),
});

export type WithdrawMoneySchema = z.infer<
    typeof withdrawMoneySchema
>;