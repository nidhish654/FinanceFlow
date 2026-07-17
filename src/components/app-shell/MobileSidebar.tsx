"use client";

import {
    Sheet,
    SheetContent,
} from "@/components/ui/sheet";

import { useSidebar } from "@/store/sidebar";

import { SidebarLogo } from "./SidebarLogo";
import { Navigation } from "./Navigation";
import { ProfileSwitcher } from "./ProfileSwitcher";
import { SidebarFooter } from "./SidebarFooter";

export function MobileSidebar() {
    const mobileOpen = useSidebar((state) => state.mobileOpen);
    const closeMobile = useSidebar((state) => state.closeMobile);

    return (
        <Sheet open={mobileOpen} onOpenChange={(open) => !open && closeMobile()}>
            <SheetContent side="left" className="w-[280px] p-6">
                <div className="flex h-full flex-col">
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
            </SheetContent>
        </Sheet>
    );
}