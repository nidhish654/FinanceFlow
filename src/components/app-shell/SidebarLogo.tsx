"use client";

import Link from "next/link";
import { Wallet } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";

export function SidebarLogo() {
    const collapsed = useSidebar((state) => state.collapsed);

    return (
        <Link
            href="/dashboard"
            className={cn(
                "flex items-center transition-all duration-300",
                collapsed ? "justify-center" : "gap-3"
            )}
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Wallet className="h-5 w-5" />
            </div>

            <div
                className={cn(
                    "overflow-hidden transition-all duration-300",
                    collapsed
                        ? "w-0 opacity-0"
                        : "w-auto opacity-100"
                )}
            >
                <p className="whitespace-nowrap font-semibold">
                    FinanceFlow
                </p>

                <p className="whitespace-nowrap text-xs text-muted-foreground">
                    Personal Finance
                </p>
            </div>
        </Link>
    );
}