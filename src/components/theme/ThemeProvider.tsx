"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export type Theme = "light" | "dark";
const storageKey = "airom-cup-theme";
const changeEvent = "airom-theme-change";
const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void } | null>(null);

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribe(onChange: () => void) {
  function onStorage(event: StorageEvent) {
    if (event.key !== storageKey && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    onChange();
  }
  window.addEventListener("storage", onStorage);
  window.addEventListener(changeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(changeEvent, onChange);
  };
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem(storageKey, theme);
  } catch {
    // Switching remains available if browser storage is disabled.
  }
  window.dispatchEvent(new Event(changeEvent));
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  // The head script applies the preference before paint; React subscribes without resetting it.
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const value = useMemo(() => ({ theme, setTheme }), [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
