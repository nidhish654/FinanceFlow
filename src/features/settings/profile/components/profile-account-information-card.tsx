"use client";

import Link from "next/link";
import { UserProfileData } from "../profile.types";
import { SettingsSectionCard } from "../../components/settings-section-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProfileAccountInformationCardProps {
    profile: UserProfileData;
}

export function ProfileAccountInformationCard({
    profile,
}: ProfileAccountInformationCardProps) {
    return (
        <SettingsSectionCard
            title="Account Information"
            description="Details about your FinanceFlow account and active profile."
        >
            <div className="space-y-6 pt-2">
                {/* Auth Provider */}
                {/* <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4 sm:items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        Authentication Provider
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-base font-medium">{profile.authProvider}</p>
                    </div>
                </div> */}

                {/* Finance Profile */}
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4 sm:items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        Current Finance Profile
                    </div>
                    <div className="sm:col-span-2 flex items-center gap-4">
                        <p className="text-base font-medium">
                            {profile.activeFinanceProfileName}
                        </p>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 text-muted-foreground hover:text-foreground"
                            asChild
                        >
                            <Link href="/finance-profiles">
                                Switch Profile <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </SettingsSectionCard>
    );
}
