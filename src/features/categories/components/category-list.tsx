"use client";

import { useMemo, useState } from "react";

import { Category, CategoryType } from "@prisma/client";

import CategoryCard from "./category-card";
import CardSelector from "@/components/common/CardSelector";

interface CategoryListProps {
    categories: Category[];
}

export default function CategoryList({
    categories,
}: CategoryListProps) {
    const [view, setView] = useState<
        "active" | "archived"
    >("active");

    const activeCategories = useMemo(
        () =>
            categories.filter(
                (category) => !category.isArchived
            ),
        [categories]
    );

    const archivedCategories = useMemo(
        () =>
            categories.filter(
                (category) => category.isArchived
            ),
        [categories]
    );

    const displayedCategories =
        view === "active"
            ? activeCategories
            : archivedCategories;

    const incomeCategories =
        displayedCategories.filter(
            (category) =>
                category.type ===
                CategoryType.INCOME
        );

    const expenseCategories =
        displayedCategories.filter(
            (category) =>
                category.type ===
                CategoryType.EXPENSE
        );

    function renderSection(
        title: string,
        items: Category[]
    ) {
        if (items.length === 0) return null;

        return (
            <section className="space-y-5">
                {/* Header */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold tracking-tight">
                            {title}
                        </h2>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-base font-semibold text-muted-foreground">
                            {items.length}
                        </div>
                    </div>

                    <div className="h-px bg-border" />
                </div>

                {/* Cards */}
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4">
                    {items.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                        />
                    ))}
                </div>
            </section>
        );
    }

    return (
        <div className="space-y-12">
            <CardSelector
                items={[
                    {
                        value: "active",
                        label: "Active",
                        count: activeCategories.length,
                    },
                    {
                        value: "archived",
                        label: "Archived",
                        count: archivedCategories.length,
                    },
                ]}
                value={view}
                onValueChange={setView}
            />

            {displayedCategories.length === 0 ? (
                <div className="flex h-72 items-center justify-center rounded-2xl border border-dashed text-muted-foreground">
                    {view === "active"
                        ? "No active categories found."
                        : "No archived categories found."}
                </div>
            ) : (
                <div className="space-y-12">
                    {renderSection(
                        "Income",
                        incomeCategories
                    )}

                    {renderSection(
                        "Expense",
                        expenseCategories
                    )}
                </div>
            )}
        </div>
    );
}