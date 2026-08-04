import {
    User,
    Palette,
    Settings as SettingsIcon,
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
        id: "security",
        label: SETTINGS_SECTIONS.security,
        icon: Shield,
        href: "?tab=security",
    },
    {
        id: "data-management",
        label: SETTINGS_SECTIONS["data-management"],
        icon: Database,
        href: "?tab=data-management",
    },
    {
        id: "about",
        label: SETTINGS_SECTIONS.about,
        icon: Info,
        href: "?tab=about",
    },
];
