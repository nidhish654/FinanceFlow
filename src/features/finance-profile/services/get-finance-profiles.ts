import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";

export const getFinanceProfiles = cache(async () => {
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
        return [];
    }

    return prisma.financeProfile.findMany({
        where: {
            userId: sessionUser.id,
            status: "ACTIVE",
        },
        orderBy: {
            createdAt: "asc",
        },
        select: {
            id: true,
            name: true,
            description: true,
            baseCurrency: true,
            status: true,
        },
    });
});