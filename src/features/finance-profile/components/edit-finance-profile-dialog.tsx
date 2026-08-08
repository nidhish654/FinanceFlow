"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import FinanceProfileForm from "./finance-profile-form";

import { updateFinanceProfile } from "../actions/update-finance-profile";

import type { FinanceProfileSchema } from "../schemas/finance-profile.schema";

import { Currency } from "@prisma/client";

interface EditFinanceProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    profile: {
        id: string;
        name: string;
        description: string | null;
        baseCurrency: Currency;
    };
}

export default function EditFinanceProfileDialog({
    open,
    onOpenChange,
    profile,
}: EditFinanceProfileDialogProps) {
    const router = useRouter();

    async function handleUpdate(
        values: FinanceProfileSchema
    ) {
        const result =
            await updateFinanceProfile(
                profile.id,
                values
            );

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        onOpenChange(false);

        router.refresh();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Edit Finance Profile
                    </DialogTitle>
                </DialogHeader>

                <FinanceProfileForm
                    defaultValues={{
                        name: profile.name,
                        description:
                            profile.description ?? "",
                        baseCurrency:
                            profile.baseCurrency,
                    }}
                    title="Finance Profile"
                    description="Update your finance profile."
                    submitLabel="Save Changes"
                    loadingLabel="Saving..."
                    disableCurrency
                    onSubmit={handleUpdate}
                />
            </DialogContent>
        </Dialog>
    );
}