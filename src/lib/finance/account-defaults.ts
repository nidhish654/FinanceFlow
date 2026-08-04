import { SettingsState } from "@/features/settings/types/settings";

/**
 * Returns the default account ID to be prefilled in transaction forms.
 */
export function getDefaultAccountId(settings: SettingsState | null): string {
    if (!settings || !settings.defaultAccountId) {
        return "";
    }
    return settings.defaultAccountId;
}
