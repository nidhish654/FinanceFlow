"use client";

import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface IconSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export default function IconSearch({
    value,
    onChange,
}: IconSearchProps) {
    return (
        <div className="relative">
            <Search
                className="
                    absolute
                    left-3
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-muted-foreground
                "
            />

            <Input
                value={value}
                placeholder="Search icons..."
                onChange={(e) =>
                    onChange(e.target.value)
                }
                className="h-11 pl-10 pr-10"
            />

            {value && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onChange("")}
                    className="
                        absolute
                        right-1
                        top-1/2
                        h-8
                        w-8
                        -translate-y-1/2
                    "
                >
                    <X className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}