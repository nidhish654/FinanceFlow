"use client";

import { useUnsavedChanges } from "../hooks/use-unsaved-changes";
import { Button } from "@/components/ui/button";

export function SettingsSaveBar({
    onSave,
    onCancel,
    isLoading = false,
}: {
    onSave: () => void;
    onCancel: () => void;
    isLoading?: boolean;
}) {
    const { isDirty } = useUnsavedChanges();

    if (!isDirty) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:left-64 sm:p-6 animate-in slide-in-from-bottom-5">
            <div className="mx-auto flex max-w-4xl items-center justify-between rounded-full bg-slate-900 px-6 py-4 text-slate-50 shadow-lg dark:bg-slate-50 dark:text-slate-900">
                <span className="text-sm font-medium">
                    You have unsaved changes.
                </span>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="text-slate-50 hover:bg-slate-800 hover:text-slate-50 dark:text-slate-900 dark:hover:bg-slate-200 dark:hover:text-slate-900"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        onClick={onSave}
                        disabled={isLoading}
                        className="bg-white text-slate-900 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-50 dark:hover:bg-slate-800"
                    >
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
