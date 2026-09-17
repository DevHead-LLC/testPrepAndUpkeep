// Runs a solution against tests in a Web Worker with a hard timeout.
// Resolves to one of:
//   { results: [...] }                      normal run
//   { compileError: string, results: [] }   code didn't compile / fn missing
//   { timedOut: true, results: [] }          exceeded timeoutMs (e.g. infinite loop)
//   { error: string, results: [] }           unexpected worker error

export function runSolution({
  source,
  fnName,
  className,
  kind = "function",
  tests,
  inputKind,
  outputKind,
  timeoutMs = 3000,
}) {
  return new Promise((resolve) => {
    let worker;
    try {
      worker = new Worker(new URL("./worker.js", import.meta.url), {
        type: "module",
      });
    } catch (err) {
      resolve({ error: `Could not start runner: ${err}`, results: [] });
      return;
    }

    const timer = setTimeout(() => {
      worker.terminate();
      resolve({ timedOut: true, results: [] });
    }, timeoutMs);

    worker.onmessage = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(e.data);
    };

    worker.onerror = (e) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ error: e.message || "Runner error", results: [] });
    };

    worker.postMessage({ source, fnName, className, kind, tests, inputKind, outputKind });
  });
}
