"use client";

import { cn } from "@/lib/utils";

export interface PlanningTab<T extends string = string> {
    value: T;
    label: string;
}

interface PlanningTabsProps<T extends string = string> {
    tabs: PlanningTab<T>[];

    value: T;

    onValueChange: (value: T) => void;

    className?: string;
}

export default function PlanningTabs<T extends string = string>({
    tabs,
    value,
    onValueChange,
    className,
}: PlanningTabsProps<T>) {
    return (
        <nav
            className={cn(
                "flex items-center gap-3",
                className
            )}
        >
            <div className="flex w-max min-w-full items-center justify-center gap-3 lg:justify-end">
                {tabs.map((tab, index) => {
                    const selected = value === tab.value;

                    return (
                        <div
                            key={tab.value}
                            className="flex shrink-0 items-center gap-3"
                        >
                            <button
                                type="button"
                                onClick={() =>
                                    onValueChange(tab.value)
                                }
                                className={cn(
                                    "relative whitespace-nowrap pb-2 text-2xl font-semibold transition-colors lg:text-3xl",
                                    selected
                                        ? "text-primary"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {tab.label}

                                <span
                                    className={cn(
                                        "absolute inset-x-0 -bottom-px h-0.5 rounded-full transition-all",
                                        selected
                                            ? "bg-primary"
                                            : "bg-transparent"
                                    )}
                                />
                            </button>

                            {index < tabs.length - 1 && (
                                <span className="text-muted-foreground">
                                    |
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
        </nav>
    );
}