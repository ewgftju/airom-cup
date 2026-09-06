"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { Language } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

let fallbackLanguage: Language = "ru";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("airom-language-change", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("airom-language-change", onStoreChange);
  };
}

function getLanguage(): Language {
  try {
    const saved = window.localStorage.getItem("airom-cup-language");
    return saved === "ru" || saved === "kk" || saved === "en" ? saved : fallbackLanguage;
  } catch {
    return fallbackLanguage;
  }
}

function setLanguage(nextLanguage: Language) {
  fallbackLanguage = nextLanguage;
  try {
    window.localStorage.setItem("airom-cup-language", nextLanguage);
  } catch {
    // Language switching still works when browser storage is blocked.
  }
  window.dispatchEvent(new Event("airom-language-change"));
}

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    subscribe,
    getLanguage,
    () => "ru" as Language,
  );

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
