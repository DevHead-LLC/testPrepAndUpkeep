import { useState } from "react";
import { allQuestions, sectionCounts } from "../content/aws-saa/index.js";
import { reviewName } from "../content/aws-saa/topics.js";
import { loadAttempts, summarize, clearAttempts } from "../engine/storage.js";
import SectionReview from "./SectionReview.jsx";

export default function Home({ onStartReview, onStartOverall }) {
  const [attempts, setAttempts] = useState(() => loadAttempts("aws-saa"));
  const counts = sectionCounts();
  const summary = summarize(attempts);
  const totalQuestions = Object.values(counts).reduce((a, b) => a + b, 0);

  const fullLength = Math.min(totalQuestions, 65);
  const lengthOptions = [10, 20].filter((n) => n < fullLength);
  const [overallLen, setOverallLen] = useState(() =>
    Math.min(20, fullLength),
  );

  function handleClear() {
    if (
      window.confirm(
        "Delete all saved scores from this browser? This cannot be undone.",
      )
    ) {
      clearAttempts("aws-saa");
      setAttempts([]);
    }
  }

  return (
    <div className="home">
      <section className="panel">
        <div className="panel__head">
          <h2>Overall Test</h2>
          <span className="badge">Mock exam</span>
        </div>
        <p className="muted">
          Questions drawn across all sections by exam weight, with a final
          grade, a pass/fail projection (≥72%), and a list of sections to
          review.
        </p>
        {summary.overall.attempts > 0 && (
          <p className="scoreline">
            Latest <strong>{summary.overall.latest}%</strong> · Best{" "}
            <strong>{summary.overall.best}%</strong> · {summary.overall.attempts}{" "}
            taken
          </p>
        )}

        <div className="chooser">
          <span className="chooser__label">Questions:</span>
          {lengthOptions.map((n) => (
            <button
              key={n}
              className={`chip ${overallLen === n ? "chip--on" : ""}`}
              onClick={() => setOverallLen(n)}
            >
              {n}
            </button>
          ))}
          <button
            className={`chip ${overallLen === fullLength ? "chip--on" : ""}`}
            onClick={() => setOverallLen(fullLength)}
          >
            {fullLength === 65 ? "Full exam (65)" : `Full (${fullLength})`}
          </button>
        </div>
        <p className="muted chooser__note">
          Timed like the real exam: ~2 min per question
          {overallLen ? ` · ${Math.round((overallLen * 2))} min for ${overallLen} questions` : ""}.
        </p>

        <button
          className="btn btn--primary"
          onClick={() => onStartOverall(overallLen)}
          disabled={totalQuestions === 0}
        >
          Start Overall Test
        </button>
      </section>

      <SectionReview
        allQuestions={allQuestions}
        attempts={attempts}
        onStartReview={onStartReview}
      />

      <section className="panel">
        <div className="panel__head">
          <h2>Your progress</h2>
          {attempts.length > 0 && (
            <button className="btn btn--ghost" onClick={handleClear}>
              Clear scores
            </button>
          )}
        </div>
        {attempts.length === 0 ? (
          <p className="muted">No attempts yet. Take a quiz to start tracking.</p>
        ) : (
          <>
            <div className="stats">
              <Stat label="Total attempts" value={summary.totalAttempts} />
              <Stat label="Overall mocks" value={summary.overallCount} />
              <Stat label="Section reviews" value={summary.sectionReviewCount} />
              <Stat
                label="Best mock"
                value={
                  summary.overall.best != null ? `${summary.overall.best}%` : "—"
                }
              />
            </div>
            <p className="muted progress__note">
              Mock stats count Overall Tests only; reviews are tracked per
              topic above.
            </p>

            <h3 className="history__title">Recent attempts</h3>
            <ul className="history">
              {[...attempts]
                .slice(-8)
                .reverse()
                .map((a) => (
                  <li className="history__row" key={a.id}>
                    <span className="history__date">{formatDate(a.timestamp)}</span>
                    <span className="history__label">
                      {a.mode === "overall"
                        ? "Overall Test"
                        : reviewName(a.reviewId ?? a.section)}
                    </span>
                    <span className="history__count">
                      {a.correctCount}/{a.totalQuestions}
                    </span>
                    <span
                      className={`history__pct ${
                        a.mode === "overall"
                          ? a.passLikely
                            ? "history__pct--pass"
                            : "history__pct--fail"
                          : ""
                      }`}
                    >
                      {a.percent}%
                    </span>
                  </li>
                ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <div className="stat__value">{value}</div>
      <div className="stat__label">{label}</div>
    </div>
  );
}
