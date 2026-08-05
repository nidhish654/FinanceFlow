"use client";

import Link from "next/link";

import {
    LogOut,
    Settings,
    User,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AvatarRenderer } from "@/components/ui/avatar-renderer";

import LogoutButton from "@/features/auth/components/LogoutButton";
import { useSession } from "@/features/auth/lib/auth-client";
import { UserProfileData } from "@/features/settings/profile/profile.types";

export function UserMenu({
    userProfile,
}: {
    userProfile: UserProfileData | null;
}) {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none ring-offset-background transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <AvatarRenderer
                        avatar={
                            userProfile
                                ? {
                                    style:
                                        userProfile.avatarStyle,
                                    seed:
                                        userProfile.avatarSeed,
                                }
                                : null
                        }
                        fallbackName={
                            session.user.name
                        }
                        className="h-10 w-10"
                    />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                sideOffset={10}
                className="w-72 rounded-2xl p-2"
            >
                {/* Header */}
                <div className="flex flex-col items-center px-4 py-5">
                    <AvatarRenderer
                        avatar={
                            userProfile
                                ? {
                                    style:
                                        userProfile.avatarStyle,
                                    seed:
                                        userProfile.avatarSeed,
                                }
                                : null
                        }
                        fallbackName={
                            session.user.name
                        }
                        className="mb-3 h-16 w-16"
                    />

                    <h3 className="text-base font-semibold">
                        {session.user.name}
                    </h3>

                    <p className="mt-1 break-all text-center text-xs text-muted-foreground">
                        {session.user.email}
                    </p>
                </div>

                <DropdownMenuSeparator />

                {/* Navigation */}
                <DropdownMenuItem asChild>
                    <Link
                        href="/settings?tab=profile"
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3"
                    >
                        <User className="h-4 w-4" />

                        <div className="flex flex-col">
                            <span className="font-medium">
                                Profile
                            </span>

                            <span className="text-xs text-muted-foreground">
                                Manage your account
                            </span>
                        </div>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                        href="/settings?tab=preferences"
                        className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-3"
                    >
                        <Settings className="h-4 w-4" />

                        <div className="flex flex-col">
                            <span className="font-medium">
                                Settings
                            </span>

                            <span className="text-xs text-muted-foreground">
                                Preferences & defaults
                            </span>
                        </div>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <LogoutButton
                    className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-3 text-destructive transition-colors hover:bg-destructive/10 hover:text-destructive"
                    icon={
                        <LogOut className="h-4 w-4" />
                    }
                    title="Logout"
                    description="End your current session"
                />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}