import { z } from "zod";
import { AVATAR_STYLES_LIST } from "./lib/avatar-styles";

export const ProfileSchema = z.object({
    displayName: z
        .string()
        .min(1, "Display name is required.")
        .max(50, "Display name cannot exceed 50 characters.")
        .trim(),
    avatarStyle: z.enum(AVATAR_STYLES_LIST as [string, ...string[]]).optional(),
    avatarSeed: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof ProfileSchema>;
