"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyResetToken } from "../services/verify-reset-token";
import { hashPassword } from "better-auth/crypto";
import { getPasswordStrength } from "../lib/password-strength";

const resetPasswordSchema = z.object({
    token: z.string().min(1, "Token is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export async function resetPassword(values: z.infer<typeof resetPasswordSchema>) {
    try {
        const validatedFields = resetPasswordSchema.safeParse(values);

        if (!validatedFields.success) {
            return { success: false, error: "Invalid fields" };
        }

        const { token, newPassword } = validatedFields.data;

        const strength = getPasswordStrength(newPassword);
        if (strength === "Weak") {
            return { success: false, error: "Password is too weak" };
        }

        const result = await verifyResetToken(token);

        if (!result.success) {
            return { success: false, error: result.error };
        }

        const account = await prisma.account.findFirst({
            where: {
                userId: result.userId,
                providerId: "credential",
            },
        });

        if (!account) {
            return { success: false, error: "No credential account found for this user." };
        }

        const hashedNewPassword = await hashPassword(newPassword);

        await prisma.account.update({
            where: { id: account.id },
            data: { password: hashedNewPassword },
        });

        return { success: true };
    } catch (error) {
        console.error("Reset password error:", error);
        return { success: false, error: "Internal server error" };
    }
}
