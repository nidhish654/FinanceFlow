"use client";

import { AccentColor } from "@prisma/client";
import { SettingsSectionCard } from "../../components/settings-section-card";
import { AccentColorPicker } from "./accent-color-picker";

interface AppearanceCardProps {
    accentColor: AccentColor;
    onChange: (color: AccentColor) => void;
}

export function AppearanceCard({ accentColor, onChange }: AppearanceCardProps) {
    return (
        <SettingsSectionCard
            title="🎨 Appearance"
            description="Customize the overall visual identity of FinanceFlow."
        >
            <div className="flex flex-col gap-4">
                <AccentColorPicker value={accentColor} onChange={onChange} />
            </div>
        </SettingsSectionCard>
    );
}
