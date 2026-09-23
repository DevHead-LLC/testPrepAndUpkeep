// Client-only step tracing: instrument learner JS, then collect a frame timeline.
import * as acorn from "acorn";
import { recursive } from "acorn-walk";

export const TRACE_FRAME_CAP = 400;

const MUTATORS = new Set([
  "push",
  "pop",
  "shift",
  "unshift",
  "set",
  "add",
  "delete",
  "splice",
]);

function lineOf(node) {
  return node?.loc?.start?.line ?? 1;
}

function localsExpr(names) {
  if (!names.length) return "{}";
  const parts = names
    .map((n) => `try{L[${JSON.stringify(n)}]=${n}}catch(_e){}`)
    .join(";");
  return `(()=>{const L={};${parts};return L})()`;
}

function traceCall(event, line, names, meta = {}) {
  const forVars = meta.forVars ?? [];
  const inWhile = !!meta.inWhile;
  const loopKind = meta.loopKind ?? null;
  return `__trace({event:${JSON.stringify(event)},line:${line},locals:${localsExpr(names)},forVars:${JSON.stringify(forVars)},inWhile:${inWhile},loopKind:${JSON.stringify(loopKind)}})`;
}

function collectBindingNames(pattern, into) {
  if (!pattern) return;
  if (pattern.type === "Identifier") {
    into.add(pattern.name);
    return;
  }
  if (pattern.type === "AssignmentPattern") {
    collectBindingNames(pattern.left, into);
    return;
  }
  if (pattern.type === "RestElement") {
    collectBindingNames(pattern.argument, into);
    return;
  }
  if (pattern.type === "ArrayPattern") {
    for (const el of pattern.elements ?? []) collectBindingNames(el, into);
    return;
  }
  if (pattern.type === "ObjectPattern") {
    for (const prop of pattern.properties ?? []) {
      if (prop.type === "RestElement") collectBindingNames(prop.argument, into);
      else collectBindingNames(prop.value, into);
    }
  }
}

function isMutatorCall(node) {
  return (
    node?.type === "CallExpression" &&
    node.callee?.type === "MemberExpression" &&
    !node.callee.computed &&
    node.callee.property?.type === "Identifier" &&
    MUTATORS.has(node.callee.property.name)
  );
}

function containsMutatorCall(node) {
  if (!node || typeof node !== "object") return false;
  if (isMutatorCall(node)) return true;
  for (const key of Object.keys(node)) {
    if (key === "loc" || key === "range" || key === "start" || key === "end") continue;
    const child = node[key];
    if (Array.isArray(child)) {
      if (child.some(containsMutatorCall)) return true;
    } else if (child && typeof child === "object" && child.type) {
      if (containsMutatorCall(child)) return true;
    }
  }
  return false;
}

/**
 * Rewrite source so interesting statements call __trace({event,line,locals,...}).
 * Returns { ok, instrumentedSource } or { ok:false, error }.
 */
