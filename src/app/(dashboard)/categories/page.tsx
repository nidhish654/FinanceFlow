import CreateCategoryDialog from "@/features/categories/components/create-category-dialog";

import { getCategories } from "@/features/categories/services/get-categories";

import CategoryList from "@/features/categories/components/category-list";

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Categories
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your income and expense categories.
                    </p>
                </div>

                <CreateCategoryDialog />
            </div>

            <CategoryList categories={categories} />
        </div>
    );
}