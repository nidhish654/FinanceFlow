"use client";

import { PanelLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/store/sidebar";

import { SearchBar } from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import { NotificationMenu } from "./NotificationMenu";
import { UserMenu } from "./UserMenu";
import { UserProfileData } from "@/features/settings/profile/profile.types";

export function Navbar({ userProfile }: { userProfile: UserProfileData | null }) {
    const toggleCollapse = useSidebar((state) => state.toggleCollapse);
    const openMobile = useSidebar((state) => state.openMobile);

    return (
        <header className="flex h-16 items-center justify-between border-b bg-background px-4 lg:px-8">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="hidden lg:flex"
                    onClick={toggleCollapse}
                >
                    <PanelLeft className="h-5 w-5" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    onClick={openMobile}
                >
                    <PanelLeft className="h-5 w-5" />
                </Button>

                <SearchBar />
            </div>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                {/* <NotificationMenu /> */}
                <UserMenu userProfile={userProfile} />
            </div>
        </header>
    );
}