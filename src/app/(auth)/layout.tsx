import { ReactNode } from "react";

import Link from "next/link";
import { redirect } from "next/navigation";
import { Wallet2 } from "lucide-react";

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

    return (
        <main className="fixed inset-0 overflow-y-auto bg-background">
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

                <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

                <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
            </div>

            {/* Content */}
            <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
                <div className="flex w-full max-w-md flex-col items-center">
                    {/* Brand */}
                    <Link
                        href="/"
                        className="mb-10 flex flex-col items-center"
                    >
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform duration-300 hover:scale-105">
                            <Wallet2 className="h-8 w-8" />
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight">
                            FinanceFlow
                        </h1>

                        <p className="mt-2 text-center text-sm text-muted-foreground">
                            Personal Finance, Simplified
                        </p>
                    </Link>

                    {children}
                </div>
            </div>
        </main>
    );
}