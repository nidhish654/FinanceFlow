"use client";

import {
    BadgeCheck,
    Calendar,
    Clock3,
    CheckCircle2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import GoalProgress from "./goal-progress";

import {
    getGoalIcon,
} from "../lib/goal-icons";

import {
    GoalDeadlineState,
    GoalView,
} from "../types/goal-view";

import { GoalPreview } from "../types/goal-preview";

interface GoalCardProps {
    goal: GoalView | GoalPreview;

    preview?: boolean;

    className?: string;

    actions?: React.ReactNode;
}

export default function GoalCard({
    goal,
    preview = false,
    className,
    actions,
}: GoalCardProps) {
    const GoalIcon =
        goal.icon
            ? getGoalIcon(goal.icon).icon
            : null;

    const status = preview
        ? "preview"
        : goal.completed
            ? "completed"
            : goal.archived
                ? "archived"
                : "active";

    const statusBadgeClass =
        status === "completed"
            ? `
                border-green-200
                bg-green-100
                text-green-700
                dark:border-green-500/30
                dark:bg-green-500/15
                dark:text-green-400
            `
            : status === "archived"
                ? `
                    border-gray-200
                    bg-gray-100
                    text-gray-700
                    dark:border-gray-500/30
                    dark:bg-gray-500/15
                    dark:text-gray-400
                `
                : status === "active"
                    ? goal.deadlineState === GoalDeadlineState.OVERDUE
                        ? `
                            border-red-200
                            bg-red-100
                            text-red-700
                            dark:border-red-500/30
                            dark:bg-red-500/15
                            dark:text-red-400
                        `
                        : goal.deadlineState === GoalDeadlineState.WARNING
                            ? `
                                border-yellow-200
                                bg-yellow-100
                                text-yellow-700
                                dark:border-yellow-500/30
                                dark:bg-yellow-500/15
                                dark:text-yellow-400
                            `
                            : `
                                border-blue-200
                                bg-blue-100
                                text-blue-700
                                dark:border-blue-500/30
                                dark:bg-blue-500/15
                                dark:text-blue-400
                            `
                : "";

    const deadlineClass =
        goal.completed
            ? "text-green-600 dark:text-green-400"
            : goal.deadlineState === GoalDeadlineState.OVERDUE
                ? "text-red-600 dark:text-red-400"
                : goal.deadlineState === GoalDeadlineState.WARNING
                    ? "text-yellow-600 dark:text-yellow-400"
                    : goal.remainingDays === null
                        ? "text-muted-foreground"
                        : "text-blue-600 dark:text-blue-400";

    const deadlineLabel =
        goal.remainingDays === null
            ? "No deadline"
            : goal.remainingDays < 0
                ? `Overdue by ${Math.abs(goal.remainingDays)} ${
                    Math.abs(goal.remainingDays) === 1
                        ? "day"
                        : "days"
                }`
                : goal.remainingDays === 0
                    ? "Due today"
                    : `${goal.remainingDays} ${
                        goal.remainingDays === 1
                            ? "day"
                            : "days"
                    } left`;

    const iconContainerClass =
        goal.completed
            ? "bg-green-500/15 text-green-500"
            : goal.deadlineState === GoalDeadlineState.OVERDUE
                ? "bg-red-500/15 text-red-500"
                : goal.deadlineState === GoalDeadlineState.WARNING
                    ? "bg-yellow-500/15 text-yellow-500"
                    : "bg-blue-500/10 text-blue-500";

    return (
        <Card
            className={cn(
                `
                overflow-hidden
                rounded-2xl
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-lg
                `,
                goal.completed &&
                    `
                    border-green-500/20
                    bg-green-500/[0.03]
                    `,
                className
            )}
        >
            <CardContent
                className="
                    space-y-6
                    px-6
                    py-5
                "
            >
                {/* ---------- Header ---------- */}

                <div className="space-y-3">

                    <div className="flex justify-end">

                        <Badge
                            variant="outline"
                            className={statusBadgeClass}
                        >
                            {status === "preview"
                                ? "Preview"
                                : status === "completed"
                                    ? "Completed"
                                    : status === "archived"
                                        ? "Archived"
                                        : "Active"}
                        </Badge>

                    </div>

                    <div className="flex items-center justify-between gap-3">

                        <div className="flex min-w-0 flex-1 items-center gap-3">

                            {GoalIcon && (
                                <div
                                    className={cn(
                                        `
                                        flex
                                        h-12
                                        w-12
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-xl
                                        transition-colors
                                        `,
                                        iconContainerClass
                                    )}
                                >
                                    <GoalIcon className="h-6 w-6" />
                                </div>
                            )}

                            <div className="min-w-0 flex-1">

                                <h3
                                    className="
                                        line-clamp-2
                                        text-xl
                                        font-semibold
                                        leading-tight
                                    "
                                >
                                    {goal.name}
                                </h3>

                                {goal.completed && (
                                    <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-green-600 dark:text-green-400">
                                        <CheckCircle2 className="h-4 w-4" />
                                        <span>Goal Achieved</span>
                                    </div>
                                )}

                                {!goal.completed &&
                                    goal.notes && (
                                        <p
                                            className="
                                                mt-1
                                                line-clamp-2
                                                text-sm
                                                text-muted-foreground
                                            "
                                        >
                                            {goal.notes}
                                        </p>
                                    )}

                            </div>

                        </div>

                        {!preview && (
                            <div className="shrink-0">
                                {actions}
                            </div>
                        )}

                    </div>

                </div>

                {/* ---------- Target ---------- */}

                <div>

                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">

                        {goal.formattedTargetAmount}

                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">

                        Savings Target

                    </p>

                </div>

                {/* ---------- Progress ---------- */}

                <GoalProgress
                    progress={goal.progress}
                    completed={goal.completed}
                    savedAmount={goal.formattedSavedAmount}
                    targetAmount={goal.formattedTargetAmount}
                    remainingAmount={goal.formattedRemainingAmount}
                />

                <Separator />

                                {/* ---------- Details ---------- */}

                <div className="space-y-4">

                    {/* Completion */}

                    <div className="flex items-center justify-between">

                        <div
                            className={cn(
                                "flex items-center gap-2",
                                goal.completed
                                    ? "text-green-600 dark:text-green-400"
                                    : "text-muted-foreground"
                            )}
                        >

                            <BadgeCheck className="h-4 w-4" />

                            <span className="text-sm">

                                Completion

                            </span>

                        </div>

                        <span
                            className={cn(
                                "text-sm font-semibold",
                                goal.completed &&
                                    "text-green-600 dark:text-green-400"
                            )}
                        >

                            {goal.formattedProgress}

                        </span>

                    </div>

                    {/* Deadline */}

                    {!goal.completed && (

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2 text-muted-foreground">

                                <Clock3 className="h-4 w-4" />

                                <span className="text-sm">

                                    Deadline

                                </span>

                            </div>

                            <span
                                className={cn(
                                    "text-sm font-medium",
                                    deadlineClass
                                )}
                            >

                                {deadlineLabel}

                            </span>

                        </div>

                    )}

                    {/* Target Date */}

                    {!goal.completed &&
                        goal.targetDate && (

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-2 text-muted-foreground">

                                    <Calendar className="h-4 w-4" />

                                    <span className="text-sm">

                                        Target Date

                                    </span>

                                </div>

                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        deadlineClass
                                    )}
                                >

                                    {goal.formattedTargetDate}

                                </span>

                            </div>

                        )}

                </div>

            </CardContent>

        </Card>
    );
}