"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getActiveFinanceProfile } from "@/features/finance-profile/services/active-finance-profile.service";
import { SettingsSchema, SettingsFormData } from "../schemas/settings-schema";

export async function updateSettings(data: Partial<SettingsFormData>) {
    try {
        const activeProfile = await getActiveFinanceProfile();

        if (!activeProfile) {
            return {
                success: false,
                error: "No active finance profile found",
            };
        }

        // Validate the incoming partial data
        const validatedData = SettingsSchema.partial().parse(data);

        // Update the settings
        const updatedSettings = await prisma.settings.update({
            where: {
                financeProfileId: activeProfile.id,
            },
            data: validatedData,
        });

        // Revalidate the settings routes
        revalidatePath("/settings", "layout");

        return {
            success: true,
            data: updatedSettings,
        };
    } catch (error) {
        console.error("[UPDATE_SETTINGS]", error);
        return {
            success: false,
            error: "Failed to update settings",
        };
    }
}
