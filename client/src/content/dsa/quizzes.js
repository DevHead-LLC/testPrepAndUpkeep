import { patternQuestions } from "./patterns.data.js";
import { triggerQuestions } from "./triggers.data.js";
import { problemById } from "./problems.js";

export const difficultyLabels = { easy: "Easy", medium: "Medium", hard: "Hard" };

// Correct answer label from Problem Recognition — the DS / algorithm name for each exercise.
export const techniqueByExerciseId = Object.fromEntries(
  patternQuestions.map((q) => {
    const answer = q.options.find((o) => q.correct.includes(o.id));
    return [q.exerciseId, answer.text];
  }),
);

export const patternBanks = [
  {
    key: "dsa-patterns",
    title: "Problem Recognition",
    questions: patternQuestions,
    intro: "Recognize the best data structure or technique for each coding exercise.",
  },
  {
    key: "dsa-triggers",
    title: "Trigger Practice",
    questions: triggerQuestions,
    intro: "Practice mental triggers through new clues and situations. Each test picks one of three variations per included exercise.",
  },
];

export function patternReview(bank, difficulty = "all") {
  if (difficulty !== "all" && !difficultyLabels[difficulty]) throw new Error(`Unknown difficulty: ${difficulty}`);
  return {
    ...bank,
    difficulty,
    // Preserve existing full-test storage; focused drills use separate keys.
    key: difficulty === "all" ? bank.key : `${bank.key}:${difficulty}`,
    title: `${bank.title} — ${difficultyLabels[difficulty] ?? "Full Test"}`,
    questions: difficulty === "all"
      ? bank.questions
      : bank.questions.filter((question) => problemById[question.exerciseId].difficulty === difficulty),
  };
}
