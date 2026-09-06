export type ApplicationRequest = {
  mode: "tournament" | "custom";
  tournament: { id: string; title: string } | null;
  team: { name: string; country: string; city: string; gender: "boys" | "girls"; birthYear: string };
  preferredTiming: { year: string; periods: string[]; customDates: string } | null;
  contact: { name: string; phone: string; email: string; comment: string };
  consentAccepted: boolean;
};

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

// Validate the same required fields as the form before accessing string methods.
export function isApplicationRequest(value: unknown): value is ApplicationRequest {
  if (!record(value) || !["tournament", "custom"].includes(String(value.mode))) return false;
  const { team, contact, preferredTiming, tournament } = value;
  if (!record(team) || !record(contact)) return false;
  if (![team.name, team.country, team.city].every(text)) return false;
  if (team.gender !== "boys" && team.gender !== "girls") return false;
  if (typeof team.birthYear !== "string" || !/^\d{4}$/.test(team.birthYear)) return false;
  if (!text(contact.name) || contact.name.trim().length < 2) return false;
  if (!text(contact.phone) || contact.phone.replace(/\D/g, "").length < 10) return false;
  if (!text(contact.email) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) return false;
  if (typeof contact.comment !== "string" || value.consentAccepted !== true) return false;
  if (value.mode === "tournament") {
    return record(tournament) && text(tournament.id) && text(tournament.title) && preferredTiming === null;
  }
  if (tournament !== null || !record(preferredTiming)) return false;
  if (typeof preferredTiming.year !== "string" || !/^(?:\d{4}|flexible)$/.test(preferredTiming.year)) return false;
  if (!Array.isArray(preferredTiming.periods) || !preferredTiming.periods.every(text)) return false;
  if (typeof preferredTiming.customDates !== "string") return false;
  return preferredTiming.periods.length > 0 || preferredTiming.customDates.trim().length >= 3;
}
