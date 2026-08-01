"use client";

import { toast } from "sonner";

import { AccountDto } from "../types/account";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import AccountForm from "./account-form";

import { updateAccount } from "../actions/update-account";

interface EditAccountDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    account: AccountDto;
}

export default function EditAccountDialog({
    open,
    onOpenChange,
    account,
}: EditAccountDialogProps) {
    async function handleUpdate(values: any) {
        const result = await updateAccount(
            account.id,
            values
        );

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        onOpenChange(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        Edit Account
                    </DialogTitle>
                </DialogHeader>

                <AccountForm
                    defaultValues={{
                        name: account.name,
                        type: account.type,
                        openingBalance:
                            account.openingBalance,
                    }}
                    submitLabel="Save Changes"
                    onSubmit={handleUpdate}
                />
            </DialogContent>
        </Dialog>
    );
}