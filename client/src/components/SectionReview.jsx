import { useState } from "react";
import { sections } from "../content/aws-saa/index.js";
import { courseSections, reviewQuestions } from "../content/aws-saa/topics.js";
import { REVIEW_TARGET } from "../engine/score.js";

// Aggregate per-reviewId stats from saved attempts (non-overall only).
function reviewStats(attempts) {
  const grouped = {};
  for (const a of attempts) {
    if (a.mode === "overall") continue;
    const id = a.reviewId ?? a.section;
    if (!id) continue;
    (grouped[id] ??= []).push(a.percent);
  }
  const out = {};
  for (const [id, pcts] of Object.entries(grouped)) {
    out[id] = {
      latest: pcts[pcts.length - 1],
      best: Math.max(...pcts),
      attempts: pcts.length,
    };
  }
  return out;
}

function StatLine({ stat }) {
  if (!stat) {
    return <span className="card__scores card__scores--empty">No reviews yet</span>;
  }
  const met = stat.best >= REVIEW_TARGET;
  return (
    <span className="card__scores">
      Latest <strong>{stat.latest}%</strong> · Best{" "}
      <strong className={met ? "ok-text" : ""}>{stat.best}%</strong> ·{" "}
      {stat.attempts} taken{met ? " · ✓ 75%" : ""}
    </span>
  );
}

export default function SectionReview({ allQuestions, attempts, onStartReview }) {
  const stats = reviewStats(attempts);

  // Course sections start collapsed for a tidy, scannable list.
  const [expanded, setExpanded] = useState(() => new Set());
  const isOpen = (id) => expanded.has(id);
  const toggle = (id) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  return (
    <section className="panel">
      <div className="panel__head">
        <h2>Section Review</h2>
        <span className="badge">Focused drills</span>
      </div>
      <p className="muted">
        Drill by exam domain, or by study module and sub-topic. Aim to get each
        sub-topic above {REVIEW_TARGET}%, then take the full module, then the
        Overall Test. Click a module to expand it.
      </p>

      <h3 className="review-group__title">By exam domain</h3>
      {sections.map((domain) => {
        const count = allQuestions.filter((q) => q.section === domain.key).length;
        return (
          <div className="review-row" key={domain.key}>
            <div className="review-row__info">
              <span className="review-row__name">
                {domain.name} · {count} question{count === 1 ? "" : "s"} ·{" "}
                {Math.round(domain.weight * 100)}%
              </span>
              <StatLine stat={stats[domain.key]} />
            </div>
            <button
              className="btn"
              onClick={() => onStartReview(domain.key)}
              disabled={count === 0}
            >
              Review
            </button>
          </div>
        );
      })}

      <h3 className="review-group__title">By study module</h3>
      {courseSections.map((sec) => {
        const secId = `sec:${sec.id}`;
        const secCount = reviewQuestions(allQuestions, secId).length;
        if (secCount === 0) return null;
        const open = isOpen(secId);
        return (
          <div className="review-section" key={sec.id}>
            <div className="review-row review-row--sec">
              <button
                className="review-toggle"
                onClick={() => toggle(secId)}
                aria-expanded={open}
              >
                <span className={`chev ${open ? "chev--open" : ""}`}>▸</span>
                <span className="review-row__info">
                  <span className="review-row__name review-row__name--sec">
                    {sec.name} · {secCount} questions
                  </span>
                  <StatLine stat={stats[secId]} />
                </span>
              </button>
              <button className="btn" onClick={() => onStartReview(secId)}>
                Review section
              </button>
            </div>

            {open && (
              <ul className="subtopics">
                {sec.subtopics.map((st) => {
                  const subId = `sub:${st.id}`;
                  const count = reviewQuestions(allQuestions, subId).length;
                  if (count === 0) return null;
                  return (
                    <li className="review-row review-row--sub" key={st.id}>
                      <div className="review-row__info">
                        <span className="review-row__name">
                          {st.name} · {count}
                        </span>
                        <StatLine stat={stats[subId]} />
                      </div>
                      <button
                        className="btn btn--ghost"
                        onClick={() => onStartReview(subId)}
                      >
                        Review
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </section>
  );
}
