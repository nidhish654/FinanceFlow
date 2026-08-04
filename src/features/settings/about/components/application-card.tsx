import { SettingsSectionCard } from "../../components/settings-section-card";
import { APPLICATION_METADATA } from "../about.constants";

export function ApplicationCard() {
    return (
        <SettingsSectionCard
            title="Application"
            description="Metadata and release information."
        >
            <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <div className="text-sm font-medium text-muted-foreground">Name</div>
                    <div className="sm:col-span-2 text-sm">
                        {APPLICATION_METADATA.name}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <div className="text-sm font-medium text-muted-foreground">Version</div>
                    <div className="sm:col-span-2 text-sm">
                        {APPLICATION_METADATA.version}
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                    <div className="text-sm font-medium text-muted-foreground">Release</div>
                    <div className="sm:col-span-2 text-sm">
                        {APPLICATION_METADATA.releaseDate}
                    </div>
                </div>

                {process.env.NODE_ENV === "development" && (
                    <div className="grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-4">
                        <div className="text-sm font-medium text-muted-foreground">Environment</div>
                        <div className="sm:col-span-2 text-sm">Development</div>
                    </div>
                )}
            </div>
        </SettingsSectionCard>
    );
}
