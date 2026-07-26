"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";

export async function deleteAccount(id: string) {
    try {
        await prisma.financeAccount.delete({
            where: {
                id,
            },
        });

        revalidatePath("/accounts");

        return {
            success: true,
            message: "Account deleted successfully.",
        };
    } catch (error) {
        console.error(error);

        return {
            success: false,
            message: "Failed to delete account.",
        };
    }
}