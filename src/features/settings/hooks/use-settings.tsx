"use client";

import React, { createContext, useContext } from "react";
import { SettingsState } from "../types/settings";

interface SettingsContextValue {
    settings: SettingsState | null;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({
    settings,
    children,
}: {
    settings: SettingsState | null;
    children: React.ReactNode;
}) {
    return (
        <SettingsContext.Provider value={{ settings }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
