"use client";

import { cn } from "@/lib/utils";

export interface CardSelectorItem<T extends string = string> {
    value: T;
    label: string;
    count?: number;
}

interface CardSelectorProps<T extends string = string> {
    items: CardSelectorItem<T>[];

    value: T;

    onValueChange: (value: T) => void;

    className?: string;

    variant?: "default" | "compact";
}

export default function CardSelector<T extends string = string>({
    items,
    value,
    onValueChange,
    className,
    variant = "default",
}: CardSelectorProps<T>) {
    const isCompact = variant === "compact";

    return (
        <div
            className={cn(
                "grid gap-3",
                isCompact
                    ? "grid-cols-2 sm:grid-cols-3 lg:flex lg:w-fit"
                    : "grid-cols-2 sm:flex sm:w-fit",
                className
            )}
        >
            {items.map((item) => {
                const selected = value === item.value;

                return (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() => onValueChange(item.value)}
                        className={cn(
                            "flex items-center rounded-xl border transition-all duration-200",
                            isCompact
                                ? "h-9 justify-center px-4 text-sm font-medium sm:min-w-32 sm:h-11"
                                : "h-14 justify-between px-4 sm:h-16 sm:min-w-44 sm:px-5",
                            selected
                                ? "border-primary bg-primary/5 shadow-sm"
                                : "hover:border-primary/30 hover:bg-muted/30"
                        )}
                    >
                        <span
                            className={cn(
                                isCompact
                                    ? "font-medium"
                                    : "font-semibold"
                            )}
                        >
                            {item.label}
                        </span>

                        {!isCompact &&
                            item.count !== undefined && (
                                <span className="text-2xl font-bold">
                                    {item.count}
                                </span>
                            )}
                    </button>
                );
            })}
        </div>
    );
}