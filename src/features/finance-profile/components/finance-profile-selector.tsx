"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
    Check,
    ChevronDown,
    Settings2,
} from "lucide-react";

import { toast } from "sonner";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { setActiveFinanceProfileAction } from "../actions/set-active-finance-profile";

type FinanceProfile = {
    id: string;
    name: string;
    baseCurrency: string;
};

type FinanceProfileSelectorProps = {
    profiles: FinanceProfile[];
    activeProfileId: string;
};

export function FinanceProfileSelector({
    profiles,
    activeProfileId,
}: FinanceProfileSelectorProps) {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    const activeProfile = profiles.find(
        (profile) =>
            profile.id === activeProfileId
    );

    const handleSelect = (
        profileId: string
    ) => {
        if (profileId === activeProfileId)
            return;

        startTransition(async () => {
            const result =
                await setActiveFinanceProfileAction(
                    profileId
                );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            router.refresh();
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    disabled={isPending}
                    className="
                        h-12
                        w-full
                        justify-between
                        rounded-xl
                        px-4
                        text-left
                    "
                >
                    <span className="truncate font-medium">
                        {activeProfile?.name ??
                            "Finance Profile"}
                    </span>

                    <ChevronDown className="h-4 w-4 shrink-0 opacity-70" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="start"
                className="w-[280px] rounded-xl"
            >
                {profiles.map((profile) => (
                    <DropdownMenuItem
                        key={profile.id}
                        onClick={() =>
                            handleSelect(
                                profile.id
                            )
                        }
                        className="cursor-pointer py-3"
                    >
                        <div className="flex w-full items-center justify-between gap-4">
                            <div className="min-w-0">
                                <p className="truncate font-medium">
                                    {profile.name}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-xs text-muted-foreground">
                                    {
                                        profile.baseCurrency
                                    }
                                </span>

                                {profile.id ===
                                    activeProfileId && (
                                    <Check className="h-4 w-4 text-primary" />
                                )}
                            </div>
                        </div>
                    </DropdownMenuItem>
                ))}

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={() =>
                        router.push(
                            "/finance-profile"
                        )
                    }
                    className="cursor-pointer py-3"
                >
                    <Settings2 className="mr-2 h-4 w-4" />

                    Manage Finance Profiles
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}