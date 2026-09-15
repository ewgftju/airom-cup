export type TeamCategory = "boys" | "girls";

export type Tournament = {
  id: string;

  title: string;

  allowedCategories: TeamCategory[];
  categoryLabel: string;

  age: string;

  eligibleBirthYears: string[];

  dates: string;

  year: string;

  status: string;

  location: string;

  badge: string;

  isActive: boolean;
};

export const tournaments: Tournament[] = [
  {
    id: "airom-cup-2013-2014-oct-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2013–2014 Г.Р.",

    eligibleBirthYears: ["2013", "2014"],

    dates: "30 ОКТЯБРЯ — 1 НОЯБРЯ",

    year: "2026",

    status: "ИГРОВЫЕ ДНИ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "30 ОКТ — 1 НОЯ · 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2012-2013-nov-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2012–2013 Г.Р.",

    eligibleBirthYears: ["2012", "2013"],

    dates: "16–18 НОЯБРЯ",

    year: "2026",

    status: "ИГРОВЫЕ ДНИ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "16–18 НОЯ · 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2014-2015-nov-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2014–2015 Г.Р.",

    eligibleBirthYears: ["2014", "2015"],

    dates: "23–25 НОЯБРЯ",

    year: "2026",

    status: "ИГРОВЫЕ ДНИ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "23–25 НОЯ · 2026",

    isActive: true,
  },

  {
    // Keep the original ID so existing applications and shared links stay valid.
    id: "airom-cup-2015-2016-dec-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2015–2016 Г.Р.",

    eligibleBirthYears: ["2015", "2016"],

    dates: "ФЕВРАЛЬ",

    year: "2027",

    status: "ДАТА УТОЧНЯЕТСЯ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "ФЕВРАЛЬ · 2027",

    isActive: true,
  },

  {
    id: "airom-cup-2011-2012-mar-2027",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2011–2012 Г.Р.",

    eligibleBirthYears: ["2011", "2012"],

    dates: "МАРТ",

    year: "2027",

    status: "ДАТА УТОЧНЯЕТСЯ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "МАРТ · 2027",

    isActive: true,
  },
];
