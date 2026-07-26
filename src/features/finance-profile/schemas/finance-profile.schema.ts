import { Currency } from "@prisma/client";
import { z } from "zod";

export const financeProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters.")
        .max(50),

    description: z.string().optional(),

    baseCurrency: z.nativeEnum(Currency),
});

export type FinanceProfileSchema = z.infer<
    typeof financeProfileSchema
>;