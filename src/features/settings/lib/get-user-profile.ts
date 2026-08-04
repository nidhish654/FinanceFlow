import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";
import { UserProfileData } from "../profile/profile.types";
import { getActiveFinanceProfile } from "@/features/finance-profile/services/active-finance-profile.service";

export async function getUserProfile(): Promise<UserProfileData | null> {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    const [dbUser, activeProfile] = await Promise.all([
        prisma.user.findUnique({
            where: { id: user.id },
            include: {
                authAccounts: { take: 1 },
            },
        }),
        getActiveFinanceProfile(),
    ]);

    if (!dbUser) return null;

    let settings = null;
    if (activeProfile) {
        settings = await prisma.settings.findUnique({
            where: { financeProfileId: activeProfile.id },
            select: { avatarStyle: true, avatarSeed: true },
        });
    }

    // Determine auth provider (BetterAuth maps providerId to the oauth provider name, or credential)
    const provider = dbUser.authAccounts.length > 0 
        ? dbUser.authAccounts[0].providerId 
        : "Email";

    const formattedProvider = provider.charAt(0).toUpperCase() + provider.slice(1);

    return {
        displayName: dbUser.name,
        email: dbUser.email,
        avatarStyle: (settings?.avatarStyle as any) || "adventurerNeutral",
        avatarSeed: settings?.avatarSeed || "alex",
        memberSince: dbUser.createdAt,
        authProvider: formattedProvider,
        activeFinanceProfileName: activeProfile?.name || "None",
    };
}
