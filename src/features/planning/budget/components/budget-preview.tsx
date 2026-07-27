"use client";

import BudgetCard from "./budget-card";

import { BudgetView } from "../types/budget-view";

interface BudgetPreviewProps {
    budget: BudgetView;
}

export default function BudgetPreview({
    budget,
}: BudgetPreviewProps) {
    return (
        <div className="w-full space-y-6">

            <div>

                <h3 className="text-lg font-semibold tracking-tight">
                    Budget Preview
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                    Review how your budget will appear before saving.
                </p>

            </div>

            <BudgetCard
                budget={budget}
                preview
            />

        </div>
    );
}