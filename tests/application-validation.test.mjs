import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

// The pure validator has no runtime imports; use the project's TypeScript compiler.
const source = readFileSync(new URL("../src/lib/applicationValidation.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
const moduleExports = {};
new Function("exports", compiled.outputText)(moduleExports);
const { isApplicationRequest } = moduleExports;

function application() {
  return {
    mode: "tournament", tournament: { id: "test", title: "AIROM CUP" },
    team: { name: "Test team", country: "Kazakhstan", city: "Atyrau", gender: "boys", birthYear: "2013" },
    preferredTiming: null,
    contact: { name: "Test coach", phone: "+7 700 000 0000", email: "test@example.com", comment: "" },
    consentAccepted: true,
  };
}

test("accepts a complete tournament application", () => assert.equal(isApplicationRequest(application()), true));
test("accepts custom dates or periods, including a flexible year", () => {
  for (const timing of [
    { year: "2027", periods: [], customDates: "15–25 июня" },
    { year: "flexible", periods: ["nov-dec"], customDates: "" },
  ]) assert.equal(isApplicationRequest({ ...application(), mode: "custom", tournament: null, preferredTiming: timing }), true);
});
test("rejects malformed input without throwing", () => {
  for (const value of [null, [], {}, 42, "text", { ...application(), team: { name: 123 } }, { ...application(), contact: { phone: [] } }]) {
    assert.equal(isApplicationRequest(value), false);
  }
});
test("rejects blank or invalid required fields", () => {
  for (const [field, value] of [["name", " "], ["country", 1], ["birthYear", "abc"]]) {
    const input = application(); input.team[field] = value;
    assert.equal(isApplicationRequest(input), false);
  }
  for (const [field, value] of [["name", "A"], ["phone", "123"], ["email", "invalid"], ["comment", {}]]) {
    const input = application(); input.contact[field] = value;
    assert.equal(isApplicationRequest(input), false);
  }
  assert.equal(isApplicationRequest({ ...application(), consentAccepted: false }), false);
});
test("custom applications require a year and timing", () => {
  for (const timing of [null, { year: "", periods: ["nov-dec"], customDates: "" }, { year: "2027", periods: [], customDates: "" }]) {
    assert.equal(isApplicationRequest({ ...application(), mode: "custom", tournament: null, preferredTiming: timing }), false);
  }
});
