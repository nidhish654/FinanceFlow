"use client";

import { useState } from "react";

import CardSelector from "@/components/common/CardSelector";
import FinanceProfileCard from "./finance-profile-card";

import { Currency, FinanceProfileStatus } from "@prisma/client";

interface Profile {
    id: string;
    name: string;
    description: string | null;
    baseCurrency: Currency;
    status: FinanceProfileStatus;
}

interface FinanceProfilesViewProps {
    activeProfiles: Profile[];
    archivedProfiles: Profile[];
    activeProfileId: string;
}

export default function FinanceProfilesView({
    activeProfiles,
    archivedProfiles,
    activeProfileId,
}: FinanceProfilesViewProps) {
    const [view, setView] = useState<"active" | "archived">("active");

    const profiles =
        view === "active"
            ? activeProfiles
            : archivedProfiles;

    return (
        <div className="space-y-6">
            <CardSelector
                items={[
                    {
                        value: "active",
                        label: "Active",
                        count: activeProfiles.length,
                    },
                    {
                        value: "archived",
                        label: "Archived",
                        count: archivedProfiles.length,
                    },
                ]}
                value={view}
                onValueChange={setView}
            />

            {profiles.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
                    No {view} finance profiles found.
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {profiles.map((profile) => (
                        <FinanceProfileCard
                            key={profile.id}
                            profile={profile}
                            isActive={profile.id === activeProfileId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}