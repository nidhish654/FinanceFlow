import { ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
}

export function PageContainer({
    children,
}: PageContainerProps) {
    return (
        <main className="flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-[1600px] px-8 py-4">
                {children}
            </div>
        </main>
    );
}