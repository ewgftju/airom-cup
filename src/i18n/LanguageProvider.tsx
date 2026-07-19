"use client";

import { createContext, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import type { Language } from "./translations";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export default function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("airom-language-change", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("airom-language-change", onStoreChange);
      };
    },
    () => {
      const saved = window.localStorage.getItem("airom-cup-language");
      return saved === "ru" || saved === "kk" || saved === "en" ? saved : "ru";
    },
    () => "ru" as Language,
  );

  const setLanguage = (nextLanguage: Language) => {
    window.localStorage.setItem("airom-cup-language", nextLanguage);
    document.documentElement.lang = nextLanguage;
    window.dispatchEvent(new Event("airom-language-change"));
  };

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
