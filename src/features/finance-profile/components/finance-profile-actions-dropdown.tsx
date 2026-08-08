"use client";

import { useState } from "react";

import {
    Archive,
    MoreVertical,
    Pencil,
    RefreshCw,
    Trash2,
} from "lucide-react";

import {
    Currency,
    FinanceProfileStatus,
} from "@prisma/client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ArchiveFinanceProfileDialog from "./archive-finance-profile-dialog";
import DeleteFinanceProfileDialog from "./delete-finance-profile-dialog";
import EditFinanceProfileDialog from "./edit-finance-profile-dialog";
import RestoreFinanceProfileDialog from "./restore-finance-profile-dialog";

interface FinanceProfileActionsDropdownProps {
    profile: {
        id: string;
        name: string;
        description: string | null;
        baseCurrency: Currency;
        status: FinanceProfileStatus;
    };

    isActive: boolean;
}

export default function FinanceProfileActionsDropdown({
    profile,
    isActive,
}: FinanceProfileActionsDropdownProps) {
    const [editOpen, setEditOpen] =
        useState(false);

    const [archiveOpen, setArchiveOpen] =
        useState(false);

    const [restoreOpen, setRestoreOpen] =
        useState(false);

    const [deleteOpen, setDeleteOpen] =
        useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-lg"
                    >
                        <MoreVertical className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                    align="end"
                    className="w-40"
                >
                    {profile.status ===
                        FinanceProfileStatus.ACTIVE ? (
                        <>
                            <DropdownMenuItem
                                onClick={() =>
                                    setEditOpen(true)
                                }
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                disabled={isActive}
                                onClick={() =>
                                    setArchiveOpen(
                                        true
                                    )
                                }
                            >
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem
                                onClick={() =>
                                    setRestoreOpen(
                                        true
                                    )
                                }
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Restore
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() =>
                                    setDeleteOpen(
                                        true
                                    )
                                }
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <EditFinanceProfileDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                profile={profile}
            />

            <ArchiveFinanceProfileDialog
                open={archiveOpen}
                onOpenChange={setArchiveOpen}
                profileId={profile.id}
                disabled={isActive}
            />

            <RestoreFinanceProfileDialog
                open={restoreOpen}
                onOpenChange={setRestoreOpen}
                profileId={profile.id}
            />

            <DeleteFinanceProfileDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                profileId={profile.id}
            />
        </>
    );
}