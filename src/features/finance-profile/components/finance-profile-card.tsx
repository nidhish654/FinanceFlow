"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Currency, FinanceProfileStatus } from "@prisma/client";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { setActiveFinanceProfileAction } from "../actions/set-active-finance-profile";

import FinanceProfileActionsDropdown from "./finance-profile-actions-dropdown";
import { Separator } from "@/components/ui/separator";

interface FinanceProfileCardProps {
    profile: {
        id: string;
        name: string;
        description: string | null;
        baseCurrency: Currency;
        status: FinanceProfileStatus;
    };

    isActive: boolean;
}

export default function FinanceProfileCard({
    profile,
    isActive,
}: FinanceProfileCardProps) {
    const router = useRouter();

    const [isPending, startTransition] =
        useTransition();

    function handleSwitch() {
        if (isActive) return;

        startTransition(async () => {
            const result =
                await setActiveFinanceProfileAction(
                    profile.id
                );

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);

            router.refresh();
        });
    }

    return (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        {profile.name}
                    </h2>

                    <p className="mt-1.5 text-sm text-muted-foreground">
                        {profile.description ??
                            "No description"}
                    </p>
                </div>
                <div className="flex items-center sm:gap-2">
                    <Badge
                        variant="outline"
                        className={
                            profile.status === FinanceProfileStatus.ARCHIVED
                                ? "h-6 px-2 text-xs border-muted text-muted-foreground"
                                : isActive
                                    ? "h-6 px-2 text-xs border-primary bg-primary text-primary-foreground"
                                    : "h-6 px-2 text-xs border-green-500/40 bg-green-500/10 text-green-600 dark:text-green-400"
                        }
                    >
                        {profile.status === FinanceProfileStatus.ARCHIVED
                            ? "Archived"
                            : isActive
                                ? "Current"
                                : "Active"}
                    </Badge>

                    <FinanceProfileActionsDropdown
                        profile={profile}
                        isActive={isActive}
                    />
                </div>
            </div>

            <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Currency</span>

                    <span className="font-medium">
                        {profile.baseCurrency}
                    </span>
                </div>
            </div>
            {profile.status !== FinanceProfileStatus.ARCHIVED && (
                <Separator className="mt-3" />
            )}

            <div className="mt-3 space-y-2">

                {profile.status === FinanceProfileStatus.ACTIVE && (
                    <Button
                        className="h-9 w-full rounded-lg"
                        disabled={isActive || isPending}
                        variant={isActive ? "secondary" : "default"}
                        onClick={handleSwitch}
                    >
                        {isPending
                            ? "Switching..."
                            : isActive
                                ? "Current Profile"
                                : "Switch Profile"}
                    </Button>
                )}

            </div>
        </div>
    );
}