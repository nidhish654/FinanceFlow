"use client";

import CardSelector from "@/components/common/CardSelector";

import CreateBudgetDialog from "../budget/components/create-budget-dialog";
import AddGoalDialog from "../goal/components/add-goal-dialog";

import { SelectOption } from "@/components/forms/SelectField";
import { PlanningViewState } from "./planning-content";

import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";

type PlanningModule =
    | "budgets"
    | "goals"
    | "debts";

interface PlanningToolbarProps {
    module: PlanningModule;

    view: PlanningViewState;

    onViewChange: (
        view: PlanningViewState
    ) => void;

    activeCount: number;

    archivedCount: number;

    currency: string;

    categoryOptions: SelectOption[];
}

export default function PlanningToolbar({
    module,
    view,
    onViewChange,
    activeCount,
    archivedCount,
    currency,
    categoryOptions,
}: PlanningToolbarProps) {
    if (module === "debts") {
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
                    value={view}
                    onValueChange={onViewChange}
                />
            </div>

            <div className="w-full lg:w-auto">
                {module === "budgets" && (
                    <CreateBudgetDialog
                        currency={currency}
                        categoryOptions={categoryOptions}
                        trigger={
                            <Card
                                className="
                                    flex
                                    h-5
                                    w-full
                                    min-w-[180px]
                                    cursor-pointer
                                    items-center
                                    justify-center
                                    gap-2

                                    rounded-xl
                                    border
                                    border-transparent

                                    bg-primary
                                    px-8
                                    text-primary-foreground

                                    shadow-sm
                                    transition-all
                                    duration-200

                                    hover:scale-[1.02]
                                    hover:shadow-md

                                    sm:h-7
                                    lg:min-w-44
                                "
                            >
                                <span className="text-base font-semibold">
                                    Create Budget
                                </span>
                            </Card>
                        }
                    />
                )}

                {module === "goals" && (
                    <AddGoalDialog
                        currency={currency}
                        trigger={
                            <Card
                                className="
                                    flex
                                    h-5
                                    w-full
                                    min-w-[180px]
                                    cursor-pointer
                                    items-center
                                    justify-center

                                    rounded-xl
                                    border
                                    border-transparent

                                    bg-primary
                                    px-8
                                    text-primary-foreground

                                    shadow-sm
                                    transition-all
                                    duration-200

                                    hover:scale-[1.02]
                                    hover:shadow-md

                                    sm:h-7
                                    lg:min-w-44
                                "
                            >
                                <span className="text-base font-semibold">
                                    Create Goal
                                </span>
                            </Card>
                        }
                    />
                )}
            </div>
        </div>
    );
}