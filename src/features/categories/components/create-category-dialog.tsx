"use client";

import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

import CreateCategoryForm from "./create-category-form";

export default function CreateCategoryDialog() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                    <Plus className="mr-2 h-4 w-4" />
                    New Category
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        New Category
                    </DialogTitle>

                    <DialogDescription>
                        Create a new income or expense category.
                    </DialogDescription>
                </DialogHeader>

                <CreateCategoryForm
                    onSuccess={() =>
                        setOpen(false)
                    }
                />
            </DialogContent>
        </Dialog>
    );
}