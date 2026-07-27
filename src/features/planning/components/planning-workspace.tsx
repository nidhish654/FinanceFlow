"use client";

import { useState } from "react";

import PlanningHeader from "./planning-header";
import PlanningContent from "./planning-content";

import { BudgetView } from "../budget/types/budget-view";
import { SelectOption } from "@/components/forms/SelectField";
import { Separator } from "@/components/ui/separator";

type PlanningModule =
    | "budgets"
    | "goals"
    | "debts";

interface PlanningWorkspaceProps {
    budgetViews: BudgetView[];

    currency: string;

    categoryOptions: SelectOption[];
}

export default function PlanningWorkspace({
    budgetViews,
    currency,
    categoryOptions,
}: PlanningWorkspaceProps) {
    const [module, setModule] =
        useState<PlanningModule>("budgets");

    return (
        <main className="space-y-6">
            <PlanningHeader
                module={module}
                onModuleChange={setModule}
            />

            <PlanningContent
                module={module}
                budgetViews={budgetViews}
                currency={currency}
                categoryOptions={categoryOptions}
            />
        </main>
    );
}