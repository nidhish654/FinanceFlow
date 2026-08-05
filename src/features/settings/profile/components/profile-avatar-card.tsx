"use client";

import { UserProfileData } from "../profile.types";
import { AvatarSelection } from "../types/avatar";
import { useUnsavedChanges } from "../../hooks/use-unsaved-changes";
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

    const currentAvatar: AvatarSelection = avatar || {
        style: profile.avatarStyle,
        seed: profile.avatarSeed,
    };

    const handleSelectAvatar = (
        selection: AvatarSelection
    ) => {
        setAvatar(selection);
        markDirty();
    };

    const joinedDate = new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(new Date(profile.memberSince));

    return (
        <div className="flex h-full flex-col items-center justify-center px-8 py-8 text-center">
            <AvatarRenderer
                avatar={currentAvatar}
                fallbackName={profile.displayName}
                className="sm:h-32 sm:w-32 h-24 w-24"
            />

            <div className="mt-6 space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight">
                    {profile.displayName}
                </h3>

                {/* <p className="text-sm text-muted-foreground break-all">
                    {profile.email}
                </p> */}
            </div>

            <div className="mt-6 space-y-1">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    Member Since
                </p>

                <p className="text-sm font-medium">
                    {joinedDate}
                </p>
            </div>

            <div className="mt-8">
                <AvatarPickerDialog
                    currentSeed={currentAvatar.seed}
                    currentStyle={currentAvatar.style}
                    onSelect={handleSelectAvatar}
                />
            </div>
        </div>
    );
}