import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
import ExcelJS from "exceljs";

function load(path, imports = {}) {
  const compiled = ts.transpileModule(readFileSync(new URL(path, import.meta.url), "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  });
  const exports = {};
  new Function("exports", "require", compiled.outputText)(exports, (name) => {
    assert.ok(name in imports, `Unexpected runtime import: ${name}`);
    return imports[name];
  });
  return exports;
}
const calendar = load("../src/data/tournaments.ts");
const helpers = load("../src/lib/adminApplications.ts", { "@/data/tournaments": calendar });
const { cupYear, filterApplications, emptyFilters } = helpers;
const base = {
  id: "12345678-1234-1234-1234-123456789012", created_at: "2026-09-16T10:00:00Z", status: "new", mode: "tournament",
  tournament_title: "AIROM CUP", tournament_id: calendar.tournaments[3].id,
  team_name: "Тестовая команда", country: "Казахстан", city: "Атырау", gender: "boys", birth_year: "2015",
  preferred_year: null, preferred_periods: [], custom_dates: null, comment: "Проверка\nПеренос строки",
  contact_name: "Тестовый тренер", phone: "+7 000 000 0000", email: "test@example.com",
};

test("cup year comes from current calendar, not legacy ID or birth year", () => {
  assert.match(base.tournament_id, /dec-2026/);
  assert.equal(cupYear(base), "2027");
  assert.equal(cupYear({ ...base, tournament_id: "unknown" }), "Не указан");
  assert.equal(cupYear({ ...base, mode: "custom", preferred_year: "2028" }), "2028");
  assert.equal(cupYear({ ...base, mode: "custom", preferred_year: "flexible" }), "Любой год");
});
test("search and filters combine across all records, preserve input and sort deterministically", () => {
  const rows = [base, { ...base, id: "2", team_name: "Альфа", birth_year: "2013", tournament_id: calendar.tournaments[0].id },
    { ...base, id: "3", team_name: "Бета", mode: "custom", tournament_id: null, preferred_year: "2027", status: "approved", created_at: "2026-09-15T10:00:00Z" }];
  const filters = { ...emptyFilters, search: "  ТЕСТОВАЯ   атырау ", year: "2027", birthYear: "2015", mode: "tournament", status: "new", tournament: base.tournament_id };
  assert.deepEqual(filterApplications(rows, filters).map((r) => r.id), [base.id]);
  assert.deepEqual(filterApplications(rows, { ...emptyFilters, sort: "team" }).map((r) => r.team_name), ["Альфа", "Бета", "Тестовая команда"]);
  assert.equal(filterApplications(rows, { ...emptyFilters, sort: "oldest" })[0].id, "3");
  assert.equal(filterApplications(rows, { ...emptyFilters, search: "not-found" }).length, 0);
  assert.equal(rows[0].id, base.id);
});

test("Excel round trip preserves every filtered row, Cyrillic, phones and literal formula-like text", async () => {
  const { buildApplicationsWorkbook } = load("../src/lib/exportApplications.ts", { exceljs: ExcelJS, "./adminApplications": helpers });
  const rows = Array.from({ length: 31 }, (_, i) => ({ ...base, id: String(i + 1), team_name: i === 0 ? '=HYPERLINK("https://example.com")' : `Команда ${i}` }));
  const buffer = await buildApplicationsWorkbook(rows);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer);
  const sheet = workbook.getWorksheet("Заявки");
  assert.equal(sheet.rowCount, 32);
  assert.equal(sheet.getCell("I2").value, "2027");
  assert.equal(sheet.getCell("D2").type, ExcelJS.ValueType.String);
  assert.equal(sheet.getCell("D2").value, rows[0].team_name);
  assert.equal(sheet.getCell("M2").value, base.phone);
  assert.equal(sheet.getCell("P2").value, base.comment);
  assert.equal(sheet.views[0].ySplit, 1);
});

function auth(user, error = null) {
  return load("../src/lib/adminAuth.ts", { "@/lib/supabase/server": { createClient: async () => ({ auth: { getUser: async () => ({ data: { user }, error }) } }) } });
}
test("admin identity rejects missing, wrong, expired and revoked sessions", async () => {
  const original = process.env.ADMIN_EMAIL;
  try {
    process.env.ADMIN_EMAIL = "ADMIN@example.com";
    assert.equal(await auth({ email: "admin@example.com" }).getAdminEmail(), "admin@example.com");
    assert.equal(await auth({ email: "other@example.com" }).getAdminEmail(), null);
    assert.equal(await auth(null).getAdminEmail(), null);
    assert.equal(await auth({ email: "admin@example.com" }, new Error("revoked")).getAdminEmail(), null);
    delete process.env.ADMIN_EMAIL;
    assert.equal(await auth({ email: "admin@example.com" }).getAdminEmail(), null);
  } finally { if (original === undefined) delete process.env.ADMIN_EMAIL; else process.env.ADMIN_EMAIL = original; }
});
function deletion(allowed, response = { data: { id: base.id }, error: null }) {
  const calls = [];
  const refreshed = [];
  const db = { from(table) { assert.equal(table, "applications"); return { delete() { return { eq(key, id) {
    calls.push({ key, id }); return { select() { return { maybeSingle: async () => response }; } };
  } }; } }; } };
  const actions = load("../src/app/admin/actions.ts", {
    "next/navigation": { redirect() {} }, "next/cache": { revalidatePath: (path) => refreshed.push(path) },
    "@/lib/supabase/server": {}, "@/lib/adminAuth": { getAdminEmail: async () => allowed ? "admin@example.com" : null },
    "@/lib/supabaseAdmin": { supabaseAdmin: db },
  });
  return { ...actions, calls, refreshed };
}
test("unauthorized deletion and malformed IDs never reach the database", async () => {
  const unauthorized = deletion(false);
  assert.equal((await unauthorized.deleteApplication(base.id)).ok, false);
  assert.equal(unauthorized.calls.length, 0);
  const authorized = deletion(true);
  for (const id of ["", "id=1", null, {}, "1 OR true"]) assert.equal((await authorized.deleteApplication(id)).ok, false);
  assert.equal(authorized.calls.length, 0);
});
test("authorized delete targets exactly one ID and refreshes the admin list", async () => {
  const api = deletion(true);
  assert.equal((await api.deleteApplication(base.id)).ok, true);
  assert.deepEqual(api.calls, [{ key: "id", id: base.id }]);
  assert.deepEqual(api.refreshed, ["/admin"]);
});
test("failed delete is visible and never reports success; repeat delete refreshes stale list", async () => {
  const failed = deletion(true, { data: null, error: { code: "unavailable" } });
  assert.equal((await failed.deleteApplication(base.id)).ok, false);
  assert.equal(failed.refreshed.length, 0);
  const alreadyGone = deletion(true, { data: null, error: null });
  assert.equal((await alreadyGone.deleteApplication(base.id)).ok, true);
  assert.equal(alreadyGone.refreshed.length, 1);
});
test("load continues beyond PostgREST cap and rejects partial results on error", async () => {
  const allRows = Array.from({ length: 1005 }, (_, i) => ({ ...base, id: String(i + 1) }));
  const ranges = [];
  function loader(fail = false) {
    const query = { select() { return this; }, order() { return this; }, async range(from, to) {
      ranges.push([from, to]);
      return fail && from > 0 ? { error: new Error("offline"), data: null } : { data: allRows.slice(from, to + 1), error: null };
    } };
    return load("../src/lib/loadAdminApplications.ts", { "@/lib/supabaseAdmin": { supabaseAdmin: { from: () => query } } });
  }
  assert.equal((await loader().loadAdminApplications()).length, 1005);
  assert.deepEqual(ranges.at(-1), [1000, 1249]);
  await assert.rejects(loader(true).loadAdminApplications(), /Could not load/);
});
