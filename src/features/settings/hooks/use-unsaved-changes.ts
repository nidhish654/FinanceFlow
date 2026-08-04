import { create } from "zustand";

interface UnsavedChangesState {
    isDirty: boolean;
    markDirty: () => void;
    reset: () => void;
    save: (onSave: () => Promise<void>) => Promise<void>;
}

export const useUnsavedChanges = create<UnsavedChangesState>((set) => ({
    isDirty: false,
    markDirty: () => set({ isDirty: true }),
    reset: () => set({ isDirty: false }),
    save: async (onSave) => {
        await onSave();
        set({ isDirty: false });
    },
}));
