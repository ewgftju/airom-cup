import type { Language } from "@/i18n/translations";

export type RegulationEdition = {
  slug: string;
  birthYear: number;
  guestYear: number;
  dates: Record<Language, string>;
  pdf: string;
  cover: string;
};

export const regulationEditions: RegulationEdition[] = [
  {
    slug: "2026-2012", birthYear: 2012, guestYear: 2011,
    dates: { ru: "16–18 ноября 2026", kk: "2026 жылғы 16–18 қараша", en: "16–18 November 2026" },
    pdf: "/regulations/airom-cup-2026-2012.pdf",
    cover: "/regulations/airom-cup-2026-2012-cover.jpg",
  },
  {
    slug: "2026-2014", birthYear: 2014, guestYear: 2013,
    dates: { ru: "23–25 ноября 2026", kk: "2026 жылғы 23–25 қараша", en: "23–25 November 2026" },
    pdf: "/regulations/airom-cup-2026-2014.pdf",
    cover: "/regulations/airom-cup-2026-2014-cover.jpg",
  },
];

export const catalogCopy = {
  ru: {
    title: ["Положения", "турниров"], back: "Все положения", read: "Читать положение", download: "Скачать PDF",
    location: "Атырау, Казахстан", category: (year: number) => `Юноши ${year} года рождения и младше`,
  },
  kk: {
    title: ["Турнир", "ережелері"], back: "Барлық ережелер", read: "Ережені оқу", download: "PDF жүктеу",
    location: "Атырау, Қазақстан", category: (year: number) => `${year} жылы туған және одан кіші ұлдар`,
  },
  en: {
    title: ["Tournament", "regulations"], back: "All regulations", read: "Read regulations", download: "Download PDF",
    location: "Atyrau, Kazakhstan", category: (year: number) => `Boys born in ${year} or later`,
  },
} as const;
