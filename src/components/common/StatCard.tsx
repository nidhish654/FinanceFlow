import { ReactNode } from "react";

import DataCard from "./DataCard";

interface StatCardProps {
    title: string;
    value: ReactNode;
    subtitle?: string;
    icon?: ReactNode;
}

export default function StatCard({
    title,
    value,
    subtitle,
    icon,
}: StatCardProps) {
    return (
        <DataCard>
            <div className="flex items-start justify-between">
                <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold tracking-tight">
                        {value}
                    </h2>

                    {subtitle && (
                        <p className="text-sm text-muted-foreground">
                            {subtitle}
                        </p>
                    )}
                </div>

                {icon && (
                    <div className="rounded-lg border bg-muted p-2">
                        {icon}
                    </div>
                )}
            </div>
        </DataCard>
    );
}