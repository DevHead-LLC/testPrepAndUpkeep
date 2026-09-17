// Validates the question bank so authoring mistakes are caught early.
// Run with: npm run validate
//
// Checks per question: well-formed shape, unique ids, valid section,
// option ids unique, `correct` ids all exist, single has exactly one
// correct answer, multi has two or more.

import { allQuestions, sections } from "../src/content/aws-saa/index.js";
import { subtopicById } from "../src/content/aws-saa/topics.js";
import { patternQuestions } from "../src/content/dsa/patterns.data.js";
import { triggerQuestions } from "../src/content/dsa/triggers.data.js";

const dsaQuestions = [...patternQuestions, ...triggerQuestions];
const patternLabels = new Set(patternQuestions.flatMap((q) =>
  q.options.filter((o) => q.correct.includes(o.id)).map((o) => o.text),
));

const sectionKeys = new Set(sections.map((s) => s.key));
const seenIds = new Set();
const errors = [];

function err(id, message) {
  errors.push(`  [${id ?? "?"}] ${message}`);
}

for (const q of [...allQuestions, ...dsaQuestions]) {
  const id = q.id;
  const isPattern = dsaQuestions.includes(q);

  if (!id || typeof id !== "string") {
    err(id, "missing or non-string id");
    continue;
  }
  if (seenIds.has(id)) err(id, "duplicate id");
  seenIds.add(id);

  if (!isPattern && !sectionKeys.has(q.section)) err(id, `unknown section "${q.section}"`);
  if (isPattern && (q.type !== "single" || q.options?.length !== 4))
    err(id, "pattern questions require exactly four options and single-answer type");
  if (q.subtopic && !subtopicById[q.subtopic])
    err(id, `unknown subtopic "${q.subtopic}"`);
  if (q.type !== "single" && q.type !== "multi")
    err(id, `type must be "single" or "multi" (got "${q.type}")`);
  if (!q.prompt || typeof q.prompt !== "string") err(id, "missing prompt");
  if (!q.explanation || typeof q.explanation !== "string")
    err(id, "missing explanation");

  if (!Array.isArray(q.options) || q.options.length < 2) {
    err(id, "must have at least 2 options");
    continue;
  }

  const optionIds = q.options.map((o) => o.id);
  if (isPattern && new Set(q.options.map((o) => o.text)).size !== 4)
    err(id, "pattern options must have four distinct labels");
  if (new Set(optionIds).size !== optionIds.length)
    err(id, "duplicate option ids");
  for (const o of q.options) {
    if (!o.id || !o.text) err(id, "an option is missing id or text");
    if (isPattern && !patternLabels.has(o.text)) err(id, `unknown pattern label "${o.text}"`);
  }

  if (!Array.isArray(q.correct) || q.correct.length === 0) {
    err(id, "missing correct answers");
    continue;
  }
  for (const c of q.correct) {
    if (!optionIds.includes(c))
      err(id, `correct id "${c}" is not one of the options`);
  }
  if (new Set(q.correct).size !== q.correct.length)
    err(id, "duplicate ids in correct");

  if (q.type === "single" && q.correct.length !== 1)
    err(id, `single-answer must have exactly 1 correct (got ${q.correct.length})`);
  if (q.type === "multi" && q.correct.length < 2)
    err(id, `multi must have 2 or more correct (got ${q.correct.length})`);
}

const triggerLabels = new Set(triggerQuestions.flatMap((q) =>
  (q.options ?? []).filter((o) => q.correct?.includes(o.id)).map((o) => o.text),
));
for (const label of patternLabels) {
  if (!triggerLabels.has(label)) err("triggers", `missing questions for "${label}"`);
}

const perSection = Object.fromEntries(
  sections.map((s) => [
    s.key,
    allQuestions.filter((q) => q.section === s.key).length,
  ]),
);

console.log(`Validated ${allQuestions.length} questions across ${sections.length} sections.`);
console.log(`Validated ${patternQuestions.length} DSA pattern questions.`);
console.log(`Validated ${triggerQuestions.length} DSA trigger questions covering ${triggerLabels.size} patterns.`);
for (const s of sections) {
  console.log(`  ${s.key.padEnd(20)} ${perSection[s.key]} questions`);
}

if (errors.length > 0) {
  console.error(`\n${errors.length} problem(s) found:`);
  console.error(errors.join("\n"));
  process.exit(1);
} else {
  console.log("\nAll questions valid. ✅");
}
