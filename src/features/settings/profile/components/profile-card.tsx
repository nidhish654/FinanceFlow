"use client";

import { ProfileFormData } from "../profile.schema";
import { UserProfileData } from "../profile.types";
import { AvatarSelection } from "../types/avatar";

import { ProfileAvatarCard } from "./profile-avatar-card";
import { ProfileInformationCard } from "./profile-information-card";

interface ProfileCardProps {
    profile: UserProfileData;
    avatar: AvatarSelection | null;
    setAvatar: (avatar: AvatarSelection) => void;
    onChange: (
        data: Partial<ProfileFormData>
    ) => void;
}

export function ProfileCard({
    profile,
    avatar,
    setAvatar,
    onChange,
}: ProfileCardProps) {
    return (
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">

            {/* Content */}
            <div className="grid lg:grid-cols-[280px_1fr]">
                {/* Left */}
                <div className="border-b lg:border-b-0 lg:border-r">
                    <ProfileAvatarCard
                        profile={profile}
                        avatar={avatar}
                        setAvatar={setAvatar}
                    />
                </div>

                {/* Right */}
                <div className="p-6">
                    <ProfileInformationCard
                        profile={profile}
                        onChange={onChange}
                    />
                </div>
            </div>
        </div>
    );
}