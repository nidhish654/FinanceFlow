import { SettingsPageHeader } from "./settings-page-header";

interface SettingsPageLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function SettingsPageLayout({
    title,
    description,
    children,
}: SettingsPageLayoutProps) {
    return (
        <div className="space-y-6">
            <SettingsPageHeader title={title} description={description} />
            <div className="space-y-8">{children}</div>
        </div>
    );
}
