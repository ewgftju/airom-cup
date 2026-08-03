export type LocalizedText = {
  ru: string;
  kk: string;
  en: string;
};

export type ResultStanding = {
  place: "1" | "2" | "3" | "A" | "B";
  team: string;
};

export type PastResult = {
  id: string;
  collection: "2026" | "archive";
  event: LocalizedText;
  category: LocalizedText;
  dates: LocalizedText;
  format: "podium" | "groups";
  standings: ResultStanding[];
  protocolUrl: string;
};

export const pastResults: PastResult[] = [
  {
    id: "2026-u2008",
    collection: "2026",
    event: {
      ru: "AIROM CUP 2026",
      kk: "AIROM CUP 2026",
      en: "AIROM CUP 2026",
    },
    category: {
      ru: "Юноши 2008 г.р. и младше",
      kk: "2008 ж.т. және одан кіші ұлдар",
      en: "Boys born 2008 and younger",
    },
    dates: {
      ru: "20–22 февраля 2026",
      kk: "2026 жылғы 20–22 ақпан",
      en: "20–22 February 2026",
    },
    format: "groups",
    standings: [
      { place: "A", team: "Сборная Беларуси U18" },
      { place: "B", team: "Сборная Казахстана U18" },
    ],
    protocolUrl: "/results/airom-cup-2026-u2008.pdf",
  },
  {
    id: "2026-u2009",
    collection: "2026",
    event: {
      ru: "AIROM CUP",
      kk: "AIROM CUP",
      en: "AIROM CUP",
    },
    category: {
      ru: "Юноши 2009 г.р. и младше",
      kk: "2009 ж.т. және одан кіші ұлдар",
      en: "Boys born 2009 and younger",
    },
    dates: {
      ru: "Итоговая таблица",
      kk: "Қорытынды кесте",
      en: "Final standings",
    },
    format: "podium",
    standings: [
      { place: "1", team: "БК «Барсы Атырау»" },
      { place: "2", team: "БК «Кутаиси»" },
      { place: "3", team: "Сборная Азербайджана" },
    ],
    protocolUrl: "/results/airom-cup-2026-u2009.pdf",
  },
  {
    id: "2026-u2010",
    collection: "2026",
    event: {
      ru: "AIROM CUP 2026",
      kk: "AIROM CUP 2026",
      en: "AIROM CUP 2026",
    },
    category: {
      ru: "Юноши 2010 г.р. и младше",
      kk: "2010 ж.т. және одан кіші ұлдар",
      en: "Boys born 2010 and younger",
    },
    dates: {
      ru: "18–21 июня 2026",
      kk: "2026 жылғы 18–21 маусым",
      en: "18–21 June 2026",
    },
    format: "podium",
    standings: [
      { place: "1", team: "Сборная Беларуси 2011" },
      { place: "2", team: "«Барсы Атырау»" },
      { place: "3", team: "ОСДЮСШ №2, Актобе" },
    ],
    protocolUrl: "/results/airom-cup-2026-u2010.pdf",
  },
  {
    id: "2026-u2011",
    collection: "2026",
    event: {
      ru: "AIROM CUP 2026",
      kk: "AIROM CUP 2026",
      en: "AIROM CUP 2026",
    },
    category: {
      ru: "Юноши 2011 г.р. и младше",
      kk: "2011 ж.т. және одан кіші ұлдар",
      en: "Boys born 2011 and younger",
    },
    dates: {
      ru: "21–24 апреля 2026",
      kk: "2026 жылғы 21–24 сәуір",
      en: "21–24 April 2026",
    },
    format: "podium",
    standings: [
      { place: "1", team: "Kutaisi, Кутаиси" },
      { place: "2", team: "AIROM, Атырау" },
      { place: "3", team: "«Актуба», с. Красный Яр" },
    ],
    protocolUrl: "/results/airom-cup-2026-u2011.pdf",
  },
  {
    id: "archive-u2008",
    collection: "archive",
    event: {
      ru: "AIROM CUP 2025",
      kk: "AIROM CUP 2025",
      en: "AIROM CUP 2025",
    },
    category: {
      ru: "Категория 2008 г.р.",
      kk: "2008 ж.т. санаты",
      en: "2008 age category",
    },
    dates: {
      ru: "Архивный протокол",
      kk: "Мұрағат хаттамасы",
      en: "Archive protocol",
    },
    format: "podium",
    standings: [
      { place: "1", team: "Барсы Атырау 2008" },
      { place: "2", team: "Сборная Кыргызстана" },
      { place: "3", team: "Барсы Атырау 2010" },
    ],
    protocolUrl: "/results/airom-cup-2025-u2008.pdf",
  },
  {
    id: "archive-u2009",
    collection: "archive",
    event: {
      ru: "AIROM CUP · Архив",
      kk: "AIROM CUP · Мұрағат",
      en: "AIROM CUP · Archive",
    },
    category: {
      ru: "Юноши 2009 г.р. и младше",
      kk: "2009 ж.т. және одан кіші ұлдар",
      en: "Boys born 2009 and younger",
    },
    dates: {
      ru: "Архивный протокол",
      kk: "Мұрағат хаттамасы",
      en: "Archive protocol",
    },
    format: "podium",
    standings: [
      { place: "1", team: "«Эдельвейс», Бишкек" },
      { place: "2", team: "Барсы Атырау 2009" },
      { place: "3", team: "Сборная Казахстана 2010" },
    ],
    protocolUrl: "/results/airom-cup-archive-u2009.pdf",
  },
  {
    id: "archive-u2011",
    collection: "archive",
    event: {
      ru: "AIROM CUP · Архив",
      kk: "AIROM CUP · Мұрағат",
      en: "AIROM CUP · Archive",
    },
    category: {
      ru: "Юноши 2011 г.р. и младше",
      kk: "2011 ж.т. және одан кіші ұлдар",
      en: "Boys born 2011 and younger",
    },
    dates: {
      ru: "Архивный протокол",
      kk: "Мұрағат хаттамасы",
      en: "Archive protocol",
    },
    format: "podium",
    standings: [
      { place: "1", team: "Сборная Азербайджана" },
      { place: "2", team: "БК «Кутаиси»" },
      { place: "3", team: "БК «Актуба»" },
    ],
    protocolUrl: "/results/airom-cup-archive-u2011.pdf",
  },
  {
    id: "archive-u2012",
    collection: "archive",
    event: {
      ru: "AIROM CUP · Архив",
      kk: "AIROM CUP · Мұрағат",
      en: "AIROM CUP · Archive",
    },
    category: {
      ru: "Юноши 2012 г.р. и младше",
      kk: "2012 ж.т. және одан кіші ұлдар",
      en: "Boys born 2012 and younger",
    },
    dates: {
      ru: "Архивный протокол",
      kk: "Мұрағат хаттамасы",
      en: "Archive protocol",
    },
    format: "podium",
    standings: [
      { place: "1", team: "ПБК Астана" },
      { place: "2", team: "AIROM" },
      { place: "3", team: "Актобе ОДЮСШ №3" },
    ],
    protocolUrl: "/results/airom-cup-archive-u2012.pdf",
  },
  {
    id: "archive-final-group",
    collection: "archive",
    event: {
      ru: "AIROM CUP · Итоговая группа",
      kk: "AIROM CUP · Қорытынды топ",
      en: "AIROM CUP · Final group",
    },
    category: {
      ru: "Итоговый протокол",
      kk: "Қорытынды хаттама",
      en: "Final protocol",
    },
    dates: {
      ru: "Архив турнира",
      kk: "Турнир мұрағаты",
      en: "Tournament archive",
    },
    format: "podium",
    standings: [
      { place: "1", team: "Azerbaijan" },
      { place: "2", team: "AIROM" },
      { place: "3", team: "МБУ ДО №2, Волгоград" },
    ],
    protocolUrl: "/results/airom-cup-archive-final-group.png",
  },
];
