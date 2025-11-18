import { ReactNode } from "react";
import { create } from "zustand";

interface SidebarState {
  element?: ReactNode | null;
  open: boolean;
  setElement: (element: ReactNode) => void;
  setOpen: (open: boolean) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  content: null,
  open: false,
  setElement: (element) =>
    set({
      element,
    }),
  setOpen: (open: boolean) => set({ open }),
}));
