import { prisma } from "@/lib/prisma";

export async function getFinanceProfiles(userId: string) {
    return prisma.financeProfile.findMany({
        where: {
            userId,
            status: "ACTIVE",
        },
        orderBy: {
            createdAt: "asc",
        },
    });
}

export async function getDefaultFinanceProfile(userId: string) {
    const profiles = await getFinanceProfiles(userId);

    return profiles[0] ?? null;
}