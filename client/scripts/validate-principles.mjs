import assert from "node:assert/strict";
import {
  principleQuestions,
  principleBanks,
  difficultyLabels,
  questionsForDifficulty,
} from "../src/content/principles/questions.data.js";

const ids = new Set();
assert.equal(principleQuestions.length, 30, "Expected 10 easy + 10 medium + 10 hard");

for (const q of principleQuestions) {
  assert.ok(q.id, "missing id");
  assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
  ids.add(q.id);

  assert.ok(difficultyLabels[q.difficulty], `${q.id}: bad difficulty`);
  assert.equal(q.type, "single", `${q.id}: type must be single`);
  assert.ok(typeof q.prompt === "string" && q.prompt.length > 0, `${q.id}: prompt`);
  assert.ok(typeof q.snippet === "string" && q.snippet.length > 0, `${q.id}: snippet`);
  assert.ok(Array.isArray(q.options) && q.options.length === 4, `${q.id}: need 4 options`);
  assert.ok(Array.isArray(q.correct) && q.correct.length === 1, `${q.id}: one correct id`);
  assert.ok(typeof q.explanation === "string" && q.explanation.length > 0, `${q.id}: explanation`);

  const optionIds = q.options.map((o) => o.id);
  assert.equal(new Set(optionIds).size, 4, `${q.id}: unique option ids`);
  assert.ok(optionIds.includes(q.correct[0]), `${q.id}: correct id not in options`);
  for (const o of q.options) {
    assert.ok(o.text && o.text.length > 0, `${q.id}: empty option text`);
  }
}

for (const difficulty of Object.keys(difficultyLabels)) {
  const qs = questionsForDifficulty(difficulty);
  assert.equal(qs.length, 10, `${difficulty} should have 10 questions`);
}

assert.equal(principleBanks.length, 3);
for (const bank of principleBanks) {
  assert.equal(bank.questions.length, 10, `${bank.key} size`);
  assert.ok(bank.key.startsWith("principles:"));
}

console.log(
  "Validated %d principles questions across %d banks. ✅",
  principleQuestions.length,
  principleBanks.length,
);
