"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Category } from "@prisma/client";

import { getCategoryIcon } from "@/lib/category-icons";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import CategoryActions from "./category-actions";

interface CategoryCardProps {
    category: Category;
    subcategories?: Category[];
}

export default function CategoryCard({
    category,
    subcategories = [],
}: CategoryCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const {
        icon: Icon,
    } = getCategoryIcon(category.icon);

    const categoryColor =
        category.color ?? "#6366F1";

    return (
        <Card
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                p-4
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-primary/40
                hover:shadow-lg
            "
        >
            {/* Actions */}
            <div className="absolute right-2 top-2 z-10">
                <CategoryActions
                    category={category}
                />
            </div>

            <div className="flex h-full flex-col">
                {/* Header */}
                <div className="flex items-center gap-3 pr-8">
                    <div
                        className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            transition-transform
                            duration-200
                            group-hover:scale-105
                        "
                        style={{
                            backgroundColor: `${categoryColor}18`,
                            color: categoryColor,
                        }}
                    >
                        <Icon className="h-5 w-5" />
                    </div>

                    <h3
                        className="
                            truncate
                            text-xl
                            font-semibold
                            leading-none
                        "
                    >
                        {category.name}
                    </h3>
                </div>

                {/* Description */}
                <div className="mt-4 flex-1">
                    <p
                        className="
                            line-clamp-2
                            text-base
                            leading-6
                            text-muted-foreground
                        "
                    >
                        {category.description || ""}
                    </p>
                </div>
            </div>

            {/* Subcategories Toggle & List */}
            {subcategories.length > 0 && (
                <div className="mt-4 border-t pt-3 flex flex-col gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex w-full items-center justify-between px-2 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-center">
                            {isExpanded ? (
                                <ChevronDown className="mr-2 h-4 w-4" />
                            ) : (
                                <ChevronRight className="mr-2 h-4 w-4" />
                            )}
                            <span className="font-medium">
                                Subcategories ({subcategories.length})
                            </span>
                        </div>
                    </Button>

                    {isExpanded && (
                        <div className="flex flex-col gap-3 pt-2">
                            {subcategories.map((sub) => (
                                <div
                                    key={sub.id}
                                    className="group/sub flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="text-muted-foreground/60 text-sm">↳</span>
                                        <span className="text-sm font-medium">{sub.name}</span>
                                    </div>
                                    <div className="opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                        <CategoryActions category={sub} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </Card>
    );
}