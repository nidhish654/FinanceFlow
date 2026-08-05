"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export interface ImportSummaryProps {
    imported: number;
    skipped: number;
    newCategories: number;
    newAccounts: number;
    timeSeconds: number;
    onDone: () => void;
}

export function ImportSummaryStep({
    imported,
    skipped,
    newCategories,
    newAccounts,
    timeSeconds,
    onDone,
}: ImportSummaryProps) {
    return (
        <div className="space-y-8 text-center py-4">
            <div className="h-16 w-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>

            <div>
                <h2 className="text-2xl font-bold tracking-tight">Import Complete</h2>
                <p className="text-muted-foreground mt-1 text-sm">
                    Your transactions have been successfully imported.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left max-w-sm mx-auto">
                <div className="bg-card border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Imported</p>
                    <p className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400">{imported}</p>
                </div>
                <div className="bg-card border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Skipped</p>
                    <p className="text-2xl font-semibold text-destructive">{skipped}</p>
                </div>
                <div className="bg-card border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">New Categories</p>
                    <p className="text-2xl font-semibold">{newCategories}</p>
                </div>
                <div className="bg-card border rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">New Accounts</p>
                    <p className="text-2xl font-semibold">{newAccounts}</p>
                </div>
            </div>

            <p className="text-xs text-muted-foreground">Processed in {timeSeconds.toFixed(1)} seconds.</p>

            <div className="pt-4 border-t flex justify-center">
                <Button onClick={onDone} className="w-full max-w-sm">
                    Done
                </Button>
            </div>
        </div>
    );
}
