"use client";

import { useMemo, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import {
    searchCategoryIcons,
    getCategoryIcon,
} from "@/lib/category-icons";

import IconSearch from "./icon-search";
import IconGroup from "./icon-group";

interface IconPickerDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    value?: string;

    onChange: (value: string) => void;
}

export default function IconPickerDialog({
    open,
    onOpenChange,
    value,
    onChange,
}: IconPickerDialogProps) {
    const [search, setSearch] = useState("");

    const groups = useMemo(
        () => searchCategoryIcons(search),
        [search]
    );

    const selectedIcon = getCategoryIcon(value);

    function handleSelect(icon: string) {
        onChange(icon);
        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    max-h-[85vh]
                    overflow-hidden

                    sm:max-w-4xl
                "
            >
                <DialogHeader>
                    <DialogTitle>
                        Choose Category Icon
                    </DialogTitle>

                    <DialogDescription>
                        Browse or search icons for
                        your category.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-5">
                    <IconSearch
                        value={search}
                        onChange={setSearch}
                    />

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            bg-muted/40
                            px-4
                            py-3
                        "
                    >
                        <div className="rounded-lg bg-background p-2 shadow-sm">
                            <selectedIcon.icon className="h-5 w-5" />
                        </div>

                        <div>
                            <p className="text-sm font-medium">
                                Selected
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {selectedIcon.label}
                            </p>
                        </div>
                    </div>

                    <div
                        className="
                            max-h-[55vh]
                            space-y-8
                            overflow-y-auto
                            pr-1
                        "
                    >
                        {groups.length > 0 ? (
                            groups.map((group) => (
                                <IconGroup
                                    key={group.title}
                                    title={group.title}
                                    icons={group.icons}
                                    selectedValue={
                                        value
                                    }
                                    onSelect={
                                        handleSelect
                                    }
                                />
                            ))
                        ) : (
                            <div
                                className="
                                    flex
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    py-14
                                    text-center
                                "
                            >
                                <p className="font-medium">
                                    No icons found
                                </p>

                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try another
                                    search term.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}