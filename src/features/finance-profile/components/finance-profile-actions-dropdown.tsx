"use client";

import { MoreVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FinanceProfileStatus, Currency } from "@prisma/client";

import EditFinanceProfileDialog from "./edit-finance-profile-dialog";
import ArchiveFinanceProfileDialog from "./archive-finance-profile-dialog";
import RestoreFinanceProfileDialog from "./restore-finance-profile-dialog";
import DeleteFinanceProfileDialog from "./delete-finance-profile-dialog";

interface FinanceProfileActionsDropdownProps {
    profile: {
        id: string;
        name: string;
        description: string | null;
        baseCurrency: Currency;
        status: FinanceProfileStatus;
    };

    isActive: boolean;

    onSwitch: () => void;

    switching: boolean;
}

export default function FinanceProfileActionsDropdown({
    profile,
    isActive,
    onSwitch,
    switching,
}: FinanceProfileActionsDropdownProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                {profile.status === FinanceProfileStatus.ACTIVE ? (
                    <>

                        {!isActive && (
                            <>
                                <DropdownMenuItem
                                    onClick={onSwitch}
                                    disabled={switching}
                                >
                                    {switching
                                        ? "Switching..."
                                        : "Switch Profile"}
                                </DropdownMenuItem>

                                <DropdownMenuSeparator />
                            </>
                        )}

                        <EditFinanceProfileDialog
                            profile={profile}
                        />

                        <DropdownMenuSeparator />

                        <ArchiveFinanceProfileDialog
                            profileId={profile.id}
                            disabled={isActive}
                        />
                    </>
                ) : (
                    <>
                        <RestoreFinanceProfileDialog
                            profileId={profile.id}
                        />

                        <DropdownMenuSeparator />

                        <DeleteFinanceProfileDialog
                            profileId={profile.id}
                        />
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}