import { SettingsSectionCard } from "../../components/settings-section-card";
import { ABOUT_TEXT } from "../about.constants";

export function AboutCard() {
    return (
        <SettingsSectionCard
            title="About FinanceFlow"
            description="Our mission and purpose."
        >
            <div className="pt-2 text-sm text-muted-foreground space-y-4 leading-relaxed">
                {ABOUT_TEXT.split("\n\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </SettingsSectionCard>
    );
}
