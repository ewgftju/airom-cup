"use client";

import { useTheme, type Theme } from "@/components/theme/ThemeProvider";
import { useLanguage } from "@/i18n/LanguageProvider";
import styles from "./ThemeSwitcher.module.css";

const copy = {
  ru: { label: "Тема оформления", light: "Светлая", dark: "Тёмная" },
  kk: { label: "Безендіру тақырыбы", light: "Ашық", dark: "Қараңғы" },
  en: { label: "Color theme", light: "Light", dark: "Dark" },
};

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const { language } = useLanguage();
  const labels = copy[language];
  return (
    <label className={styles.switcher}>
      <svg className={styles.sun} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>
      <svg className={styles.moon} width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" /></svg>
      <select aria-label={labels.label} value={theme} onChange={(event) => setTheme(event.target.value as Theme)}>
        <option value="light">{labels.light}</option>
        <option value="dark">{labels.dark}</option>
      </select>
    </label>
  );
}
