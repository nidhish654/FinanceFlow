import { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { PageContainer } from "./PageContainer";

interface AppShellProps {
    children: ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />

            <div className="flex min-w-0 flex-1 flex-col">
                <Navbar />

                <PageContainer>{children}</PageContainer>
            </div>
        </div>
    );
}