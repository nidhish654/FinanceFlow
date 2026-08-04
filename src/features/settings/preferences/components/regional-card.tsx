"use client";

import { Language, WeekStart } from "@prisma/client";
import { SettingsSectionCard } from "../../components/settings-section-card";
import { PreferenceSelect } from "./preference-select";

interface RegionalCardProps {
    language: Language;
    weekStartsOn: WeekStart;
    onChange: (field: string, value: string) => void;
}

export function RegionalCard({ language, weekStartsOn, onChange }: RegionalCardProps) {
    return (
        <SettingsSectionCard
            title="🌍 Regional"
            description="Configure regional preferences that affect how FinanceFlow behaves."
        >
            <div className="flex flex-col gap-6">
                <PreferenceSelect
                    id="language"
                    label="Language"
                    value={language}
                    onChange={(value) => onChange("language", value)}
                    options={[
                        { label: "English", value: "ENGLISH" },
                        { label: "Japanese (Coming Soon)", value: "JAPANESE", disabled: true },
                    ]}
                />

                <PreferenceSelect
                    id="weekStartsOn"
                    label="Week Starts On"
                    value={weekStartsOn}
                    onChange={(value) => onChange("weekStartsOn", value)}
                    options={[
                        { label: "Monday", value: "MONDAY" },
                        { label: "Sunday", value: "SUNDAY" },
                    ]}
                />
            </div>
        </SettingsSectionCard>
    );
}
