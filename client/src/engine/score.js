// Scoring + weakness analysis. Pure functions, no React.
import { sectionByKey } from "../content/aws-saa/sections.js";

export const PASS_THRESHOLD = 72; // % — maps to the real exam's 720/1000
export const REVIEW_TARGET = 75; // % — personal mastery target for reviews
const WEAK_SECTION_THRESHOLD = 70; // % — a section below this is "weak"

// A question is correct only if the selected option ids exactly match the
// correct set (all-or-nothing — matches the real SAA-C03 exam).
export function gradeQuestion(question, selectedIds) {
  const correct = [...question.correct].sort();
  const selected = [...selectedIds].sort();
  return (
    correct.length === selected.length &&
    correct.every((id, i) => id === selected[i])
  );
}

// Build a full attempt record.
// answers: { [questionId]: string[] }
export function scoreAttempt({ mode, section, reviewId, questions, answers }) {
  const questionResults = questions.map((q) => {
    const selected = answers[q.id] ?? [];
    return {
      questionId: q.id,
      section: q.section,
      correct: gradeQuestion(q, selected),
      selected,
    };
  });

  const correctCount = questionResults.filter((r) => r.correct).length;
  const total = questions.length;
  const percent = total === 0 ? 0 : Math.round((correctCount / total) * 100);

  const perSection = {};
  for (const r of questionResults) {
    perSection[r.section] ??= { total: 0, correct: 0 };
    perSection[r.section].total += 1;
    if (r.correct) perSection[r.section].correct += 1;
  }
  for (const key of Object.keys(perSection)) {
    const s = perSection[key];
    s.percent = s.total === 0 ? 0 : Math.round((s.correct / s.total) * 100);
    s.name = sectionByKey[key]?.name ?? key;
  }

  const weakSections = Object.entries(perSection)
    .filter(([, s]) => s.percent < WEAK_SECTION_THRESHOLD)
    .sort((a, b) => a[1].percent - b[1].percent)
    .map(([key]) => key);

  const target = mode === "overall" ? PASS_THRESHOLD : REVIEW_TARGET;

  return {
    id: String(Date.now()),
    track: "aws-saa",
    mode,
    section: section ?? null,
    reviewId: reviewId ?? null,
    timestamp: new Date().toISOString(),
    totalQuestions: total,
    correctCount,
    percent,
    target,
    passLikely: percent >= target,
    perSection,
    weakSections,
    questionResults,
  };
}
