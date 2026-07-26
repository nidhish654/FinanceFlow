import { z } from "zod";

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(
                2,
                "Name must be at least 2 characters."
            )
            .max(
                50,
                "Name cannot exceed 50 characters."
            ),

        email: z
            .string()
            .trim()
            .email(
                "Please enter a valid email address."
            ),

        password: z
            .string()
            .min(
                8,
                "Password must be at least 8 characters."
            )
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                "Password must contain uppercase, lowercase and a number."
            ),

        confirmPassword:
            z.string(),
    })
    .refine(
        (data) =>
            data.password ===
            data.confirmPassword,
        {
            path: [
                "confirmPassword",
            ],
            message:
                "Passwords do not match.",
        }
    );

export type RegisterSchema =
    z.infer<
        typeof registerSchema
    >;