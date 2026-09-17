import { useState, useEffect, useRef } from "react";

function formatTime(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function Quiz({ quiz, onFinish, onCancel, renderAfterActions }) {
  const { questions, mode, timeLimitSec } = quiz;
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [remaining, setRemaining] = useState(timeLimitSec ?? 0);

  // Keep latest answers/onFinish accessible to the timer without restarting it.
  const answersRef = useRef(answers);
  const finishRef = useRef(onFinish);
  useEffect(() => {
    answersRef.current = answers;
  }, [answers]);
  useEffect(() => {
    finishRef.current = onFinish;
  }, [onFinish]);

  // Countdown for the timed Overall Test only (auto-submits at zero).
  useEffect(() => {
    if (!timeLimitSec) return;
    const end = Date.now() + timeLimitSec * 1000;
    const id = setInterval(() => {
      const left = Math.max(0, Math.round((end - Date.now()) / 1000));
      setRemaining(left);
      if (left <= 0) {
        clearInterval(id);
        finishRef.current(answersRef.current);
      }
    }, 250);
    return () => clearInterval(id);
  }, [timeLimitSec]);

  const question = questions[index];
  const isMulti = question.type === "multi";
  const selected = answers[question.id] ?? [];
  const isLast = index === questions.length - 1;
  const progress = Math.round(((index + 1) / questions.length) * 100);

  const title = mode === "overall" ? "Overall Test" : quiz.title ?? "Review";

  function toggle(optionId) {
    setAnswers((prev) => {
      const current = prev[question.id] ?? [];
      if (isMulti) {
        const next = current.includes(optionId)
          ? current.filter((id) => id !== optionId)
          : [...current, optionId];
        return { ...prev, [question.id]: next };
      }
      return { ...prev, [question.id]: [optionId] };
    });
  }

  function next() {
    if (isLast) {
      onFinish(answers);
    } else {
      setIndex((i) => i + 1);
    }
  }

  return (
    <div className="quiz">
      <div className="quiz__bar">
        <button className="btn btn--ghost" onClick={onCancel}>
          ← Exit
        </button>
        <span className="quiz__counter">
          Question {index + 1} of {questions.length}
        </span>
        {timeLimitSec ? (
          <span
            className={`quiz__timer ${remaining <= 300 ? "quiz__timer--low" : ""}`}
          >
            ⏱ {formatTime(remaining)}
          </span>
        ) : (
          <span className="quiz__title">{title}</span>
        )}
      </div>

      <div className="progress">
        <div className="progress__fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="quiz__question">
        {isMulti && (
          <p className="quiz__hint">
            Select {question.correct.length} answers
          </p>
        )}
        <p className="quiz__prompt">{question.prompt}</p>

        <ul className="options">
          {question.options.map((opt) => {
            const checked = selected.includes(opt.id);
            return (
              <li key={opt.id}>
                <button
                  type="button"
                  className={`option ${checked ? "option--selected" : ""}`}
                  onClick={() => toggle(opt.id)}
                  aria-pressed={checked}
                >
                  <span className="option__marker">{checked ? "✓" : ""}</span>
                  <span className="option__text">{opt.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="quiz__actions">
        <button
          className="btn btn--primary"
          onClick={next}
          disabled={selected.length === 0}
        >
          {isLast ? "Finish & grade" : "Next question"}
        </button>
      </div>
      {renderAfterActions?.(question)}
    </div>
  );
}
