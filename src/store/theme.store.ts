import { create } from "zustand";

export type Theme = "dark" | "light";
export const THEME_KEY = "app-theme";
export enum THEMES {
  LIGHT = "light",
  DARK = "dark",
  SYSTEM = "system",
}

interface ThemeState {
  theme?: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  setTheme: (theme: Theme) => {
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    return set((state) => ({ ...state, theme }));
  },
}));