export function instrumentForTrace(source) {
  let ast;
  try {
    ast = acorn.parse(source, {
      ecmaVersion: "latest",
      locations: true,
      sourceType: "script",
    });
  } catch (err) {
    return { ok: false, error: String(err?.message ?? err) };
  }

  /** @type {{ index: number, text: string, order: number }[]} */
  const edits = [];

  /** @type {{ names: Set<string>, forVars: Set<string>, inWhile: boolean }[]} */
  const scopeStack = [{ names: new Set(), forVars: new Set(), inWhile: false }];

  function currentNames() {
    const names = new Set();
    for (const scope of scopeStack) {
      for (const n of scope.names) names.add(n);
    }
    return [...names].sort();
  }

  function currentMeta(extra = {}) {
    const parent = scopeStack[scopeStack.length - 1];
    return {
      forVars: [...parent.forVars].sort(),
      inWhile: parent.inWhile,
      ...extra,
    };
  }

  function pushScope({ extraNames = [], forVars = [], inWhile = false } = {}) {
    const parent = scopeStack[scopeStack.length - 1];
    const nextFor = new Set(parent.forVars);
    for (const n of forVars) nextFor.add(n);
    scopeStack.push({
      names: new Set(extraNames),
      forVars: nextFor,
      inWhile: parent.inWhile || inWhile,
    });
  }

  function popScope() {
    scopeStack.pop();
  }

  function declare(pattern) {
    collectBindingNames(pattern, scopeStack[scopeStack.length - 1].names);
  }

  function insertBefore(index, text) {
    edits.push({ index, text, order: 0 });
  }

  function insertAfter(index, text) {
    edits.push({ index, text, order: 1 });
  }

  function afterStmt(stmt, event) {
    insertAfter(
      stmt.end,
      `;${traceCall(event, lineOf(stmt), currentNames(), currentMeta())}`,
    );
  }

  function ensureLoopBody(node, loopKind) {
    const body = node.body;
    if (!body) return;
    const call = `${traceCall("loop", lineOf(node), currentNames(), currentMeta({ loopKind }))};`;
    if (body.type === "BlockStatement") {
      insertBefore(body.start + 1, call);
      return;
    }
    insertBefore(body.start, `{${call}`);
    insertAfter(body.end, `}`);
  }

  function paramsOf(node) {
    const names = new Set();
    for (const param of node.params ?? []) collectBindingNames(param, names);
    return [...names];
  }

  function walkExprs(node, state, c) {
    if (!node) return;
    c(node, state);
  }

  function forInitBindings(init) {
    const names = new Set();
    if (!init) return names;
    if (init.type === "VariableDeclaration") {
      for (const d of init.declarations) collectBindingNames(d.id, names);
    } else if (init.type === "AssignmentExpression") {
      collectBindingNames(init.left, names);
    }
    return names;
  }

  /** Instrument a statement that appears in a statement list (not for-init). */
  function instrumentStmt(stmt, state, c) {
    switch (stmt.type) {
      case "VariableDeclaration": {
        for (const d of stmt.declarations) {
          declare(d.id);
          if (d.init) walkExprs(d.init, state, c);
        }
        afterStmt(stmt, "assign");
        return;
      }
      case "ExpressionStatement": {
        walkExprs(stmt.expression, state, c);
        const expr = stmt.expression;
        if (
          expr.type === "AssignmentExpression" ||
          expr.type === "UpdateExpression"
        ) {
          afterStmt(stmt, "assign");
        } else if (containsMutatorCall(expr)) {
          afterStmt(stmt, "call");
        }
        return;
      }
      case "ReturnStatement": {
        if (stmt.argument) walkExprs(stmt.argument, state, c);
        insertBefore(
          stmt.start,
          `${traceCall("return", lineOf(stmt), currentNames(), currentMeta())};`,
        );
        return;
      }
      case "ForStatement": {
        const loopVars = [...forInitBindings(stmt.init)];
        pushScope({ forVars: loopVars });
        if (stmt.init) {
          if (stmt.init.type === "VariableDeclaration") {
            for (const d of stmt.init.declarations) {
              declare(d.id);
              if (d.init) walkExprs(d.init, state, c);
            }
          } else {
            walkExprs(stmt.init, state, c);
          }
        }
        if (stmt.test) walkExprs(stmt.test, state, c);
        if (stmt.update) walkExprs(stmt.update, state, c);
        ensureLoopBody(stmt, "for");
        c(stmt.body, state);
        popScope();
        return;
      }
      case "ForOfStatement":
      case "ForInStatement": {
        const loopVars = new Set();
        if (stmt.left.type === "VariableDeclaration") {
          for (const d of stmt.left.declarations) collectBindingNames(d.id, loopVars);
        } else {
          collectBindingNames(stmt.left, loopVars);
        }
        pushScope({ forVars: [...loopVars] });
        if (stmt.left.type === "VariableDeclaration") {
          for (const d of stmt.left.declarations) declare(d.id);
        } else {
          declare(stmt.left);
        }
        walkExprs(stmt.right, state, c);
        ensureLoopBody(stmt, stmt.type === "ForOfStatement" ? "for-of" : "for-in");
        c(stmt.body, state);
        popScope();
        return;
      }
      case "WhileStatement": {
        walkExprs(stmt.test, state, c);
        pushScope({ inWhile: true });
        ensureLoopBody(stmt, "while");
        c(stmt.body, state);
        popScope();
        return;
      }
      case "DoWhileStatement": {
        pushScope({ inWhile: true });
        ensureLoopBody(stmt, "do-while");
        c(stmt.body, state);
        popScope();
        walkExprs(stmt.test, state, c);
        return;
      }
      case "BlockStatement": {
        c(stmt, state);
        return;
      }
      case "IfStatement": {
        walkExprs(stmt.test, state, c);
        c(stmt.consequent, state);
        if (stmt.alternate) c(stmt.alternate, state);
        return;
      }
      case "SwitchStatement": {
        walkExprs(stmt.discriminant, state, c);
        for (const cs of stmt.cases) {
          if (cs.test) walkExprs(cs.test, state, c);
          for (const s of cs.consequent) instrumentStmt(s, state, c);
        }
        return;
      }
      case "TryStatement": {
        c(stmt.block, state);
        if (stmt.handler) {
          pushScope();
          if (stmt.handler.param) declare(stmt.handler.param);
          c(stmt.handler.body, state);
          popScope();
        }
        if (stmt.finalizer) c(stmt.finalizer, state);
        return;
      }
      case "FunctionDeclaration": {
        declare(stmt.id);
        pushScope({ extraNames: paramsOf(stmt) });
        c(stmt.body, state);
        popScope();
        return;
      }
      case "ClassDeclaration": {
        if (stmt.id) declare(stmt.id);
        return;
      }
      default: {
        c(stmt, state);
      }
    }
  }

  recursive(ast, null, {
    Program(node, state, c) {
      for (const stmt of node.body) instrumentStmt(stmt, state, c);
    },
    BlockStatement(node, state, c) {
      pushScope();
      for (const stmt of node.body) instrumentStmt(stmt, state, c);
      popScope();
    },
    FunctionExpression(node, state, c) {
      const extras = node.id ? [node.id.name, ...paramsOf(node)] : paramsOf(node);
      pushScope({ extraNames: extras });
      c(node.body, state);
      popScope();
    },
    ArrowFunctionExpression(node, state, c) {
      pushScope({ extraNames: paramsOf(node) });
      if (node.expression) {
        const names = currentNames();
        const meta = currentMeta();
        insertBefore(
          node.body.start,
          `{${traceCall("assign", lineOf(node.body), names, meta)};return (`,
        );
        insertAfter(
          node.body.end,
          `);${traceCall("return", lineOf(node.body), names, meta)}}`,
        );
        walkExprs(node.body, state, c);
      } else {
        c(node.body, state);
      }
      popScope();
    },
    FunctionDeclaration() {},
    VariableDeclaration() {},
    ExpressionStatement() {},
    ReturnStatement() {},
    ForStatement() {},
    ForOfStatement() {},
    ForInStatement() {},
    WhileStatement() {},
    DoWhileStatement() {},
    IfStatement() {},
    SwitchStatement() {},
    TryStatement() {},
    ClassDeclaration() {},
  });

  edits.sort((a, b) => b.index - a.index || b.order - a.order);

  let out = source;
  for (const edit of edits) {
    out = out.slice(0, edit.index) + edit.text + out.slice(edit.index);
  }

  return { ok: true, instrumentedSource: out };
}

