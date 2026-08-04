import { SettingsSectionCard } from "../../components/settings-section-card";
import { Badge } from "@/components/ui/badge";
import { ROADMAP } from "../about.constants";

export function RoadmapCard() {
    return (
        <SettingsSectionCard
            title="Roadmap"
            description="Upcoming features currently in development."
        >
            <div className="pt-2 flex flex-wrap gap-2">
                {ROADMAP.map((item, index) => (
                    <Badge key={index} variant="outline" className="font-normal text-sm px-3 py-1 text-muted-foreground border-dashed">
                        {item}
                    </Badge>
                ))}
            </div>
        </SettingsSectionCard>
    );
}
