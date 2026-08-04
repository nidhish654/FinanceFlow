import { ReactNode } from "react";

interface AuthCardProps {
    children: ReactNode;
}

export default function AuthCard({
    children,
}: AuthCardProps) {
    return (
        <div className="w-full rounded-3xl border border-border/60 bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
            {children}
        </div>
    );
}