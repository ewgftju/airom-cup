export type TeamCategory = "boys" | "girls";

export type Tournament = {
  id: string;

  title: string;

  allowedCategories: TeamCategory[];
  categoryLabel: string;

  age: string;

  eligibleBirthYears: string[];

  dates: string;

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

    dates: "30 ОКТЯБРЯ — 1 НОЯБРЯ 2026",

    status: "ИГРОВЫЕ ДНИ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "30 ОКТ — 1 НОЯ 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2012-2013-nov-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2012–2013 Г.Р.",

    eligibleBirthYears: ["2012", "2013"],

    dates: "16–18 НОЯБРЯ 2026",

    status: "ИГРОВЫЕ ДНИ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "16–18 НОЯ 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2014-2015-nov-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2014–2015 Г.Р.",

    eligibleBirthYears: ["2014", "2015"],

    dates: "23–25 НОЯБРЯ 2026",

    status: "ИГРОВЫЕ ДНИ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "23–25 НОЯ 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2015-2016-dec-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2015–2016 Г.Р.",

    eligibleBirthYears: ["2015", "2016"],

    dates: "ДЕКАБРЬ 2026",

    status: "СНЯТ С КАЛЕНДАРЯ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "ДЕКАБРЬ 2026",

    isActive: false,
  },

  {
    id: "airom-cup-2011-2012-mar-2027",

    title: "AIROM CUP",

    allowedCategories: ["boys"],

    categoryLabel: "ЮНОШИ",

    age: "2011 Г.Р.",

    eligibleBirthYears: ["2011"],

    dates: "МАРТ 2027",

    status: "ДАТА УТОЧНЯЕТСЯ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "МАРТ 2027",

    isActive: true,
  },
];
