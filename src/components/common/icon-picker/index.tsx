"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    getCategoryIcon,
} from "@/lib/category-icons";

import IconPickerDialog from "./icon-picker-dialog";

interface IconPickerProps {
    value?: string;
    onChange: (value: string) => void;
    disabled?: boolean;
}

export default function IconPicker({
    value,
    onChange,
    disabled,
}: IconPickerProps) {
    const [open, setOpen] = useState(false);

    const selectedIcon = getCategoryIcon(value);
    const Icon = selectedIcon.icon;

    return (
        <>
            <Button
                type="button"
                variant="outline"
                disabled={disabled}
                onClick={() => setOpen(true)}
                className="h-auto w-full justify-between px-4 py-3"
            >
                <div className="flex items-center gap-3">
                    <div className="rounded-lg border bg-muted p-2">
                        <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">
                            {selectedIcon.label}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            Click to choose another icon
                        </span>
                    </div>
                </div>

                <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>

            <IconPickerDialog
                open={open}
                onOpenChange={setOpen}
                value={value}
                onChange={onChange}
            />
        </>
    );
}