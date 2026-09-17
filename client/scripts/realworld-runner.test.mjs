import test from "node:test";
import assert from "node:assert/strict";
import { problems } from "../src/content/realworld/problems.js";
import { redteamProblems } from "../src/content/realworld/redteam.data.js";
import { tipsByProblemId } from "../src/content/realworld/tips.js";
import { evaluateSolution } from "../src/engine/dsa/evaluate.js";

function run(problem, source, tests) {
  return evaluateSolution({ ...problem, source, tests: tests ?? problem.tests });
}

function assertPasses(result, id) {
  assert(!result.compileError && !result.error && !result.timedOut, `${id}: ${JSON.stringify(result)}`);
  assert(result.results.length > 0, id);
  assert(
    result.results.every((r) => r.pass),
    `${id}: ${JSON.stringify(result.results.filter((r) => !r.pass))}`,
  );
}

test("AI red-team reference fixes pass visible and hidden cases", () => {
  const before = JSON.stringify(redteamProblems);
  for (const problem of redteamProblems) {
    assertPasses(run(problem, tipsByProblemId[problem.id].solution), problem.id);
  }
  assert.equal(JSON.stringify(redteamProblems), before);
});

test("AI red-team model starters fail at least one case", () => {
  for (const problem of redteamProblems) {
    const result = run(problem, problem.starter);
    assert(result.results.some((r) => !r.pass), problem.id);
  }
});

test("faked-test starters pass the visible samples the model optimized for", () => {
  for (const problem of redteamProblems.filter((p) => p.failureMode === "faked-tests")) {
    const visible = problem.tests.filter((t) => !t.hidden);
    assertPasses(run(problem, problem.starter, visible), problem.id);
  }
});

test("Real World problem ids stay unique across the combined bank", () => {
  assert.equal(new Set(problems.map((p) => p.id)).size, problems.length);
});
