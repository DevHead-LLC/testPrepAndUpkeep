import { useState } from "react";
import Home from "../components/Home.jsx";
import Quiz from "../components/Quiz.jsx";
import Results from "../components/Results.jsx";
import { allQuestions, sections } from "../content/aws-saa/index.js";
import { reviewQuestions, reviewName } from "../content/aws-saa/topics.js";
import { pickOverall, shuffle, shuffleOptions } from "../engine/select.js";
import { scoreAttempt } from "../engine/score.js";
import { saveAttempt } from "../engine/storage.js";

const DEFAULT_OVERALL_COUNT = 20;
// Real exam pacing: 65 questions / 130 minutes = 120 seconds per question.
const SECONDS_PER_QUESTION = 120;

export default function AwsTrack() {
  const [screen, setScreen] = useState("home");
  const [quiz, setQuiz] = useState(null);
  const [result, setResult] = useState(null);

  // Section Review: untimed drill of a domain, study module, or sub-topic.
  function startReview(reviewId) {
    const pool = reviewQuestions(allQuestions, reviewId);
    if (pool.length === 0) return;
    const questions = shuffle(pool).map(shuffleOptions);
    setQuiz({
      mode: "review",
      reviewId,
      section: null,
      title: reviewName(reviewId),
      questions,
    });
    setResult(null);
    setScreen("quiz");
  }

  function startOverall(count = DEFAULT_OVERALL_COUNT) {
    const questions = pickOverall(allQuestions, sections, count);
    if (questions.length === 0) return;
    setQuiz({
      mode: "overall",
      section: null,
      questions,
      timeLimitSec: questions.length * SECONDS_PER_QUESTION,
    });
    setResult(null);
    setScreen("quiz");
  }

  function finishQuiz(answers) {
    const attempt = scoreAttempt({ ...quiz, answers });
    saveAttempt("aws-saa", attempt);
    setResult(attempt);
    setScreen("results");
  }

  function goHome() {
    setQuiz(null);
    setScreen("home");
  }

  return (
    <>
      {screen === "home" && (
        <Home onStartReview={startReview} onStartOverall={startOverall} />
      )}
      {screen === "quiz" && quiz && (
        <Quiz quiz={quiz} onFinish={finishQuiz} onCancel={goHome} />
      )}
      {screen === "results" && result && (
        <Results
          result={result}
          quiz={quiz}
          onRetry={() =>
            quiz.mode === "review"
              ? startReview(quiz.reviewId)
              : startOverall(quiz.questions.length)
          }
          onHome={goHome}
        />
      )}
    </>
  );
}
