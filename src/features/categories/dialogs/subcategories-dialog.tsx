"use client";

import { Category } from "@prisma/client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { getCategoryIcon } from "@/lib/category-icons";

import CategoryActions from "../components/category-actions";

interface SubcategoriesDialogProps {
    trigger: React.ReactNode;

    category: Category;

    subcategories: Category[];
}

export default function SubcategoriesDialog({
    trigger,
    category,
    subcategories,
}: SubcategoriesDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>
                        {category.name}
                    </DialogTitle>

                    <DialogDescription>
                        {subcategories.length}{" "}
                        {subcategories.length === 1
                            ? "subcategory"
                            : "subcategories"}
                    </DialogDescription>
                </DialogHeader>

                <Separator />

                {subcategories.length === 0 ? (
                    <div
                        className="
                            flex
                            h-48
                            items-center
                            justify-center
                            text-center
                            text-muted-foreground
                        "
                    >
                        No subcategories found.
                    </div>
                ) : (
                    <ScrollArea className="max-h-[420px] pr-3">
                        <div className="space-y-3">
                            {subcategories.map((subcategory) => {
                                const {
                                    icon: Icon,
                                } = getCategoryIcon(
                                    subcategory.icon
                                );

                                const color =
                                    subcategory.color ??
                                    "#6366F1";

                                return (
                                    <div
                                        key={
                                            subcategory.id
                                        }
                                        className="
                                            group
                                            flex
                                            items-center
                                            justify-between
                                            rounded-xl
                                            border
                                            p-4
                                            transition-colors
                                            hover:bg-muted/40
                                        "
                                    >
                                        <div className="flex items-center gap-4">
                                            <div
                                                className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    items-center
                                                    justify-center
                                                    rounded-xl
                                                "
                                                style={{
                                                    backgroundColor: `${color}18`,
                                                    color,
                                                }}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <div className="space-y-1">
                                                <p className="font-semibold">
                                                    {
                                                        subcategory.name
                                                    }
                                                </p>

                                                {subcategory.description && (
                                                    <p className="text-sm text-muted-foreground">
                                                        {
                                                            subcategory.description
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <CategoryActions
                                            category={
                                                subcategory
                                            }
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollArea>
                )}
            </DialogContent>
        </Dialog>
    );
}