import { createAvatar } from "@dicebear/core";
import {
    adventurerNeutral,
    botttsNeutral,
    glass,
    funEmoji,
} from "@dicebear/collection";
import { AvatarSelection, AvatarStyle } from "../types/avatar";

const STYLE_MAP: Record<AvatarStyle, any> = {
    adventurerNeutral,
    botttsNeutral,
    glass,
    funEmoji,
};

export function generateAvatar({ style, seed }: AvatarSelection): string {
    const avatarStyle = STYLE_MAP[style];

    if (!avatarStyle) {
        // Fallback to default if somehow invalid
        return createAvatar(adventurerNeutral, { seed }).toDataUri();
    }

    return createAvatar(avatarStyle, { seed }).toDataUri();
}
