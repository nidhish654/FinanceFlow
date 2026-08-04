import { AvatarStyle } from "./types/avatar";

export interface UserProfileData {
    displayName: string;
    email: string;
    avatarStyle: AvatarStyle;
    avatarSeed: string;
    memberSince: Date;
    authProvider: string;
    activeFinanceProfileName: string | null;
}
