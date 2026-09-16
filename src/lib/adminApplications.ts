import { tournaments } from "@/data/tournaments";

export type ApplicationRow = {
  id: string; created_at: string; status: string; mode: "tournament" | "custom";
  tournament_title: string | null; tournament_id: string | null;
  team_name: string; country: string; city: string; gender: "boys" | "girls"; birth_year: string;
  preferred_year: string | null; preferred_periods: string[] | null;
  custom_dates: string | null; comment: string | null;
  contact_name: string; phone: string; email: string;
};
export const statusLabels: Record<string, string> = {
  new: "Новая", contacted: "Связались", approved: "Принята", rejected: "Отклонена",
};
const periodLabels: Record<string, string> = {
  "jan-feb": "Январь — февраль", "mar-apr": "Март — апрель", "may-jun": "Май — июнь",
  "jul-aug": "Июль — август", "sep-oct": "Сентябрь — октябрь", "nov-dec": "Ноябрь — декабрь",
};
export function cupYear(row: ApplicationRow): string {
  if (row.mode === "custom") return row.preferred_year === "flexible" ? "Любой год" : row.preferred_year || "Не указан";
  // IDs retain original dates for compatibility. The calendar defines the actual cup year.
  return tournaments.find((event) => event.id === row.tournament_id)?.year || "Не указан";
}
export function applicationPeriod(row: ApplicationRow): string {
  if (row.mode === "tournament") return tournaments.find((event) => event.id === row.tournament_id)?.dates || "Не указан";
  return [...(row.preferred_periods ?? []).map((period) => periodLabels[period] ?? period), row.custom_dates].filter(Boolean).join(" · ") || "Не указан";
}
export function formatApplicationDate(value: string): string {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Atyrau",
  }).format(new Date(value));
}
export type ApplicationFilters = {
  search: string; mode: string; year: string; birthYear: string; status: string; tournament: string;
  sort: "newest" | "oldest" | "team" | "birthYear" | "year";
};
export const emptyFilters: ApplicationFilters = {
  search: "", mode: "", year: "", birthYear: "", status: "", tournament: "", sort: "newest",
};
export function filterApplications(rows: ApplicationRow[], filters: ApplicationFilters): ApplicationRow[] {
  const words = filters.search.trim().toLocaleLowerCase("ru").split(/\s+/).filter(Boolean);
  const filtered = rows.filter((row) => {
    if (filters.mode && row.mode !== filters.mode) return false;
    if (filters.year && cupYear(row) !== filters.year) return false;
    if (filters.birthYear && String(row.birth_year) !== filters.birthYear) return false;
    if (filters.status && row.status !== filters.status) return false;
    if (filters.tournament && row.tournament_id !== filters.tournament) return false;
    const text = [row.team_name, row.country, row.city, row.contact_name, row.phone, row.email].join(" ").toLocaleLowerCase("ru");
    return words.every((word) => text.includes(word));
  });
  const compareText = (a: string, b: string) => a.localeCompare(b, "ru", { numeric: true });
  return filtered.sort((a, b) => {
    const dateOrder = b.created_at.localeCompare(a.created_at) || compareText(String(a.id), String(b.id));
    switch (filters.sort) {
      case "oldest": return -dateOrder;
      case "team": return compareText(a.team_name, b.team_name) || dateOrder;
      case "birthYear": return compareText(String(a.birth_year), String(b.birth_year)) || dateOrder;
      case "year": return compareText(cupYear(a), cupYear(b)) || dateOrder;
      default: return dateOrder;
    }
  });
}
export type DeleteApplicationResult = { ok: boolean; message: string };
