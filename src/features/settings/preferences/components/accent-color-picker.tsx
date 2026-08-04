"use client";

import { AccentColor } from "@prisma/client";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ACCENT_COLORS } from "@/lib/theme/accent-colors";
import { useTheme } from "next-themes";

const ACCENT_OPTIONS = [
    {
        value: "DEFAULT",
        label: "Default",
        colorClass:
            "bg-gradient-to-br from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300",
    },
    {
        value: "PURPLE",
        label: "Purple",
        colorClass: "bg-[#8b5cf6]",
    },
    {
        value: "BLUE",
        label: "Blue",
        colorClass: "bg-[#3b82f6]",
    },
    {
        value: "EMERALD",
        label: "Emerald",
        colorClass: "bg-[#10b981]",
    },
    {
        value: "ORANGE",
        label: "Orange",
        colorClass: "bg-[#f97316]",
    },
    {
        value: "RED",
        label: "Red",
        colorClass: "bg-[#ef4444]",
    },
    {
        value: "SLATE",
        label: "Slate",
        colorClass: "bg-[#64748b]",
    },
] as const;

interface AccentColorPickerProps {
    value: AccentColor;
    onChange: (color: AccentColor) => void;
}

export function AccentColorPicker({
    value,
    onChange,
}: AccentColorPickerProps) {
    const { resolvedTheme } = useTheme();

    const theme =
        value === AccentColor.DEFAULT
            ? resolvedTheme === "dark"
                ? ACCENT_COLORS.DEFAULT_DARK
                : ACCENT_COLORS.DEFAULT_LIGHT
            : ACCENT_COLORS[value];

    const previewStyle = {
        "--primary": theme.primary,
        "--primary-foreground": theme.primaryForeground,
        "--ring": theme.ring,
        "--sidebar-primary": theme.sidebarPrimary,
        "--chart-1": theme.chart1,
    } as React.CSSProperties;

    return (
        <div className="flex flex-col gap-5">
            {/* Color Palette */}
            <div className="grid grid-cols-4 gap-4 sm:grid-cols-7">
                {ACCENT_OPTIONS.map((color) => {
                    const selected =
                        value === color.value;

                    return (
                        <button
                            key={color.value}
                            type="button"
                            onClick={() =>
                                onChange(
                                    color.value as AccentColor
                                )
                            }
                            className="group flex flex-col items-center gap-2"
                        >
                            <div
                                className={cn(
                                    "relative h-16 w-full rounded-xl border transition-all duration-200 hover:scale-105",
                                    color.colorClass,
                                    selected
                                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                        : "border-border hover:border-primary/40"
                                )}
                            >
                                {selected && (
                                    <Check
                                        className="
                                            absolute
                                            left-1/2
                                            top-1/2
                                            h-6
                                            w-6
                                            -translate-x-1/2
                                            -translate-y-1/2
                                            text-white
                                            drop-shadow
                                        "
                                    />
                                )}
                            </div>

                            <span
                                className={cn(
                                    "text-xs font-medium transition-colors",
                                    selected
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                )}
                            >
                                {color.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Live Preview */}
            <div
                className="mt-2 rounded-xl border bg-muted/30 p-5"
                style={previewStyle}
            >
                <h4 className="mb-5 text-sm font-semibold">
                    Preview
                </h4>

                <div className="flex flex-wrap items-center gap-5">
                    <Button className="shadow-none">
                        Primary Button
                    </Button>

                    <div className="flex text-sm font-medium">
                        <div className="border-b-2 border-primary px-4 py-2 text-primary">
                            Active Tab
                        </div>

                        <div className="border-b-2 border-transparent px-4 py-2 text-muted-foreground">
                            Inactive Tab
                        </div>
                    </div>

                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                        ● Badge
                    </div>
                </div>

                <div className="mt-6">
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                        <div className="h-full w-2/3 rounded-full bg-primary" />
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                        Progress Bar
                    </p>
                </div>
            </div>
        </div>
    );
}