"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";

export function Navigation() {
    const pathname = usePathname();
    const collapsed = useSidebar((state) => state.collapsed);

    return (
        <nav className="space-y-2">
            {navigation.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center rounded-xl transition-all",
                            collapsed
                                ? "justify-center p-3"
                                : "gap-3 px-3 py-2",
                            active
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted"
                        )}
                    >
                        <Icon className="h-5 w-5 shrink-0" />

                        {!collapsed && (
                            <span>{item.title}</span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}