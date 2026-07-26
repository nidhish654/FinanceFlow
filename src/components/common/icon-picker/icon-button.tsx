"use client";

import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CategoryIcon } from "@/lib/category-icons";

interface IconButtonProps {
    icon: CategoryIcon;
    selected: boolean;
    onSelect: (value: string) => void;
}

export default function IconButton({
    icon,
    selected,
    onSelect,
}: IconButtonProps) {
    const Icon = icon.icon;

    return (
        <button
            type="button"
            onClick={() => onSelect(icon.value)}
            className={cn(
                "group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-3 transition-all duration-200",
                "hover:border-primary hover:bg-accent hover:shadow-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                selected &&
                    "border-primary bg-primary/10 shadow-sm"
            )}
        >
            {selected && (
                <div className="absolute right-2 top-2 rounded-full bg-primary p-0.5 text-primary-foreground">
                    <Check className="h-3 w-3" />
                </div>
            )}

            <div
                className={cn(
                    "rounded-lg p-2 transition-colors",
                    selected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
            >
                <Icon className="h-6 w-6" />
            </div>

            <span className="line-clamp-1 text-center text-xs font-medium">
                {icon.label}
            </span>
        </button>
    );
}