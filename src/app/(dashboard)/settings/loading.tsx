import { Skeleton } from "@/components/ui/skeleton";
import { SettingsSectionCard } from "@/features/settings/components/settings-section-card";

export default function SettingsLoading() {
    return (
        <SettingsSectionCard
            title="Loading..."
            description="Please wait while we load your settings."
        >
            <div className="space-y-4 py-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-2/3" />
            </div>
        </SettingsSectionCard>
    );
}
