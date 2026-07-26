import { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
    title: string;
    value: string;
    subtitle?: string;
    valueClassName?: string;
    icon: LucideIcon;
    iconClassName?: string;
}

export default function SummaryCard({
    title,
    value,
    subtitle,
    valueClassName,
    icon: Icon,
    iconClassName,
}: SummaryCardProps) {
    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                <Icon
                    className={`h-5 w-5 ${iconClassName ?? "text-muted-foreground/70"}`}
                />
            </CardHeader>

            <CardContent className="space-y-1">
                <div
                    className={`text-3xl font-bold tracking-tight ${
                        valueClassName ?? ""
                    }`}
                >
                    {value}
                </div>

                {subtitle && (
                    <p className="text-xs text-muted-foreground">
                        {subtitle}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}