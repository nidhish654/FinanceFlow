import { prisma } from "@/lib/prisma";

export async function getAccounts() {
    return prisma.account.findMany({
        orderBy: {
            createdAt: "asc",
        },
    });
}