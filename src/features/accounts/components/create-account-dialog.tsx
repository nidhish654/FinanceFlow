"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import AccountForm from "./account-form";

import { createAccount } from "../actions/create-account";
import { AccountFormInput } from "../schemas/account.schema";
import { Plus } from "lucide-react";

export default function CreateAccountDialog() {
    const [open, setOpen] = useState(false);

    async function handleCreateAccount(
        values: AccountFormInput
    ) {
        const result = await createAccount(values);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setOpen(false);
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Account
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Create Account</DialogTitle>
                </DialogHeader>

                <AccountForm
                    submitLabel="Create Account"
                    onSubmit={handleCreateAccount}
                />
            </DialogContent>
        </Dialog>
    );
}