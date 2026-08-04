"use client";

import { useEffect } from "react";
import { SettingsSectionCard } from "@/features/settings/components/settings-section-card";
import { Button } from "@/components/ui/button";

export default function SettingsError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[SETTINGS_ERROR]", error);
    }, [error]);

    return (
        <SettingsSectionCard
            title="Something went wrong"
            description="We encountered an error while trying to load your settings."
        >
            <div className="flex flex-col items-start gap-4 py-4">
                <p className="text-sm text-destructive">
                    {error.message || "An unexpected error occurred."}
                </p>
                <Button onClick={() => reset()}>Try again</Button>
            </div>
        </SettingsSectionCard>
    );
}
