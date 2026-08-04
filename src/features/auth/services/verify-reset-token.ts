import { prisma } from "@/lib/prisma";
import { hashToken } from "../lib/token";

export async function verifyResetToken(rawToken: string) {
    const hashedToken = hashToken(rawToken);

    const resetToken = await prisma.passwordResetToken.findUnique({
        where: { token: hashedToken },
        include: { user: true },
    });

    if (!resetToken) {
        return { success: false as const, error: "Invalid token" };
    }

    if (resetToken.usedAt) {
        return { success: false as const, error: "Token already used" };
    }

    if (resetToken.expiresAt < new Date()) {
        return { success: false as const, error: "Token has expired" };
    }

    // Mark as used
    await prisma.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { usedAt: new Date() },
    });

    return { success: true as const, userId: resetToken.userId };
}
