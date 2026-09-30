import { useState } from "react";
import Quiz from "../components/Quiz.jsx";
import {
  principleBanks,
  difficultyLabels,
  principleQuestions,
} from "../content/principles/questions.data.js";
import { shuffle, shuffleOptions } from "../engine/select.js";
import { gradeQuestion } from "../engine/score.js";
import { loadAttempts, saveAttempt } from "../engine/storage.js";

function pickPrinciplesRound(questions) {
  return shuffle(questions).map(shuffleOptions);
}

export default function PrinciplesTrack() {
  const [bank, setBank] = useState(null);
  if (bank) {
    return <PrinciplesPractice key={bank.key} bank={bank} onBack={() => setBank(null)} />;
  }

  return (
    <section className="panel">
      <h2>Software Principles</h2>
      <p className="muted">
        Multiple-choice drills on software design principles: match names to meanings, then apply them to
        scenarios. Covers DRY, KISS, YAGNI, SOLID, SoC, Law of Demeter, least privilege, fail fast, and related
        classics. Progress is saved separately for each difficulty.
      </p>
      <ul className="subtopics">
        {principleBanks.map((item) => (
          <li className="review-row review-row--sub" key={item.key}>
            <div className="review-row__info">
              <span className="review-row__name">
                <span className={`diff diff--${item.difficulty}`}>
                  {difficultyLabels[item.difficulty]}
                </span>
                {" · "}
                {item.questions.length} questions per test
              </span>
              <PrinciplesStats trackKey={item.key} />
            </div>
            <button
              className="btn btn--primary"
              onClick={() => setBank(item)}
              aria-label={`Open Principles — ${difficultyLabels[item.difficulty]}`}
            >
              Practice
            </button>
          </li>
        ))}
      </ul>
      <details>
        <summary className="history__title">What you’ll see</summary>
        <ul className="review">
          <li className="review__item">
            <p className="muted">
              Bank size: {principleQuestions.length} questions total (
              {principleBanks
                .map((b) => `${b.questions.length} ${difficultyLabels[b.difficulty].toLowerCase()}`)
                .join(", ")}
              ). Questions and answers shuffle each run.
            </p>
          </li>
        </ul>
      </details>
    </section>
  );
}

function PrinciplesStats({ trackKey }) {
  const attempts = loadAttempts(trackKey);
  return (
    <span className="card__scores">
      {attempts.length
        ? `Latest ${attempts.at(-1).percent}% · Best ${Math.max(...attempts.map((a) => a.percent))}% · ${attempts.length} taken`
        : "No attempts yet"}
    </span>
  );
}

function PrinciplesPractice({ bank, onBack }) {
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(() => loadAttempts(bank.key));

  function start() {
    setResult(null);
    setQuiz({
      title: bank.title,
      mode: "review",
      questions: pickPrinciplesRound(bank.questions),
    });
  }

  function finish(answers) {
    const correctCount = quiz.questions.filter((q) =>
      gradeQuestion(q, answers[q.id] ?? []),
    ).length;
    const attempt = {
      id: String(Date.now()),
      timestamp: new Date().toISOString(),
      difficulty: bank.difficulty,
      totalQuestions: quiz.questions.length,
      correctCount,
      percent: Math.round((correctCount / quiz.questions.length) * 100),
      answers,
    };
    setAttempts(saveAttempt(bank.key, attempt));
    setResult(attempt);
  }

  if (quiz && !result) {
    return <Quiz quiz={quiz} onFinish={finish} onCancel={() => setQuiz(null)} />;
  }

  if (result && quiz) {
    return (
      <div className="results">
        <section className="panel">
          <h2>
            {bank.title}: {result.percent}%
          </h2>
          <p className="scoreline">
            {result.correctCount} of {result.totalQuestions} correct
          </p>
          <div className="results__buttons">
            <button className="btn btn--primary" onClick={start}>
              Try again
            </button>
            <button
              className="btn"
              onClick={() => {
                setQuiz(null);
                setResult(null);
              }}
            >
              Back to principles
            </button>
          </div>
        </section>
        <section className="panel">
          <h2>Answer review</h2>
          <ol className="review">
            {quiz.questions.map((q) => {
              const selected = result.answers[q.id] ?? [];
              const correct = gradeQuestion(q, selected);
              const labels = (ids) =>
                q.options
                  .filter((o) => ids.includes(o.id))
                  .map((o) => o.text)
                  .join(", ");
              return (
                <li className="review__item" key={q.id}>
                  <div className="review__head">
                    <span className={`pill ${correct ? "pill--ok" : "pill--bad"}`}>
                      {correct ? "Correct" : "Incorrect"}
                    </span>
                    <p className="review__prompt">{q.prompt}</p>
                  </div>
                  {q.snippet && <pre className="quiz__snippet">{q.snippet}</pre>}
                  <p className="review__line">
                    Your answer: {labels(selected) || "Unanswered"}
                  </p>
                  <p className="review__line">Correct answer: {labels(q.correct)}</p>
                  <p className="review__explain">{q.explanation}</p>
                </li>
              );
            })}
          </ol>
        </section>
      </div>
    );
  }

  return (
    <section className="panel">
      <button className="btn btn--ghost" onClick={onBack}>
        ← Choose difficulty
      </button>
      <div className="panel__head">
        <h2>{bank.title}</h2>
        <span className="badge">{bank.questions.length} questions per test</span>
      </div>
      <p className="muted">
        {bank.intro} Untimed, with shuffled questions and choices. Review answers and explanations when you
        finish.
      </p>
      <p className="scoreline">
        {attempts.length
          ? `${attempts.length} attempts · Latest: ${attempts.at(-1).percent}% · Best: ${Math.max(...attempts.map((a) => a.percent))}%`
          : "No attempts yet."}
      </p>
      <button
        className="btn btn--primary"
        onClick={start}
        disabled={!bank.questions.length}
      >
        Start quiz
      </button>
    </section>
  );
}
