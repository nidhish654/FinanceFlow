"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/features/auth/lib/session";
import { hashPassword, verifyPassword } from "better-auth/crypto";
import { getPasswordStrength } from "../lib/password-strength";

const changePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export async function changePassword(values: z.infer<typeof changePasswordSchema>) {
    try {
        const session = await getSession();

        if (!session) {
            return { success: false, error: "Unauthorized" };
        }

        const validatedFields = changePasswordSchema.safeParse(values);

        if (!validatedFields.success) {
            return { success: false, error: "Invalid fields" };
        }

        const { currentPassword, newPassword } = validatedFields.data;

        const strength = getPasswordStrength(newPassword);
        if (strength === "Weak") {
            return { success: false, error: "Password is too weak" };
        }

        const account = await prisma.account.findFirst({
            where: {
                userId: session.user.id,
                providerId: "credential",
            },
        });

        if (!account || !account.password) {
            return { success: false, error: "No credential account found." };
        }

        const isValid = await verifyPassword({
            password: currentPassword,
            hash: account.password
        });

        if (!isValid) {
            return { success: false, error: "Incorrect current password." };
        }

        const hashedNewPassword = await hashPassword(newPassword);

        await prisma.account.update({
            where: { id: account.id },
            data: { password: hashedNewPassword },
        });

        return { success: true };
    } catch (error) {
        console.error("Change password error:", error);
        return { success: false, error: "Internal server error" };
    }
}
