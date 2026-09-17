# Architecture & Data Plan

> How the app is built, how files are organized, and what the data looks like.
> **Stack:** React (Vite). **Persistence:** browser `localStorage` (no database, no server).
> Progress/state is tracked separately in `tracker.md`; this file is the stable "how it's built" reference.

---

## Two core ideas

1. **Track:** a subject area. We have two planned: `aws-saa` (AWS SAA-C03 quiz) and `dsa` (Data Structures & Algorithms, later). Each track owns its content but reuses the same engine helpers and the same attempt/score shape.
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

```
testPrepAndUpkeep/
├── README.md                  # entry point
├── tracker.md                 # living progress + rules + problems log
├── .gitignore                 # ignores node_modules, build output
│
├── plan/                      # planning docs
│   ├── 00-build-plan.md        # phases + order
│   ├── 01-architecture.md      # this file
│   └── aws-saa-reference.md    # SAA-C03 exam research
│
├── client/                    # the React app (Vite) — the product
│   ├── index.html
│   ├── package.json            # type: module; deps: react, react-dom; dev: vite, eslint
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── public/
│   └── src/
│       ├── main.jsx            # React entry
│       ├── App.jsx             # screen state machine (home | quiz | results)
│       ├── App.css             # component styles
│       ├── index.css           # theme tokens + global styles
│       ├── content/            # AUTHORED study material (.js modules)
│       │   └── aws-saa/
│       │       ├── sections.js           # section registry (key, name, weight)
│       │       ├── index.js              # aggregates all sections
│       │       ├── d1-secure.data.js     # Domain 1 questions
│       │       ├── d2-resilient.data.js  # (placeholder)
│       │       ├── d3-high-performing.data.js
│       │       └── d4-cost-optimized.data.js
│       ├── engine/             # pure logic, no React
│       │   ├── select.js       # shuffle + pick questions
│       │   ├── score.js        # grading + weak-section analysis
│       │   └── storage.js      # localStorage read/write + derived stats
│       └── components/
│           ├── Home.jsx        # choose Overall Test / Section Review + progress
│           ├── Quiz.jsx        # one question at a time, select + advance
│           └── Results.jsx     # score, pass/fail, per-section, answer review
│
└── server/                    # (FUTURE, optional) API + file persistence — only if needed
```

**Why this shape:** `content/` (what I study), `engine/` (logic), `components/` (UI) are cleanly separated, so content and logic can be tested/grown without touching the UI. The track name is always the folder under `content/`, so AWS and DSA never collide and adding DSA later is obvious.

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

### DSA (implemented in Phase 4)

DSA problems live in a single `client/src/content/dsa/problems.js`, each with `{ id, topic, title, difficulty, fnName, prompt, starter, tests: [{ input, expected }] }` (`input` is the array of function arguments). The user writes a JS function in an in-app editor; it is graded by running it against the tests in a **Web Worker** (`engine/dsa/worker.js`, launched via `engine/dsa/runner.js` with a 3s timeout so infinite loops can be killed). Grading uses a recursive `deepEqual`, so **any** implementation returning the expected outputs passes — two different correct approaches both score correct. DSA attempts are stored under `tpu:dsa:attempts`. A Dart/Flutter runner is planned (Phase 6) sharing the same test data.

> Note: this is simpler than the originally sketched per-folder `problem.js`/`tests.js` layout — a single problems file is enough at this scale and easy to split later.

### App shell & tracks

`App.jsx` is a thin shell: a header with track tabs (AWS SAA ⇄ Algorithms) that renders one of two orchestrators — `tracks/AwsTrack.jsx` (home/quiz/results) or `tracks/DsaTrack.jsx` (problem list / solve screen).

---

## Decisions locked in

| Decision | Choice | Why |
|----------|--------|-----|
| UI framework | **React via Vite** | Requested; fast, simple, no heavy config |
| Language | **JavaScript / JSX** | "JavaScript first for everything" |
| Persistence | **`localStorage`** | Local, no server, no DB |
| Server | **Deferred** to a future `server/` dir | Only if scores-as-files or cross-device is wanted |
| Routing | **In-app screen state** (no router lib) | Three screens; a library is overkill |
| State mgmt | **`useState` in `App`** | Small app; no Redux/context needed yet |
| Dependencies | **Only React + Vite/ESLint toolchain** | Keep the surface small |
| Content format | **`.js` modules** | Hand-authored, comments allowed |
| Score format | **JSON in localStorage** | Easy, safe runtime serialization |
| First track | **`aws-saa`** | Finish before starting DSA |
| First question type | **single-answer** | Smallest end-to-end slice (multi-select wired but unused until Phase 2) |
| Grading key | **option ids (sets)** | Enables shuffling; unifies single + multi |
| Multi-select grading | **all-or-nothing** | Matches real SAA-C03 |
| Pass threshold | **72%** | Maps to 720/1000 |

---

## Things handled on purpose (easy to forget)

1. **Stable question IDs** — attempts reference them forever.
2. **Grade by option id, not position** — so shuffling is safe.
3. **Shuffle questions and options** every run (`select.js`).
4. **Multi-select = all-or-nothing** (no partial credit).
5. **localStorage reads are defensive** — wrapped in try/catch so corrupt/empty storage never crashes the app.
6. **Counts are clamped** — asking for more questions than exist just returns what exists (no crash, no duplicates).
7. **Weighted overall selection with remainder fill** — empty sections don't break the draw.
8. **Content validation** — a future script to verify each question is well-formed (correct ids exist, single has exactly one correct). Planned for Phase 3.
9. **`.gitignore`** covers `node_modules` and build output; scores are in the browser, not git.
