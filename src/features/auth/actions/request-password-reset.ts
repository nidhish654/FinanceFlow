"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { createResetToken } from "../services/create-reset-token";
import { sendPasswordResetEmail } from "@/lib/email/send-password-reset";

const requestResetSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export async function requestPasswordReset(values: z.infer<typeof requestResetSchema>) {
    try {
        const validatedFields = requestResetSchema.safeParse(values);

        if (!validatedFields.success) {
            return { success: false, error: "Invalid email" };
        }

        const { email } = validatedFields.data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Always return success to prevent email enumeration
        if (!user) {
            // Simulate processing time
            await new Promise((resolve) => setTimeout(resolve, 500));
            return { success: true };
        }

        const token = await createResetToken(user.id);
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
        const resetLink = `${baseUrl}/reset-password?token=${token}`;

        try {
            await sendPasswordResetEmail(email, user.name.split(" ")[0], resetLink);
        } catch (error) {
            console.error("Failed to send password reset email via Nodemailer:", error);
            // We swallow the SMTP error to not expose failure details to the client
            // The user will see a generic success message. 
        }

        return { success: true };
    } catch (error) {
        console.error("Request password reset error:", error);
        return { success: false, error: "Internal server error" };
    }
}
