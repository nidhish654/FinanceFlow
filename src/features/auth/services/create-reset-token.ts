import { prisma } from "@/lib/prisma";
import { generateResetToken, hashToken } from "../lib/token";

export async function createResetToken(userId: string): Promise<string> {
    const token = generateResetToken();
    const hashedToken = hashToken(token);
    
    // Expire in 30 minutes
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await prisma.passwordResetToken.create({
        data: {
            userId,
            token: hashedToken,
            expiresAt,
        },
    });

    return token; // Return raw token to send in email
}
