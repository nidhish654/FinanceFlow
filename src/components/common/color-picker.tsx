"use client";

import { Check, Paintbrush } from "lucide-react";

import { PRESET_COLORS } from "@/lib/colors";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ColorPickerProps {
    value?: string | null;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function ColorPicker({
    value,
    onChange,
    disabled = false,
}: ColorPickerProps) {
    const currentColor = value ?? "#6366F1";

    return (
        <div className="space-y-4">
            <div>
                {/* <p className="mb-3 text-sm font-medium">
                    Preset Colors
                </p> */}

                <div
                    className="
                        grid
                        grid-cols-7
                        gap-2

                        sm:grid-cols-8

                        md:grid-cols-10
                    "
                >
                    {PRESET_COLORS.map((color) => {
                        const selected =
                            color.toLowerCase() ===
                            currentColor.toLowerCase();

                        return (
                            <button
                                key={color}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                    onChange(color)
                                }
                                className={cn(
                                    "flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 focus:outline-none",
                                    selected &&
                                        "ring-1 ring-primary ring-offset-1"
                                )}
                            >
                                <span
                                    className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full border shadow-sm"
                                    style={{
                                        backgroundColor:
                                            color,
                                        borderColor:
                                            color,
                                    }}
                                >
                                    {selected && (
                                        <Check className="h-3.5 w-3.5 text-white" />
                                    )}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <p className="mb-3 text-sm font-medium">
                    Custom Color
                </p>

                <div className="flex items-center gap-3">
                    <label className="cursor-pointer">
                        <input
                            type="color"
                            value={currentColor}
                            onChange={(e) =>
                                onChange(
                                    e.target.value
                                )
                            }
                            className="sr-only"
                            disabled={disabled}
                        />

                        <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            asChild
                            disabled={disabled}
                            className="h-8 w-8"
                        >
                            <span>
                                <Paintbrush className="h-4 w-4" />
                            </span>
                        </Button>
                    </label>

                    <Input
                        value={currentColor}
                        onChange={(e) =>
                            onChange(e.target.value)
                        }
                        disabled={disabled}
                        className="font-mono uppercase"
                        placeholder="#6366F1"
                    />
                </div>
            </div>
        </div>
    );
}