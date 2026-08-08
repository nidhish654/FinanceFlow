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
                            "relative flex items-center rounded-lg transition-all duration-200 ease-out",
                            collapsed
                                ? "justify-center p-3"
                                : "gap-3 px-3 py-2",
                            active
                                ? "bg-accent text-accent-foreground"
                                : "hover:bg-muted hover:translate-x-0.5"
                        )}
                    >
                        {active && (
                            <span
                                className="
                                    absolute
                                    left-0
                                    top-1/2
                                    h-7
                                    w-1.5
                                    -translate-y-1/2
                                    rounded-r-full
                                    bg-primary
                                "
                            />
                        )}
                        <Icon
                            className={cn(
                                "h-5 w-5 shrink-0 transition-transform duration-200",
                                active && "scale-105"
                            )}
                        />

                        {!collapsed && (
                            <span>{item.title}</span>
                        )}
                    </Link>
                );
            })}
        </nav>
    );
}