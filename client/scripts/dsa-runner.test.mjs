import test from "node:test";
import assert from "node:assert/strict";
import { Worker as NodeWorker } from "node:worker_threads";
import { problems, problemById } from "../src/content/dsa/problems.js";
import { tipsByProblemId } from "../src/content/dsa/tips.js";
import { evaluateSolution } from "../src/engine/dsa/evaluate.js";
import { runSolution } from "../src/engine/dsa/runner.js";

function run(id, source, tests) {
  const problem = problemById[id];
  return evaluateSolution({ ...problem, source, tests: tests ?? problem.tests });
}

function assertPasses(result) {
  assert(!result.compileError && !result.error && !result.timedOut, JSON.stringify(result));
  assert(result.results.length > 0);
  assert(result.results.every((r) => r.pass), JSON.stringify(result.results.filter((r) => !r.pass)));
}

test("all 47 reference solutions pass visible and hidden cases without mutating fixtures", () => {
  const before = JSON.stringify(problems);
  for (const problem of problems) {
    assertPasses(run(problem.id, tipsByProblemId[problem.id].solution));
  }
  assert.equal(JSON.stringify(problems), before);
});

test("the grader rejects each unfinished starter", () => {
  for (const problem of problems) {
    const result = run(problem.id, problem.starter);
    assert(result.compileError || result.results.some((r) => !r.pass), problem.id);
  }
});

test("Slide Zeros Back grades the original array, with or without a return value", () => {
  const id = "dsa-slide-zeros-back";
  assertPasses(run(id, tipsByProblemId[id].solution));
  assertPasses(run(id, `function slideZerosBack(values) {
    let write = 0;
    for (let read = 0; read < values.length; read++) {
      if (values[read] !== 0) {
        [values[write], values[read]] = [values[read], values[write]];
        write++;
      }
    }
    return values;
  }`));
  const fixture = problemById[id].tests[0];
  const incorrect = [
    "function slideZerosBack(values) { return values.filter(n => n !== 0).concat(values.filter(n => n === 0)); }",
    "function slideZerosBack(values) { values = [4,5,6,0,0,0]; return values; }",
    "function slideZerosBack(values) { let w=0; for (const n of values) if(n!==0) values[w++]=n; }",
    "function slideZerosBack(values) { values.push(0,0); }",
    "function slideZerosBack(values) { values.splice(0, values.length, 6,5,4,0,0,0); }",
    "function slideZerosBack(values) { values.splice(0, values.length, 4,5,6); }",
  ];
  for (const source of incorrect) {
    const result = run(id, source, [fixture]);
    assert.equal(result.results[0].pass, false, source);
  }
  const returnedOnly = run(id, incorrect[0], [fixture]).results[0];
  assert.equal(returnedOnly.got, JSON.stringify(fixture.input[0]));
  assert.equal(returnedOnly.expected, JSON.stringify(fixture.expected));
});

test("permutations and top-K accept alternate order, but reject duplicates or missing results", () => {
  for (const id of ["dsa-all-arrangements", "dsa-k-biggest-values"]) {
    const p = problemById[id];
    const solution = tipsByProblemId[id].solution.replace(`function ${p.fnName}(`, "function reference(");
    assertPasses(run(id, `${solution}\nfunction ${p.fnName}(...args) { return reference(...args).reverse(); }`));
    const fixture = p.tests[0];
    const wrong = fixture.expected.map(() => fixture.expected[0]);
    assert(!run(id, `function ${p.fnName}() { return ${JSON.stringify(wrong)}; }`, [fixture]).results[0].pass);
    assert(!run(id, `function ${p.fnName}() { return []; }`, [fixture]).results[0].pass);
  }
});

