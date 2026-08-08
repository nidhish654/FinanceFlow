import { ReactNode } from "react";

import { redirect } from "next/navigation";

import AppShell from "@/components/app-shell/AppShell";

import { getSession } from "@/features/auth/lib/session";
import {
    getFinanceProfiles,
    requireActiveFinanceProfile,
} from "@/features/finance-profile/services";
import { getUserProfile } from "@/features/settings/lib/get-user-profile";
import { getSettings } from "@/features/settings/services/get-settings";
interface DashboardLayoutProps {
    children: ReactNode;
}

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {

    const session = await getSession();

    if (!session) {
        redirect("/login");
    }

    const financeProfiles = await getFinanceProfiles();

    if (financeProfiles.length === 0) {
        redirect("/finance-profile/onboarding");
    }

    const activeFinanceProfile = await requireActiveFinanceProfile();
    const userProfile = await getUserProfile();
    const settings = await getSettings();

    return (
        <AppShell
            financeProfiles={financeProfiles}
            activeFinanceProfile={activeFinanceProfile}
            userProfile={userProfile}
            accentColor={settings?.accentColor}
        >
            {children}
        </AppShell>
    );
}