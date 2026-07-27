"use client";

import * as React from "react";

import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

interface BudgetDialogProps {
    title: string;

    description?: string;

    children: React.ReactNode;

    className?: string;
}

export default function BudgetDialog({
    title,
    description,
    children,
    className,
}: BudgetDialogProps) {
    return (
        <DialogContent
            className={cn(
                `
                w-[95vw]
                max-w-[1200px]
                h-[91vh]
                max-h-[91vh]

                overflow-hidden
                rounded-2xl

                p-0

                sm:max-w-[1200px]
                `,
                className
            )}
        >
            {/* ================= Header ================= */}

            <DialogHeader
                className="
                    shrink-0
                    border-b
                    px-8
                    py-6
                "
            >
                <DialogTitle
                    className="
                        text-2xl
                        font-semibold
                        tracking-tight
                    "
                >
                    {title}
                </DialogTitle>

                {description && (
                    <DialogDescription
                        className="
                            text-sm
                        "
                    >
                        {description}
                    </DialogDescription>
                )}
            </DialogHeader>

            {/* ================= Body ================= */}

            <div
                className="
                    flex-1
                    overflow-hidden
                "
            >
                <div
                    className="
                        h-full
                        overflow-auto
                        xl:overflow-visible
                        px-8
                        pt-2
                        pb-4
                        xl:pb-2
                    "
                >
                    {children}
                </div>
            </div>
        </DialogContent>
    );
}