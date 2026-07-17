"use client";

import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";

export function ProfileSwitcher() {
    const collapsed = useSidebar((state) => state.collapsed);

    return (
        <button
            className={cn(
                "flex w-full items-center rounded-xl border p-3 transition-all",
                collapsed
                    ? "justify-center"
                    : "justify-between"
            )}
        >
            <span className="text-xl">🇮🇳</span>

            {!collapsed && (
                <>
                    <span className="flex-1 px-3 text-left">
                        India
                    </span>

                    <ChevronDown className="h-4 w-4" />
                </>
            )}
        </button>
    );
}