import {
    User,
    Palette,
    Settings2 as SettingsIcon,
    Wallet,
    Shield,
    Database,
    Info,
} from "lucide-react";
import { SidebarItem } from "../types/settings";
import { SETTINGS_SECTIONS } from "../constants/settings-sections";

export const SETTINGS_NAVIGATION: SidebarItem[] = [
    {
        id: "profile",
        label: SETTINGS_SECTIONS.profile,
        icon: User,
        href: "?tab=profile",
    },
    {
        id: "preferences",
        label: SETTINGS_SECTIONS.preferences,
        icon: SettingsIcon,
        href: "?tab=preferences",
    },
    {
        id: "financial-defaults",
        label: SETTINGS_SECTIONS["financial-defaults"],
        icon: Wallet,
        href: "?tab=financial-defaults",
    },
    {
        id: "about",
        label: SETTINGS_SECTIONS.about,
        icon: Info,
        href: "?tab=about",
    },
];