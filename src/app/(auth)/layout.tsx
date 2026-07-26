import { ReactNode } from "react";

import { redirect } from "next/navigation";

import { getSession } from "@/features/auth/lib/session";

interface AuthLayoutProps {
    children: ReactNode;
}

export default async function AuthLayout({
    children,
}: AuthLayoutProps) {
    const session = await getSession();

    if (session) {
        redirect("/dashboard");
    }

    return <>{children}</>;
}