// Lightweight hash routes for deep-linking tracks and code problems.
// Shape: #track  or  #track/problemId
// Enables Cmd/Ctrl-click and middle-click "open in new window" without a router.

export function parseHash(hash = window.location.hash) {
  const raw = String(hash || "").replace(/^#/, "");
  if (!raw) return { track: null, problemId: null };
  const slash = raw.indexOf("/");
  if (slash === -1) return { track: raw, problemId: null };
  const track = raw.slice(0, slash);
  const problemId = raw.slice(slash + 1);
  return {
    track: track || null,
    problemId: problemId ? decodeURIComponent(problemId) : null,
  };
}

export function problemHref(track, problemId) {
  return `#${track}/${encodeURIComponent(problemId)}`;
}

export function trackHref(track) {
  return `#${track}`;
}

export function writeHash(track, problemId = null) {
  const next = problemId ? problemHref(track, problemId) : trackHref(track);
  if (window.location.hash !== next) {
    window.location.hash = next;
  }
}
