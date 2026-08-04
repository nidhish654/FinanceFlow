import { Metadata } from "next";
import { SettingsSidebar } from "@/features/settings/components/settings-sidebar";
import { SettingsMobileNav } from "@/features/settings/components/settings-mobile-nav";
import { getSettings } from "@/features/settings/services/get-settings";
import { SettingsProvider } from "@/features/settings/hooks/use-settings";

export const metadata: Metadata = {
    title: "Settings",
    description: "Personalize FinanceFlow",
};

interface SettingsLayoutProps {
    children: React.ReactNode;
}

export default async function SettingsLayout({ children }: SettingsLayoutProps) {
    const settings = await getSettings();

    return (
        <SettingsProvider settings={settings}>
            <div className="flex flex-col gap-6 lg:gap-10">
                <div className="space-y-0.5">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">
                        Personalize FinanceFlow and manage your preferences.
                    </p>
                </div>

                <hr className="border-muted" />

                <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside className="-mx-4 lg:mx-0 lg:w-1/5">
                        <SettingsSidebar />
                        <SettingsMobileNav />
                    </aside>
                    <div className="flex-1 lg:max-w-2xl">{children}</div>
                </div>
            </div>
        </SettingsProvider>
    );
}
