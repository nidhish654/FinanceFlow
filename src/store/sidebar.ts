import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
    collapsed: boolean;
    mobileOpen: boolean;

    toggleCollapse: () => void;

    setCollapsed: (collapsed: boolean) => void;

    openMobile: () => void;

    closeMobile: () => void;
}

export const useSidebar = create<SidebarStore>()(
    persist(
        (set) => ({
            collapsed: false,

            mobileOpen: false,

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
        }),
        {
            name: "financeflow-sidebar",
        }
    )
);