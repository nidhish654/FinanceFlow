"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { SETTINGS_NAVIGATION } from "../lib/settings-navigation";

export function SettingsMobileNav() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentTab =
        searchParams.get("tab") ?? "profile";

    return (
        <div className="mb-8 grid grid-cols-2 gap-4 lg:hidden">
            {SETTINGS_NAVIGATION.map((item) => {
                const Icon = item.icon;

                const isActive =
                    currentTab === item.id;

                return (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() =>
                            router.push(item.href)
                        }
                        className={cn(
                            "group flex h-28 flex-col items-center justify-center rounded-2xl border bg-card p-4 text-center transition-all duration-200",
                            isActive
                                ? "border-primary/60 bg-primary/5 shadow-sm"
                                : "border-border hover:border-primary/30 hover:bg-accent"
                        )}
                    >
                        <div
                            className={cn(
                                "mb-3 flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                                isActive
                                    ? "bg-primary/10"
                                    : "bg-muted group-hover:bg-primary/5"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground group-hover:text-primary"
                                )}
                            />
                        </div>

                        <span
                            className={cn(
                                "text-sm font-semibold leading-tight transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-foreground"
                            )}
                        >
                            {item.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}