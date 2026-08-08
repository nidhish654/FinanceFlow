"use client";

import PlanningTabs from "./planning-tabs";

interface PlanningHeaderProps {
    module: "budgets" | "goals" | "debts";

    onModuleChange: (
        module: "budgets" | "goals" | "debts"
    ) => void;
}

export default function PlanningHeader({
    module,
    onModuleChange,
}: PlanningHeaderProps) {
    return (
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-1.5">
                <h1 className="text-3xl font-bold tracking-tight">
                    Planning
                </h1>

                <p className="text-lg text-muted-foreground">
                    Manage your budgets, savings goals, and debts.
                </p>
            </div>

            <PlanningTabs
                tabs={[
                    {
                        value: "budgets",
                        label: "Budgets",
                    },
                    {
                        value: "goals",
                        label: "Goals",
                    },
                    // {
                    //     value: "debts",
                    //     label: "Debts",
                    // },
                ]}
                value={module}
                onValueChange={onModuleChange}
            />
        </div>
    );
}