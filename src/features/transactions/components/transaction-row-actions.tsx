"use client";

import { useState } from "react";

import { SelectOption } from "@/components/forms/SelectField";

import { TransactionDto } from "../types/transaction";

import TransactionActions from "./transaction-actions";
import ViewTransactionSheet from "./view-transaction-sheet";
import EditTransactionDialog from "./edit-transaction-dialog";
import DeleteTransactionDialog from "./delete-transaction-dialog";

interface TransactionRowActionsProps {
    transaction: TransactionDto;
    accountOptions: SelectOption[];
    categoryOptions: SelectOption[];
}

export default function TransactionRowActions({
    transaction,
    accountOptions,
    categoryOptions,
}: TransactionRowActionsProps) {
    const [viewOpen, setViewOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    return (
        <>
            <TransactionActions
                onView={() => setViewOpen(true)}
                onEdit={() => setEditOpen(true)}
                onDelete={() => setDeleteOpen(true)}
            />

            <ViewTransactionSheet
                open={viewOpen}
                onOpenChange={setViewOpen}
                transaction={transaction}
            />

            <EditTransactionDialog
                open={editOpen}
                onOpenChange={setEditOpen}
                transaction={transaction}
                accountOptions={accountOptions}
                categoryOptions={categoryOptions}
            />

            <DeleteTransactionDialog
                open={deleteOpen}
                onOpenChange={setDeleteOpen}
                transaction={transaction}
            />
        </>
    );
}