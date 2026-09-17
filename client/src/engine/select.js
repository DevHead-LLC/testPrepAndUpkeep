// Question selection + shuffling. Pure functions, no React.

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Returns a copy of a question with its options shuffled.
// Correctness is keyed by option id, so shuffling is safe.
export function shuffleOptions(question) {
  return { ...question, options: shuffle(question.options) };
}

function patternGroupKey(question) {
  return question.exerciseId ?? question.options.find((option) => question.correct.includes(option.id)).text;
}

export function patternRoundSize(questions) {
  return new Set(questions.map(patternGroupKey)).size;
}

// Pick one wording variant per exercise, even when several share an answer label.
export function pickPatternRound(questions) {
  const groups = new Map();
  for (const question of questions) {
    const answer = patternGroupKey(question);
    if (!groups.has(answer)) groups.set(answer, []);
    groups.get(answer).push(question);
  }
  return shuffle([...groups.values()].map((variants) => shuffle(variants)[0])).map(shuffleOptions);
}

// Pick up to n questions from a single section, shuffled.
export function pickForSection(allQuestions, sectionKey, n) {
  const pool = allQuestions.filter((q) => q.section === sectionKey);
  return shuffle(pool)
    .slice(0, Math.min(n, pool.length))
    .map(shuffleOptions);
}

// Pick up to n questions across all sections, distributed by exam weight.
// Clamps to whatever questions actually exist so it never over-asks.
export function pickOverall(allQuestions, sections, n) {
  const chosen = [];
  const usedIds = new Set();

  for (const section of sections) {
    const target = Math.round(section.weight * n);
    const pool = shuffle(
      allQuestions.filter((q) => q.section === section.key),
    );
    for (const q of pool.slice(0, target)) {
      chosen.push(q);
      usedIds.add(q.id);
    }
  }

  // Fill any remainder (from rounding / empty sections) with leftovers.
  if (chosen.length < n) {
    const leftovers = shuffle(
      allQuestions.filter((q) => !usedIds.has(q.id)),
    );
    for (const q of leftovers) {
      if (chosen.length >= n) break;
      chosen.push(q);
      usedIds.add(q.id);
    }
  }

  // Rounded per-section targets can sum to slightly more than n, so cap it.
  return shuffle(chosen).slice(0, n).map(shuffleOptions);
}
