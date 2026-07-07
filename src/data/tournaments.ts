export type Tournament = {
  id: string;

  title: string;

  category: "boys" | "girls";
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
    id: "airom-cup-next",

    title: "AIROM CUP",

    category: "girls",

    categoryLabel: "ДЕВУШКИ",

    age: "2011 Г.Р. И МЛАДШЕ",

    eligibleBirthYears: [
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
    ],

    dates: "ДАТЫ УКАЖЕМ ПОЗЖЕ",

    location: "АТЫРАУ · КАЗАХСТАН",

    badge: "БЛИЖАЙШИЙ ТУРНИР",

    isActive: true,
  },
];