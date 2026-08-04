"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface PreferenceSelectOption {
    label: string;
    value: string;
    disabled?: boolean;
}

interface PreferenceSelectProps {
    id: string;
    label: string;
    description?: string;
    value: string;
    options: PreferenceSelectOption[];
    onChange: (value: string) => void;
}

export function PreferenceSelect({
    id,
    label,
    description,
    value,
    options,
    onChange,
}: PreferenceSelectProps) {
    return (
        <div className="flex flex-col gap-2">
            <Label htmlFor={id}>{label}</Label>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger id={id} className="w-full sm:max-w-xs">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
