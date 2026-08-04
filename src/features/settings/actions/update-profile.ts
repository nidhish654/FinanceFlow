"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/features/auth/lib/session";
import { getActiveFinanceProfile } from "@/features/finance-profile/services/active-finance-profile.service";
import { ProfileSchema, ProfileFormData } from "../profile/profile.schema";

export async function updateProfile(data: ProfileFormData) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return {
                success: false,
                error: "You must be logged in to update your profile.",
            };
        }

        const validatedData = ProfileSchema.safeParse(data);

        if (!validatedData.success) {
            return {
                success: false,
                error: "Invalid profile data provided.",
            };
        }

        const activeProfile = await getActiveFinanceProfile();

        if (!activeProfile) {
            return { success: false, error: "No active finance profile found." };
        }

        const updateData: { name: string } = {
            name: validatedData.data.displayName,
        };

        const settingsData: { avatarStyle?: string; avatarSeed?: string } = {};

        if (validatedData.data.avatarStyle) {
            settingsData.avatarStyle = validatedData.data.avatarStyle;
        }

        if (validatedData.data.avatarSeed) {
            settingsData.avatarSeed = validatedData.data.avatarSeed;
        }

        // Run both updates in parallel
        const promises: Promise<any>[] = [
            prisma.user.update({
                where: { id: user.id },
                data: updateData,
            }),
        ];

        if (Object.keys(settingsData).length > 0) {
            promises.push(
                prisma.settings.update({
                    where: { financeProfileId: activeProfile.id },
                    data: settingsData,
                })
            );
        }

        await Promise.all(promises);

        revalidatePath("/settings", "layout");

        return {
            success: true,
            message: "Profile updated successfully.",
        };
    } catch (error) {
        console.error("[UPDATE_PROFILE]", error);
        return {
            success: false,
            error: "An unexpected error occurred while updating your profile.",
        };
    }
}


