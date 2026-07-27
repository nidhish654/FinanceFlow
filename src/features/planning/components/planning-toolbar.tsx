"use client";

import CardSelector from "@/components/common/CardSelector";

import CreateBudgetDialog from "../budget/components/create-budget-dialog";

import { SelectOption } from "@/components/forms/SelectField";
import { BudgetViewState } from "./planning-content";

import { Card } from "@/components/ui/card";

type PlanningModule =
    | "budgets"
    | "goals"
    | "debts";

interface PlanningToolbarProps {
    module: PlanningModule;

    budgetView: BudgetViewState;

    onBudgetViewChange: (
        view: BudgetViewState
    ) => void;

    activeCount: number;

    archivedCount: number;

    currency: string;

    categoryOptions: SelectOption[];
}

export default function PlanningToolbar({
    module,
    budgetView,
    onBudgetViewChange,
    activeCount,
    archivedCount,
    currency,
    categoryOptions,
}: PlanningToolbarProps) {
    if (module !== "budgets") {
        return null;
    }

    return (
        <div
            className="
                flex
                flex-col
                gap-4

                lg:flex-row
                lg:items-center
                lg:justify-between
            "
        >
            <div className="w-full lg:w-auto">
                <CardSelector
                    items={[
                        {
                            value: "active",
                            label: "Active",
                            count: activeCount,
                        },
                        {
                            value: "archived",
                            label: "Archived",
                            count: archivedCount,
                        },
                    ]}
                    value={budgetView}
                    onValueChange={onBudgetViewChange}
                />
            </div>

            <div className="w-full lg:w-auto">
                <CreateBudgetDialog
                    currency={currency}
                    categoryOptions={categoryOptions}
                    trigger={
                        <Card
                            className="
                                flex
                                h-11
                                w-full
                                min-w-[180px]
                                cursor-pointer
                                items-center
                                justify-center
                                self-center

                                rounded-xl
                                border
                                border-transparent

                                bg-white
                                px-8
                                text-black

                                shadow-sm
                                transition-all
                                duration-200

                                hover:scale-[1.02]
                                hover:shadow-md

                                sm:h-14
                                lg:min-w-44
                            "
                        >
                            <span className="text-lg font-semibold">
                                Create Budget
                            </span>
                        </Card>
                    }
                />
            </div>
        </div>
    );
}