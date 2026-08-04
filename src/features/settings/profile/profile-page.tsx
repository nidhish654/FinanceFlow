"use client";

import { useState } from "react";
import { toast } from "sonner";
import { UserProfileData } from "./profile.types";
import { AvatarSelection } from "./types/avatar";
import { ProfileFormData } from "./profile.schema";
import { updateProfile } from "../actions/update-profile";
import { useUnsavedChanges } from "../hooks/use-unsaved-changes";

import { SettingsPageLayout } from "../components/settings-page-layout";
import { SettingsSaveBar } from "../components/settings-save-bar";

import { ProfileAvatarCard } from "./components/profile-avatar-card";
import { ProfileInformationCard } from "./components/profile-information-card";
import { ProfileAccountInformationCard } from "./components/profile-account-information-card";

interface ProfilePageProps {
    initialProfile: UserProfileData;
}

export function ProfilePage({ initialProfile }: ProfilePageProps) {
    const { save, reset } = useUnsavedChanges();
    const [isSaving, setIsSaving] = useState(false);

    // Local state for the editable fields before saving
    const [avatar, setAvatar] = useState<AvatarSelection | null>(null);

    const [formData, setFormData] = useState<Partial<ProfileFormData>>({
        displayName: initialProfile.displayName,
    });

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await save(async () => {
                const effectiveAvatarStyle = avatar ? avatar.style : initialProfile.avatarStyle;
                const effectiveAvatarSeed = avatar ? avatar.seed : initialProfile.avatarSeed;

                const result = await updateProfile({
                    displayName: formData.displayName || initialProfile.displayName,
                    avatarStyle: effectiveAvatarStyle,
                    avatarSeed: effectiveAvatarSeed,
                });

                if (result.success) {
                    toast.success("Profile updated successfully.");
                } else {
                    toast.error(result.error || "Failed to save changes.");
                    throw new Error(result.error);
                }
            });
        } catch (error) {
            // Error handled by toast
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: initialProfile.displayName,
        });
        setAvatar(null);
        reset();
    };

    return (
        <SettingsPageLayout
            title="Profile"
            description="Manage your account information."
        >
            <ProfileAvatarCard
                profile={initialProfile}
                avatar={avatar}
                setAvatar={setAvatar}
            />

            <ProfileInformationCard
                profile={initialProfile}
                onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))}
            />

            <ProfileAccountInformationCard profile={initialProfile} />

            <SettingsSaveBar
                onSave={handleSave}
                onCancel={handleCancel}
                isLoading={isSaving}
            />
        </SettingsPageLayout>
    );
}
