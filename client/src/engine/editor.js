export const MAX_UNDO = 10;
const PAIRS = { "(": ")", "[": "]", "{": "}" };
const QUOTES = new Set(['"', "'", "`"]);

export function pushSnapshot(stack, snapshot) {
  stack.push({ ...snapshot });
  if (stack.length > MAX_UNDO) stack.shift();
}

// Scan only up to the caret. No parser, background process, or stored token tree.
// Template expressions return to code mode; comments and escapes hide quotes.
export function editorContext(value, offset) {
  const frames = [{ type: "code", depth: 0, regexAllowed: true }];
  for (let i = 0; i < offset; i++) {
    const frame = frames.at(-1);
    const ch = value[i], next = value[i + 1];
    if (frame.type === "line-comment") {
      if (ch === "\n") frames.pop();
    } else if (frame.type === "block-comment") {
      if (ch === "*" && next === "/" && i + 1 < offset) { frames.pop(); i++; }
    } else if (frame.type === "regex") {
      if (ch === "\\") i++;
      else if (ch === "[") frame.inClass = true;
      else if (ch === "]") frame.inClass = false;
      else if ((ch === "/" && !frame.inClass) || ch === "\n") frames.pop();
    } else if (frame.type === "string") {
      if (ch === "\\") {
        if (i + 1 === offset) return { ...frame, escaped: true };
        i++;
      } else if (ch === frame.quote) frames.pop();
      else if (frame.quote === "`" && ch === "$" && next === "{" && i + 1 < offset) {
        frames.push({ type: "code", depth: 1, interpolation: true, regexAllowed: true });
        i++;
      }
    } else if (ch === "/" && next === "/" && i + 1 < offset) {
      frames.push({ type: "line-comment" }); i++;
    } else if (ch === "/" && next === "*" && i + 1 < offset) {
      frames.push({ type: "block-comment" }); i++;
    } else if (ch === "/" && frame.regexAllowed) {
      frame.regexAllowed = false;
      frames.push({ type: "regex", inClass: false });
    } else if (QUOTES.has(ch)) {
      frame.regexAllowed = false;
      frames.push({ type: "string", quote: ch, start: i });
    } else if (/[\w$]/.test(ch)) {
      const start = i;
      while (i + 1 < offset && /[\w$]/.test(value[i + 1])) i++;
      frame.regexAllowed = /^(return|throw|case|typeof|void|delete|yield|await|in|of)$/.test(value.slice(start, i + 1));
    } else if (!/\s/.test(ch)) {
      if (frame.interpolation) {
        if (ch === "{") frame.depth++;
        if (ch === "}" && --frame.depth === 0) frames.pop();
      }
      frame.regexAllowed = ![")", "]", "}", "."].includes(ch);
    }
  }
  return frames.at(-1);
}

function edit(value, start, end, insert, caret, selectionEnd = caret) {
  return { code: value.slice(0, start) + insert + value.slice(end), selStart: caret, selEnd: selectionEnd };
}

export function pairEdit(value, start, end, key) {
  if (key !== "Backspace" && !PAIRS[key] && !Object.values(PAIRS).includes(key) && !QUOTES.has(key)) return null;
  const context = editorContext(value, start);
  const inCode = context.type === "code";
  if (key === "Backspace" && start === end && start > 0) {
    const before = value[start - 1], after = value[start];
    const emptyBrackets = inCode && Boolean(PAIRS[before]) && PAIRS[before] === after;
    const emptyQuotes = context.type === "string" && context.start === start - 1 && context.quote === before && before === after;
    if (emptyBrackets || emptyQuotes) return edit(value, start - 1, start + 1, "", start - 1);
  }
  const closingQuote = context.type === "string" && !context.escaped && context.quote === key;
  if (start === end && value[start] === key && ((inCode && Object.values(PAIRS).includes(key)) || closingQuote)) {
    return { code: value, selStart: start + 1, selEnd: start + 1 };
  }
  // Inside quoted text or comments, let the browser insert exactly what was typed.
  if (!inCode) return null;
  const close = PAIRS[key] ?? (QUOTES.has(key) ? key : null);
  if (!close) return null;
  return edit(value, start, end, key + value.slice(start, end) + close, start + 1, end + 1);
}

export function enterEdit(value, start, end) {
  if (start !== end) return null;
  const lineStart = value.lastIndexOf("\n", start - 1) + 1;
  const line = value.slice(lineStart, start);
  const indent = line.match(/^[ \t]*/)[0];
  const context = editorContext(value, start);
  const opening = context.type === "code" && PAIRS[line.trimEnd().at(-1)];
  if (opening && value[start] === opening) {
    return edit(value, start, end, "\n" + indent + "  \n" + indent, start + 1 + indent.length + 2);
  }
  const nextIndent = indent + (opening ? "  " : "");
  return edit(value, start, end, "\n" + nextIndent, start + 1 + nextIndent.length);
}
