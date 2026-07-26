"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import FinanceProfileForm from "./finance-profile-form";

import { createFinanceProfile } from "../actions/create-finance-profile";

export default function CreateFinanceProfileDialog() {
    const [open, setOpen] = useState(false);

    const router = useRouter();

    async function handleCreate(values: any) {
        const result =
            await createFinanceProfile(values);

        if (!result.success) {
            toast.error(result.message);
            return;
        }

        toast.success(result.message);

        setOpen(false);

        router.refresh();
    }

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button>
                    Create Finance Profile
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>
                        Create Finance Profile
                    </DialogTitle>
                </DialogHeader>

                <FinanceProfileForm
                    title="Finance Profile"
                    description="Create another finance profile."
                    submitLabel="Create"
                    loadingLabel="Creating..."
                    onSubmit={handleCreate}
                />
            </DialogContent>
        </Dialog>
    );
}