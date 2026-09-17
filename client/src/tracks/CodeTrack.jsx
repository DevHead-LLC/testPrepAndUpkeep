import { useEffect, useState } from "react";
import CodeHome from "../components/code/CodeHome.jsx";
import CodeSolve from "../components/code/CodeSolve.jsx";
import { parseHash, writeHash } from "../engine/route.js";

// Generic code-practice track reused by both DSA and Real World.
export default function CodeTrack({ trackKey, title, intro, problems, topics }) {
  const [problem, setProblem] = useState(() => {
    const { track, problemId } = parseHash();
    if (track !== trackKey || !problemId) return null;
    return problems.find((p) => p.id === problemId) ?? null;
  });

  useEffect(() => {
    function onHash() {
      const { track, problemId } = parseHash();
      if (track !== trackKey) {
        setProblem(null);
        return;
      }
      setProblem(problemId ? problems.find((p) => p.id === problemId) ?? null : null);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [trackKey, problems]);

  function goBack() {
    setProblem(null);
    writeHash(trackKey);
  }

  if (problem) {
    return (
      <CodeSolve
        key={problem.id}
        problem={problem}
        trackKey={trackKey}
        onBack={goBack}
      />
    );
  }
  return (
    <CodeHome
      title={title}
      intro={intro}
      problems={problems}
      topics={topics}
      trackKey={trackKey}
    />
  );
}
