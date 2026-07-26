import { ReactNode } from "react";

import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { PageContainer } from "./PageContainer";

interface AppShellProps {
    children: ReactNode;

    financeProfiles: {
        id: string;
        name: string;
        baseCurrency: string;
    }[];

    activeFinanceProfile: {
        id: string;
        name: string;
        baseCurrency: string;
    };
}

export default function AppShell({ children, financeProfiles, activeFinanceProfile }: AppShellProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar
                financeProfiles={financeProfiles}
                activeFinanceProfile={activeFinanceProfile}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <Navbar />

                <PageContainer>{children}</PageContainer>
            </div>
        </div>
    );
}