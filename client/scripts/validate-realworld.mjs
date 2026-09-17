import assert from "node:assert/strict";
import { problems } from "../src/content/realworld/problems.js";
import { redteamProblems, FAILURE_LABELS } from "../src/content/realworld/redteam.data.js";
import { tipsByProblemId } from "../src/content/realworld/tips.js";
import { evaluateSolution } from "../src/engine/dsa/evaluate.js";

const FAILURE_MODES = Object.keys(FAILURE_LABELS);

assert.equal(new Set(problems.map((p) => p.id)).size, problems.length, "Duplicate Real World ids");

for (const p of problems) {
  const label = `${p.id}: `;
  for (const field of ["id", "title", "topic", "prompt", "starter"]) {
    assert(typeof p[field] === "string" && p[field].trim(), label + field);
  }
  assert(["easy", "medium", "hard"].includes(p.difficulty), label + "difficulty");
  assert([undefined, "function", "design"].includes(p.kind), label + "kind");
  const name = p.kind === "design" ? p.className : p.fnName;
  assert(/^[A-Za-z_$][\w$]*$/.test(name), label + "callable name");
  assert(p.starter.includes(name), label + "starter signature");
  assert(p.tests.length && p.tests.some((t) => !t.hidden), label + "visible tests");
  for (const t of p.tests) {
    assert(Object.hasOwn(t, "expected"), label + "expected output");
    if (p.kind === "design") {
      assert.equal(t.ops[0], p.className, label + "constructor");
      assert.equal(t.ops.length, t.args.length, label + "operation arguments");
      assert.equal(t.ops.length, t.expected.length, label + "operation outputs");
    } else assert(Array.isArray(t.input), label + "function arguments");
  }
}

for (const p of redteamProblems) {
  const label = `${p.id}: `;
  assert.equal(p.mode, "redteam", label + "mode");
  assert.equal(p.topic, "AI Red Team", label + "topic");
  assert(FAILURE_MODES.includes(p.failureMode), label + "failureMode");
  assert(typeof p.modelClaim === "string" && p.modelClaim.trim(), label + "modelClaim");
  assert(p.tests.some((t) => t.hidden), label + "hidden cases");
  const tips = tipsByProblemId[p.id];
  assert(tips?.steps.length >= 3 && tips.steps.every((s) => typeof s === "string" && s.trim()), label + "tips");
  for (const field of ["solution", "time", "space"]) {
    assert(typeof tips[field] === "string" && tips[field].trim(), label + field);
  }

  const fix = evaluateSolution({ ...p, source: tips.solution });
  assert(!fix.compileError && !fix.error, label + (fix.compileError || fix.error || "fix run"));
  assert(fix.results.every((r) => r.pass), label + "reference must pass all tests");

  const raw = evaluateSolution({ ...p, source: p.starter });
  assert(raw.results.some((r) => !r.pass), label + "model starter must fail at least one test");

  if (p.failureMode === "faked-tests") {
    const visible = p.tests.filter((t) => !t.hidden);
    const sample = evaluateSolution({ ...p, source: p.starter, tests: visible });
    assert(sample.results.every((r) => r.pass), label + "faked-tests starter should pass visible samples");
  }
}

console.log(
  `Validated ${problems.length} Real World problems (${redteamProblems.length} AI red-team drills).`,
);
