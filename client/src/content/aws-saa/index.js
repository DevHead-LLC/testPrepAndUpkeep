// Aggregates the AWS SAA question bank from all section files.
import { sections, sectionByKey } from "./sections.js";
import { questions as d1 } from "./d1-secure.data.js";
import { questions as d2 } from "./d2-resilient.data.js";
import { questions as d3 } from "./d3-high-performing.data.js";
import { questions as d4 } from "./d4-cost-optimized.data.js";

export const allQuestions = [...d1, ...d2, ...d3, ...d4];

export function questionsForSection(sectionKey) {
  return allQuestions.filter((q) => q.section === sectionKey);
}

export function sectionCounts() {
  return Object.fromEntries(
    sections.map((s) => [s.key, questionsForSection(s.key).length]),
  );
}

export { sections, sectionByKey };
