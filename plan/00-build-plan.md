# Build Plan — Test Prep & Upkeep

> **What this repo is:** a small, personal, local-only **React** study tool with two "tracks":
> 1. **`aws-saa`** — AWS Solutions Architect Associate (SAA-C03) multiple-choice quiz.
> 2. **`dsa`** — Data Structures & Algorithms code practice (test-based grading), added later.
>
> **Guiding principle:** keep it SUPER simple. Get a basic version running end-to-end, then improve one piece at a time. React + Vite on the front end, scores in the browser's `localStorage`. No database. A backend (`server/`) is added only if we ever truly need one.
>
> Live progress and problems are tracked in **`tracker.md`**. This file is the stable plan.

---

## The big picture

One engine pattern, reused by both tracks:

```
  pick content  ->  ask / run  ->  grade  ->  show score  ->  save to localStorage
```

- The **AWS track** asks multiple-choice questions and grades by comparing chosen option ids to the correct set.
- The **DSA track** (later) runs your solution against test cases and grades pass/fail. Two different correct solutions both pass the same tests — that is how we get "correct for both ways."

Both tracks reuse the same attempt/score shape so progress tracking is identical.

---

## Language & stack strategy

- **Phase 1–5: JavaScript + React only.** All UI in React (Vite), all logic in plain JS. Scores in `localStorage`. Minimal dependencies (React + the Vite/ESLint toolchain).
- **Phase 6+: add Dart/Flutter** for the DSA track, sharing the same test definitions. Flutter *UI* exercises are a separate optional stretch — different from solving algorithms in Dart.
- **Backend is optional.** If we ever want scores as real files on disk or shared across devices, we add a `server/` directory then. Not before.

---

## Build order (we finish AWS first, then DSA)

| Order | Phase | Track | Outcome |
|-------|-------|-------|---------|
| 1 | **Phase 0 — Scaffold** | both | Vite React app in `client/`, builds and lints clean |
| 2 | **Phase 1 — AWS MVP** | aws-saa | One section, single-answer, take quiz, see score, saved to localStorage |
| 3 | **Phase 2 — AWS full quiz** | aws-saa | All 4 sections authored, multi-select, weighted Overall Test, weak-section report |
| 4 | **Phase 3 — AWS polish** | aws-saa | Content validator, richer progress/history view, grow question bank, optional timer |
| 5 | **Phase 4 — DSA MVP** | dsa | One JS problem, run solution vs tests, pass/fail saved |
| 6 | **Phase 5 — DSA expansion** | dsa | More problems/topics, hidden tests, timing/attempts scoring |
| 7 | **Phase 6 — Dart/Flutter** | dsa | Dart runner sharing the same tests; (optional) Flutter widget exercises |
| 8 | **Phase 7 — Backend (maybe)** | both | `server/` API + file persistence, only if localStorage is ever outgrown |

> We do not start a phase until the previous one feels good to use.

---

## Phase 0 — Scaffold ✅ (reference)

Goal: a React app that builds.

- Vite React app created in `client/` (`react`, `react-dom`, Vite, ESLint).
- Folder structure from `01-architecture.md` (`content/`, `engine/`, `components/`).
- Theme + global styles.

**Done when:** `npm run build` and `npm run lint` succeed in `client/`.

---

## Phase 1 — AWS MVP (first real milestone)

Goal: take a real quiz in the browser and see a score saved.

1. Author one section (`d1-secure.data.js`) with single-answer questions.
2. `engine/select.js` — shuffle + pick questions.
3. `engine/score.js` — grade, compute %, per-section, pass/fail.
4. `engine/storage.js` — save/load attempts in `localStorage`.
5. `components/` — Home (choose mode), Quiz (one question at a time), Results (score + answer review).

**Done when:** I can run the dev server, take the Domain 1 review, get a % score and answer review, and see my attempt persist after a refresh.

**Deliberately minimal:** single-answer only (multi-select is wired in the UI but unused until content needs it); other 3 sections are placeholders.

---

## Phase 2 — AWS full quiz

1. Author Domains 2–4 (target sizes in `aws-saa-reference.md`).
2. Add multi-select questions and confirm all-or-nothing grading end-to-end.
3. Overall Test draws across sections by weight (already implemented) — validate with full content.
4. Strengthen the Results weak-section report now that multiple sections have data.
5. Consider a "full mock" length option (up to 65).

**Done when:** a full mock gives a pass/fail call plus a meaningful "study these sections" list across all four domains.

---

## Phase 3 — AWS polish

- **Content validator** script: every question well-formed (correct ids exist in options; single has exactly one correct; unique ids).
- Richer progress view (history list, per-section trend).
- Optional exam timer; "flag for review"; avoid repeating recently-seen questions.
- Grow the bank toward target sizes.

---

## Phase 4 — DSA MVP

1. Define problem format (`problem.js` + `tests.js`) under `content/dsa/`.
2. Author one problem (e.g. `arrays/two-sum`).
3. Runner imports a solution, runs it against tests, deep-compares outputs, scores pass/fail, saves in the shared shape.
4. Show two different solutions both passing.

**Done when:** a correct solution reports all tests pass, and a second different implementation also passes.

---

## Phase 5 — DSA expansion

- More problems grouped by topic; hidden/edge-case tests.
- Scoring beyond pass/fail: time-to-solve, attempts, optional self-rating.

---

## Phase 6 — Dart / Flutter

- Dart runner executing a Dart solution against the same tests (exported to a language-neutral form).
- Results record the language used.
- (Stretch) Flutter widget exercises graded by widget tests.

---

## Phase 7 — Backend (only if wanted)

- `server/` (e.g. small Express app) to persist scores as JSON files on disk or sync across devices.
- Client gains an optional API data source; localStorage stays the default/fallback.

---

## Things that are easy to forget (handled on purpose)

Details in `01-architecture.md`; kept visible here:

1. Stable question IDs (attempts reference them forever).
2. Grade by option **id**, not position (so we can shuffle).
3. Shuffle questions and options every run.
4. Multi-select = all-or-nothing (matches the real exam).
5. Authored content (`.js`) vs generated scores (JSON in localStorage) are different on purpose.
6. Defensive localStorage reads (corrupt/empty storage never crashes).
7. Clamp question counts to what exists.
8. Content validation (Phase 3) to catch authoring typos.
9. Re-check SAA-C03 currency; refresh content if SAA-C04 launches (see reference doc).

---

## Definition of "basic version operational"

> Open the app, take a short AWS quiz, get a percentage score with answer explanations, and have that attempt saved locally so it's still there after a refresh.

Everything else is improvement on top of that.
