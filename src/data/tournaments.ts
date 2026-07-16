export type TeamCategory = "boys" | "girls";

export type Tournament = {
  id: string;

  title: string;

  allowedCategories: TeamCategory[];
  categoryLabel: string;

  age: string;

  eligibleBirthYears: string[];

  dates: string;

  location: string;

  badge: string;

  isActive: boolean;
};

export const tournaments: Tournament[] = [
  {
    id: "airom-cup-2013-2014-oct-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys", "girls"],

    categoryLabel: "ЮНОШИ · ДЕВУШКИ",

    age: "2013–2014 Г.Р.",

    eligibleBirthYears: ["2013", "2014"],

    dates: "ОКТЯБРЬ 2026",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "ОКТЯБРЬ 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2012-2013-nov-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys", "girls"],

    categoryLabel: "ЮНОШИ · ДЕВУШКИ",

    age: "2012–2013 Г.Р.",

    eligibleBirthYears: ["2012", "2013"],

    dates: "НОЯБРЬ 2026",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "НОЯБРЬ 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2014-2015-nov-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys", "girls"],

    categoryLabel: "ЮНОШИ · ДЕВУШКИ",

    age: "2014–2015 Г.Р.",

    eligibleBirthYears: ["2014", "2015"],

    dates: "НОЯБРЬ 2026",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "НОЯБРЬ 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2015-2016-dec-2026",

    title: "AIROM CUP",

    allowedCategories: ["boys", "girls"],

    categoryLabel: "ЮНОШИ · ДЕВУШКИ",

    age: "2015–2016 Г.Р.",

    eligibleBirthYears: ["2015", "2016"],

    dates: "ДЕКАБРЬ 2026",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "ДЕКАБРЬ 2026",

    isActive: true,
  },

  {
    id: "airom-cup-2011-2012-mar-2027",

    title: "AIROM CUP",

    allowedCategories: ["boys", "girls"],

    categoryLabel: "ЮНОШИ · ДЕВУШКИ",

    age: "2011–2012 Г.Р.",

    eligibleBirthYears: ["2011", "2012"],

    dates: "МАРТ 2027",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "МАРТ 2027",

    isActive: true,
  },
];