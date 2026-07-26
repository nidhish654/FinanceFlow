import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";

export const getActiveFinanceProfile = cache(async () => {
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
        return null;
    }

    const user = await prisma.user.findUnique({
        where: {
            id: sessionUser.id,
        },
        select: {
            id: true,
            activeFinanceProfileId: true,
        },
    });

    if (!user?.activeFinanceProfileId) {
        return null;
    }

    return prisma.financeProfile.findFirst({
        where: {
            id: user.activeFinanceProfileId,
            userId: user.id,
            status: "ACTIVE",
        },
    });
});

export const requireActiveFinanceProfile = cache(async () => {
    const profile = await getActiveFinanceProfile();

    if (!profile) {
        throw new Error(
            "No active finance profile found. Please create or select a finance profile."
        );
    }

    return profile;
});

export async function setActiveFinanceProfile(profileId: string) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const profile = await prisma.financeProfile.findFirst({
        where: {
            id: profileId,
            userId: user.id,
            status: "ACTIVE",
        },
    });

    if (!profile) {
        throw new Error("Finance profile not found.");
    }

    await prisma.user.update({
        where: {
            id: user.id,
        },
        data: {
            activeFinanceProfileId: profile.id,
        },
    });

    return profile;
}