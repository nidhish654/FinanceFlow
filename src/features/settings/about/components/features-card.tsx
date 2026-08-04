import { SettingsSectionCard } from "../../components/settings-section-card";
import { Badge } from "@/components/ui/badge";
import { FEATURES } from "../about.constants";

export function FeaturesCard() {
    return (
        <SettingsSectionCard
            title="Features"
            description="Capabilities supported by the current version."
        >
            <div className="pt-2 flex flex-wrap gap-2">
                {FEATURES.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="font-normal text-sm px-3 py-1">
                        {feature}
                    </Badge>
                ))}
            </div>
        </SettingsSectionCard>
    );
}