test("topological grading accepts any full valid order and rejects invalid orders", () => {
  const fixture = problemById["dsa-task-dependency-order"].tests[0];
  assertPasses(run("dsa-task-dependency-order", "function taskOrder() { return [0,2,1,3]; }", [fixture]));
  for (const order of [[0,1,1,3], [3,2,1,0], [0,1], [0,1,2,4], [0,1,2,3,4], []]) {
    assert(!run("dsa-task-dependency-order", `function taskOrder() { return ${JSON.stringify(order)}; }`, [fixture]).results[0].pass);
  }
  const cycle = problemById["dsa-task-dependency-order"].tests[1];
  assertPasses(run("dsa-task-dependency-order", "function taskOrder() { return []; }", [cycle]));
  assert(!run("dsa-task-dependency-order", "function taskOrder() { return [0,1]; }", [cycle]).results[0].pass);
});

test("list reversal rejects copied nodes, changed values, missing nodes, and cycles", () => {
  const fixture = problemById["dsa-flip-chain"].tests[0];
  const wrongSolutions = [
    "function flipChain(head) { let out = null; while (head) { out = {val: head.val, next: out}; head = head.next; } return out; }",
    "function flipChain(head) { const a=[]; for(let n=head;n;n=n.next) a.push(n.val); a.reverse(); for(let n=head;n;n=n.next) n.val=a.shift(); return head; }",
    "function flipChain(head) { return head.next; }",
    "function flipChain(head) { let prev=null, n=head; while(n) { const next=n.next; n.next=prev; prev=n; n=next; } head.next=prev; return prev; }",
  ];
  for (const source of wrongSolutions) {
    assert(!run("dsa-flip-chain", source, [fixture]).results[0].pass);
  }
});

test("cycle detection uses node identity, including self-loops and duplicate values", () => {
  assertPasses(run("dsa-loop-in-chain", `function chainHasLoop(head) {
    const seen = new Set();
    while (head) { if (seen.has(head)) return true; seen.add(head); head = head.next; }
    return false;
  }`));
  const wrong = run("dsa-loop-in-chain", `function chainHasLoop(head) {
    const seen = new Set();
    while (head) { if (seen.has(head.val)) return true; seen.add(head.val); head = head.next; }
    return false;
  }`);
  assert(wrong.results.some((r) => !r.pass));
});

test("syntax errors, missing functions, and thrown errors have usable results", () => {
  assert(run("dsa-range-total-queries", "function batchRangeTotals( {").compileError);
  assert.match(run("dsa-range-total-queries", "function other() {}").compileError, /batchRangeTotals/);
  const thrown = run("dsa-range-total-queries", 'function batchRangeTotals() { throw new Error("example failure"); }');
  assert(thrown.results.every((r) => !r.pass && r.error === "example failure"));
});

test("browser runner protocol passes adapters and validators through a worker and stops infinite loops", async () => {
  const original = globalThis.Worker;
  globalThis.Worker = class {
    constructor(url) {
      this.worker = new NodeWorker(new URL("./helpers/dsa-worker.mjs", import.meta.url), { workerData: { url: url.href } });
      this.worker.on("message", (data) => this.onmessage?.({ data }));
      this.worker.on("error", (error) => this.onerror?.(error));
    }
    postMessage(data) { this.worker.postMessage(data); }
    terminate() { this.worker.terminate(); }
  };
  try {
    for (const id of ["dsa-slide-zeros-back", "dsa-loop-in-chain", "dsa-flip-chain", "dsa-node-left-right-walk", "dsa-level-by-level-walk", "dsa-all-arrangements", "dsa-k-biggest-values", "dsa-task-dependency-order", "dsa-disjoint-groups", "dsa-matching-pair"]) {
      assertPasses(await runSolution({ ...problemById[id], source: tipsByProblemId[id].solution }));
    }
    const timed = await runSolution({ fnName: "forever", source: "function forever() { while (true) {} }", tests: [{ input: [], expected: null }], timeoutMs: 200 });
    assert.equal(timed.timedOut, true);
    assert.deepEqual(timed.results, []);
  } finally {
    if (original === undefined) delete globalThis.Worker;
    else globalThis.Worker = original;
  }
});
