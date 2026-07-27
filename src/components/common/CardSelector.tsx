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
}

export default function CardSelector<T extends string = string>({
    items,
    value,
    onValueChange,
    className,
}: CardSelectorProps<T>) {
    return (
        <div
            className={cn(
                "grid grid-cols-2 gap-3 sm:flex sm:w-fit",
                className
            )}
        >
            {items.map((item) => (
                <button
                    key={item.value}
                    type="button"
                    onClick={() => onValueChange(item.value)}
                    className={cn(
                        "flex h-14 w-full items-center justify-between rounded-xl border px-4 transition-all duration-200 sm:h-16 sm:min-w-44 sm:px-5",
                        value === item.value
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "hover:border-primary/30 hover:bg-muted/30"
                    )}
                >
                    <span className="font-semibold">
                        {item.label}
                    </span>

                    {item.count !== undefined && (
                        <span className="text-2xl font-bold">
                            {item.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
}