interface PageTitleProps {
    title: string;
    subtitle?: string;
}

export function PageTitle({
    title,
    subtitle,
}: PageTitleProps) {
    return (
        <div>
            <h1 className="text-4xl font-bold tracking-tight">
                {title}
            </h1>

            {subtitle && (
                <p className="mt-2 text-muted-foreground">
                    {subtitle}
                </p>
            )}
        </div>
    );
}