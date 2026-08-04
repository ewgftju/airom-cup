export type LocalizedText = {
  ru: string;
  kk: string;
  en: string;
};

export type ResultStanding = {
  place: number;
  team: string;
  points?: number;
  group?: "A" | "B";
  note?: LocalizedText;
};

export type ResultGame = {
  teamA: string;
  teamB: string;
  scoreA: number;
  scoreB: number;
  stage?: LocalizedText;
};

export type PastResult = {
  id: string;
  collection: "2026" | "archive";
  event: LocalizedText;
  category: LocalizedText;
  dates: LocalizedText;
  format: "podium" | "groups";
  standings: ResultStanding[];
  games: ResultGame[];
  dataNote?: LocalizedText;
};

const groupA: LocalizedText = { ru: "Группа A", kk: "A тобы", en: "Group A" };
const groupB: LocalizedText = { ru: "Группа B", kk: "B тобы", en: "Group B" };
const outsideCompetition: LocalizedText = {
  ru: "Вне конкурса",
  kk: "Конкурстан тыс",
  en: "Non-competitive entry",
};

export const pastResults: PastResult[] = [
  {
    id: "2026-u2008",
    collection: "2026",
    event: { ru: "AIROM CUP 2026", kk: "AIROM CUP 2026", en: "AIROM CUP 2026" },
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
      { place: 1, group: "A", team: "Сборная Беларуси U18", points: 6 },
      { place: 2, group: "A", team: "Сборная Кыргызстана U18", points: 5 },
      { place: 3, group: "A", team: "SANA SPORT, Астана", points: 4 },
      { place: 4, group: "A", team: "KUTAISI, Кутаиси", points: 3 },
      { place: 1, group: "B", team: "Сборная Казахстана U18", points: 6 },
      { place: 2, group: "B", team: "AIROM, Атырау", points: 5 },
      { place: 3, group: "B", team: "KUTAISI-2, Кутаиси", points: 4 },
      { place: 4, group: "B", team: "ОДЮСШ №3, Актобе", points: 3 },
    ],
    games: [
      { stage: groupA, teamA: "SANA SPORT", teamB: "Сборная Беларуси U18", scoreA: 52, scoreB: 101 },
      { stage: groupA, teamA: "SANA SPORT", teamB: "KUTAISI", scoreA: 73, scoreB: 64 },
      { stage: groupA, teamA: "SANA SPORT", teamB: "Сборная Кыргызстана U18", scoreA: 53, scoreB: 68 },
      { stage: groupA, teamA: "Сборная Беларуси U18", teamB: "KUTAISI", scoreA: 94, scoreB: 62 },
      { stage: groupA, teamA: "Сборная Беларуси U18", teamB: "Сборная Кыргызстана U18", scoreA: 69, scoreB: 47 },
      { stage: groupA, teamA: "KUTAISI", teamB: "Сборная Кыргызстана U18", scoreA: 50, scoreB: 54 },
      { stage: groupB, teamA: "AIROM", teamB: "KUTAISI-2", scoreA: 78, scoreB: 65 },
      { stage: groupB, teamA: "AIROM", teamB: "Сборная Казахстана U18", scoreA: 56, scoreB: 67 },
      { stage: groupB, teamA: "AIROM", teamB: "ОДЮСШ №3", scoreA: 72, scoreB: 27 },
      { stage: groupB, teamA: "KUTAISI-2", teamB: "Сборная Казахстана U18", scoreA: 28, scoreB: 80 },
      { stage: groupB, teamA: "KUTAISI-2", teamB: "ОДЮСШ №3", scoreA: 77, scoreB: 45 },
      { stage: groupB, teamA: "Сборная Казахстана U18", teamB: "ОДЮСШ №3", scoreA: 103, scoreB: 32 },
    ],
  },
  {
    id: "2026-u2009",
    collection: "2026",
    event: { ru: "AIROM CUP", kk: "AIROM CUP", en: "AIROM CUP" },
    category: {
      ru: "Юноши 2009 г.р. и младше",
      kk: "2009 ж.т. және одан кіші ұлдар",
      en: "Boys born 2009 and younger",
    },
    dates: { ru: "Итоговая таблица", kk: "Қорытынды кесте", en: "Final standings" },
    format: "podium",
    standings: [
      { place: 1, team: "БК «Барсы Атырау»", points: 7 },
      { place: 2, team: "БК «Кутаиси»", points: 7 },
      { place: 3, team: "Сборная Азербайджана", points: 7 },
      { place: 4, team: "Ауыл спорт", points: 5 },
      { place: 5, team: "KEEPERS", points: 4 },
    ],
    games: [
      { teamA: "БК «Барсы Атырау»", teamB: "Сборная Азербайджана", scoreA: 72, scoreB: 54 },
      { teamA: "БК «Барсы Атырау»", teamB: "БК «Кутаиси»", scoreA: 47, scoreB: 50 },
      { teamA: "БК «Барсы Атырау»", teamB: "Ауыл спорт", scoreA: 78, scoreB: 27 },
      { teamA: "БК «Барсы Атырау»", teamB: "KEEPERS", scoreA: 93, scoreB: 18 },
      { teamA: "Сборная Азербайджана", teamB: "БК «Кутаиси»", scoreA: 58, scoreB: 51 },
      { teamA: "Сборная Азербайджана", teamB: "Ауыл спорт", scoreA: 60, scoreB: 33 },
      { teamA: "Сборная Азербайджана", teamB: "KEEPERS", scoreA: 71, scoreB: 16 },
      { teamA: "БК «Кутаиси»", teamB: "Ауыл спорт", scoreA: 64, scoreB: 27 },
      { teamA: "БК «Кутаиси»", teamB: "KEEPERS", scoreA: 80, scoreB: 24 },
      { teamA: "Ауыл спорт", teamB: "KEEPERS", scoreA: 29, scoreB: 26 },
    ],
  },
  {
    id: "2026-u2010",
    collection: "2026",
    event: { ru: "AIROM CUP 2026", kk: "AIROM CUP 2026", en: "AIROM CUP 2026" },
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
      { place: 1, team: "Сборная Беларуси 2011", points: 7 },
      { place: 2, team: "Барсы Атырау", points: 6 },
      { place: 3, team: "ОСДЮСШ №2, Актобе", points: 5 },
      { place: 4, team: "REAL, Астрахань", points: 4 },
      { place: 5, team: "AIROM, Атырау", points: 8, note: outsideCompetition },
    ],
    games: [
      { teamA: "REAL", teamB: "Сборная Беларуси 2011", scoreA: 31, scoreB: 134 },
      { teamA: "REAL", teamB: "ОСДЮСШ №2", scoreA: 42, scoreB: 78 },
      { teamA: "REAL", teamB: "Барсы Атырау", scoreA: 26, scoreB: 105 },
      { teamA: "REAL", teamB: "AIROM", scoreA: 25, scoreB: 118 },
      { teamA: "Сборная Беларуси 2011", teamB: "ОСДЮСШ №2", scoreA: 89, scoreB: 50 },
      { teamA: "Сборная Беларуси 2011", teamB: "Барсы Атырау", scoreA: 86, scoreB: 78 },
      { teamA: "Сборная Беларуси 2011", teamB: "AIROM", scoreA: 64, scoreB: 67 },
      { teamA: "ОСДЮСШ №2", teamB: "Барсы Атырау", scoreA: 62, scoreB: 87 },
      { teamA: "ОСДЮСШ №2", teamB: "AIROM", scoreA: 47, scoreB: 90 },
      { teamA: "Барсы Атырау", teamB: "AIROM", scoreA: 44, scoreB: 66 },
    ],
  },
  {
    id: "2026-u2011",
    collection: "2026",
    event: { ru: "AIROM CUP 2026", kk: "AIROM CUP 2026", en: "AIROM CUP 2026" },
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
      { place: 1, team: "KUTAISI, Кутаиси", points: 9 },
      { place: 2, team: "AIROM, Атырау", points: 8 },
      { place: 3, team: "Актуба, Красный Яр", points: 7 },
      { place: 4, team: "TELAVI, Телави", points: 6 },
      { place: 5, team: "KUTAISI-2, Кутаиси", points: 5 },
      { place: 6, team: "ДЕВОН, Альметьевск", points: 10, note: outsideCompetition },
    ],
    games: [
      { teamA: "Актуба", teamB: "AIROM", scoreA: 51, scoreB: 64 },
      { teamA: "Актуба", teamB: "TELAVI", scoreA: 69, scoreB: 58 },
      { teamA: "Актуба", teamB: "KUTAISI", scoreA: 37, scoreB: 85 },
      { teamA: "Актуба", teamB: "KUTAISI-2", scoreA: 65, scoreB: 58 },
      { teamA: "Актуба", teamB: "ДЕВОН", scoreA: 76, scoreB: 52 },
      { teamA: "AIROM", teamB: "TELAVI", scoreA: 103, scoreB: 55 },
      { teamA: "AIROM", teamB: "KUTAISI", scoreA: 37, scoreB: 65 },
      { teamA: "AIROM", teamB: "KUTAISI-2", scoreA: 68, scoreB: 55 },
      { teamA: "AIROM", teamB: "ДЕВОН", scoreA: 48, scoreB: 77 },
      { teamA: "TELAVI", teamB: "KUTAISI", scoreA: 40, scoreB: 76 },
      { teamA: "TELAVI", teamB: "KUTAISI-2", scoreA: 69, scoreB: 47 },
      { teamA: "TELAVI", teamB: "ДЕВОН", scoreA: 32, scoreB: 84 },
      { teamA: "KUTAISI", teamB: "KUTAISI-2", scoreA: 74, scoreB: 63 },
      { teamA: "KUTAISI", teamB: "ДЕВОН", scoreA: 68, scoreB: 73 },
      { teamA: "KUTAISI-2", teamB: "ДЕВОН", scoreA: 46, scoreB: 79 },
    ],
  },
  {
    id: "archive-u2008",
    collection: "archive",
    event: { ru: "AIROM CUP 2025", kk: "AIROM CUP 2025", en: "AIROM CUP 2025" },
    category: { ru: "Категория 2008 г.р.", kk: "2008 ж.т. санаты", en: "2008 age category" },
    dates: { ru: "Архивный протокол", kk: "Мұрағат хаттамасы", en: "Archive protocol" },
    format: "podium",
    standings: [
      { place: 1, team: "Барсы Атырау 2008", points: 12 },
      { place: 2, team: "Сборная Кыргызстана", points: 10 },
      { place: 3, team: "Барсы Атырау 2010", points: 7 },
      { place: 4, team: "AIROM", points: 7 },
    ],
    games: [],
    dataNote: {
      ru: "В архивном документе сохранена только итоговая таблица. Счёт отдельных матчей в исходном протоколе не указан.",
      kk: "Мұрағат құжатында тек қорытынды кесте сақталған. Бастапқы хаттамада жеке матчтардың есебі көрсетілмеген.",
      en: "The archived document contains only the final table; individual game scores were not recorded in the source protocol.",
    },
  },
  {
    id: "archive-u2009",
    collection: "archive",
    event: { ru: "AIROM CUP · Архив", kk: "AIROM CUP · Мұрағат", en: "AIROM CUP · Archive" },
    category: {
      ru: "Юноши 2009 г.р. и младше",
      kk: "2009 ж.т. және одан кіші ұлдар",
      en: "Boys born 2009 and younger",
    },
    dates: { ru: "Архивный протокол", kk: "Мұрағат хаттамасы", en: "Archive protocol" },
    format: "podium",
    standings: [
      { place: 1, team: "Эдельвейс, Бишкек", points: 12 },
      { place: 2, team: "Барсы Атырау 2009", points: 11 },
      { place: 3, team: "Сборная Казахстана 2010", points: 9 },
      { place: 4, team: "Kutaisi, Кутаиси", points: 9 },
      { place: 5, team: "СШ Девон, Альметьевск", points: 8 },
      { place: 6, team: "Airkids, Ялта", points: 8 },
      { place: 7, team: "Кандыагаш СШ5", points: 6 },
    ],
    games: [
      { teamA: "Эдельвейс", teamB: "СШ Девон", scoreA: 68, scoreB: 54 },
      { teamA: "Эдельвейс", teamB: "Airkids", scoreA: 77, scoreB: 61 },
      { teamA: "Эдельвейс", teamB: "Kutaisi", scoreA: 81, scoreB: 40 },
      { teamA: "Эдельвейс", teamB: "Сборная Казахстана 2010", scoreA: 73, scoreB: 56 },
      { teamA: "Эдельвейс", teamB: "Барсы Атырау 2009", scoreA: 71, scoreB: 66 },
      { teamA: "Эдельвейс", teamB: "Кандыагаш СШ5", scoreA: 58, scoreB: 28 },
      { teamA: "СШ Девон", teamB: "Airkids", scoreA: 81, scoreB: 57 },
      { teamA: "СШ Девон", teamB: "Kutaisi", scoreA: 42, scoreB: 43 },
      { teamA: "СШ Девон", teamB: "Сборная Казахстана 2010", scoreA: 44, scoreB: 70 },
      { teamA: "СШ Девон", teamB: "Барсы Атырау 2009", scoreA: 36, scoreB: 79 },
      { teamA: "СШ Девон", teamB: "Кандыагаш СШ5", scoreA: 50, scoreB: 38 },
      { teamA: "Airkids", teamB: "Kutaisi", scoreA: 66, scoreB: 68 },
      { teamA: "Airkids", teamB: "Сборная Казахстана 2010", scoreA: 70, scoreB: 69 },
      { teamA: "Airkids", teamB: "Барсы Атырау 2009", scoreA: 64, scoreB: 83 },
      { teamA: "Airkids", teamB: "Кандыагаш СШ5", scoreA: 72, scoreB: 48 },
      { teamA: "Kutaisi", teamB: "Сборная Казахстана 2010", scoreA: 43, scoreB: 50 },
      { teamA: "Kutaisi", teamB: "Барсы Атырау 2009", scoreA: 38, scoreB: 71 },
      { teamA: "Kutaisi", teamB: "Кандыагаш СШ5", scoreA: 78, scoreB: 46 },
      { teamA: "Сборная Казахстана 2010", teamB: "Барсы Атырау 2009", scoreA: 43, scoreB: 62 },
      { teamA: "Сборная Казахстана 2010", teamB: "Кандыагаш СШ5", scoreA: 116, scoreB: 30 },
      { teamA: "Барсы Атырау 2009", teamB: "Кандыагаш СШ5", scoreA: 76, scoreB: 33 },
    ],
  },
  {
    id: "archive-u2011",
    collection: "archive",
    event: { ru: "AIROM CUP · Архив", kk: "AIROM CUP · Мұрағат", en: "AIROM CUP · Archive" },
    category: {
      ru: "Юноши 2011 г.р. и младше",
      kk: "2011 ж.т. және одан кіші ұлдар",
      en: "Boys born 2011 and younger",
    },
    dates: { ru: "Архивный протокол", kk: "Мұрағат хаттамасы", en: "Archive protocol" },
    format: "podium",
    standings: [
      { place: 1, team: "Сборная Азербайджана", points: 10 },
      { place: 2, team: "БК «Кутаиси»", points: 9 },
      { place: 3, team: "БК «Актуба»", points: 8 },
      { place: 4, team: "БК «AIROM»", points: 7 },
      { place: 5, team: "Эдельвейс", points: 6 },
      { place: 6, team: "СШ «Девон»", points: 5 },
    ],
    games: [
      { teamA: "Сборная Азербайджана", teamB: "БК «Кутаиси»", scoreA: 94, scoreB: 13 },
      { teamA: "Сборная Азербайджана", teamB: "СШ «Девон»", scoreA: 89, scoreB: 23 },
      { teamA: "Сборная Азербайджана", teamB: "БК «AIROM»", scoreA: 89, scoreB: 32 },
      { teamA: "Сборная Азербайджана", teamB: "БК «Актуба»", scoreA: 75, scoreB: 28 },
      { teamA: "Сборная Азербайджана", teamB: "Эдельвейс", scoreA: 64, scoreB: 40 },
      { teamA: "БК «Кутаиси»", teamB: "СШ «Девон»", scoreA: 87, scoreB: 49 },
      { teamA: "БК «Кутаиси»", teamB: "БК «AIROM»", scoreA: 61, scoreB: 37 },
      { teamA: "БК «Кутаиси»", teamB: "БК «Актуба»", scoreA: 65, scoreB: 43 },
      { teamA: "БК «Кутаиси»", teamB: "Эдельвейс", scoreA: 56, scoreB: 40 },
      { teamA: "СШ «Девон»", teamB: "БК «AIROM»", scoreA: 35, scoreB: 66 },
      { teamA: "СШ «Девон»", teamB: "БК «Актуба»", scoreA: 49, scoreB: 68 },
      { teamA: "СШ «Девон»", teamB: "Эдельвейс", scoreA: 56, scoreB: 58 },
      { teamA: "БК «AIROM»", teamB: "БК «Актуба»", scoreA: 31, scoreB: 51 },
      { teamA: "БК «AIROM»", teamB: "Эдельвейс", scoreA: 72, scoreB: 44 },
      { teamA: "БК «Актуба»", teamB: "Эдельвейс", scoreA: 69, scoreB: 39 },
    ],
  },
  {
    id: "archive-u2012",
    collection: "archive",
    event: { ru: "AIROM CUP · Архив", kk: "AIROM CUP · Мұрағат", en: "AIROM CUP · Archive" },
    category: {
      ru: "Юноши 2012 г.р. и младше",
      kk: "2012 ж.т. және одан кіші ұлдар",
      en: "Boys born 2012 and younger",
    },
    dates: { ru: "Архивный протокол", kk: "Мұрағат хаттамасы", en: "Archive protocol" },
    format: "podium",
    standings: [
      { place: 1, team: "ПБК Астана", points: 10 },
      { place: 2, team: "AIROM", points: 9 },
      { place: 3, team: "Актобе ОДЮСШ №3", points: 8 },
      { place: 4, team: "BC TELAVI", points: 7 },
      { place: 5, team: "KUTAISI", points: 6 },
      { place: 6, team: "KUTAISI 36", points: 5 },
    ],
    games: [
      { teamA: "ПБК Астана", teamB: "BC TELAVI", scoreA: 83, scoreB: 39 },
      { teamA: "ПБК Астана", teamB: "AIROM", scoreA: 61, scoreB: 54 },
      { teamA: "ПБК Астана", teamB: "Актобе ОДЮСШ №3", scoreA: 66, scoreB: 25 },
      { teamA: "ПБК Астана", teamB: "KUTAISI 36", scoreA: 75, scoreB: 23 },
      { teamA: "ПБК Астана", teamB: "KUTAISI", scoreA: 94, scoreB: 34 },
      { teamA: "BC TELAVI", teamB: "AIROM", scoreA: 24, scoreB: 50 },
      { teamA: "BC TELAVI", teamB: "Актобе ОДЮСШ №3", scoreA: 53, scoreB: 56 },
      { teamA: "BC TELAVI", teamB: "KUTAISI 36", scoreA: 59, scoreB: 33 },
      { teamA: "BC TELAVI", teamB: "KUTAISI", scoreA: 62, scoreB: 44 },
      { teamA: "AIROM", teamB: "Актобе ОДЮСШ №3", scoreA: 50, scoreB: 23 },
      { teamA: "AIROM", teamB: "KUTAISI 36", scoreA: 77, scoreB: 28 },
      { teamA: "AIROM", teamB: "KUTAISI", scoreA: 74, scoreB: 29 },
      { teamA: "Актобе ОДЮСШ №3", teamB: "KUTAISI 36", scoreA: 57, scoreB: 43 },
      { teamA: "Актобе ОДЮСШ №3", teamB: "KUTAISI", scoreA: 60, scoreB: 25 },
      { teamA: "KUTAISI 36", teamB: "KUTAISI", scoreA: 39, scoreB: 50 },
    ],
  },
  {
    id: "archive-final-group",
    collection: "archive",
    event: {
      ru: "AIROM CUP · Итоговая группа",
      kk: "AIROM CUP · Қорытынды топ",
      en: "AIROM CUP · Final group",
    },
    category: { ru: "Итоговый протокол", kk: "Қорытынды хаттама", en: "Final protocol" },
    dates: { ru: "Архив турнира", kk: "Турнир мұрағаты", en: "Tournament archive" },
    format: "podium",
    standings: [
      { place: 1, team: "Azerbaijan", points: 12 },
      { place: 2, team: "AIROM", points: 10 },
      { place: 3, team: "МБУ ДО №2, Волгоград", points: 8 },
      { place: 4, team: "AUYL SPORT", points: 6 },
    ],
    games: [
      { teamA: "AIROM", teamB: "AUYL SPORT", scoreA: 59, scoreB: 54 },
      { teamA: "AIROM", teamB: "AUYL SPORT", scoreA: 56, scoreB: 48 },
      { teamA: "AIROM", teamB: "Azerbaijan", scoreA: 43, scoreB: 78 },
      { teamA: "AIROM", teamB: "Azerbaijan", scoreA: 32, scoreB: 68 },
      { teamA: "AIROM", teamB: "МБУ ДО №2, Волгоград", scoreA: 55, scoreB: 50 },
      { teamA: "AIROM", teamB: "МБУ ДО №2, Волгоград", scoreA: 65, scoreB: 58 },
      { teamA: "AUYL SPORT", teamB: "Azerbaijan", scoreA: 32, scoreB: 72 },
      { teamA: "AUYL SPORT", teamB: "Azerbaijan", scoreA: 39, scoreB: 59 },
      { teamA: "AUYL SPORT", teamB: "МБУ ДО №2, Волгоград", scoreA: 39, scoreB: 87 },
      { teamA: "AUYL SPORT", teamB: "МБУ ДО №2, Волгоград", scoreA: 30, scoreB: 62 },
      { teamA: "Azerbaijan", teamB: "МБУ ДО №2, Волгоград", scoreA: 67, scoreB: 38 },
      { teamA: "Azerbaijan", teamB: "МБУ ДО №2, Волгоград", scoreA: 58, scoreB: 47 },
    ],
  },
];
