"use client";

import { Category } from "@prisma/client";

import { getCategoryIcon } from "@/lib/category-icons";

import { Card } from "@/components/ui/card";

import CategoryActions from "./category-actions";

interface CategoryCardProps {
    category: Category;
}

export default function CategoryCard({
    category,
}: CategoryCardProps) {
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
                h-[144px]
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
        </Card>
    );
}