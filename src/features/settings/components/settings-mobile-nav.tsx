"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SETTINGS_NAVIGATION } from "../lib/settings-navigation";

export function SettingsMobileNav() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const tab = searchParams.get("tab") || "profile";
    const currentItem = SETTINGS_NAVIGATION.find((item) => item.id === tab) || SETTINGS_NAVIGATION[0];

    return (
        <div className="block lg:hidden mb-6">
            <Select
                value={currentItem.id}
                onValueChange={(value) => {
                    const item = SETTINGS_NAVIGATION.find((i) => i.id === value);
                    if (item) {
                        router.push(item.href);
                    }
                }}
            >
                <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                        <currentItem.icon className="h-4 w-4 text-muted-foreground" />
                        <SelectValue placeholder="Select a section" />
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {SETTINGS_NAVIGATION.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                            <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4 text-muted-foreground" />
                                <span>{item.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
