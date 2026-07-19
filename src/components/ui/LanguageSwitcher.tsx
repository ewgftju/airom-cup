"use client";

import { languageLabels, type Language } from "@/i18n/translations";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`${styles.switcher} ${light ? styles.light : ""}`} role="group" aria-label="Language selection">
      {(Object.keys(languageLabels) as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          className={language === item ? styles.active : ""}
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
        >
          {languageLabels[item]}
        </button>
      ))}
    </div>
  );
}

