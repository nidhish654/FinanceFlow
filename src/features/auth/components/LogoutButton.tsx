"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { LogOut } from "lucide-react";
import { toast } from "sonner";

import {
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { signOut } from "../lib/auth-client";

export default function LogoutButton() {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();

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
            className="cursor-pointer text-destructive focus:text-destructive"
        >
            <LogOut className="mr-2 h-4 w-4" />

            {isPending
                ? "Signing Out..."
                : "Logout"}
        </DropdownMenuItem>
    );
}