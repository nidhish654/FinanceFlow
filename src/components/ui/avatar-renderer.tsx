"use client";

import { useMemo } from "react";
import Image from "next/image";
import { AvatarSelection } from "@/features/settings/profile/types/avatar";
import { generateAvatar } from "@/features/settings/profile/lib/avatar-utils";
import { cn } from "@/lib/utils";

interface AvatarRendererProps {
    avatar: AvatarSelection | null;
    fallbackName?: string;
    className?: string;
}

export function AvatarRenderer({
    avatar,
    fallbackName,
    className,
}: AvatarRendererProps) {
    const dataUri = useMemo(() => {
        if (!avatar) return null;
        return generateAvatar(avatar);
    }, [avatar]);

    return (
        <div
            className={cn(
                "relative flex shrink-0 items-center justify-center overflow-hidden rounded-full border shadow-sm",
                className
            )}
        >
            {dataUri ? (
                <Image
                    src={dataUri}
                    alt="Avatar"
                    fill
                    unoptimized
                    className="object-cover"
                />
            ) : fallbackName ? (
                <span className="font-semibold uppercase text-muted-foreground">
                    {fallbackName.substring(0, 2)}
                </span>
            ) : (
                <span className="font-semibold uppercase text-muted-foreground">
                    --
                </span>
            )}
        </div>
    );
}
