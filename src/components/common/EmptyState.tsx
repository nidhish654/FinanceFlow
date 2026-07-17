import { Inbox } from "lucide-react";

interface EmptyStateProps {
    title: string;
    description: string;
    action?: React.ReactNode;
}

export function EmptyState({
    title,
    description,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16">
            <Inbox className="mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">
                {title}
            </h3>

            <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
                {description}
            </p>

            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}