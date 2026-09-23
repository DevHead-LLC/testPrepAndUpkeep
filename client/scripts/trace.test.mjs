import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  instrumentForTrace,
  createTraceRecorder,
  formatTraceState,
  TRACE_FRAME_CAP,
} from "../src/engine/dsa/trace.js";
import { evaluateSolution } from "../src/engine/dsa/evaluate.js";

const warmerSource = `function daysUntilWarmer(readings) {
  const result = Array(readings.length).fill(0);
  const stack = [];

  for (let i = 0; i < readings.length; i++) {
    while (stack.length && readings[i] > readings[stack[stack.length - 1]]) {
      const previous = stack.pop();
      result[previous] = i - previous;
    }

    stack.push(i);
  }

  return result;
}
`;

describe("instrumentForTrace", () => {
  it("parses and injects __trace calls", () => {
    const result = instrumentForTrace(warmerSource);
    assert.equal(result.ok, true);
    assert.match(result.instrumentedSource, /__trace\(\{event:"assign"/);
    assert.match(result.instrumentedSource, /__trace\(\{event:"loop"/);
    assert.match(result.instrumentedSource, /__trace\(\{event:"call"/);
    assert.match(result.instrumentedSource, /__trace\(\{event:"return"/);
    assert.match(result.instrumentedSource, /inWhile:true/);
    assert.match(result.instrumentedSource, /forVars:\["i"\]/);
  });

  it("returns a parse error for invalid source", () => {
    const result = instrumentForTrace("function broken( {");
    assert.equal(result.ok, false);
    assert.ok(result.error);
  });
});

describe("evaluateSolution mode trace", () => {
  it("records assign, loop, call, and return frames for a monotonic stack", () => {
    const res = evaluateSolution({
      mode: "trace",
      source: warmerSource,
      fnName: "daysUntilWarmer",
      tests: [
        {
          input: [[73, 74, 75, 71, 69, 72, 76, 73]],
          expected: [1, 1, 4, 2, 1, 1, 0, 0],
        },
      ],
    });

    assert.equal(res.compileError, undefined);
    assert.equal(res.error, undefined);
    assert.ok(res.frames.length > 10);
    const events = new Set(res.frames.map((f) => f.event));
    assert.ok(events.has("assign"));
    assert.ok(events.has("loop"));
    assert.ok(events.has("call"));
    assert.ok(events.has("return"));

    const whileFrame = res.frames.find((f) => f.inWhile && f.event === "loop");
    assert.ok(whileFrame, "expected a while-loop frame");
    assert.deepEqual(whileFrame.forVars, ["i"]);

    const withStack = res.frames.find(
      (f) => Array.isArray(f.locals.stack) && f.locals.stack.length > 0,
    );
    assert.ok(withStack, "expected a frame that shows a non-empty stack");

    const lines = formatTraceState(withStack);
    assert.ok(lines.some((l) => l.startsWith("var stack:")));
    assert.ok(lines.some((l) => l.startsWith("For loop: i =")));
  });

  it("formatTraceState shows while loop true inside while body", () => {
    const res = evaluateSolution({
      mode: "trace",
      source: warmerSource,
      fnName: "daysUntilWarmer",
      tests: [
        {
          input: [[73, 74, 75, 71, 69, 72, 76, 73]],
          expected: [1, 1, 4, 2, 1, 1, 0, 0],
        },
      ],
    });
    const insideWhile = res.frames.find(
      (f) => f.inWhile && f.locals.previous !== undefined,
    );
    assert.ok(insideWhile);
    const lines = formatTraceState(insideWhile);
    assert.ok(lines.includes("while loop: true"));
    assert.ok(lines.some((l) => l.startsWith("var previous:")));
  });

  it("caps the timeline when frameCap is tiny", () => {
    const res = evaluateSolution({
      mode: "trace",
      source: warmerSource,
      fnName: "daysUntilWarmer",
      frameCap: 5,
      tests: [
        {
          input: [[73, 74, 75, 71, 69, 72, 76, 73]],
          expected: [1, 1, 4, 2, 1, 1, 0, 0],
        },
      ],
    });
    assert.equal(res.capped, true);
    assert.equal(res.frames.length, 5);
  });

  it("leaves uninstrumented grading path unchanged", () => {
    const res = evaluateSolution({
      source: warmerSource,
      fnName: "daysUntilWarmer",
      tests: [
        {
          input: [[73, 74, 75, 71, 69, 72, 76, 73]],
          expected: [1, 1, 4, 2, 1, 1, 0, 0],
        },
      ],
    });
    assert.equal(res.results.length, 1);
    assert.equal(res.results[0].pass, true);
    assert.equal(res.frames, undefined);
  });
});

describe("createTraceRecorder", () => {
  it("throws TRACE_CAP after the limit", () => {
    const recorder = createTraceRecorder(2);
    recorder.__trace({ event: "assign", line: 1, locals: { a: 1 } });
    recorder.__trace({ event: "assign", line: 2, locals: { a: 2 } });
    assert.throws(
      () => recorder.__trace({ event: "loop", line: 3, locals: {} }),
      (err) => err?.code === "TRACE_CAP" || err?.message === "TRACE_CAP",
    );
    assert.equal(recorder.capped, true);
    assert.equal(recorder.frames.length, 2);
    assert.equal(TRACE_FRAME_CAP, 400);
  });
});
