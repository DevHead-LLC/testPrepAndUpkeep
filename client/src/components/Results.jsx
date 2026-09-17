import { PASS_THRESHOLD } from "../engine/score.js";

export default function Results({ result, quiz, onRetry, onHome }) {
  const questionById = Object.fromEntries(quiz.questions.map((q) => [q.id, q]));
  const isOverall = result.mode === "overall";
  const passed = result.passLikely;
  const sectionEntries = Object.entries(result.perSection);

  return (
    <div className="results">
      <section className="panel results__summary">
        <div className={`score-ring ${passed ? "score-ring--pass" : "score-ring--fail"}`}>
          <span className="score-ring__pct">{result.percent}%</span>
          <span className="score-ring__frac">
            {result.correctCount}/{result.totalQuestions}
          </span>
        </div>

        <div className="results__verdict">
          {isOverall ? (
            <>
              <span
                className={`verdict ${passed ? "verdict--pass" : "verdict--fail"}`}
              >
                {passed ? "Likely PASS" : "Likely FAIL"}
              </span>
              <p className="muted">
                Pass projection uses a {PASS_THRESHOLD}% threshold (the real
                exam needs 720/1000).
              </p>
            </>
          ) : (
            <>
              <span
                className={`verdict ${passed ? "verdict--pass" : "verdict--fail"}`}
              >
                {passed ? `Target met (≥${result.target}%)` : `Below ${result.target}% target`}
              </span>
              <p className="muted">
                {passed
                  ? "Nice — this topic is at your mastery target. Move to the next one."
                  : "Keep drilling this topic until you're consistently above the target."}
              </p>
            </>
          )}
          <div className="results__buttons">
            <button className="btn btn--primary" onClick={onRetry}>
              Try again
            </button>
            <button className="btn btn--ghost" onClick={onHome}>
              Back to home
            </button>
          </div>
        </div>
      </section>

      {isOverall && sectionEntries.length > 0 && (
        <section className="panel">
          <h2>By section</h2>
          <div className="section-bars">
            {sectionEntries.map(([key, s]) => (
              <div className="section-bar" key={key}>
                <div className="section-bar__head">
                  <span>{s.name}</span>
                  <span className="muted">
                    {s.correct}/{s.total} · {s.percent}%
                  </span>
                </div>
                <div className="progress">
                  <div
                    className={`progress__fill ${
                      s.percent < 70 ? "progress__fill--weak" : ""
                    }`}
                    style={{ width: `${s.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {result.weakSections.length > 0 && (
            <div className="weak">
              <h3>Review these next</h3>
              <ul>
                {result.weakSections.map((key) => (
                  <li key={key}>{result.perSection[key].name}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="panel">
        <h2>Answer review</h2>
        <ol className="review">
          {result.questionResults.map((r) => {
            const q = questionById[r.questionId];
            if (!q) return null;
            const correctText = q.options
              .filter((o) => q.correct.includes(o.id))
              .map((o) => o.text)
              .join("; ");
            const yourText =
              r.selected.length === 0
                ? "(no answer)"
                : q.options
                    .filter((o) => r.selected.includes(o.id))
                    .map((o) => o.text)
                    .join("; ");
            return (
              <li key={r.questionId} className="review__item">
                <div className="review__head">
                  <span
                    className={`pill ${r.correct ? "pill--ok" : "pill--bad"}`}
                  >
                    {r.correct ? "Correct" : "Incorrect"}
                  </span>
                  <p className="review__prompt">{q.prompt}</p>
                </div>
                {!r.correct && (
                  <p className="review__line">
                    <strong>Your answer:</strong> {yourText}
                  </p>
                )}
                <p className="review__line">
                  <strong>Correct:</strong> {correctText}
                </p>
                <p className="review__explain">{q.explanation}</p>
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
