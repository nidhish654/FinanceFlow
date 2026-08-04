import { SettingsSectionCard } from "../../components/settings-section-card";
import { Badge } from "@/components/ui/badge";
import { TECHNOLOGIES } from "../about.constants";

export function TechnologyCard() {
    return (
        <SettingsSectionCard
            title="Technology Stack"
            description="The modern web technologies powering FinanceFlow."
        >
            <div className="pt-2 flex flex-wrap gap-2">
                {TECHNOLOGIES.map((tech, index) => (
                    <Badge key={index} variant="secondary" className="font-normal text-sm px-3 py-1 bg-secondary/50 hover:bg-secondary/70">
                        {tech}
                    </Badge>
                ))}
            </div>
        </SettingsSectionCard>
    );
}
