import { z } from "zod";

export const goalMoneySchema = z.object({
    amount: z.coerce
        .number()
        .positive("Amount must be greater than 0."),

    note: z
        .string()
        .trim()
        .max(
            200,
            "Note cannot exceed 200 characters."
        )
        .optional(),
});

export type GoalMoneyData =
    z.input<typeof goalMoneySchema>;

export type GoalMoneySchema =
    z.output<typeof goalMoneySchema>;