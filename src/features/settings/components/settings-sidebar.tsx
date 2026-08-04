"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SETTINGS_NAVIGATION } from "../lib/settings-navigation";

export function SettingsSidebar() {
    const searchParams = useSearchParams();
    const tab = searchParams.get("tab") || "profile";

    return (
        <nav className="hidden w-48 flex-col gap-1 lg:flex text-sm">
            {SETTINGS_NAVIGATION.map((item) => {
                const isActive = tab === item.id;

                return (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                            buttonVariants({ variant: isActive ? "secondary" : "ghost" }),
                            "justify-start gap-3",
                            isActive ? "bg-muted font-medium text-primary" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                        )}
                    >
                        <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
