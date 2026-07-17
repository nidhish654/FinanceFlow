"use server";

import { prisma } from "@/lib/prisma";

const TEMP_FINANCE_PROFILE_ID = "1";

export async function getAccounts() {
    try {
        const accounts = await prisma.account.findMany({
            where: {
                financeProfileId: TEMP_FINANCE_PROFILE_ID,
                status: "ACTIVE",
            },
            orderBy: {
                name: "asc",
            },
        });

        return accounts;
    } catch (error) {
        console.error("Failed to fetch accounts:", error);
        throw new Error("Unable to fetch accounts.");
    }
}