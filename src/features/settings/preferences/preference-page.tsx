"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SettingsPageLayout } from "../components/settings-page-layout";
import { SettingsSaveBar } from "../components/settings-save-bar";
import { useUnsavedChanges } from "../hooks/use-unsaved-changes";
import { PreferencesData } from "./preference.types";
import { AppearanceCard } from "./components/appearance-card";
import { RegionalCard } from "./components/regional-card";
import { FormattingCard } from "./components/formatting-card";
import { updateSettings } from "../actions/update-settings";

interface PreferencePageProps {
    initialPreferences: PreferencesData;
}

export function PreferencePage({ initialPreferences }: PreferencePageProps) {
    const { save, reset, markDirty } = useUnsavedChanges();
    const [isSaving, setIsSaving] = useState(false);

    // Local state for the editable fields before saving
    const [formData, setFormData] = useState<PreferencesData>(initialPreferences);

    const handleFieldChange = (field: keyof PreferencesData, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        markDirty();
    };

    const handleSave = async () => {
        setIsSaving(true);
        try {
            await save(async () => {
                const result = await updateSettings({
                    accentColor: formData.accentColor,
                    language: formData.language,
                    weekStart: formData.weekStartsOn, // weekStart in DB
                    dateFormat: formData.dateFormat,
                    timeFormat: formData.timeFormat,
                    numberFormat: formData.numberFormat,
                });

                if (result.success) {
                    toast.success("Preferences updated successfully.");
                } else {
                    toast.error(result.error || "Failed to save preferences.");
                    throw new Error(result.error);
                }
            });
        } catch (error) {
            // Error handled by toast
        } finally {
            setIsSaving(false);
        }
    };

    const handleCancel = () => {
        setFormData(initialPreferences);
        reset();
    };

    return (
        <SettingsPageLayout
            title="Preferences"
            description="Personalize the appearance and formatting of FinanceFlow."
        >
            <AppearanceCard
                accentColor={formData.accentColor}
                onChange={(color) => handleFieldChange("accentColor", color)}
            />

            <RegionalCard
                language={formData.language}
                weekStartsOn={formData.weekStartsOn}
                onChange={(field, value) => handleFieldChange(field as any, value)}
            />

            {/* <FormattingCard
                dateFormat={formData.dateFormat}
                timeFormat={formData.timeFormat}
                numberFormat={formData.numberFormat}
                onChange={(field, value) => handleFieldChange(field as any, value)}
            /> */}

            <SettingsSaveBar
                onSave={handleSave}
                onCancel={handleCancel}
                isLoading={isSaving}
            />
        </SettingsPageLayout>
    );
}
