"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AvatarRenderer } from "@/components/ui/avatar-renderer";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useSession } from "@/features/auth/lib/auth-client";
import { UserProfileData } from "@/features/settings/profile/profile.types";

export function UserMenu({ userProfile }: { userProfile: UserProfileData | null }) {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none">
                    <AvatarRenderer
                        avatar={userProfile ? { style: userProfile.avatarStyle, seed: userProfile.avatarSeed } : null}
                        fallbackName={session.user.name}
                        className="h-9 w-9"
                    />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-64"
            >
                <DropdownMenuLabel>
                    <div className="flex flex-col">
                        <span className="font-semibold">
                            {session.user.name}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            {session.user.email}
                        </span>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <LogoutButton />
            </DropdownMenuContent>
        </DropdownMenu>
    );
}