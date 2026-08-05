"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2, Archive, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditAccountDialog from "./edit-account-dialog";
import DeleteAccountDialog from "./delete-account-dialog";
import ArchiveAccountDialog from "./archive-account-dialog";
import RestoreAccountDialog from "./restore-account-dialog";

import { AccountDto } from "../types/account";

interface AccountActionsProps {
    account: AccountDto;
}

export default function AccountActions({ account }: AccountActionsProps) {
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [archiveOpen, setArchiveOpen] = useState(false);
    const [restoreOpen, setRestoreOpen] = useState(false);

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

                <DropdownMenuContent align="end" className="w-40">
                    {!account.isArchived ? (
                        <>
                            <DropdownMenuItem onClick={() => setEditOpen(true)}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem onClick={() => setArchiveOpen(true)}>
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <>
                            <DropdownMenuItem onClick={() => setRestoreOpen(true)}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Restore
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => setDeleteOpen(true)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
            </DropdownMenu>

            <EditAccountDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                account={account}
            />

            <ArchiveAccountDialog
                open={archiveOpen}
                onOpenChange={setArchiveOpen}
                accountId={account.id}
                accountName={account.name}
            />

            <RestoreAccountDialog
                open={restoreOpen}
                onOpenChange={setRestoreOpen}
                accountId={account.id}
                accountName={account.name}
            />

            <DeleteAccountDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                accountId={account.id}
                accountName={account.name}
            />
        </>
    );
}
