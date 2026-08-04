"use client";

import { UserProfileData } from "../profile.types";
import { AvatarSelection } from "../types/avatar";
import { useUnsavedChanges } from "../../hooks/use-unsaved-changes";
import { SettingsSectionCard } from "../../components/settings-section-card";
import { AvatarPickerDialog } from "./avatar-picker-dialog";
import { AvatarRenderer } from "@/components/ui/avatar-renderer";

interface ProfileAvatarCardProps {
    profile: UserProfileData;
    avatar: AvatarSelection | null;
    setAvatar: (avatar: AvatarSelection) => void;
}

export function ProfileAvatarCard({
    profile,
    avatar,
    setAvatar,
}: ProfileAvatarCardProps) {
    const { markDirty } = useUnsavedChanges();

    // Use either the uncommitted selection, or the saved profile setting
    const currentAvatar: AvatarSelection = avatar || {
        style: profile.avatarStyle,
        seed: profile.avatarSeed,
    };

    const handleSelectAvatar = (selection: AvatarSelection) => {
        setAvatar(selection);
        markDirty();
    };

    return (
        <SettingsSectionCard
            title="Avatar"
            description=""
        >
            <div className="flex flex-col items-center gap-6 pt-2 sm:flex-row sm:items-start">
                <AvatarRenderer
                    avatar={currentAvatar}
                    fallbackName={profile.displayName}
                    className="h-24 w-24 sm:h-24 sm:w-24"
                />

                <div className="flex flex-col items-center gap-2 sm:items-start sm:justify-center sm:pt-4">
                    <p className="text-lg font-semibold">{profile.displayName}</p>
                    <p className="mb-2 text-sm text-muted-foreground">Current Avatar</p>

                    <AvatarPickerDialog
                        currentSeed={currentAvatar.seed}
                        currentStyle={currentAvatar.style}
                        onSelect={handleSelectAvatar}
                    />
                </div>
            </div>
        </SettingsSectionCard>
    );
}