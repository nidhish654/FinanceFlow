"use client";

interface SettingsPageHeaderProps {
    title: string;
    description: string;
}

export function SettingsPageHeader({
    title,
    description,
}: SettingsPageHeaderProps) {
    return (
        <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
    );
}
