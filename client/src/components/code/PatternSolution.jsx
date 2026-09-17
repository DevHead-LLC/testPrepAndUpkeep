import { problemById } from "../../content/dsa/problems.js";
import { tipsByProblemId } from "../../content/dsa/tips.js";
import { highlightJavaScript } from "../../engine/highlight.js";

export default function PatternSolution({ question }) {
  const problem = problemById[question.exerciseId];
  const tips = tipsByProblemId[question.exerciseId];
  if (!problem || !tips?.solution) return null;

  return (
    <section className="panel pattern-solution" aria-label={`Solution example: ${problem.title}`}>
      <div className="panel__head">
        <h2>Solution example · {problem.title}</h2>
        <span className="badge">JavaScript</span>
      </div>
      <pre className="tips__code" tabIndex={0} aria-label="Reference solution code">
        <code>{highlightJavaScript(tips.solution).map((token, index) => (
          <span key={index} className={`syntax--${token.kind}`}>{token.text}</span>
        ))}</code>
      </pre>
      <dl className="tips__bigo">
        <div className="tips__bigo-row"><dt>Time</dt><dd>{tips.time}</dd></div>
        <div className="tips__bigo-row"><dt>Space</dt><dd>{tips.space}</dd></div>
      </dl>
    </section>
  );
}
