"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Month } from "@prisma/client";
import { SettingsPageLayout } from "../components/settings-page-layout";
import { SettingsSaveBar } from "../components/settings-save-bar";
import { useUnsavedChanges } from "../hooks/use-unsaved-changes";
import { DefaultAccountCard } from "./components/default-account-card";
import { FinancialCalendarCard } from "./components/financial-calendar-card";
import { FinancialPreviewCard } from "./components/financial-preview-card";
import { updateSettings } from "../actions/update-settings";

interface FinancialDefaultPageProps {
    initialDefaults: {
        defaultAccountId: string | null;
        monthStart: number;
        fiscalYear: Month;
    };
    accounts: { id: string; name: string }[];
}

export function FinancialDefaultPage({ initialDefaults, accounts }: FinancialDefaultPageProps) {
    const { save, reset, markDirty } = useUnsavedChanges();
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState(initialDefaults);

    const handleFieldChange = (field: string, value: any) => {
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
                    defaultAccountId: formData.defaultAccountId,
                    monthStart: formData.monthStart,
                    fiscalYear: formData.fiscalYear,
                });

                if (result.success) {
                    toast.success("Financial defaults updated successfully.");
                } else {
                    toast.error(result.error || "Failed to save financial defaults.");
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
        setFormData(initialDefaults);
        reset();
    };

    return (
        <SettingsPageLayout
            title="Financial Defaults"
            description="Manage your default financial behaviour and reporting periods."
        >
            <DefaultAccountCard
                defaultAccountId={formData.defaultAccountId}
                accounts={accounts}
                onChange={(value) => handleFieldChange("defaultAccountId", value)}
            />

            <FinancialCalendarCard
                monthStart={formData.monthStart}
                fiscalYear={formData.fiscalYear}
                onChange={handleFieldChange}
            />

            <FinancialPreviewCard
                defaultAccountId={formData.defaultAccountId}
                accounts={accounts}
                monthStart={formData.monthStart}
                fiscalYear={formData.fiscalYear}
            />

            <SettingsSaveBar
                onSave={handleSave}
                onCancel={handleCancel}
                isLoading={isSaving}
            />
        </SettingsPageLayout>
    );
}
