"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "theme";
const THEMES = ["light", "dark"];

type SystemTheme = "light" | "dark";

interface ThemeContextValue {
  theme: string | undefined;
  setTheme: (theme: string) => void;
  themes: string[];
  systemTheme: SystemTheme | undefined;
  resolvedTheme: string | undefined;
  forcedTheme: string | undefined;
}

const defaultContext: ThemeContextValue = {
  theme: undefined,
  setTheme: () => {},
  themes: THEMES,
  systemTheme: undefined,
  resolvedTheme: undefined,
  forcedTheme: undefined,
};

const ThemeContext = createContext<ThemeContextValue>(defaultContext);

const getSystemTheme = (): SystemTheme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme: string) => {
  const el = document.documentElement;
  el.setAttribute("data-theme", theme);
  el.style.colorScheme = theme;
};

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<string | undefined>(undefined);
  const [systemTheme, setSystemTheme] = useState<SystemTheme | undefined>(
    undefined,
  );

  useLayoutEffect(() => {
    let stored: string | undefined;
    try {
      stored = localStorage.getItem(STORAGE_KEY) || undefined;
    } catch {}
    setThemeState(stored ?? "system");
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      const next = e.matches ? "dark" : "light";
      setSystemTheme(next);
      setThemeState((current) => {
        if (current === "system") applyTheme(next);
        return current;
      });
    };
    setSystemTheme(mql.matches ? "dark" : "light");
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      const next = e.newValue || "system";
      setThemeState(next);
      applyTheme(next === "system" ? getSystemTheme() : next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useLayoutEffect(() => {
    if (!theme) return;
    applyTheme(theme === "system" ? (systemTheme ?? getSystemTheme()) : theme);
  }, [theme, systemTheme]);

  const setTheme = useCallback((next: string) => {
    setThemeState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    applyTheme(next === "system" ? getSystemTheme() : next);
  }, []);

  const resolvedTheme =
    theme === "system" ? systemTheme : theme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes: THEMES,
        systemTheme,
        resolvedTheme,
        forcedTheme: undefined,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}