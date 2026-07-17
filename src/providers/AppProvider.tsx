"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

interface AppProviderProps {
    children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
    return (
        <ThemeProvider>
            {children}
            <Toaster richColors position="top-right" />
        </ThemeProvider>
    );
}