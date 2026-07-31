"use client";

import {
    Archive,
    ArchiveRestore,
    Edit,
    EllipsisVertical,
    History,
    PiggyBank,
    Trash2,
    Wallet,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import AddMoneyDialog from "./add-money-dialog";
import WithdrawMoneyDialog from "./withdraw-money-dialog";
import GoalHistorySheet from "./goal-history-sheet";
import EditGoalDialog from "./edit-goal-dialog";
import DeleteGoalDialog from "./delete-goal-dialog";

import { archiveGoal } from "../actions/archive-goal";
import { restoreGoal } from "../actions/restore-goal";

import { GoalFormData } from "../types/goal";

import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface GoalCardMenuProps {
    goalId: string;

    goalName: string;

    archived: boolean;

    currency: string;

    defaultValues: Partial<GoalFormData>;
}

export default function GoalCardMenu({
    goalId,
    goalName,
    archived,
    currency,
    defaultValues,
}: GoalCardMenuProps) {
    const router = useRouter();

    async function handleArchive() {
        const result = archived
            ? await restoreGoal(goalId)
            : await archiveGoal(goalId);

        if (!result.success) {
            toast.error(
                result.message ??
                    "Operation failed."
            );

            return;
        }

        toast.success(
            archived
                ? "Goal restored."
                : "Goal archived."
        );

        router.refresh();
    }

    return (
        <DropdownMenu>

            <DropdownMenuTrigger asChild>

                <Button
                    variant="ghost"
                    size="icon"
                >
                    <EllipsisVertical className="h-4 w-4" />
                </Button>

            </DropdownMenuTrigger>

            <DropdownMenuContent
                align="end"
                className="w-56"
            >
                <DropdownMenuGroup>

                    <AddMoneyDialog
                        goalId={goalId}
                        goalName={goalName}
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <PiggyBank className="mr-2 h-4 w-4" />

                                Add Money

                            </DropdownMenuItem>
                        }
                    />

                    <WithdrawMoneyDialog
                        goalId={goalId}
                        goalName={goalName}
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <Wallet className="mr-2 h-4 w-4" />

                                Withdraw Money

                            </DropdownMenuItem>
                        }
                    />

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>

                    <EditGoalDialog
                        goalId={goalId}
                        defaultValues={defaultValues}
                        currency={currency}
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <Edit className="mr-2 h-4 w-4" />

                                Edit Goal

                            </DropdownMenuItem>
                        }
                    />

                    <GoalHistorySheet
                        goalId={goalId}
                        goalName={goalName}
                        trigger={
                            <DropdownMenuItem
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <History className="mr-2 h-4 w-4" />

                                View History

                            </DropdownMenuItem>
                        }
                    />

                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>

                    <DropdownMenuItem
                        onClick={handleArchive}
                    >
                        {archived ? (
                            <>
                                <ArchiveRestore className="mr-2 h-4 w-4" />

                                Restore Goal
                            </>
                        ) : (
                            <>
                                <Archive className="mr-2 h-4 w-4" />

                                Archive Goal
                            </>
                        )}
                    </DropdownMenuItem>

                    <DeleteGoalDialog
                        goalId={goalId}
                        goalName={goalName}
                        trigger={
                            <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onSelect={(e) =>
                                    e.preventDefault()
                                }
                            >
                                <Trash2 className="mr-2 h-4 w-4" />

                                Delete Goal

                            </DropdownMenuItem>
                        }
                    />

                </DropdownMenuGroup>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}