"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Currency, FinanceProfileStatus } from "@prisma/client";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { setActiveFinanceProfileAction } from "../actions/set-active-finance-profile";
import ArchiveFinanceProfileDialog from "./archive-finance-profile-dialog";
import DeleteFinanceProfileDialog from "./delete-finance-profile-dialog";
import EditFinanceProfileDialog from "./edit-finance-profile-dialog";
import RestoreFinanceProfileDialog from "./restore-finance-profile-dialog";

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
                    <h2 className="text-xl font-semibold">
                        {profile.name}
                    </h2>

                    <p className="mt-1.5 text-sm text-muted-foreground">
                        {profile.description ??
                            "No description"}
                    </p>
                </div>

                    <Badge
                        className="h-6 px-2 text-xs"
                        variant={
                            profile.status === FinanceProfileStatus.ACTIVE
                                ? "default"
                                : "secondary"
                        }
                    >
                        {profile.status === FinanceProfileStatus.ARCHIVED
                            ? "Archived"
                            : isActive
                            ? "Current"
                            : "Active"}
                    </Badge>
            </div>

            <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span>Currency</span>

                    <span className="font-medium">
                        {profile.baseCurrency}
                    </span>
                </div>
            </div>

            <div className="mt-6 space-y-2">

                {profile.status ===
                FinanceProfileStatus.ACTIVE ? (
                    <>
                        <Button
                            className="h-9 w-full rounded-lg"
                            disabled={
                                isActive || isPending
                            }
                            variant={
                                isActive
                                    ? "secondary"
                                    : "default"
                            }
                            onClick={handleSwitch}
                        >
                            {isPending
                                ? "Switching..."
                                : isActive
                                ? "Current Profile"
                                : "Switch"}
                        </Button>

                        <div className="flex  items-center justify-between mt-2">
                            <EditFinanceProfileDialog profile={profile} />

                            <ArchiveFinanceProfileDialog
                                profileId={profile.id}
                                disabled={isActive}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <RestoreFinanceProfileDialog
                            profileId={profile.id}
                        />

                        <DeleteFinanceProfileDialog
                            profileId={profile.id}
                        />
                    </>
                )}

            </div>
            </div>
    );
}