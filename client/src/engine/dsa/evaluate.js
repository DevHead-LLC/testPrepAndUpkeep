// Runs user-submitted JavaScript against a problem's test cases.
// This executes in a Web Worker so a runaway loop can be terminated by the
// caller without freezing the UI. Code is the user's own, run locally only.
//
// Two problem kinds:
//  - "function" (default): user defines a function `fnName`; each test has
//    { input: [...args], expected }.
//  - "design": user defines a class `className`; each test has
//    { ops: string[], args: any[][], expected: any[] } where ops[0] is the
//    constructor name and the rest are method calls (ops/args/expected sequence).

import { prepareInput, inspectReversedList } from "./fixtures.js";

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (typeof a === "number" && Number.isNaN(a) && Number.isNaN(b)) return true;
  if (a && b && typeof a === "object") {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

function matches(got, test, outputKind) {
  if (outputKind === "unordered") {
    if (!Array.isArray(got) || got.length !== test.expected.length) return false;
    const remaining = [...test.expected];
    for (const item of got) {
      const index = remaining.findIndex((expected) => deepEqual(item, expected));
      if (index === -1) return false;
      remaining.splice(index, 1);
    }
    return true;
  }
  if (outputKind === "topological-order") {
    if (test.expected.length === 0) return deepEqual(got, []);
    const [count, prerequisites] = test.input;
    if (!Array.isArray(got) || got.length !== count || new Set(got).size !== count) return false;
    if (got.some((node) => !Number.isInteger(node) || node < 0 || node >= count)) return false;
    const positions = new Map(got.map((node, index) => [node, index]));
    return prerequisites.every(([course, prerequisite]) => positions.get(prerequisite) < positions.get(course));
  }
  return deepEqual(got, test.expected);
}

function preview(value) {
  if (value === undefined) return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

function compile(source, name) {
  return new Function(
    `${source}\n; return typeof ${name} !== "undefined" ? ${name} : undefined;`,
  )();
}

function runFunction({ source, fnName, tests, inputKind, outputKind }) {
  let fn;
  try {
    fn = compile(source, fnName);
  } catch (err) {
    return { compileError: String(err?.message ?? err), results: [] };
  }
  if (typeof fn !== "function") {
    return {
      compileError: `Could not find a function named "${fnName}". Make sure your code defines it.`,
      results: [],
    };
  }

  const results = tests.map((t, i) => {
    const input = preview(t.input);
    try {
      const { args, nodes } = prepareInput(t.input, inputKind);
      const got = fn(...args);
      const actual = outputKind === "mutated-first-arg" ? args[0] : got;
      const reversed = inputKind === "linked-list"
        ? inspectReversedList(got, nodes, t.input[0])
        : null;
      return {
        i,
        pass: reversed ? reversed.pass : matches(actual, t, outputKind),
        got: preview(reversed ? reversed.output : actual),
        expected: preview(t.expected),
        input,
        error: null,
      };
    } catch (err) {
      return {
        i,
        pass: false,
        got: undefined,
        expected: preview(t.expected),
        input,
        error: String(err?.message ?? err),
      };
    }
  });
  return { results };
}

function runDesign({ source, className, tests }) {
  let Ctor;
  try {
    Ctor = compile(source, className);
  } catch (err) {
    return { compileError: String(err?.message ?? err), results: [] };
  }
  if (typeof Ctor !== "function") {
    return {
      compileError: `Could not find a class named "${className}". Make sure your code defines it.`,
      results: [],
    };
  }

  const results = tests.map((t, i) => {
    try {
      let instance = null;
      const out = [];
      for (let k = 0; k < t.ops.length; k++) {
        const op = t.ops[k];
        const args = structuredClone(t.args[k] ?? []);
        if (k === 0) {
          instance = new Ctor(...args);
          out.push(null);
        } else {
          const r = instance[op](...args);
          out.push(r === undefined ? null : r);
        }
      }
      return {
        i,
        pass: deepEqual(out, t.expected),
        got: preview(out),
        expected: preview(t.expected),
        input: preview(t.ops),
        error: null,
      };
    } catch (err) {
      return {
        i,
        pass: false,
        got: undefined,
        expected: preview(t.expected),
        input: preview(t.ops),
        error: String(err?.message ?? err),
      };
    }
  });
  return { results };
}

export function evaluateSolution(data) {
  return data.kind === "design" ? runDesign(data) : runFunction(data);
}
