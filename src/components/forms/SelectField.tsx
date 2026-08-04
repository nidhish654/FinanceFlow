"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { CategoryType } from "@prisma/client";

export interface SelectOption<
    T extends string = string
> {
    label: string;
    value: T;

    disabled?: boolean;
    description?: string;
    icon?: React.ReactNode;
    group?: string;

    type?: CategoryType;
    parentCategoryId?: string | null;
}

interface SelectFieldProps<
    T extends string = string
> {
    value: T;
    onValueChange: (value: T) => void;
    placeholder: string;
    options: SelectOption<T>[];
}

export default function SelectField<
    T extends string = string
>({
    value,
    onValueChange,
    placeholder,
    options,
}: SelectFieldProps<T>) {
    const groups = new Map<
        string,
        SelectOption<T>[]
    >();

    const ungrouped: SelectOption<T>[] = [];

    for (const option of options) {
        if (!option.group) {
            ungrouped.push(option);
            continue;
        }

        const existing =
            groups.get(option.group) ?? [];

        existing.push(option);

        groups.set(option.group, existing);
    }

    const groupedEntries = [
        ...groups.entries(),
    ];

    return (
        <Select
            value={value}
            onValueChange={onValueChange}
        >
            <SelectTrigger>
                <SelectValue
                    placeholder={placeholder}
                />
            </SelectTrigger>

            <SelectContent>
                {groupedEntries.length === 0 ? (
                    options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            disabled={
                                option.disabled
                            }
                        >
                            {option.label}
                        </SelectItem>
                    ))
                ) : (
                    <>
                        {ungrouped.map((option) => (
                            <SelectItem
                                key={option.value}
                                value={option.value}
                                disabled={
                                    option.disabled
                                }
                            >
                                {option.label}
                            </SelectItem>
                        ))}

                        {ungrouped.length > 0 && (
                            <SelectSeparator />
                        )}

                        {groupedEntries.map(
                            (
                                [group, items],
                                index
                            ) => (
                                <div key={group}>
                                    {index > 0 && (
                                        <SelectSeparator />
                                    )}

                                    <SelectGroup>
                                        <SelectLabel>
                                            {group}
                                        </SelectLabel>

                                        {items.map(
                                            (
                                                option
                                            ) => (
                                                <SelectItem
                                                    key={
                                                        option.value
                                                    }
                                                    value={
                                                        option.value
                                                    }
                                                    disabled={
                                                        option.disabled
                                                    }
                                                >
                                                    {
                                                        option.label
                                                    }
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectGroup>
                                </div>
                            )
                        )}
                    </>
                )}
            </SelectContent>
        </Select>
    );
}