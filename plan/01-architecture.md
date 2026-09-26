# Architecture & Data Plan

> How the app is built, how files are organized, and what the data looks like.
> **Stack:** React (Vite). **Persistence:** browser `localStorage` (no database, no server).
> The directory layout and track list below reflect the current app. Later sections also retain the original data shapes and design decisions as implementation history.

---

## Two core ideas

1. **Track:** a practice area. The app has `aws-saa` (certification questions), `dsa` (JavaScript coding), `dsa-patterns` (pattern recognition quizzes), and `realworld` (applied JavaScript and code review). DSA and Real World share a coding track and worker-based runner; AWS and DSA Patterns use quiz components.
2. **Authored vs generated data:**
   - **Authored content** (questions) → `.js` modules using `export`. Hand-written, comments allowed, imported at build time by Vite.
   - **Generated data** (scores/attempts) → JSON in **`localStorage`**. The app reads/writes it at runtime. This is the "use my own local machine for local storage" requirement, met with zero backend.

---

## Why React + localStorage (and not a Node CLI or a database)

- **React** is what we want the UI in, and Vite gives a fast dev server and a simple build.
- **localStorage** keeps scores on the local machine, per browser, with no server and no database. It is the simplest thing that fully satisfies persistence.
- **A server is optional and deferred.** We only add a `server/` directory if we later want scores as real files on disk or shared across browsers/devices. The repo is structured so that can be bolted on without disrupting the client.

---

## Directory layout

```text
testPrepAndUpkeep/
├── README.md                 # public setup and project overview
├── LICENSE
├── plan/                     # engineering and content references
│   ├── 00-build-plan.md       # original implementation sequence
│   ├── 01-architecture.md     # this file
│   ├── aws-saa-reference.md   # exam reference and sources
│   └── dsa-pattern-coverage.md
└── client/                   # React + Vite application
    ├── package.json          # dev, build, lint, validation, and test scripts
    ├── scripts/              # content and runner checks
    └── src/
        ├── App.jsx           # four practice tabs and hash navigation
        ├── tracks/           # AWS, shared coding, and pattern quiz screens
        ├── content/          # authored AWS, DSA, and Real World practice data
        ├── engine/           # grading, selection, storage, routing, and code runner
        └── components/       # quiz, results, review, and coding UI
```

Authored content lives in JavaScript modules; attempts and UI preferences are saved in browser `localStorage`. The code-practice runner executes submissions in a Web Worker with a timeout. There is no application backend or account system.

---

## Naming conventions (locked in)

| Thing | Convention | Example |
|-------|-----------|---------|
| Track key | lowercase, hyphenated | `aws-saa`, `dsa` |
| AWS section key | `dN-shortname` | `d1-secure`, `d3-high-performing` |
| AWS content file | `<section-key>.data.js` | `d1-secure.data.js` |
| Section registry | `sections.js` | — |
| Question ID | `<track-short>-<section>-<3digit>` | `saa-d1-001` |
| Engine modules | verb/noun, `.js`, no JSX | `score.js`, `select.js` |
| Components | PascalCase `.jsx` | `Quiz.jsx` |
| localStorage key | `tpu:<track>:<thing>` | `tpu:aws-saa:attempts` |

Rule: **IDs never change once created.** Add new ones; never renumber. Saved attempts reference IDs permanently.

---

## Data shapes

### Section registry — `content/aws-saa/sections.js`

```js
export const sections = [
  { key: "d1-secure",          name: "Design Secure Architectures",          weight: 0.30 },
  { key: "d2-resilient",       name: "Design Resilient Architectures",       weight: 0.26 },
  { key: "d3-high-performing", name: "Design High-Performing Architectures", weight: 0.24 },
  { key: "d4-cost-optimized",  name: "Design Cost-Optimized Architectures",  weight: 0.20 },
];
```

### Question — entry in a `*.data.js` file

```js
{
  id: "saa-d1-001",
  section: "d1-secure",          // matches a section key
  type: "single",                // "single" or "multi"
  prompt: "A company needs ... Which solution is MOST secure?",
  options: [
    { id: "a", text: "..." },
    { id: "b", text: "..." },
    { id: "c", text: "..." },
    { id: "d", text: "..." },
  ],
  correct: ["b"],                // ALWAYS an array of option ids
  explanation: "Why b is right and the others are not.",
  difficulty: "medium",          // easy | medium | hard
  services: ["iam", "sts"],      // optional tags
}
```

