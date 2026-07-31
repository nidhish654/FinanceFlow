"use client";

import { ReactNode, useEffect, useState } from "react";

import { toast } from "sonner";

import {
    History,
    Loader2,
    Target,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import GoalHistoryList from "./goal-history-list";

import { getGoalHistoryAction } from "../actions/get-goal-history";

import { GoalHistoryView } from "../types/goal-history-view";

interface GoalHistoryDialogProps {
    goalId: string;
    goalName: string;
    trigger: ReactNode;
}

export default function GoalHistoryDialog({
    goalId,
    goalName,
    trigger,
}: GoalHistoryDialogProps) {
    const [open, setOpen] = useState(false);

    const [loading, setLoading] =
        useState(false);

    const [history, setHistory] =
        useState<GoalHistoryView[]>([]);

    useEffect(() => {
        if (!open) return;

        async function loadHistory() {
            setLoading(true);

            const result =
                await getGoalHistoryAction(
                    goalId
                );

            if (!result.success) {
                toast.error(
                    result.message ??
                        "Failed to load history."
                );

                setLoading(false);

                return;
            }

            setHistory(
                result.history ?? []
            );

            setLoading(false);
        }

        loadHistory();
    }, [goalId, open]);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent
                className="
                    flex
                    h-[95dvh]
                    w-[96vw]
                    max-w-2xl
                    flex-col
                    gap-0
                    overflow-hidden
                    rounded-2xl
                    p-0

                    md:h-[92vh]
                "
            >
                {/* Header */}

                <DialogHeader
                    className="
                        border-b
                        px-6
                        pt-5
                        pb-4
                    "
                >
                    <DialogTitle
                        className="
                            flex
                            items-center
                            gap-2.5
                            text-xl
                            font-semibold
                        "
                    >
                        <History
                            className="
                                h-5
                                w-5
                            "
                        />

                        History
                    </DialogTitle>

                    <DialogDescription
                        className="
                            mt-1
                            text-sm
                        "
                    >
                        Deposits and withdrawals
                        made for this goal.
                    </DialogDescription>
                </DialogHeader>

                {/* Goal */}

                <div
                    className="
                        border-b
                        px-6
                        py-4
                    "
                >
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                        "
                    >
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-full
                                bg-primary/10
                                text-primary
                            "
                        >
                            <Target
                                className="
                                    h-5
                                    w-5
                                "
                            />
                        </div>

                        <div
                            className="
                                min-w-0
                            "
                        >
                            <p
                                className="
                                    text-xs
                                    uppercase
                                    tracking-wide
                                    text-muted-foreground
                                "
                            >
                                Goal
                            </p>

                            <h2
                                className="
                                    truncate
                                    text-lg
                                    font-semibold
                                "
                            >
                                {goalName}
                            </h2>

                        </div>
                    </div>
                </div>

                {/* History */}

                <div
                    className="
                        flex-1
                        overflow-y-auto
                        px-6
                        py-5
                    "
                >
                    {loading ? (
                        <div
                            className="
                                flex
                                h-full
                                flex-col
                                items-center
                                justify-center
                                gap-3
                            "
                        >
                            <Loader2
                                className="
                                    h-7
                                    w-7
                                    animate-spin
                                "
                            />

                            <p
                                className="
                                    text-sm
                                    text-muted-foreground
                                "
                            >
                                Loading history...
                            </p>

                        </div>
                    ) : (
                        <GoalHistoryList
                            history={history}
                        />
                    )}
                </div>

            </DialogContent>

        </Dialog>
    );
}