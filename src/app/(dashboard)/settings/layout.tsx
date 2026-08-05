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

export default async function SettingsLayout({
    children,
}: SettingsLayoutProps) {
    const settings = await getSettings();

    return (
        <SettingsProvider settings={settings}>
            <div className="flex flex-col gap-8">
                {/* Page Header */}
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Settings
                    </h1>

                    <p className="text-muted-foreground">
                        Personalize FinanceFlow and manage your preferences.
                    </p>
                </div>

                <hr className="border-border" />

                {/* ================= MOBILE ================= */}
                <div className="space-y-6 lg:hidden">
                    <SettingsMobileNav />

                    <div>
                        {children}
                    </div>
                </div>

                {/* ================= DESKTOP ================= */}
                <div className="hidden lg:flex lg:items-start lg:gap-1">
                    <aside className="w-64 shrink-0">
                        <SettingsSidebar />
                    </aside>

                    <main className="min-w-0 flex-1 max-w-3xl">
                        {children}
                    </main>
                </div>
            </div>
        </SettingsProvider>
    );
}