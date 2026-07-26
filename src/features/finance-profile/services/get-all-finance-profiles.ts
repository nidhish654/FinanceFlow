import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";

export const getAllFinanceProfiles = cache(async () => {
    const sessionUser = await getCurrentUser();

    if (!sessionUser) {
        return [];
    }

    return prisma.financeProfile.findMany({
        where: {
            userId: sessionUser.id,
            status: {
                in: ["ACTIVE", "ARCHIVED"],
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
});