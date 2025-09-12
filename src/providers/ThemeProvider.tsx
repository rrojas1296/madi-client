"use client";
import { Theme, THEME_KEY, useThemeStore } from "@/store/theme.store";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}

const ThemeProvider = ({ children }: Props) => {
  const { theme, setTheme } = useThemeStore();
  useEffect(() => {
    const storageTheme = localStorage.getItem(THEME_KEY);
    if (!storageTheme) {
      const systemIsDark = window.matchMedia(
        "(prefers-color-scheme:dark)",
      ).matches;
      setTheme(systemIsDark ? "dark" : "light");
      return;
    }
    setTheme(storageTheme as Theme);
  }, []);

  if (!theme) return;
  return <>{children}</>;
};

export default ThemeProvider;
