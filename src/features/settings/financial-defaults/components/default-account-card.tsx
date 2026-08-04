"use client";

import { SettingsSectionCard } from "../../components/settings-section-card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface DefaultAccountCardProps {
    defaultAccountId: string | null;
    accounts: { id: string; name: string }[];
    onChange: (value: string | null) => void;
}

export function DefaultAccountCard({
    defaultAccountId,
    accounts,
    onChange,
}: DefaultAccountCardProps) {
    return (
        <SettingsSectionCard
            title="🏦 Default Account"
            description="The account used by default when creating new transactions."
        >
            <div className="flex flex-col gap-2">
                <Label htmlFor="defaultAccountId">Default Account</Label>
                <Select
                    value={defaultAccountId || "NONE"}
                    onValueChange={(value) => onChange(value === "NONE" ? null : value)}
                >
                    <SelectTrigger id="defaultAccountId" className="w-full sm:max-w-xs">
                        <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="NONE">None</SelectItem>
                        {accounts.map((account) => (
                            <SelectItem key={account.id} value={account.id}>
                                {account.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </SettingsSectionCard>
    );
}
