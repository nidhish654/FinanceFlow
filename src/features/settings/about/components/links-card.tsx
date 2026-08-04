import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SettingsSectionCard } from "../../components/settings-section-card";
import { USEFUL_LINKS } from "../about.constants";
import { Button } from "@/components/ui/button";

export function LinksCard() {
    return (
        <SettingsSectionCard
            title="Useful Links"
            description="Resources and legal information."
        >
            <div className="pt-2 flex flex-col gap-1">
                {USEFUL_LINKS.map((link, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-between font-normal text-muted-foreground hover:text-foreground group h-12"
                        asChild
                    >
                        <Link href={link.href} target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-3">
                                <link.icon className="h-4 w-4" />
                                <span>{link.title}</span>
                            </div>
                            <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                    </Button>
                ))}
            </div>
        </SettingsSectionCard>
    );
}
