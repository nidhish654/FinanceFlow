import { prisma } from "@/lib/prisma";
import { getActiveFinanceProfile } from "@/features/finance-profile/services/active-finance-profile.service";
import { SettingsState } from "../types/settings";

export async function getSettings(): Promise<SettingsState | null> {
    const activeProfile = await getActiveFinanceProfile();

    if (!activeProfile) {
        return null;
    }

    let settings = await prisma.settings.findUnique({
        where: {
            financeProfileId: activeProfile.id,
        },
    });

    // Automatically create defaults if missing
    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                financeProfileId: activeProfile.id,
            },
        });
    }

    return settings as SettingsState;
}
