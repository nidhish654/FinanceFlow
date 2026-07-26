"use client";

import type { CategoryIcon } from "@/lib/category-icons";

import IconButton from "./icon-button";

interface IconGroupProps {
    title: string;
    icons: CategoryIcon[];
    selectedValue?: string;
    onSelect: (value: string) => void;
}

export default function IconGroup({
    title,
    icons,
    selectedValue,
    onSelect,
}: IconGroupProps) {
    if (icons.length === 0) {
        return null;
    }

    return (
        <section className="space-y-3">
            <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-border" />

                <h3 className="shrink-0 text-sm font-semibold text-muted-foreground">
                    {title}
                </h3>

                <div className="h-px flex-1 bg-border" />
            </div>

            <div
                className="
                    grid
                    grid-cols-4
                    gap-3

                    sm:grid-cols-5

                    md:grid-cols-6

                    lg:grid-cols-7
                "
            >
                {icons.map((icon) => (
                    <IconButton
                        key={icon.value}
                        icon={icon}
                        selected={
                            selectedValue === icon.value
                        }
                        onSelect={onSelect}
                    />
                ))}
            </div>
        </section>
    );
}