import { useEffect, useState } from "react";
import { loadAttempts, clearAttempts, loadUiPrefs, saveUiPrefs } from "../../engine/storage.js";
import { problemHref } from "../../engine/route.js";
import { FAILURE_LABELS } from "../../content/realworld/redteam.data.js";

const DIFFICULTY_RANK = { easy: 0, medium: 1, hard: 2 };
const FILTERS = ["all", "easy", "medium", "hard"];

function initialDifficulty(trackKey) {
  const saved = loadUiPrefs(trackKey).difficulty;
  return FILTERS.includes(saved) ? saved : "all";
}

export default function CodeHome({ title, intro, problems, topics, trackKey }) {
  const [attempts, setAttempts] = useState(() => loadAttempts(trackKey));
  const [difficulty, setDifficulty] = useState(() => initialDifficulty(trackKey));

  useEffect(() => {
    function refresh() {
      setAttempts(loadAttempts(trackKey));
    }
    // Other windows write attempts to localStorage; storage fires here.
    // Focus covers returning to this list after solving elsewhere.
    window.addEventListener("storage", refresh);
    window.addEventListener("focus", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("focus", refresh);
    };
  }, [trackKey]);

  const byProblem = {};
  for (const a of attempts) {
    const problem = problems.find((p) => p.id === a.problemId);
    if ((a.problemVersion ?? 1) !== (problem?.version ?? 1)) continue;
    const cur = byProblem[a.problemId] ?? {
      attempts: 0,
      solved: false,
      best: 0,
      bestTimeMs: null,
    };
    cur.attempts += 1;
    cur.solved = cur.solved || a.solved;
    cur.best = Math.max(cur.best, a.passedTests);
    if (a.solved && a.durationMs != null) {
      cur.bestTimeMs =
        cur.bestTimeMs == null
          ? a.durationMs
          : Math.min(cur.bestTimeMs, a.durationMs);
    }
    byProblem[a.problemId] = cur;
  }

  const solvedCount = problems.filter((p) => byProblem[p.id]?.solved).length;

  function handleClear() {
    if (window.confirm("Delete all saved progress for this track from this browser?")) {
      clearAttempts(trackKey);
      setAttempts([]);
    }
  }

  function chooseDifficulty(d) {
    setDifficulty(d);
    saveUiPrefs(trackKey, { difficulty: d });
  }

  function visibleProblems(topic) {
    return problems
      .filter((p) => p.topic === topic)
      .filter((p) => difficulty === "all" || p.difficulty === difficulty)
      .sort((a, b) => DIFFICULTY_RANK[a.difficulty] - DIFFICULTY_RANK[b.difficulty]);
  }

  return (
    <div className="home">
      <section className="panel">
        <div className="panel__head">
          <h2>{title}</h2>
          {attempts.length > 0 && (
            <button className="btn btn--ghost" onClick={handleClear}>
              Clear progress
            </button>
          )}
        </div>
        <p className="muted">{intro}</p>
        <p className="scoreline">
          Solved <strong>{solvedCount}</strong> of{" "}
          <strong>{problems.length}</strong>
        </p>
        <div className="chooser">
          <span className="chooser__label">Difficulty:</span>
          {FILTERS.map((d) => (
            <button
              key={d}
              className={`chip ${difficulty === d ? "chip--on" : ""}`}
              onClick={() => chooseDifficulty(d)}
            >
              {d === "all" ? "All" : d}
            </button>
          ))}
        </div>
        <p className="muted chooser-hint">
          Cmd/Ctrl-click or middle-click a challenge to open it in a new window.
          Progress syncs back here when you return.
        </p>
      </section>

      {topics.map((topic) => {
        const list = visibleProblems(topic);
        if (list.length === 0) return null;
        return (
          <section className="panel" key={topic}>
            <div className="panel__head">
              <h2>{topic}</h2>
            </div>
            <div className="cards">
              {list.map((p) => {
                const stat = byProblem[p.id];
                return (
                  <div className="card" key={p.id}>
                    <div className="card__top">
                      <h3 className="card__title">{p.title}</h3>
                      <span className={`diff diff--${p.difficulty}`}>
                        {p.difficulty}
                      </span>
                    </div>
                    {p.mode === "redteam" && (
                      <p className="card__meta">
                        <span className={`failmode failmode--${p.failureMode}`}>
                          {FAILURE_LABELS[p.failureMode] ?? p.failureMode}
                        </span>
                      </p>
                    )}
                    <p className="card__scores">
                      {stat ? (
                        stat.solved ? (
                          <span className="solved-tag">
                            Solved ✓
                            {stat.bestTimeMs != null && (
                              <span className="card__scores--empty">
                                {" "}
                                · best {stat.bestTimeMs}ms
                              </span>
                            )}
                            <span className="card__scores--empty">
                              {" "}
                              · {stat.attempts} attempt
                              {stat.attempts === 1 ? "" : "s"}
                            </span>
                          </span>
                        ) : (
                          <span className="card__scores--empty">
                            Best {stat.best}/{p.tests.length} · {stat.attempts}{" "}
                            attempt{stat.attempts === 1 ? "" : "s"}
                          </span>
                        )
                      ) : (
                        <span className="card__scores--empty">Not attempted</span>
                      )}
                    </p>
                    <a className="btn" href={problemHref(trackKey, p.id)}>
                      {stat ? "Open" : p.mode === "redteam" ? "Review" : "Solve"}
                    </a>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
