"use client";

import { cn } from "@/lib/utils";

interface ViewSelectorProps {
    firstLabel: string;
    secondLabel: string;

    firstCount: number;
    secondCount: number;

    value: "first" | "second";

    onValueChange: (
        value: "first" | "second"
    ) => void;
}

export default function ViewSelector({
    firstLabel,
    secondLabel,
    firstCount,
    secondCount,
    value,
    onValueChange,
}: ViewSelectorProps) {
    return (
        <div className="flex w-full gap-3 sm:w-fit">
            <button
                type="button"
                onClick={() =>
                    onValueChange("first")
                }
                className={cn(
                    "flex h-14 w-[150px] sm:h-16 sm:w-44 items-center justify-between rounded-xl border px-4 sm:px-5 transition-all duration-200",
                    value === "first"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "hover:border-primary/30 hover:bg-muted/30"
                )}
            >
                <span className="font-semibold">
                    {firstLabel}
                </span>

                <span className="text-2xl font-bold">
                    {firstCount}
                </span>
            </button>

            <button
                type="button"
                onClick={() =>
                    onValueChange("second")
                }
                className={cn(
                    "flex h-14 w-[150px] sm:h-16 sm:w-44 items-center justify-between rounded-xl border px-4 sm:px-5 transition-all duration-200",
                    value === "second"
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "hover:border-primary/30 hover:bg-muted/30"
                )}
            >
                <span className="font-semibold">
                    {secondLabel}
                </span>

                <span className="text-2xl font-bold">
                    {secondCount}
                </span>
            </button>
        </div >
    );
}