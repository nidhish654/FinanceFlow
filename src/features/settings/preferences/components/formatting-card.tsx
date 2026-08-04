"use client";

import { DateFormat, TimeFormat, NumberFormat } from "@prisma/client";
import { SettingsSectionCard } from "../../components/settings-section-card";
import { PreferenceSelect } from "./preference-select";
import { FormattingPreview } from "./formatting-preview";

interface FormattingCardProps {
    dateFormat: DateFormat;
    timeFormat: TimeFormat;
    numberFormat: NumberFormat;
    onChange: (field: string, value: string) => void;
}

export function FormattingCard({
    dateFormat,
    timeFormat,
    numberFormat,
    onChange,
}: FormattingCardProps) {
    return (
        <SettingsSectionCard
            title="📅 Formatting"
            description="Allow users to choose how dates, time, and numbers are displayed throughout FinanceFlow."
        >
            <div className="flex flex-col gap-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    <PreferenceSelect
                        id="dateFormat"
                        label="Date Format"
                        value={dateFormat}
                        onChange={(value) => onChange("dateFormat", value)}
                        options={[
                            { label: "DD/MM/YYYY", value: "DD_MM_YYYY" },
                            { label: "MM/DD/YYYY", value: "MM_DD_YYYY" },
                            { label: "YYYY-MM-DD", value: "YYYY_MM_DD" },
                        ]}
                    />

                    <PreferenceSelect
                        id="timeFormat"
                        label="Time Format"
                        value={timeFormat}
                        onChange={(value) => onChange("timeFormat", value)}
                        options={[
                            { label: "24 Hour", value: "H24" },
                            { label: "12 Hour", value: "H12" },
                        ]}
                    />

                    <PreferenceSelect
                        id="numberFormat"
                        label="Number Format"
                        value={numberFormat}
                        onChange={(value) => onChange("numberFormat", value)}
                        options={[
                            { label: "Indian (12,34,567)", value: "INDIAN" },
                            { label: "International (1,234,567)", value: "WESTERN" },
                            { label: "European (1.234.567)", value: "EUROPEAN" },
                        ]}
                    />
                </div>

                <FormattingPreview
                    dateFormat={dateFormat}
                    timeFormat={timeFormat}
                    numberFormat={numberFormat}
                />
            </div>
        </SettingsSectionCard>
    );
}
