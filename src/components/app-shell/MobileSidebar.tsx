"use client";

import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";

import { useSidebar } from "@/store/sidebar";

import { SidebarLogo } from "./SidebarLogo";
import { Navigation } from "./Navigation";
import { SidebarFooter } from "./SidebarFooter";

import { FinanceProfileSelector } from "@/features/finance-profile/components/finance-profile-selector";

interface MobileSidebarProps {
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

export function MobileSidebar({
    financeProfiles,
    activeFinanceProfile,
}: MobileSidebarProps) {
    const mobileOpen = useSidebar((state) => state.mobileOpen);
    const closeMobile = useSidebar((state) => state.closeMobile);

    return (
        <Sheet
            open={mobileOpen}
            onOpenChange={(open) => !open && closeMobile()}
        >
            <SheetContent
                side="left"
                className="w-[280px] p-6"
            >
                <div className="flex h-full flex-col">
                    <SidebarLogo />

                    <div className="mt-8">
                        <FinanceProfileSelector
                            profiles={financeProfiles}
                            activeProfileId={activeFinanceProfile.id}
                        />
                    </div>

                    <div className="mt-8 flex-1">
                        <Navigation />
                    </div>

                    {/* <div className="mt-auto pt-6">
                        <SidebarFooter />
                    </div> */}
                </div>
            </SheetContent>
        </Sheet>
    );
}