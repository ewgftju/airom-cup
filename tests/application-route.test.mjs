import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function loadTypeScript(path, imports = {}) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  const exports = {};
  new Function("exports", "require", compiled.outputText)(exports, (name) => {
    assert.ok(name in imports, `Unexpected runtime import: ${name}`);
    return imports[name];
  });
  return exports;
}

const validation = loadTypeScript("../src/lib/applicationValidation.ts");
const calendar = loadTypeScript("../src/data/tournaments.ts");
const firstEvent = calendar.tournaments[0];
function input() {
  return {
    mode: "tournament", tournament: { id: firstEvent.id, title: "Client supplied title" },
    team: { name: "Test", country: "Kazakhstan", city: "Atyrau", gender: "boys", birthYear: "2013" },
    preferredTiming: null, contact: { name: "Test coach", phone: "+7 700 000 0000", email: "TEST@example.com", comment: "" },
    consentAccepted: true,
  };
}
function endpoint(responses = [{ data: { id: "test-id" }, error: null }]) {
  const records = [];
  const supabaseAdmin = { from(table) {
    assert.equal(table, "applications");
    return { insert(record) {
      records.push(record);
      return { select() { return { async single() { return responses[Math.min(records.length - 1, responses.length - 1)]; } }; } };
    } };
  } };
  const { POST } = loadTypeScript("../src/app/api/applications/route.ts", {
    "@/lib/supabaseAdmin": { supabaseAdmin }, "@/lib/applicationValidation": validation, "@/data/tournaments": calendar,
  });
  return { records, send: (body) => POST(new Request("https://example.com/api/applications", { method: "POST", body })) };
}

test("malformed JSON and unknown tournaments return 400 without an insert", async () => {
  const api = endpoint();
  for (const value of ["{", "null", JSON.stringify({ ...input(), tournament: { id: "missing", title: "Test" } })]) {
    assert.equal((await api.send(value)).status, 400);
  }
  assert.equal(api.records.length, 0);
});
test("saves the canonical tournament and normalized email", async () => {
  const api = endpoint();
  assert.equal((await api.send(JSON.stringify(input()))).status, 201);
  assert.equal(api.records.length, 1);
  assert.equal(api.records[0].tournament_title, firstEvent.title);
  assert.equal(api.records[0].tournament_id, firstEvent.id);
  assert.equal(api.records[0].email, "test@example.com");
});
test("out-of-category birth years do not reach the database", async () => {
  const api = endpoint(); const body = input(); body.team.birthYear = "2016";
  assert.equal((await api.send(JSON.stringify(body))).status, 400);
  assert.equal(api.records.length, 0);
});
test("custom year and dates are preserved", async () => {
  const api = endpoint();
  const body = { ...input(), mode: "custom", tournament: null, preferredTiming: { year: "2028", periods: [], customDates: "15–25 июня" } };
  assert.equal((await api.send(JSON.stringify(body))).status, 201);
  assert.equal(api.records[0].preferred_year, "2028");
  assert.equal(api.records[0].custom_dates, "15–25 июня");
  assert.equal(api.records[0].tournament_id, null);
});
test("only confirmed DNS failures are retried", async () => {
  const api = endpoint([{ data: null, error: { code: "ENOTFOUND" } }, { data: { id: "test-id" }, error: null }]);
  assert.equal((await api.send(JSON.stringify(input()))).status, 201);
  assert.equal(api.records.length, 2);
  const rejected = endpoint([{ data: null, error: { code: "23505", message: "Duplicate" } }]);
  assert.equal((await rejected.send(JSON.stringify(input()))).status, 500);
  assert.equal(rejected.records.length, 1);
});