function previewValue(value, depth = 0) {
  if (value === undefined) return "undefined";
  if (value === null) return null;
  if (typeof value === "function") return "[Function]";
  if (typeof value === "symbol") return value.toString();
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value !== "object") {
    if (typeof value === "number" && !Number.isFinite(value)) return String(value);
    return value;
  }
  if (depth >= 4) return "[…]";

  if (value instanceof Map) {
    const entries = [...value.entries()].slice(0, 40).map(([k, v]) => [
      previewValue(k, depth + 1),
      previewValue(v, depth + 1),
    ]);
    if (value.size > 40) entries.push([`…(+${value.size - 40})`, null]);
    return { __type: "Map", entries };
  }
  if (value instanceof Set) {
    const values = [...value].slice(0, 40).map((v) => previewValue(v, depth + 1));
    if (value.size > 40) values.push(`…(+${value.size - 40})`);
    return { __type: "Set", values };
  }
  if (Array.isArray(value)) {
    const items = value.slice(0, 40).map((v) => previewValue(v, depth + 1));
    if (value.length > 40) items.push(`…(+${value.length - 40})`);
    return items;
  }

  const out = {};
  const keys = Object.keys(value).slice(0, 40);
  for (const key of keys) {
    try {
      out[key] = previewValue(value[key], depth + 1);
    } catch {
      out[key] = "[unreadable]";
    }
  }
  if (Object.keys(value).length > 40) out["…"] = `+${Object.keys(value).length - 40}`;
  return out;
}

