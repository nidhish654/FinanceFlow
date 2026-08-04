"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileFormData } from "../profile.schema";
import { UserProfileData } from "../profile.types";
import { useUnsavedChanges } from "../../hooks/use-unsaved-changes";
import { SettingsSectionCard } from "../../components/settings-section-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangePasswordDialog } from "@/features/auth/components/change-password-dialog";

interface ProfileInformationCardProps {
    profile: UserProfileData;
    onChange: (data: Partial<ProfileFormData>) => void;
}

export function ProfileInformationCard({
    profile,
    onChange,
}: ProfileInformationCardProps) {
    const { markDirty } = useUnsavedChanges();
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            displayName: profile.displayName,
        },
    });

    const error = form.formState.errors.displayName?.message;
    const currentDisplayName = form.watch("displayName");

    const handleDone = async () => {
        const isValid = await form.trigger("displayName");
        if (isValid) {
            setIsEditing(false);
            if (currentDisplayName !== profile.displayName) {
                onChange({ displayName: currentDisplayName });
                markDirty();
            }
        }
    };

    const handleCancel = () => {
        form.reset({
            displayName: profile.displayName,
        });
        setIsEditing(false);
    };

    return (
        <SettingsSectionCard
            title="Profile Information"
            description="Your personal information and identity."
        >
            <div className="space-y-6 pt-2">
                {/* Display Name Section */}
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-4 sm:items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        Display Name
                    </div>
                    <div className="sm:col-span-2">
                        {isEditing ? (
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start max-w-sm">
                                <div className="flex-1 space-y-1">
                                    <Input
                                        {...form.register("displayName")}
                                        className={error ? "border-destructive focus-visible:ring-destructive" : ""}
                                    />
                                    {error && <p className="text-xs font-medium text-destructive">{error}</p>}
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" onClick={handleDone}>
                                        Done
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={handleCancel}>
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between sm:justify-start sm:gap-8">
                                <p className="text-base font-medium">{currentDisplayName}</p>
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="h-auto p-0"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Edit
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Email Section */}
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4 sm:items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        Email Address
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-base font-medium">{profile.email}</p>
                    </div>
                </div>
                {/* Change Password Section */}
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

                {/* Member Since Section */}
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4 sm:items-center">
                    <div className="text-sm font-medium text-muted-foreground">
                        Member Since
                    </div>
                    <div className="sm:col-span-2">
                        <p className="text-base font-medium">
                            {format(new Date(profile.memberSince), "MMMM yyyy")}
                        </p>
                    </div>
                </div>
            </div>
        </SettingsSectionCard>
    );
}
