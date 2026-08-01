"use client";

import { useState } from "react";

import PlanningHeader from "./planning-header";
import PlanningContent from "./planning-content";

import { BudgetView } from "../budget/types/budget-view";
import { GoalView } from "../goal/types/goal-view";

import { SelectOption } from "@/components/forms/SelectField";

type PlanningModule =
    | "budgets"
    | "goals"
    | "debts";

interface PlanningWorkspaceProps {
    initialModule?: PlanningModule;

    budgetViews: BudgetView[];

    goalViews: GoalView[];

    currency: string;

    categoryOptions: SelectOption[];
}

export default function PlanningWorkspace({
    initialModule = "budgets",
    budgetViews,
    goalViews,
    currency,
    categoryOptions,
}: PlanningWorkspaceProps) {
    const [module, setModule] =
        useState<PlanningModule>(initialModule);

    return (
        <main className="space-y-6">

            <PlanningHeader
                module={module}
                onModuleChange={setModule}
            />

            <PlanningContent
                module={module}
                budgetViews={budgetViews}
                goalViews={goalViews}
                currency={currency}
                categoryOptions={categoryOptions}
            />

        </main>
    );
}
