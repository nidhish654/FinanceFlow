import { CategoryType } from "@prisma/client";
import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Category name must be at least 2 characters.")
        .max(100, "Category name is too long."),

    description: z
        .string()
        .trim()
        .max(255)
        .optional()
        .or(z.literal("")),

    type: z.nativeEnum(CategoryType),

    icon: z.string().optional(),

    color: z.string().optional(),

    parentCategoryId: z.string().uuid().optional().or(z.literal("")),
});

export type CategoryFormInput = z.infer<
    typeof categorySchema
>;