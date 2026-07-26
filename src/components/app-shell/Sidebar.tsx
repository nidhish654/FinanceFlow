"use client";

import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";

interface SidebarProps {
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
}

export function Sidebar({
    financeProfiles,
    activeFinanceProfile,
}: SidebarProps) {
    return (
        <>
            <DesktopSidebar
                financeProfiles={financeProfiles}
                activeFinanceProfile={activeFinanceProfile}
            />

            <MobileSidebar
                financeProfiles={financeProfiles}
                activeFinanceProfile={activeFinanceProfile}
            />
        </>
    );
}