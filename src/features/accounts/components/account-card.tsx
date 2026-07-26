"use client";

import { useState } from "react";

import {
    MoreVertical,
    Pencil,
    Trash2,
} from "lucide-react";

import DataCard from "@/components/common/DataCard";
import CurrencyAmount from "@/components/common/CurrencyAmount";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import EditAccountDialog from "./edit-account-dialog";
import DeleteAccountDialog from "./delete-account-dialog";

import { AccountDto } from "../types/account";
import { getAccountTypeConfig } from "../constants/account-icons";

interface AccountCardProps {
    account: AccountDto;
}

function formatAccountType(type: string) {
    return type
        .replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AccountCard({
    account,
}: AccountCardProps) {
    const { icon: Icon, iconClassName } = getAccountTypeConfig(account.type);

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <DataCard
                className="
                    group
                    w-full
                    overflow-hidden
                    p-0
                    transition-all
                    duration-200
                    ease-in-out
                    hover:-translate-y-1
                    hover:border-primary/30
                    hover:shadow-lg
                "
            >
                <div className="flex h-full flex-col p-1">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                        <div className="flex min-w-0 items-center gap-2">
                            <div
                                className={`
                                    flex h-9 w-9 items-center justify-center
                                    rounded-xl
                                    transition-all
                                    duration-200
                                    group-hover:scale-105
                                    ${iconClassName}
                                `}
                            >
                                <Icon className="h-5 w-5" />
                            </div>

                            <div className="min-w-0">
                                <h3 className="truncate text-xl font-semibold">
                                    {account.name}
                                </h3>
                            </div>
                        </div>

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
                                <DropdownMenuItem
                                    onClick={() => setEditOpen(true)}
                                >
                                    <Pencil className="mr-2 h-4 w-4" />
                                    Edit
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    className="text-destructive focus:text-destructive"
                                    onClick={() => setDeleteOpen(true)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    {/* Balance */}
                    <div className="flex flex-1 flex-col items-center justify-center py-5">
                        <div className="text-3xl font-bold tracking-tight">
                            <CurrencyAmount
                                amount={account.currentBalance}
                                currency={account.currency ?? "INR"}
                            />
                        </div>

                        <p className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                            Current Balance
                        </p>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t pt-5">
                        <Badge
                            variant="secondary"
                            className={`
                                border-0
                                font-medium
                                ${iconClassName}
                            `}
                        >
                            <Icon className="mr-1 h-3.5 w-3.5" />
                            {formatAccountType(account.type)}
                        </Badge>

                        <span className="text-xs text-muted-foreground">
                            {account.transactionCount} Transaction
                            {account.transactionCount !== 1 ? "s" : ""}
                        </span>
                    </div>
                </div>
            </DataCard>

            <EditAccountDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                account={account}
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