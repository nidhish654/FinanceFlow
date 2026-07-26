"use server";

import { revalidatePath } from "next/cache";

import { setActiveFinanceProfile } from "../services";

export async function setActiveFinanceProfileAction(
    financeProfileId: string
) {
    try {
        await setActiveFinanceProfile(financeProfileId);

        revalidatePath("/", "layout");

        return {
            success: true,
            message: "Active finance profile updated.",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to switch finance profile.",
        };
    }
}