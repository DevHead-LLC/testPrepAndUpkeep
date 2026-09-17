import { useState } from "react";
import Quiz from "../components/Quiz.jsx";
import PatternSolution from "../components/code/PatternSolution.jsx";
import { patternQuestions } from "../content/dsa/patterns.data.js";
import { patternBanks, difficultyLabels, patternReview } from "../content/dsa/quizzes.js";
import { pickPatternRound, patternRoundSize } from "../engine/select.js";
import { problemById } from "../content/dsa/problems.js";
import { gradeQuestion } from "../engine/score.js";
import { loadAttempts, saveAttempt } from "../engine/storage.js";


export default function PatternTrack() {
  const [bank, setBank] = useState(null);
  const [expanded, setExpanded] = useState({});
  if (bank) return <PatternPractice key={bank.key} bank={bank} onBack={() => setBank(null)} />;
  return (
    <section className="panel">
      <h2>DSA Pattern Recognition</h2>
      <p className="muted">Both quizzes cover all {patternRoundSize(patternQuestions)} DSA exercises with four choices per question and explanations after grading. Progress is saved separately for each quiz.</p>
      <p className="muted">Take a full test, or expand a quiz to practice Easy, Medium, or Hard. Difficulty follows the coding exercises; each test saves its own scores.</p>
      {patternBanks.map((item) => {
        const open = Boolean(expanded[item.key]);
        const full = patternReview(item);
        return (
          <div className="review-section" key={item.key}>
            <div className="review-row review-row--sec">
              <button
                className="review-toggle"
                onClick={() => setExpanded((previous) => ({ ...previous, [item.key]: !previous[item.key] }))}
                aria-expanded={open}
                aria-controls={`${item.key}-difficulties`}
              >
                <span className={`chev ${open ? "chev--open" : ""}`} aria-hidden="true">▸</span>
                <span className="review-row__info">
                  <span className="review-row__name review-row__name--sec">{item.title} · {patternRoundSize(item.questions)} questions per full test</span>
                  <PatternStats trackKey={full.key} />
                </span>
              </button>
              <button className="btn btn--primary" onClick={() => setBank(full)}>Full test</button>
            </div>
            {open && (
              <ul className="subtopics" id={`${item.key}-difficulties`}>
                {Object.entries(difficultyLabels).map(([difficulty, label]) => {
                  const review = patternReview(item, difficulty);
                  const count = patternRoundSize(review.questions);
                  return (
                    <li className="review-row review-row--sub" key={difficulty}>
                      <div className="review-row__info">
                        <span className="review-row__name"><span className={`diff diff--${difficulty}`}>{label}</span> · {count} questions per test</span>
                        <PatternStats trackKey={review.key} />
                      </div>
                      <button className="btn" disabled={count === 0} onClick={() => setBank(review)} aria-label={`Open ${item.title} — ${label}`}>Practice</button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
      <details>
        <summary className="history__title">Study guide: exercise names and mental triggers</summary>
        <ul className="review">
          {patternQuestions.map((question) => (
            <li className="review__item" key={question.id}>
              <h3 className="card__title">{problemById[question.exerciseId].title}</h3>
              <p className="review__line">Technique: {question.options.find((option) => question.correct.includes(option.id)).text}</p>
              <p className="muted">{question.mentalTrigger}</p>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

function PatternStats({ trackKey }) {
  const attempts = loadAttempts(trackKey);
  return (
    <span className="card__scores">
      {attempts.length
        ? `Latest ${attempts.at(-1).percent}% · Best ${Math.max(...attempts.map((attempt) => attempt.percent))}% · ${attempts.length} taken`
        : "No attempts yet"}
    </span>
  );
}

function PatternPractice({ bank, onBack }) {
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);
  const [attempts, setAttempts] = useState(() => loadAttempts(bank.key));

  function start() {
    setResult(null);
    setQuiz({
      title: bank.title,
      mode: "review",
      questions: pickPatternRound(bank.questions),
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
    return (
      <Quiz
        quiz={quiz}
        onFinish={finish}
        onCancel={() => setQuiz(null)}
        renderAfterActions={(question) => <PatternSolution key={question.id} question={question} />}
      />
    );
  }

  if (result && quiz) {
    return (
      <div className="results">
        <section className="panel">
          <h2>{bank.title}: {result.percent}%</h2>
          <p className="scoreline">{result.correctCount} of {result.totalQuestions} correct</p>
          <div className="results__buttons">
            <button className="btn btn--primary" onClick={start}>Try again</button>
            <button className="btn" onClick={() => { setQuiz(null); setResult(null); }}>Back to patterns</button>
          </div>
        </section>
        <section className="panel">
          <h2>Answer review</h2>
          <ol className="review">
            {quiz.questions.map((q) => {
              const selected = result.answers[q.id] ?? [];
              const correct = gradeQuestion(q, selected);
              const labels = (ids) => q.options.filter((o) => ids.includes(o.id)).map((o) => o.text).join(", ");
              return (
                <li className="review__item" key={q.id}>
                  <div className="review__head">
                    <span className={`pill ${correct ? "pill--ok" : "pill--bad"}`}>{correct ? "Correct" : "Incorrect"}</span>
                    <p className="review__prompt">{q.prompt}</p>
                  </div>
                  <p className="review__line">Your answer: {labels(selected) || "Unanswered"}</p>
                  <p className="review__line">Correct answer: {labels(q.correct)}</p>
                  <p className="review__line">Coding exercise: {problemById[q.exerciseId].title}</p>
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
      <button className="btn btn--ghost" onClick={onBack}>← Choose quiz</button>
      <div className="panel__head"><h2>{bank.title}</h2><span className="badge">{patternRoundSize(bank.questions)} questions per test</span></div>
      <p className="muted">{bank.intro} Untimed, with shuffled questions and choices. Review answers and explanations when you finish.</p>
      <p className="scoreline">
        {attempts.length ? `${attempts.length} attempts · Latest: ${attempts.at(-1).percent}% · Best: ${Math.max(...attempts.map((a) => a.percent))}%` : "No attempts yet."}
      </p>
      <button className="btn btn--primary" onClick={start} disabled={!bank.questions.length}>Start quiz</button>
    </section>
  );
}
