// Local persistence via the browser's localStorage.
// This is the "local storage on my own machine" with no server and no database.
// Attempts are the single source of truth; summary stats are derived on read.
//
// Keys are namespaced per track, e.g. "tpu:aws-saa:attempts", "tpu:dsa:attempts".

const keyFor = (track) => `tpu:${track}:attempts`;
const uiKeyFor = (track) => `tpu:${track}:ui`;

export function loadAttempts(track) {
  try {
    const raw = localStorage.getItem(keyFor(track));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Per-track UI prefs (difficulty filter, etc.). Survives leaving a problem
// and switching away to another header tab.
export function loadUiPrefs(track) {
  try {
    const raw = localStorage.getItem(uiKeyFor(track));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveUiPrefs(track, prefs) {
  const next = { ...loadUiPrefs(track), ...prefs };
  localStorage.setItem(uiKeyFor(track), JSON.stringify(next));
  return next;
}

export function saveAttempt(track, attempt) {
  const all = loadAttempts(track);
  all.push(attempt);
  localStorage.setItem(keyFor(track), JSON.stringify(all));
  return all;
}

export function clearAttempts(track) {
  localStorage.removeItem(keyFor(track));
}

// latest/best/average for a list of attempts. Attempts are stored in
// chronological order, so the last element is the most recent.
function statsFor(list) {
  if (list.length === 0) {
    return { attempts: 0, latest: null, best: null, average: null };
  }
  const pcts = list.map((a) => a.percent);
  return {
    attempts: list.length,
    latest: pcts[pcts.length - 1],
    best: Math.max(...pcts),
    average: Math.round(pcts.reduce((sum, p) => sum + p, 0) / pcts.length),
  };
}

// Derived stats for the home screen.
// - `overall` aggregates only Overall Test (mock) attempts.
// - `bySection` aggregates only Section Review attempts, keyed by section.
export function summarize(attempts) {
  const overallAttempts = attempts.filter((a) => a.mode === "overall");
  const reviewAttempts = attempts.filter((a) => a.mode !== "overall");

  return {
    totalAttempts: attempts.length,
    overallCount: overallAttempts.length,
    sectionReviewCount: reviewAttempts.length,
    overall: statsFor(overallAttempts),
  };
}