export function snapshotLocals(locals) {
  const out = {};
  for (const [key, value] of Object.entries(locals ?? {})) {
    if (typeof value === "function") continue;
    try {
      out[key] = previewValue(value);
    } catch {
      out[key] = "[unreadable]";
    }
  }
  return out;
}

/** Human-readable value for the tracer state list. */
export function formatTraceValue(value) {
  if (value === "undefined") return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (Array.isArray(value)) {
    return `[${value.map((v) => formatTraceValue(v)).join(", ")}]`;
  }
  if (value && typeof value === "object") {
    if (value.__type === "Map") {
      const entries = (value.entries ?? [])
        .map(([k, v]) => `${formatTraceValue(k)} => ${formatTraceValue(v)}`)
        .join(", ");
      return `Map { ${entries} }`;
    }
    if (value.__type === "Set") {
      return `Set { ${(value.values ?? []).map(formatTraceValue).join(", ")} }`;
    }
    const keys = Object.keys(value);
    return `{ ${keys.map((k) => `${k}: ${formatTraceValue(value[k])}`).join(", ")} }`;
  }
  return String(value);
}

/**
 * Build labeled state lines for the tracer panel.
 * Example:
 *   var answer: [0, 0, 0]
 *   var stack: [0]
 *   For loop: i = 1
 *   while loop: true
 */
export function formatTraceState(frame) {
  if (!frame) return [];
  const locals = frame.locals ?? {};
  const forVars = new Set(frame.forVars ?? []);
  const names = Object.keys(locals).sort();
  const lines = [];

  for (const name of names) {
    if (forVars.has(name)) continue;
    lines.push(`var ${name}: ${formatTraceValue(locals[name])}`);
  }
  for (const name of [...forVars].sort()) {
    if (!(name in locals)) continue;
    const label =
      frame.loopKind === "for-of"
        ? "For-of loop"
        : frame.loopKind === "for-in"
          ? "For-in loop"
          : "For loop";
    lines.push(`${label}: ${name} = ${formatTraceValue(locals[name])}`);
  }
  // Inside a while/do-while body the condition was true for this iteration.
  if (frame.inWhile) {
    lines.push("while loop: true");
  }
  return lines;
}

/**
 * Build a __trace recorder used while running instrumented code.
 */
export function createTraceRecorder(frameCap = TRACE_FRAME_CAP) {
  const frames = [];
  let capped = false;

  function __trace(frame) {
    if (capped) return;
    if (frames.length >= frameCap) {
      capped = true;
      const err = new Error("TRACE_CAP");
      err.code = "TRACE_CAP";
      throw err;
    }
    frames.push({
      event: frame.event,
      line: frame.line,
      locals: snapshotLocals(frame.locals),
      forVars: Array.isArray(frame.forVars) ? [...frame.forVars] : [],
      inWhile: !!frame.inWhile,
      loopKind: frame.loopKind ?? null,
    });
  }

  return {
    __trace,
    get frames() {
      return frames;
    },
    get capped() {
      return capped;
    },
  };
}
