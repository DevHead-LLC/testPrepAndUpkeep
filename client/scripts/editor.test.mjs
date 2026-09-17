import test from "node:test";
import assert from "node:assert/strict";
import { MAX_UNDO, pushSnapshot, pairEdit, enterEdit } from "../src/engine/editor.js";

function type(marked, key) {
  const start = marked.indexOf("|");
  const value = marked.replace("|", "");
  const change = pairEdit(value, start, start, key);
  // Apply normal browser behavior when the helper declines to handle a key.
  if (change) return change.code.slice(0, change.selStart) + "|" + change.code.slice(change.selStart);
  if (key === "Backspace") return value.slice(0, Math.max(0, start - 1)) + "|" + value.slice(start);
  return value.slice(0, start) + key + "|" + value.slice(start);
}

test("ten retained edits can be undone and redone with a bounded history", () => {
  const undo = [], redo = [];
  let current = { code: "0", selStart: 1, selEnd: 1 };
  for (let i = 1; i <= 15; i++) {
    pushSnapshot(undo, current);
    current = { code: String(i), selStart: String(i).length, selEnd: String(i).length };
  }
  assert.equal(MAX_UNDO, 10);
  assert.equal(undo.length, 10);
  while (undo.length) { pushSnapshot(redo, current); current = undo.pop(); }
  assert.equal(current.code, "5");
  assert.equal(redo.length, 10);
  while (redo.length) { pushSnapshot(undo, current); current = redo.pop(); }
  assert.deepEqual(current, { code: "15", selStart: 2, selEnd: 2 });
  assert.equal(undo.length, 10);
});

test("brackets auto-close in code but insert once inside single and double quotes", () => {
  for (const [open, close] of [["(", ")"], ["[", "]"], ["{", "}"]]) {
    assert.equal(type("const x = |", open), `const x = ${open}|${close}`);
    for (const quote of ["'", '"']) {
      assert.equal(type(`const x = ${quote}|${quote}`, open), `const x = ${quote}${open}|${quote}`);
    }
  }
  assert.equal(type('const x = "it|"', "'"), 'const x = "it\'|"');
  assert.equal(type("const x = '|';\nconst y = 1;", '"'), "const x = '\"|';\nconst y = 1;");
});

test("escaped quotes keep string context, escaped closing quotes are not skipped", () => {
  assert.equal(type(String.raw`const s = "a\"b|";`, "("), String.raw`const s = "a\"b(|";`);
  assert.equal(type(String.raw`const s = "\|";`, '"'), String.raw`const s = "\"|";`);
  assert.equal(type(String.raw`const s = "\\|";`, '"'), String.raw`const s = "\\"|;`);
  assert.equal(type('const s = "done"; |', "["), 'const s = "done"; [|]');
});

test("comments and template text do not pair, template expressions do", () => {
  assert.equal(type('// a "quote |', "("), '// a "quote (|');
  assert.equal(type('/* "quote */\n|', "("), '/* "quote */\n(|)');
  assert.equal(type('// "\n|', "("), '// "\n(|)');
  assert.equal(type('const s = `hello |`', "["), 'const s = `hello [|`');
  assert.equal(type('const s = `${fn|}`', "("), 'const s = `${fn(|)}`');
  assert.equal(type('const s = `${{x: "ok"}.x} |`', "["), 'const s = `${{x: "ok"}.x} [|`');
});

test("pair deletion and closing-character skipping do not swallow literal string characters", () => {
  assert.equal(type("(|)", "Backspace"), "|");
  assert.equal(type('"|"', "Backspace"), "|");
  assert.equal(type('"(|)"', "Backspace"), '"|)"');
  assert.equal(type("abc|", "Backspace"), "ab|");
  assert.equal(type("(|)", ")"), "()|");
  assert.equal(type('"|)"', ")"), '")|)"');
  assert.equal(type('"hi|"', '"'), '"hi"|');
  assert.deepEqual(pairEdit("name", 0, 4, "("), { code: "(name)", selStart: 1, selEnd: 5 });
});

test("quotes in regular expressions do not disable pairing in later code", () => {
  assert.equal(type('const re = /[\'"]/;\n|', "("), 'const re = /[\'"]/;\n(|)');
  assert.equal(type('const re = /[|]/;', "("), 'const re = /[(|]/;');
  assert.equal(type('const n = a / b;\n|', "["), 'const n = a / b;\n[|]');
});

test("Enter expands paired brackets and indents after a lone opener", () => {
  assert.deepEqual(enterEdit("  if (ok) {}", 11, 11), { code: "  if (ok) {\n    \n  }", selStart: 16, selEnd: 16 });
  const lone = "  if (ok) {";
  assert.equal(enterEdit(lone, lone.length, lone.length).code, lone + "\n    ");
  const normal = "  return value;";
  assert.equal(enterEdit(normal, normal.length, normal.length).code, normal + "\n  ");
  const quoted = '  const s = "{}"';
  const at = quoted.indexOf("}");
  assert.equal(enterEdit(quoted, at, at).code, '  const s = "{\n  }"');
});
