"use client";

import { UserRound } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";

import { Button } from "@/components/ui/button";

import { SidebarLogo } from "./SidebarLogo";
import { Navigation } from "./Navigation";
import { SidebarFooter } from "./SidebarFooter";

import { FinanceProfileSelector } from "@/features/finance-profile/components/finance-profile-selector";

interface DesktopSidebarProps {
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

export function DesktopSidebar({
    financeProfiles,
    activeFinanceProfile,
}: DesktopSidebarProps) {
    const collapsed = useSidebar(
        (state) => state.collapsed
    );

    return (
        <aside
            className={cn(
                "hidden shrink-0 border-r bg-card transition-all duration-300 lg:flex lg:flex-col",
                collapsed
                    ? "w-[72px]"
                    : "w-[280px]"
            )}
        >
            <div
                className={cn(
                    "flex h-full flex-col",
                    collapsed ? "p-3" : "p-6"
                )}
            >
                <SidebarLogo />

                <div
                    className={cn(
                        "mt-8",
                        collapsed &&
                            "flex justify-center"
                    )}
                >
                    {collapsed ? (
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 rounded-xl"
                        >
                            <UserRound className="h-5 w-5" />
                        </Button>
                    ) : (
                        <FinanceProfileSelector
                            profiles={financeProfiles}
                            activeProfileId={
                                activeFinanceProfile.id
                            }
                        />
                    )}
                </div>

                <div className="mt-8 flex-1">
                    <Navigation />
                </div>

                {/* <div className="mt-auto pt-6">
                    <SidebarFooter />
                </div> */}
            </div>
        </aside>
    );
}