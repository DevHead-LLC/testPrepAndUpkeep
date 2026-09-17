import { useState, useRef, useEffect } from "react";
import { runSolution } from "../../engine/dsa/runner.js";
import { saveAttempt } from "../../engine/storage.js";
import { tipsByProblemId as dsaTips } from "../../content/dsa/tips.js";
import { tipsByProblemId as rwTips } from "../../content/realworld/tips.js";
import { FAILURE_LABELS } from "../../content/realworld/redteam.data.js";
import { techniqueByExerciseId } from "../../content/dsa/quizzes.js";

const tipsByProblemId = { ...dsaTips, ...rwTips };

import { pushSnapshot, pairEdit, enterEdit } from "../../engine/editor.js";

function fmt(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

// Build human-readable example input/output pairs from the visible tests, so
// the examples always match what the grader actually checks.
function buildExamples(problem) {
  const visible = (problem.tests || []).filter((t) => !t.hidden);

  if (problem.kind === "design") {
    return visible.map((t) => ({
      type: "design",
      lines: t.ops.map((op, k) => {
        const args = (t.args[k] ?? []).map(fmt).join(", ");
        const ret = t.expected[k];
        if (k === 0) return { call: `new ${op}(${args})`, out: null };
        return {
          call: `${op}(${args})`,
          out: ret === null || ret === undefined ? null : fmt(ret),
        };
      }),
    }));
  }

  return visible.map((t) => {
    const args = Array.isArray(t.input) ? t.input : [t.input];
    let call = `${problem.fnName}(${args.map(fmt).join(", ")})`;
    if (problem.inputKind === "binary-tree") {
      call = `${problem.fnName}(root) · tree in level order: ${fmt(args[0])}`;
    } else if (problem.inputKind?.startsWith("linked-list")) {
      call = `${problem.fnName}(head) · list values: ${fmt(args[0])}`;
      if (problem.inputKind === "linked-list-cycle") call += ` · tail connects to index: ${args[1]}`;
    }
    return {
      type: "function",
      call,
      out: problem.outputKind === "mutated-first-arg"
        ? `nums after the call: ${fmt(t.expected)}`
        : problem.inputKind === "linked-list" ? `list values: ${fmt(t.expected)}` : fmt(t.expected),
    };
  });
}

export default function CodeSolve({ problem, trackKey, onBack }) {
  const [code, setCode] = useState(problem.starter);
  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState(null);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const examples = buildExamples(problem);
  const textareaRef = useRef(null);
  const pendingSelection = useRef(null);
  const snapshotRef = useRef({ code: problem.starter, selStart: 0, selEnd: 0 });
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const tips = tipsByProblemId[problem.id];

  function pushUndoSnapshot() {
    pushSnapshot(undoStack.current, snapshotRef.current);
    redoStack.current = [];
  }

  function undoEdit() {
    if (undoStack.current.length === 0) return;
    pushSnapshot(redoStack.current, snapshotRef.current);
    const prev = undoStack.current.pop();
    snapshotRef.current = { ...prev };
    pendingSelection.current = [prev.selStart, prev.selEnd];
    setCode(prev.code);
  }

  function redoEdit() {
    if (redoStack.current.length === 0) return;
    pushSnapshot(undoStack.current, snapshotRef.current);
    const next = redoStack.current.pop();
    snapshotRef.current = { ...next };
    pendingSelection.current = [next.selStart, next.selEnd];
    setCode(next.code);
  }

  // Apply caret/selection changes after a programmatic edit re-renders.
  useEffect(() => {
    if (pendingSelection.current && textareaRef.current) {
      const [s, e] = pendingSelection.current;
      textareaRef.current.setSelectionRange(s, e);
      pendingSelection.current = null;
    }
  }, [code]);

  function handleKeyDown(e) {
    const el = e.currentTarget;
    const { selectionStart: start, selectionEnd: end, value } = el;
    if (e.nativeEvent.isComposing) return;
    const shortcut = e.metaKey || e.ctrlKey;
    const key = e.key.toLowerCase();

    if (shortcut && e.key === "Enter") {
      e.preventDefault();
      if (!running) runTests();
      return;
    }

    if (shortcut && key === "z") {
      e.preventDefault();
      if (e.shiftKey) redoEdit();
      else undoEdit();
      return;
    }

    if (shortcut && key === "y") {
      e.preventDefault();
      redoEdit();
      return;
    }

    if (shortcut || e.altKey) return;

    const applyEdit = (newValue, selStart, selEnd = selStart) => {
      e.preventDefault();
      pushUndoSnapshot();
      snapshotRef.current = { code: newValue, selStart, selEnd };
      pendingSelection.current = [selStart, selEnd];
      setCode(newValue);
    };

    // Tab / Shift+Tab → indent within the editor instead of leaving the field.
    if (e.key === "Tab") {
      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const multiline = value.slice(start, end).includes("\n");
      if (!e.shiftKey && !multiline) {
        applyEdit(value.slice(0, start) + "  " + value.slice(end), start + 2);
        return;
      }
      const lines = value.slice(lineStart, end).split("\n");
      let total = 0;
      let first = 0;
      const out = lines.map((line, i) => {
        if (e.shiftKey) {
          const removed = line.startsWith("  ") ? 2 : line.startsWith(" ") ? 1 : 0;
          if (i === 0) first = removed;
          total += removed;
          return line.slice(removed);
        }
        if (i === 0) first = 2;
        total += 2;
        return "  " + line;
      });
      const newValue =
        value.slice(0, lineStart) + out.join("\n") + value.slice(end);
      const dir = e.shiftKey ? -1 : 1;
      applyEdit(
        newValue,
        Math.max(lineStart, start + dir * first),
        end + dir * total,
      );
      return;
    }

    const change = e.key === "Enter"
      ? enterEdit(value, start, end)
      : pairEdit(value, start, end, e.key);
    if (change) {
      if (change.code === value) {
        e.preventDefault();
        el.setSelectionRange(change.selStart, change.selEnd);
        snapshotRef.current = change;
      } else {
        applyEdit(change.code, change.selStart, change.selEnd);
      }
    }
  }

  function handleChange(e) {
    pushUndoSnapshot();
    const el = e.target;
    snapshotRef.current = {
      code: el.value,
      selStart: el.selectionStart,
      selEnd: el.selectionEnd,
    };
    setCode(el.value);
  }

  function handleSelect(e) {
    snapshotRef.current = {
      ...snapshotRef.current,
      selStart: e.target.selectionStart,
      selEnd: e.target.selectionEnd,
    };
  }

  function resetCode() {
    const starter = problem.starter;
    snapshotRef.current = { code: starter, selStart: 0, selEnd: 0 };
    undoStack.current = [];
    redoStack.current = [];
    setCode(starter);
    setOutcome(null);
  }

  async function runTests() {
    setRunning(true);
    setOutcome(null);
    const started = performance.now();
    const res = await runSolution({
      source: code,
      fnName: problem.fnName,
      className: problem.className,
      kind: problem.kind ?? "function",
      tests: problem.tests,
      inputKind: problem.inputKind,
      outputKind: problem.outputKind,
    });
    const durationMs = Math.round(performance.now() - started);

    const total = problem.tests.length;
    const passed = res.results.filter((r) => r.pass).length;
    const solved =
      !res.timedOut && !res.error && !res.compileError && passed === total;

    saveAttempt(trackKey, {
      id: String(Date.now()),
      track: trackKey,
      problemId: problem.id,
      problemVersion: problem.version ?? 1,
      topic: problem.topic,
      title: problem.title,
      timestamp: new Date().toISOString(),
      totalTests: total,
      passedTests: passed,
      percent: total === 0 ? 0 : Math.round((passed / total) * 100),
      solved,
      durationMs,
    });

    setOutcome({ ...res, total, passed, solved, durationMs });
    setRunning(false);
  }

  return (
    <div className="solve">
      <div className="quiz__bar">
        <button className="btn btn--ghost" onClick={onBack}>
          ← Problems
        </button>
        <span className="quiz__counter">{problem.title}</span>
        <span className="quiz__title">
          {problem.topic} · {problem.difficulty}
        </span>
      </div>

      <section className="panel">
        {problem.mode === "redteam" && (
          <div className="redteam-banner">
            <p className="redteam-banner__kicker">
              AI red-team
              {problem.failureMode && (
                <>
                  {" "}
                  · {FAILURE_LABELS[problem.failureMode] ?? problem.failureMode}
                </>
              )}
            </p>
            <p>
              A coding model shipped the starter below and claimed:{" "}
              <em>“{problem.modelClaim}”</em>
            </p>
            <p className="muted">
              Run the tests. Hidden cases catch what the model papered over.
              Name the failure, then patch the code to production standard.
            </p>
          </div>
        )}
        <p className="solve__prompt">{problem.prompt}</p>
        <p className="muted solve__fn">
          {problem.kind === "design" ? (
            <>
              Define a class named <code>{problem.className}</code>.
            </>
          ) : (
            <>
              Define a function named <code>{problem.fnName}</code>.
            </>
          )}
        </p>
      </section>

      {examples.length > 0 && (
        <section className="panel examples">
          <button
            className="examples__toggle"
            onClick={() => setShowExamples((v) => !v)}
            aria-expanded={showExamples}
          >
            <span className="examples__chevron" aria-hidden="true">
              {showExamples ? "▾" : "▸"}
            </span>
            {showExamples
              ? "Hide example inputs and outputs"
              : "Show example inputs and outputs"}
          </button>

          {showExamples && (
            <ul className="examples__list">
              {examples.map((ex, i) => (
                <li key={i} className="examples__item">
                  {ex.type === "function" ? (
                    <code className="examples__io">
                      <span className="examples__in">{ex.call}</span>
                      <span className="examples__arrow">→</span>
                      <span className="examples__out">{ex.out}</span>
                    </code>
                  ) : (
                    <div className="examples__seq">
                      {ex.lines.map((ln, j) => (
                        <code key={j} className="examples__io">
                          <span className="examples__in">{ln.call}</span>
                          {ln.out != null && (
                            <>
                              <span className="examples__arrow">→</span>
                              <span className="examples__out">{ln.out}</span>
                            </>
                          )}
                        </code>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {tips && (
        <section className="panel tips">
          <div className="panel__head">
            <h2>Tips</h2>
            {revealedSteps > 0 && (
              <span className="muted tips__progress">
                {showSolution
                  ? "Solution revealed"
                  : `${revealedSteps} / ${tips.steps.length} steps`}
              </span>
            )}
          </div>

          {revealedSteps === 0 && !showSolution && (
            <p className="muted tips__intro">
              Stuck? Reveal one step at a time — each builds on the last.
            </p>
          )}

          {revealedSteps > 0 && (
            <ol className="tips__steps" start={1}>
              {tips.steps.slice(0, revealedSteps).map((step, i) => (
                <li key={i} className="tips__step">
                  {step}
                </li>
              ))}
            </ol>
          )}

          {showSolution && (
            <div className="tips__solution">
              <p className="tips__solution-label">Reference solution</p>
              <pre className="tips__code">{tips.solution}</pre>
              {(tips.time || tips.space) && (
                <dl className="tips__bigo">
                  {tips.time && (
                    <div className="tips__bigo-row">
                      <dt>Time</dt>
                      <dd>{tips.time}</dd>
                    </div>
                  )}
                  {tips.space && (
                    <div className="tips__bigo-row">
                      <dt>Space</dt>
                      <dd>{tips.space}</dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          )}

          <div className="tips__actions">
            {revealedSteps < tips.steps.length && (
              <button
                className="btn btn--ghost"
                onClick={() => setRevealedSteps((n) => n + 1)}
              >
                {revealedSteps === 0 ? "Reveal step 1" : "Next step"}
              </button>
            )}
            {revealedSteps === tips.steps.length && !showSolution && (
              <button
                className="btn btn--ghost"
                onClick={() => setShowSolution(true)}
              >
                Show solution
              </button>
            )}
            {(revealedSteps > 0 || showSolution) && (
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setRevealedSteps(0);
                  setShowSolution(false);
                }}
              >
                Reset tips
              </button>
            )}
          </div>
        </section>
      )}

      <section className="panel">
        <div className="panel__head">
          <h2>
            {problem.mode === "redteam"
              ? "Model output — find the failure and fix it"
              : "Your solution"}
          </h2>
          <button className="btn btn--ghost" onClick={resetCode}>
            {problem.mode === "redteam" ? "Reset to model output" : "Reset code"}
          </button>
        </div>
        <textarea
          ref={textareaRef}
          className="editor"
          aria-label="JavaScript solution"
          aria-describedby="editor-shortcuts"
          autoCapitalize="off"
          autoCorrect="off"
          value={code}
          spellCheck={false}
          onChange={handleChange}
          onSelect={handleSelect}
          onKeyDown={handleKeyDown}
          rows={12}
        />
        <p className="muted" id="editor-shortcuts">
          Tab / Shift+Tab: indent · Cmd/Ctrl+Z: undo · Shift+Cmd/Ctrl+Z: redo · Cmd/Ctrl+Enter: run tests
        </p>
        <div className="solve__actions">
          <button
            className="btn btn--primary"
            onClick={runTests}
            disabled={running}
          >
            {running ? "Running…" : "Run tests"}
          </button>
        </div>
      </section>

      {outcome && (
        <section className="panel">
          {problem.outputKind === "mutated-first-arg" && (
            <p className="muted">Results compare nums after your function runs. Return values are ignored; use O(1) extra space. The tests check the array changes, not memory usage.</p>
          )}
          {outcome.compileError && (
            <p className="run-error">⚠ {outcome.compileError}</p>
          )}
          {outcome.timedOut && (
            <p className="run-error">
              ⚠ Timed out (possible infinite loop). The runner was stopped.
            </p>
          )}
          {outcome.error && <p className="run-error">⚠ {outcome.error}</p>}

          {outcome.results.length > 0 && (
            <>
              <div className="run-summary">
                <span
                  className={`verdict ${
                    outcome.solved ? "verdict--pass" : "verdict--fail"
                  }`}
                >
                  {outcome.solved ? "Solved" : "Not yet"}
                </span>
                <span className="muted">
                  {outcome.passed}/{outcome.total} tests passed
                  {outcome.durationMs != null && ` · ${outcome.durationMs}ms`}
                </span>
              </div>
              {outcome.solved &&
                trackKey === "dsa" &&
                techniqueByExerciseId[problem.id] && (
                  <p className="solve__technique">
                    Think:{" "}
                    <strong>{techniqueByExerciseId[problem.id]}</strong>
                  </p>
                )}

              <ul className="testlist">
                {outcome.results.map((r) => {
                  const hidden = problem.tests[r.i]?.hidden;
                  const reveal = !hidden || r.pass;
                  const gotLabel =
                    r.got === undefined ? "undefined" : String(r.got);
                  const ioLine = reveal
                    ? r.error
                      ? r.input
                      : `${r.input} // ${gotLabel}`
                    : "Hidden test";

                  return (
                    <li
                      key={r.i}
                      className={`testrow ${r.pass ? "testrow--ok" : "testrow--bad"}`}
                    >
                      <span className="pill-mini">{r.pass ? "PASS" : "FAIL"}</span>
                      <div className="testrow__body">
                        <code className="testrow__io">{ioLine}</code>
                        {!r.pass && (
                          <div className="testrow__detail">
                            {hidden ? (
                              <span>details hidden</span>
                            ) : r.error ? (
                              <span>error: {r.error}</span>
                            ) : (
                              <>
                                <span>expected {r.expected}</span>
                                <span>got {gotLabel}</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </section>
      )}
    </div>
  );
}
