"use client";

import { SettingsSectionCard } from "../../components/settings-section-card";
import { UserProfileData } from "../profile.types";
import { ChangePasswordDialog } from "@/features/auth/components/change-password-dialog";

interface ProfileAuthenticationCardProps {
    profile: UserProfileData;
}

export function ProfileAuthenticationCard({
    profile,
}: ProfileAuthenticationCardProps) {
    return (
        <SettingsSectionCard
            title="Authentication"
            description="Manage your password and security settings."
        >
            <div className="space-y-6 pt-2">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4 sm:items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        Email Address
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-base font-medium">{profile.email}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4 sm:items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        Password
                    </div>
                    <div className="sm:col-span-2 flex items-center justify-between">
                        <p className="text-base font-medium tracking-widest text-muted-foreground">
                            ••••••••
                        </p>
                        <ChangePasswordDialog />
                    </div>
                </div>
            </div>
        </SettingsSectionCard>
    );
}
