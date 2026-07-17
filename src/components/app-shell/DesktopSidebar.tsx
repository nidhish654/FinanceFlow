"use client";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";

import { SidebarLogo } from "./SidebarLogo";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { Navigation } from "./Navigation";
import { SidebarFooter } from "./SidebarFooter";

export function DesktopSidebar() {
    const collapsed = useSidebar((state) => state.collapsed);

    return (
        <aside
            className={cn(
                "hidden lg:flex flex-col shrink-0 border-r bg-card transition-all duration-300",
                collapsed ? "w-[72px]" : "w-[280px]"
            )}
        >
            <div className="flex h-full flex-col p-6">
                <SidebarLogo />

                <div className="mt-8">
                    <ProfileSwitcher />
                </div>

                <div className="mt-8 flex-1">
                    <Navigation />
                </div>

                <div className="mt-auto pt-6">
                    <SidebarFooter />
                </div>
            </div>
        </aside>
    );
}