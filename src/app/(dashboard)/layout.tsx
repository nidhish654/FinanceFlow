import { ReactNode } from "react";

import { redirect } from "next/navigation";

import AppShell from "@/components/app-shell/AppShell";

import { getSession } from "@/features/auth/lib/session";
import {
    getFinanceProfiles,
    requireActiveFinanceProfile,
} from "@/features/finance-profile/services";
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

    return (
        <AppShell
            financeProfiles={financeProfiles}
            activeFinanceProfile={activeFinanceProfile}
        >
            {children}
        </AppShell>
        );
}