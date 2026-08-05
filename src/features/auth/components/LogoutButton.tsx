"use client";

import { ReactNode, useTransition } from "react";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { signOut } from "../lib/auth-client";

interface LogoutButtonProps {
    className?: string;
    icon?: ReactNode;
    title?: string;
    description?: string;
}

export default function LogoutButton({
    className,
    icon,
    title = "Logout",
    description,
}: LogoutButtonProps) {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    function handleLogout() {
        startTransition(async () => {
            const { error } = await signOut();

            if (error) {
                toast.error(
                    error.message ??
                    "Failed to logout."
                );
                return;
            }

            toast.success("Logged out.");

            router.replace("/");
            router.refresh();
        });
    }

    return (
        <DropdownMenuItem
            onClick={handleLogout}
            disabled={isPending}
            className={
                className ??
                "cursor-pointer text-destructive focus:text-destructive"
            }
        >
            {description ? (
                <>
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                        {icon ?? (
                            <LogOut className="h-4 w-4" />
                        )}
                    </div>

                    <div className="flex flex-col">
                        <span className="font-medium">
                            {isPending
                                ? "Signing Out..."
                                : title}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            {description}
                        </span>
                    </div>
                </>
            ) : (
                <>
                    {icon ?? (
                        <LogOut className="mr-2 h-4 w-4" />
                    )}

                    {isPending
                        ? "Signing Out..."
                        : title}
                </>
            )}
        </DropdownMenuItem>
    );
}