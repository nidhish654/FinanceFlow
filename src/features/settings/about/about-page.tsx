import { SettingsPageLayout } from "../components/settings-page-layout";
import { ApplicationCard } from "./components/application-card";
import { AboutCard } from "./components/about-card";
import { FeaturesCard } from "./components/features-card";
import { TechnologyCard } from "./components/technology-card";
import { RoadmapCard } from "./components/roadmap-card";
import { LinksCard } from "./components/links-card";
import { AboutFooter } from "./components/about-footer";

export function AboutPage() {
    return (
        <SettingsPageLayout
            title="About"
            description="Learn more about FinanceFlow, its capabilities, and the technologies powering it."
        >
            <div className="space-y-8">
                <ApplicationCard />
                <AboutCard />
                <FeaturesCard />
                <TechnologyCard />
                <RoadmapCard />
                <LinksCard />
                <AboutFooter />
            </div>
        </SettingsPageLayout>
    );
}
