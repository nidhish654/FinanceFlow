import { SettingsSectionCard } from "@/features/settings/components/settings-section-card";
import { getUserProfile } from "@/features/settings/lib/get-user-profile";
import { ProfilePage } from "@/features/settings/profile/profile-page";
import { PreferencePage } from "@/features/settings/preferences/preference-page";
import { getSettings } from "@/features/settings/services/get-settings";

export default async function SettingsPage({
    searchParams,
}: {
    searchParams: { tab?: string };
}) {
    // Await search params first before accessing properties in Next.js 15+
    // But since this is Next.js 14 based on package.json (next 14/15 changes, we'll keep it standard)
    const params = await searchParams;
    const tab = params.tab || "profile";
    
    if (tab === "profile") {
        const profile = await getUserProfile();
        
        if (!profile) {
            return (
                <SettingsSectionCard
                    title="Profile"
                    description="Could not load your profile."
                >
                    <div className="py-12 text-center text-muted-foreground">
                        <p>An error occurred while loading your profile.</p>
                    </div>
                </SettingsSectionCard>
            );
        }

        return <ProfilePage initialProfile={profile} />;
    }

    if (tab === "preferences") {
        const settings = await getSettings();
        
        if (!settings) {
            return (
                <SettingsSectionCard
                    title="Preferences"
                    description="Could not load your preferences."
                >
                    <div className="py-12 text-center text-muted-foreground">
                        <p>An error occurred while loading your preferences.</p>
                    </div>
                </SettingsSectionCard>
            );
        }

        return (
            <PreferencePage 
                initialPreferences={{
                    accentColor: settings.accentColor as any,
                    language: settings.language,
                    weekStartsOn: settings.weekStart,
                    dateFormat: settings.dateFormat,
                    timeFormat: settings.timeFormat,
                    numberFormat: settings.numberFormat,
                }} 
            />
        );
    }

    // Placeholder for unimplemented sections
    return (
        <SettingsSectionCard
            title={tab.charAt(0).toUpperCase() + tab.slice(1).replace("-", " ")}
            description="This settings section is currently under construction."
        >
            <div className="py-12 text-center text-muted-foreground">
                <p>The form for this section will be implemented in a future phase.</p>
            </div>
        </SettingsSectionCard>
    );
}
