const KEYWORDS = new Set([
  "const", "let", "var", "function", "return", "if", "else", "for", "while",
  "do", "break", "continue", "class", "new", "this", "of", "in", "throw",
  "try", "catch", "finally", "switch", "case", "default", "typeof", "delete",
  "async", "await", "yield", "extends", "static",
]);
const VALUES = new Set(["true", "false", "null", "undefined", "Infinity", "NaN"]);
const BUILTINS = new Set(["Array", "Object", "Map", "Set", "Math", "Number", "String", "Boolean"]);

// Lightweight display highlighting, not a JavaScript parser. Preserve all text.
export function highlightJavaScript(source) {
  const pattern = /\/\/[^\n]*|\/\*[\s\S]*?(?:\*\/|$)|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|`(?:\\[\s\S]|[^`\\])*`|\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b|[A-Za-z_$][\w$]*/g;
  const tokens = [];
  let end = 0;
  for (const match of source.matchAll(pattern)) {
    const text = match[0];
    if (match.index > end) tokens.push({ text: source.slice(end, match.index), kind: "plain" });
    let kind = "plain";
    if (text.startsWith("//") || text.startsWith("/*")) kind = "comment";
    else if (["'", '"', "`"].includes(text[0])) kind = "string";
    else if (/^\d/.test(text) || VALUES.has(text)) kind = "value";
    else if (KEYWORDS.has(text)) kind = "keyword";
    else if (BUILTINS.has(text)) kind = "builtin";
    else if (/^\s*\(/.test(source.slice(match.index + text.length))) kind = "function";
    tokens.push({ text, kind });
    end = match.index + text.length;
  }
  if (end < source.length) tokens.push({ text: source.slice(end), kind: "plain" });
  return tokens;
}
