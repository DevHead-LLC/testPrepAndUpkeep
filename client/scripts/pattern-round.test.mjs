import test from "node:test";
import assert from "node:assert/strict";
import { patternQuestions } from "../src/content/dsa/patterns.data.js";
import { triggerQuestions } from "../src/content/dsa/triggers.data.js";
import { pickPatternRound, patternRoundSize } from "../src/engine/select.js";
import { problems } from "../src/content/dsa/problems.js";
import { gradeQuestion } from "../src/engine/score.js";
import { patternBanks, patternReview, difficultyLabels } from "../src/content/dsa/quizzes.js";

const answer = (q) => q.options.find((o) => q.correct.includes(o.id)).text;

test("difficulty reviews partition both full quizzes and keep separate progress keys", () => {
  const keys = new Set();
  for (const bank of patternBanks) {
    const full = patternReview(bank);
    assert.equal(full.key, bank.key);
    assert.equal(full.questions, bank.questions);
    keys.add(full.key);
    const covered = new Set();
    for (const difficulty of Object.keys(difficultyLabels)) {
      const review = patternReview(bank, difficulty);
      const expected = problems.filter((p) => p.difficulty === difficulty).map((p) => p.id);
      const round = pickPatternRound(review.questions);
      assert.equal(round.length, expected.length);
      assert.deepEqual(new Set(round.map((q) => q.exerciseId)), new Set(expected));
      assert(review.title.includes(difficultyLabels[difficulty]));
      assert(!keys.has(review.key));
      keys.add(review.key);
      for (const q of review.questions) {
        assert(!covered.has(q.id));
        covered.add(q.id);
      }
    }
    assert.deepEqual(covered, new Set(bank.questions.map((q) => q.id)));
  }
  assert.equal(keys.size, 8);
  const easy = patternReview(patternBanks[0], "easy");
  const medium = patternReview(patternBanks[0], "medium");
  assert(!easy.questions.some((q) => q.exerciseId === "dsa-move-zeroes"));
  assert(medium.questions.some((q) => q.exerciseId === "dsa-move-zeroes"));
});

test("each trigger round covers every coding exercise exactly once without mutating content", () => {
  const before = JSON.stringify(triggerQuestions);
  const expected = new Set(problems.map((p) => p.id));
  for (let i = 0; i < 20; i++) {
    const round = pickPatternRound(triggerQuestions);
    assert.equal(round.length, problems.length);
    assert.equal(patternRoundSize(triggerQuestions), problems.length);
    assert.deepEqual(new Set(round.map((q) => q.exerciseId)), expected);
    assert.equal(new Set(round.map((q) => q.id)).size, problems.length);
    for (const q of round) {
      assert(gradeQuestion(q, q.correct));
      assert(!gradeQuestion(q, []));
      for (const option of q.options.filter((o) => !q.correct.includes(o.id))) {
        assert(!gradeQuestion(q, [option.id]));
      }
    }
  }
  assert.equal(JSON.stringify(triggerQuestions), before);
});

test("all three wording variants can be selected for each pattern", () => {
  const originalRandom = Math.random;
  const selected = new Set();
  try {
    // Controlled shuffles select each of the three entries, without flaky sampling.
    for (const value of [0, 0.4, 0.999]) {
      Math.random = () => value;
      for (const q of pickPatternRound(triggerQuestions)) selected.add(q.id);
    }
  } finally {
    Math.random = originalRandom;
  }
  assert.equal(selected.size, triggerQuestions.length);
});

test("shared technique names do not hide separate coding exercises", () => {
  const round = pickPatternRound(triggerQuestions);
  const twoPointers = patternQuestions.filter((q) => answer(q) === "Two Pointers");
  assert(twoPointers.length > 1);
  for (const question of twoPointers) assert(round.some((q) => q.exerciseId === question.exerciseId));
  assert.equal(patternRoundSize(patternQuestions), problems.length);
});

test("original rounds retain every question and empty banks yield empty rounds", () => {
  assert.deepEqual(
    new Set(pickPatternRound(patternQuestions).map((q) => q.id)),
    new Set(patternQuestions.map((q) => q.id)),
  );
  assert.deepEqual(pickPatternRound([]), []);
});
