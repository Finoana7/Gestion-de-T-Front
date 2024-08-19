import { create } from "zustand";

export const load = create<{isLoad: boolean, toggle: () => void}>((set, this_) => ({
    isLoad: false,
    toggle() {
        set({isLoad: !this_().isLoad})
    },
}))