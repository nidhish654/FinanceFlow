"use client";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

interface SettingsSectionCardProps {
    title: string;
    description: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export function SettingsSectionCard({
    title,
    description,
    children,
    footer,
}: SettingsSectionCardProps) {
    return (
        <Card className="rounded-2xl border shadow-sm">
            <CardHeader className="space-y-1">
                <CardTitle className="text-xl">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>{children}</CardContent>
            {footer && (
                <CardFooter className="border-t bg-muted/20 px-6 py-4">
                    {footer}
                </CardFooter>
            )}
        </Card>
    );
}
