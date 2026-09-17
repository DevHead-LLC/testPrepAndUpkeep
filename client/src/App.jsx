import { useEffect, useState } from "react";
import AwsTrack from "./tracks/AwsTrack.jsx";
import CodeTrack from "./tracks/CodeTrack.jsx";
import PatternTrack from "./tracks/PatternTrack.jsx";
import { problems as dsaProblems, dsaTopics } from "./content/dsa/problems.js";
import { problems as rwProblems, topics as rwTopics } from "./content/realworld/problems.js";
import { parseHash, trackHref, writeHash } from "./engine/route.js";
import "./App.css";

const TRACKS = [
  {
    key: "aws-saa",
    label: "AWS SAA",
    subtitle: "AWS Solutions Architect Associate · SAA-C03",
  },
  {
    key: "dsa",
    label: "DSA",
    subtitle: "Data Structures & Algorithms · JavaScript",
  },
  {
    key: "dsa-patterns",
    label: "DSA Patterns",
    subtitle: "Data Structures & Algorithms · Pattern Recognition",
  },
  {
    key: "realworld",
    label: "Real World",
    subtitle: "Applied coding + AI red-team · JavaScript",
  },
];

const TRACK_KEYS = new Set(TRACKS.map((t) => t.key));

const DSA_INTRO =
  "Write a JavaScript solution and run it against test cases. Any correct implementation passes — solve it however you like. Code runs locally in a sandboxed worker.";
const RW_INTRO =
  "Practical problems plus AI red-team drills. On red-team cards, a coding model already shipped the starter and claimed it was done. Run the tests, find the failure (unsafe code, faked passes, confidently wrong logic), and patch it to production standard. Any correct fix passes. Code runs locally in a sandboxed worker.";

function trackFromHash() {
  const { track } = parseHash();
  return TRACK_KEYS.has(track) ? track : "aws-saa";
}

export default function App() {
  const [track, setTrack] = useState(trackFromHash);
  const active = TRACKS.find((t) => t.key === track);

  useEffect(() => {
    function onHash() {
      setTrack(trackFromHash());
    }
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) writeHash(trackFromHash());
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <div className="app">
      <header className="app__header">
        <h1>Test Prep &amp; Upkeep</h1>
        <p className="app__subtitle">{active.subtitle}</p>
        <nav className="tabs">
          {TRACKS.map((t) => (
            <a
              key={t.key}
              href={trackHref(t.key)}
              className={`tab ${track === t.key ? "tab--on" : ""}`}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="app__main">
        {track === "aws-saa" && <AwsTrack />}
        {track === "dsa-patterns" && <PatternTrack />}
        {track === "dsa" && (
          <CodeTrack
            trackKey="dsa"
            title="DSA Practice"
            intro={DSA_INTRO}
            problems={dsaProblems}
            topics={dsaTopics}
          />
        )}
        {track === "realworld" && (
          <CodeTrack
            trackKey="realworld"
            title="Real World Practice"
            intro={RW_INTRO}
            problems={rwProblems}
            topics={rwTopics}
          />
        )}
      </main>

      <footer className="app__footer">
        Local-only practice. Progress is saved in your browser (localStorage).
      </footer>
    </div>
  );
}
