import { create } from "zustand";

interface DialogState {
  content: React.ReactNode | null;
  open: boolean;
  setContent: (content: React.ReactNode) => void;
  setOpen: (open: boolean) => void;
}

export const useDialog = create<DialogState>((set) => ({
  content: null,
  setContent: (content) => set({ content }),
  open: false,
  setOpen: (open) => set({ open }),
}));
