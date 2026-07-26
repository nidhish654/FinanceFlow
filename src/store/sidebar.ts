import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
    collapsed: boolean;
    mobileOpen: boolean;
    hydrated: boolean;

    toggleCollapse: () => void;
    setCollapsed: (collapsed: boolean) => void;

    openMobile: () => void;
    closeMobile: () => void;

    setHydrated: (hydrated: boolean) => void;
}

export const useSidebar = create<SidebarStore>()(
    persist(
        (set) => ({
            collapsed: false,
            mobileOpen: false,
            hydrated: false,

            toggleCollapse: () =>
                set((state) => ({
                    collapsed: !state.collapsed,
                })),

            setCollapsed: (collapsed) =>
                set({
                    collapsed,
                }),

            openMobile: () =>
                set({
                    mobileOpen: true,
                }),

            closeMobile: () =>
                set({
                    mobileOpen: false,
                }),

            setHydrated: (hydrated) =>
                set({
                    hydrated,
                }),
        }),
        {
            name: "financeflow-sidebar",

            onRehydrateStorage: () => (state) => {
                state?.setHydrated(true);
            },
        }
    )
);