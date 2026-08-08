"use client";

import { Category } from "@prisma/client";
import {
    Archive,
    MoreVertical,
    Pencil,
    RotateCcw,
    Trash2,
    PlusCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ArchiveCategoryDialog from "../dialogs/archive-category-dialog";
import DeleteCategoryDialog from "../dialogs/delete-category-dialog";
import EditCategoryDialog from "../dialogs/edit-category-dialog";
import RestoreCategoryDialog from "../dialogs/restore-category-dialog";
import CreateCategoryDialog from "./create-category-dialog";

interface CategoryActionsProps {
    category: Category;
}

export default function CategoryActions({
    category,
}: CategoryActionsProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-100 sm:opacity-0 transition-all duration-200 group-hover:opacity-100 hover:bg-muted"
                >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-48"
            >
                <EditCategoryDialog
                    category={category}
                >
                    <DropdownMenuItem
                        onSelect={(e) =>
                            e.preventDefault()
                        }
                    >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                </EditCategoryDialog>

                {!category.parentCategoryId && !category.isArchived && (
                    <CreateCategoryDialog parentCategory={category}>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Subcategory
                        </DropdownMenuItem>
                    </CreateCategoryDialog>
                )}
                {!category.parentCategoryId &&
                    (category.isArchived ? (
                        <RestoreCategoryDialog
                            categoryId={category.id}
                        >
                            <DropdownMenuItem
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <RotateCcw className="mr-2 h-4 w-4" />
                                Restore
                            </DropdownMenuItem>
                        </RestoreCategoryDialog>
                    ) : (
                        <ArchiveCategoryDialog
                            categoryId={category.id}
                        >
                            <DropdownMenuItem
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <Archive className="mr-2 h-4 w-4" />
                                Archive
                            </DropdownMenuItem>
                        </ArchiveCategoryDialog>
                    ))
                }

                <DeleteCategoryDialog
                    categoryId={category.id}
                >
                    <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onSelect={(e) =>
                            e.preventDefault()
                        }
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DeleteCategoryDialog>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}