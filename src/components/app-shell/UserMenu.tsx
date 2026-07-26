"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import UserAvatar from "@/features/auth/components/UserAvatar";
import LogoutButton from "@/features/auth/components/LogoutButton";
import { useSession } from "@/features/auth/lib/auth-client";

export function UserMenu() {
    const { data: session } = useSession();

    if (!session) {
        return null;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="rounded-full outline-none">
                    <UserAvatar name={session.user.name} />
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