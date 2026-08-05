import { z } from "zod";

export const ImportTransactionSchema = z.object({
    date: z.string().or(z.date()),
    description: z.string().optional(),
    account: z.string(),
    category: z.string(),
    type: z.enum(["income", "expense"]),
    amount: z.number().positive(),
    priority: z.string(),
    merchant: z.string().optional(),
    referenceNumber: z.string().optional(),
    notes: z.string().optional(),
});

export type ImportTransaction = z.infer<typeof ImportTransactionSchema>;
