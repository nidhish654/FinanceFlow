"use client";

import { Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";

export function SidebarFooter() {
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
            <Settings className="h-5 w-5" />

            {!collapsed && (
                <div className="ml-3">
                    <p className="text-sm font-medium">
                        Settings
                    </p>

                    <p className="text-xs text-muted-foreground">
                        FinanceFlow v0.2
                    </p>
                </div>
            )}
        </button>
    );
}