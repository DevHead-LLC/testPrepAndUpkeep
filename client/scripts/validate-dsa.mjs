import assert from "node:assert/strict";
import { problems, problemById } from "../src/content/dsa/problems.js";
import { tipsByProblemId } from "../src/content/dsa/tips.js";
import { patternQuestions } from "../src/content/dsa/patterns.data.js";
import { patternExerciseIds } from "../src/content/dsa/coverage.data.js";
import { expansionProblems } from "../src/content/dsa/expansion.data.js";
import { triggerQuestions } from "../src/content/dsa/triggers.data.js";

assert.equal(new Set(problems.map((p) => p.id)).size, problems.length, "Duplicate exercise ids");
assert.deepEqual(new Set(Object.keys(patternExerciseIds)), new Set(patternQuestions.map((q) => q.id)));
assert.deepEqual(new Set(Object.values(patternExerciseIds)), new Set(problems.map((p) => p.id)), "Every coding exercise needs quiz coverage");
assert.equal(Object.values(patternExerciseIds).length, problems.length, "One recognition question per exercise");
for (const question of patternQuestions) {
  assert.equal(question.exerciseId, patternExerciseIds[question.id]);
  assert(question.mentalTrigger?.trim(), `${question.id}: needs a mental trigger`);
  const triggers = triggerQuestions.filter((q) => q.exerciseId === question.exerciseId);
  assert.equal(triggers.length, 3, `${question.exerciseId}: needs three trigger variants`);
  const answer = (q) => q.options.find((o) => q.correct.includes(o.id)).text;
  assert(triggers.every((q) => answer(q) === answer(question)), `${question.exerciseId}: mismatched technique labels`);
}
assert.deepEqual(new Set(triggerQuestions.map((q) => q.exerciseId)), new Set(problems.map((p) => p.id)), "Trigger coverage must match coding exercises");
for (const [pattern, id] of Object.entries(patternExerciseIds)) {
  assert(problemById[id], `${pattern} needs a coding exercise`);
}
for (const p of problems) {
  const label = `${p.id}: `;
  for (const field of ["id", "title", "topic", "prompt", "starter"]) {
    assert(typeof p[field] === "string" && p[field].trim(), label + field);
  }
  assert(["easy", "medium", "hard"].includes(p.difficulty), label + "difficulty");
  assert([undefined, "function", "design"].includes(p.kind), label + "kind");
  assert([undefined, "binary-tree", "linked-list", "linked-list-cycle"].includes(p.inputKind), label + "inputKind");
  assert([undefined, "unordered", "topological-order", "mutated-first-arg"].includes(p.outputKind), label + "outputKind");
  const name = p.kind === "design" ? p.className : p.fnName;
  assert(/^[A-Za-z_$][\w$]*$/.test(name), label + "callable name");
  assert(p.starter.includes(name), label + "starter signature");
  assert(p.tests.length && p.tests.some((t) => !t.hidden), label + "visible tests");
  if (expansionProblems.includes(p)) {
    assert(p.tests.filter((t) => !t.hidden).length >= 2, label + "examples");
    assert(p.tests.some((t) => t.hidden), label + "hidden edge cases");
  }
  for (const t of p.tests) {
    assert(Object.hasOwn(t, "expected"), label + "expected output");
    if (p.kind === "design") {
      assert.equal(t.ops[0], p.className, label + "constructor");
      assert.equal(t.ops.length, t.args.length, label + "operation arguments");
      assert.equal(t.ops.length, t.expected.length, label + "operation outputs");
      assert(t.args.every(Array.isArray), label + "arguments must be arrays");
    } else assert(Array.isArray(t.input), label + "function arguments");
  }
  const tips = tipsByProblemId[p.id];
  assert(tips?.steps.length >= 3 && tips.steps.every((s) => typeof s === "string" && s.trim()), label + "progressive tips");
  for (const field of ["solution", "time", "space"]) {
    assert(typeof tips[field] === "string" && tips[field].trim(), label + field);
  }
}
console.log(`Validated ${problems.length} DSA exercises with tips, examples, named recognition questions, and three trigger variants each.`);