- `correct` is an **array of option ids** so single- and multi-select share one grading path.
- Grading compares **sets of option ids**, so we shuffle option order freely.
- `type: "multi"` → grade **all-or-nothing** (chosen set must equal `correct`).

### Attempt record — stored in `localStorage` under `tpu:aws-saa:attempts` (a JSON array)

```json
{
  "id": "1719085800000",
  "track": "aws-saa",
  "mode": "section",
  "section": "d1-secure",
  "timestamp": "2026-06-22T20:30:00.000Z",
  "totalQuestions": 10,
  "correctCount": 8,
  "percent": 80,
  "passLikely": true,
  "perSection": { "d1-secure": { "total": 10, "correct": 8, "percent": 80, "name": "Design Secure Architectures" } },
  "weakSections": [],
  "questionResults": [
    { "questionId": "saa-d1-001", "section": "d1-secure", "correct": true,  "selected": ["b"] }
  ]
}
```

- `mode`: `"section"` or `"overall"`. Section mode sets `section`; overall mode sets `section: null` and fills all sections in `perSection`.
- `passLikely` = `percent >= 72`.
- **Summary stats are derived on read** (see `engine/storage.js → summarize`), not stored separately. Attempts are the single source of truth. (This is a deliberate simplification over the earlier "summary.json" idea, which suited file storage; for localStorage, deriving is cleaner.)

### DSA coding (current)

DSA problems are aggregated in `client/src/content/dsa/problems.js`; additional exercises live in `expansion.data.js`. Function problems define a name and cases with `{ input, expected }`; design problems replay method operations. User code runs in a **Web Worker** (`engine/dsa/worker.js` via `engine/dsa/runner.js`) with a timeout. Any implementation returning the expected outputs passes. Attempts are stored under `tpu:dsa:attempts`.

> The original per-folder `problem.js`/`tests.js` proposal was replaced with an aggregated problem bank.

### App shell & tracks

`App.jsx` renders four practice tabs: `AwsTrack` for AWS quizzes, a shared `CodeTrack` for DSA and Real World challenges, and `PatternTrack` for DSA pattern quizzes. Hash navigation preserves the selected track and coding problem.

---

## Decisions locked in

| Decision | Choice | Why |
|----------|--------|-----|
| UI framework | **React via Vite** | Requested; fast, simple, no heavy config |
| Language | **JavaScript / JSX** | "JavaScript first for everything" |
| Persistence | **`localStorage`** | Local, no server, no DB |
| Server | **Deferred** to a future `server/` dir | Only if scores-as-files or cross-device is wanted |
| Routing | **URL hash + in-app state** (no router lib) | Retains track and coding problem without another dependency |
| State mgmt | **React local state** | No global state library needed |
| Dependencies | **React, Vite/ESLint, and Acorn tooling** | UI, builds, linting, and code editing/evaluation |
| Content format | **`.js` modules** | Hand-authored, comments allowed |
| Score format | **JSON in localStorage** | Easy, safe runtime serialization |
| First track | **`aws-saa`** | Finish before starting DSA |
| First question type | **single-answer** | Smallest end-to-end slice (multi-select wired but unused until Phase 2) |
| Grading key | **option ids (sets)** | Enables shuffling; unifies single + multi |
| Multi-select grading | **all-or-nothing** | Matches real SAA-C03 |
| AWS targets | **72% overall; 75% section review** | Separate mock-exam and focused-practice targets |

---

## Things handled on purpose (easy to forget)

1. **Stable question IDs** — attempts reference them forever.
2. **Grade by option id, not position** — so shuffling is safe.
3. **Shuffle questions and options** every run (`select.js`).
4. **Multi-select = all-or-nothing** (no partial credit).
5. **localStorage reads are defensive** — wrapped in try/catch so corrupt/empty storage never crashes the app.
6. **Counts are clamped** — asking for more questions than exist just returns what exists (no crash, no duplicates).
7. **Weighted overall selection with remainder fill** — empty sections don't break the draw.
8. **Content validation** — `npm run validate` checks authored practice content; the root README lists the other available checks.
9. **`.gitignore`** covers `node_modules` and build output; scores are in the browser, not git.
