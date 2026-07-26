import { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

export default function AuthCard({
    children,
}: AuthCardProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10">
            <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-lg">
                {children}
            </div>
        </div>
    );
}