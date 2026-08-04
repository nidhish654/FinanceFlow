import { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { PageContainer } from "./PageContainer";

import { UserProfileData } from "@/features/settings/profile/profile.types";
import { ACCENT_COLORS } from "@/lib/theme/accent-colors";

import { AccentColor } from "@prisma/client";

interface AppShellProps {
    children: ReactNode;

    financeProfiles: {
        id: string;
        name: string;
        baseCurrency: string;
    }[];

    activeFinanceProfile: {
        id: string;
        name: string;
        baseCurrency: string;
    };

    userProfile: UserProfileData | null;

    accentColor?: AccentColor;
}

export default function AppShell({
    children,
    financeProfiles,
    activeFinanceProfile,
    userProfile,
    accentColor,
}: AppShellProps) {

    const theme = ACCENT_COLORS[accentColor || AccentColor.DEFAULT];

    const style =
        accentColor === AccentColor.DEFAULT
            ? {}
            : ({
                "--primary": theme.primary,
                "--primary-foreground": theme.primaryForeground,
                "--ring": theme.ring,
                "--sidebar-primary": theme.sidebarPrimary,
                "--chart-1": theme.chart1,
            } as React.CSSProperties);

    return (
        <div
            className="flex h-screen overflow-hidden bg-background"
            style={style}
        >
            <Sidebar
                financeProfiles={financeProfiles}
                activeFinanceProfile={
                    activeFinanceProfile
                }
            />

            <div className="flex min-w-0 flex-1 flex-col">

                <Navbar
                    userProfile={userProfile}
                />

                <PageContainer>
                    {children}
                </PageContainer>

            </div>
        </div>
    );
}