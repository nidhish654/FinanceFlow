import { AccountType, Currency } from "@prisma/client";
import { z } from "zod";

export const accountSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Account name must be at least 2 characters.")
        .max(50, "Account name cannot exceed 50 characters."),

    type: z.nativeEnum(AccountType),

    currency: z.nativeEnum(Currency),

    openingBalance: z.coerce
        .number()
        .min(0, "Opening balance cannot be negative."),
});

export type AccountFormInput = z.input<typeof accountSchema>;

export type AccountFormValues = z.output<typeof accountSchema>;