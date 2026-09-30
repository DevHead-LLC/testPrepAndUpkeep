// Independently authored JavaScript regex practice (multiple choice).
// Mix of “what does this mean?” and “what is the output?” items.

export const regexQuestions = [
  // ── Easy ──────────────────────────────────────────────────────────────
  {
    id: "rx-e-01",
    difficulty: "easy",
    type: "single",
    prompt: "In JavaScript (without the unicode `u` flag), which character class is equivalent to `\\d`?",
    snippet: "\\d",
    options: [
      { id: "a", text: "[0-9]" },
      { id: "b", text: "[a-z]" },
      { id: "c", text: "[A-Z0-9]" },
      { id: "d", text: "[^0-9]" },
    ],
    correct: ["a"],
    explanation:
      "In JavaScript’s default mode, `\\d` matches ASCII digits and is the same as `[0-9]`. It is not letters, and `[^0-9]` is the opposite (non-digits).",
  },
  {
    id: "rx-e-02",
    difficulty: "easy",
    type: "single",
    prompt: "What does this expression return?",
    snippet: "/[0-9]+/.test(\"abc09.com\")",
    sampleInput: "abc09.com",
    options: [
      { id: "a", text: "true" },
      { id: "b", text: "false" },
      { id: "c", text: "\"09\"" },
      { id: "d", text: "null" },
    ],
    correct: ["a"],
    explanation:
      "`.test()` returns a boolean. The pattern finds one or more digits (`09`) inside the string, so the result is `true`.",
  },
  {
    id: "rx-e-03",
    difficulty: "easy",
    type: "single",
    prompt: "Which description best matches this pattern?",
    snippet: "/^[0-9]+$/",
    options: [
      { id: "a", text: "The whole string must be one or more digits only" },
      { id: "b", text: "The string may contain digits anywhere" },
      { id: "c", text: "The string must start with a digit but can end with anything" },
      { id: "d", text: "Rejects every string that contains a digit" },
    ],
    correct: ["a"],
    explanation:
      "`^` and `$` anchor to the start and end, so the entire string must be digits. Without those anchors, digits could appear anywhere.",
  },
  {
    id: "rx-e-04",
    difficulty: "easy",
    type: "single",
    prompt: "What is the match result?",
    snippet: "\"order-42\".match(/\\d+/)",
    sampleInput: "order-42",
    options: [
      { id: "a", text: "[\"42\"] (array; first match is \"42\")" },
      { id: "b", text: "true" },
      { id: "c", text: "42 (number)" },
      { id: "d", text: "null" },
    ],
    correct: ["a"],
    explanation:
      "Without the `g` flag, `String.prototype.match` returns an array for the first match (index 0 is `\"42\"`), not a bare number or boolean.",
  },
  {
    id: "rx-e-05",
    difficulty: "easy",
    type: "single",
    prompt: "What does the `.` metacharacter mean (default mode, not inside `[]`)?",
    snippet: "/a.c/",
    options: [
      { id: "a", text: "Any single character except a newline" },
      { id: "b", text: "A literal period only" },
      { id: "c", text: "Zero or more characters" },
      { id: "d", text: "Only letters" },
    ],
    correct: ["a"],
    explanation:
      "Outside a character class, `.` matches any character except newline (unless the `s`/dotAll flag is set). A literal dot is `\\.`",
  },
  {
    id: "rx-e-06",
    difficulty: "easy",
    type: "single",
    prompt: "Which description matches the quantifiers?",
    snippet: "a+   vs   a*",
    options: [
      { id: "a", text: "`+` means one or more; `*` means zero or more" },
      { id: "b", text: "`+` means zero or more; `*` means one or more" },
      { id: "c", text: "Both mean exactly one" },
      { id: "d", text: "Both mean optional (zero or one)" },
    ],
    correct: ["a"],
    explanation:
      "`a+` needs at least one `a`. `a*` allows an empty match. Optional single is `a?`.",
  },
  {
    id: "rx-e-07",
    difficulty: "easy",
    type: "single",
    prompt: "What does this return?",
    snippet: "/cat/.test(\"concatenate\")",
    sampleInput: "concatenate",
    options: [
      { id: "a", text: "true — \"cat\" appears as a substring" },
      { id: "b", text: "false — it must be a whole word" },
      { id: "c", text: "false — case does not match" },
      { id: "d", text: "\"cat\"" },
    ],
    correct: ["a"],
    explanation:
      "Without `^`/`$` or `\\b`, the pattern succeeds if it appears anywhere. `concatenate` contains `cat`.",
  },
  {
    id: "rx-e-08",
    difficulty: "easy",
    type: "single",
    prompt: "Which choice correctly describes `\\s`?",
    snippet: "\\s",
    options: [
      { id: "a", text: "A whitespace character (space, tab, newline, …)" },
      { id: "b", text: "Any non-whitespace character" },
      { id: "c", text: "The letter s only" },
      { id: "d", text: "Start of string" },
    ],
    correct: ["a"],
    explanation:
      "`\\s` is whitespace. Non-whitespace is `\\S`. Start of string is `^`.",
  },
  {
    id: "rx-e-09",
    difficulty: "easy",
    type: "single",
    prompt: "What does the `i` flag do?",
    snippet: "/hello/i.test(\"HeLLo\")",
    sampleInput: "HeLLo",
    options: [
      { id: "a", text: "Case-insensitive matching → true" },
      { id: "b", text: "Global matching → true" },
      { id: "c", text: "Multiline matching → false" },
      { id: "d", text: "Exact case required → false" },
    ],
    correct: ["a"],
    explanation:
      "The `i` flag ignores case, so `HeLLo` matches `hello`. Global is `g`; multiline is `m`.",
  },
  {
    id: "rx-e-10",
    difficulty: "easy",
    type: "single",
    prompt: "Which pattern matches only a vowel (a, e, i, o, or u), lowercase?",
    snippet: "choose a character class",
    options: [
      { id: "a", text: "/[aeiou]/" },
      { id: "b", text: "/[^aeiou]/" },
      { id: "c", text: "/aeiou/" },
      { id: "d", text: "/a|e|i|o|u{1}/" },
    ],
    correct: ["a"],
    explanation:
      "`[aeiou]` is a character class for one vowel. `[^aeiou]` is the opposite. `/aeiou/` requires that exact sequence.",
  },

  // ── Medium ────────────────────────────────────────────────────────────
  {
    id: "rx-m-01",
    difficulty: "medium",
    type: "single",
    prompt: "What does this check do for a one-character string `char`?",
    snippet: "/[0-9a-z]/i.test(char)",
    options: [
      { id: "a", text: "True if that character is a letter or digit (case ignored)" },
      { id: "b", text: "True only for lowercase letters and digits" },
      { id: "c", text: "True only if the entire string is alphanumeric" },
      { id: "d", text: "Always false for uppercase letters" },
    ],
    correct: ["a"],
    explanation:
      "`i` makes `a-z` also match `A-Z`. There are no `^`/`$` anchors, so for a longer string it would succeed if any alphanumeric appears — but for a single `char` it means “is this character alphanumeric?”",
  },
  {
    id: "rx-m-02",
    difficulty: "medium",
    type: "single",
    prompt: "What is printed?",
    snippet: "console.log(/\\d+/.exec(\"ab12cd34\")[0])",
    sampleInput: "ab12cd34",
    options: [
      { id: "a", text: "\"12\"" },
      { id: "b", text: "\"1234\"" },
      { id: "c", text: "\"ab12cd34\"" },
      { id: "d", text: "null" },
    ],
    correct: ["a"],
    explanation:
      "`exec` without `g` returns the first match only. The first digit run is `12`, not all digits concatenated.",
  },
  {
    id: "rx-m-03",
    difficulty: "medium",
    type: "single",
    prompt: "Which description of `\\w` in JavaScript is most accurate?",
    snippet: "\\w",
    options: [
      { id: "a", text: "Same as [A-Za-z0-9_] (word characters)" },
      { id: "b", text: "Same as [A-Za-z] only" },
      { id: "c", text: "Any whitespace" },
      { id: "d", text: "Any character including punctuation" },
    ],
    correct: ["a"],
    explanation:
      "`\\w` is letters, digits, and underscore. Punctuation like `-` or `.` is not included.",
  },
  {
    id: "rx-m-04",
    difficulty: "medium",
    type: "single",
    prompt: "What does this return?",
    snippet: "\"2024-03-15\".replace(/(\\d{4})-(\\d{2})-(\\d{2})/, \"$2/$3/$1\")",
    sampleInput: "2024-03-15",
    options: [
      { id: "a", text: "\"03/15/2024\"" },
      { id: "b", text: "\"2024/03/15\"" },
      { id: "c", text: "\"$2/$3/$1\"" },
      { id: "d", text: "\"15/03/2024\"" },
    ],
    correct: ["a"],
    explanation:
      "Capture groups fill `$1` year, `$2` month, `$3` day. The replacement rearranges to month/day/year.",
  },
  {
    id: "rx-m-05",
    difficulty: "medium",
    type: "single",
    prompt: "How do these patterns differ on the string `\"aaa\"`?",
    snippet: "/a+/   vs   /a+?/",
    sampleInput: "aaa",
    options: [
      { id: "a", text: "`a+` matches as much as possible; `a+?` matches as little as possible (still ≥1)" },
      { id: "b", text: "They always produce the same match" },
      { id: "c", text: "`a+?` means optional a" },
      { id: "d", text: "`a+` fails; only `a+?` works" },
    ],
    correct: ["a"],
    explanation:
      "`+` is greedy; `+?` is lazy. Both require at least one `a`, but laziness stops at the shortest match that still allows overall success.",
  },
  {
    id: "rx-m-06",
    difficulty: "medium",
    type: "single",
    prompt: "What does `\\b` assert?",
    snippet: "/\\bcat\\b/.test(\"concatenate\")",
    sampleInput: "concatenate",
    options: [
      { id: "a", text: "Word boundary — this test is false (cat is inside a larger word)" },
      { id: "b", text: "Backspace character — this test is true" },
      { id: "c", text: "Beginning of string — this test is true" },
      { id: "d", text: "Word boundary — this test is true" },
    ],
    correct: ["a"],
    explanation:
      "`\\b` is a word boundary between a `\\w` and a non-`\\w`. In `concatenate`, `cat` is not a whole word, so the test fails.",
  },
  {
    id: "rx-m-07",
    difficulty: "medium",
    type: "single",
    prompt: "What is the result?",
    snippet: "\"a1b22c\".match(/\\d+/g)",
    sampleInput: "a1b22c",
    options: [
      { id: "a", text: "[\"1\", \"22\"]" },
      { id: "b", text: "[\"1\", \"2\", \"2\"]" },
      { id: "c", text: "[\"122\"]" },
      { id: "d", text: "\"1\"" },
    ],
    correct: ["a"],
    explanation:
      "With the `g` flag, `match` returns all non-overlapping matches of the digit runs: `1` and `22`.",
  },
  {
    id: "rx-m-08",
    difficulty: "medium",
    type: "single",
    prompt: "Which statement about this pattern is correct?",
    snippet: "/^id-[a-z]{3}$/",
    options: [
      { id: "a", text: "Allows only strings like id-abc (exactly 3 lowercase letters after id-)" },
      { id: "b", text: "Allows id- followed by any number of letters" },
      { id: "c", text: "Allows uppercase letters because character classes are case-insensitive" },
      { id: "d", text: "Matches id-abc anywhere inside a longer string" },
    ],
    correct: ["a"],
    explanation:
      "`{3}` is exactly three. Anchors require the whole string. `[a-z]` is lowercase only unless you add the `i` flag.",
  },
  {
    id: "rx-m-09",
    difficulty: "medium",
    type: "single",
    prompt: "What does this return?",
    snippet: "\"foo,bar,baz\".split(/,(?![a-z]+$)/)",
    sampleInput: "foo,bar,baz",
    options: [
      { id: "a", text: "[\"foo\", \"bar,baz\"]" },
      { id: "b", text: "[\"foo\", \"bar\", \"baz\"]" },
      { id: "c", text: "[\"foo,bar,baz\"]" },
      { id: "d", text: "[\"foo,\", \"bar,\", \"baz\"]" },
    ],
    correct: ["a"],
    explanation:
      "The negative lookahead `(?![a-z]+$)` skips a comma when the rest of the string is only letters. The comma before `baz` is skipped, so you get `[\"foo\", \"bar,baz\"]`.",
  },
  {
    id: "rx-m-10",
    difficulty: "medium",
    type: "single",
    prompt: "Given this code, which outcome is correct?",
    snippet: "const re = /x/g;\nre.test(\"x\");\nre.test(\"x\");",
    options: [
      { id: "a", text: "First true, second false — sticky lastIndex advances with /g" },
      { id: "b", text: "Both true — lastIndex is ignored by test" },
      { id: "c", text: "Both false" },
      { id: "d", text: "Throws on the second call" },
    ],
    correct: ["a"],
    explanation:
      "With `/g`, `RegExp.prototype.test` updates `lastIndex`. After matching at index 0, the next search starts past the end and fails until `lastIndex` is reset.",
  },

  // ── Hard ──────────────────────────────────────────────────────────────
  {
    id: "rx-h-01",
    difficulty: "hard",
    type: "single",
    prompt: "What does this return?",
    snippet: "\"abab\".replace(/(a)(b)/g, \"$2$1\")",
    sampleInput: "abab",
    options: [
      { id: "a", text: "\"baba\"" },
      { id: "b", text: "\"abab\"" },
      { id: "c", text: "\"bbba\"" },
      { id: "d", text: "\"$2$1$2$1\"" },
    ],
    correct: ["a"],
    explanation:
      "Each `ab` pair swaps to `ba` via backreferences `$2$1`, so `abab` becomes `baba`.",
  },
  {
    id: "rx-h-02",
    difficulty: "hard",
    type: "single",
    prompt: "Which description matches this password-style pattern?",
    snippet: "/^(?=.*[A-Z])(?=.*\\d).{8,}$/",
    options: [
      { id: "a", text: "At least 8 chars, with at least one uppercase letter and one digit somewhere" },
      { id: "b", text: "Exactly 8 characters that are only uppercase and digits" },
      { id: "c", text: "Must start with uppercase and end with a digit" },
      { id: "d", text: "Rejects strings that contain digits" },
    ],
    correct: ["a"],
    explanation:
      "Positive lookaheads `(?=…)` check for an uppercase and a digit without consuming characters; `.{8,}$` then requires length ≥ 8 for the whole string.",
  },
  {
    id: "rx-h-03",
    difficulty: "hard",
    type: "single",
    prompt: "What is the result in modern JavaScript?",
    snippet: "\"abc123\".match(/(?<letters>[a-z]+)(?<digits>\\d+)/).groups",
    sampleInput: "abc123",
    options: [
      { id: "a", text: "{ letters: \"abc\", digits: \"123\" }" },
      { id: "b", text: "[\"abc\", \"123\"]" },
      { id: "c", text: "{ \"1\": \"abc\", \"2\": \"123\" }" },
      { id: "d", text: "undefined (named groups unsupported)" },
    ],
    correct: ["a"],
    explanation:
      "Named capture groups `(?<name>…)` populate `match.groups` with those property names.",
  },
  {
    id: "rx-h-04",
    difficulty: "hard",
    type: "single",
    prompt: "What does this return?",
    snippet: "\"price: $12\".match(/(?<=\\$)\\d+/)",
    sampleInput: "price: $12",
    options: [
      { id: "a", text: "[\"12\"] — digits preceded by $" },
      { id: "b", text: "[\"$12\"]" },
      { id: "c", text: "null — lookbehind is invalid" },
      { id: "d", text: "[\"$\"]" },
    ],
    correct: ["a"],
    explanation:
      "`(?<=\\$)` is a lookbehind: the match is only the digits, but they must be preceded by `$`. The `$` is not part of the matched text.",
  },
  {
    id: "rx-h-05",
    difficulty: "hard",
    type: "single",
    prompt: "Which choice correctly describes this pattern’s risk?",
    snippet: "/^(a+)+$/",
    sampleInput: "aaaaaaaaaaaaaaaaaaaaX",
    options: [
      { id: "a", text: "Can cause catastrophic backtracking on near-miss inputs" },
      { id: "b", text: "Always runs in linear time" },
      { id: "c", text: "Only matches a single a" },
      { id: "d", text: "Is rejected by the JavaScript parser" },
    ],
    correct: ["a"],
    explanation:
      "Nested quantifiers on the same character class can explode into huge backtracking when the match ultimately fails (classic ReDoS shape).",
  },
  {
    id: "rx-h-06",
    difficulty: "hard",
    type: "single",
    prompt: "What does this return?",
    snippet: "[...\"a1b2\".matchAll(/(\\w)(\\d)/g)].map((m) => m[0])",
    sampleInput: "a1b2",
    options: [
      { id: "a", text: "[\"a1\", \"b2\"]" },
      { id: "b", text: "[\"a\", \"1\", \"b\", \"2\"]" },
      { id: "c", text: "[\"a1b2\"]" },
      { id: "d", text: "[]" },
    ],
    correct: ["a"],
    explanation:
      "`matchAll` with `/g` yields each full match; `m[0]` is the whole match text `a1` then `b2`.",
  },
  {
    id: "rx-h-07",
    difficulty: "hard",
    type: "single",
    prompt: "In JavaScript with the `u` flag, which is true?",
    snippet: "/\\p{Number}/u.test(\"٣\")  // Arabic-Indic digit 3",
    options: [
      { id: "a", text: "true — Unicode property escapes match that digit category" },
      { id: "b", text: "false — \\d-only semantics always apply" },
      { id: "c", text: "SyntaxError — \\p is never valid in JS" },
      { id: "d", text: "true only if the i flag is also set" },
    ],
    correct: ["a"],
    explanation:
      "With `/u`, `\\p{Number}` uses Unicode character properties and can match non-ASCII digits. Plain `\\d` without Unicode properties stays `[0-9]`.",
  },
  {
    id: "rx-h-08",
    difficulty: "hard",
    type: "single",
    prompt: "What is the output?",
    snippet: "\"ab-cd\".split(/(-)/)",
    sampleInput: "ab-cd",
    options: [
      { id: "a", text: "[\"ab\", \"-\", \"cd\"] — capturing groups are included in split results" },
      { id: "b", text: "[\"ab\", \"cd\"]" },
      { id: "c", text: "[\"ab-cd\"]" },
      { id: "d", text: "[\"a\", \"b\", \"-\", \"c\", \"d\"]" },
    ],
    correct: ["a"],
    explanation:
      "When the separator regex contains a capturing group, JavaScript `split` inserts the captured text into the result array.",
  },
  {
    id: "rx-h-09",
    difficulty: "hard",
    type: "single",
    prompt: "Which description of the sticky `y` flag is correct?",
    snippet: "const re = /\\d+/y; re.lastIndex = 2; re.exec(\"ab12\")",
    sampleInput: "ab12",
    options: [
      { id: "a", text: "Matches \"12\" only because lastIndex is exactly where digits start" },
      { id: "b", text: "Same as /g — searches forward from lastIndex and may skip" },
      { id: "c", text: "Always matches from index 0" },
      { id: "d", text: "Returns null because y forbids digits" },
    ],
    correct: ["a"],
    explanation:
      "Sticky `/y` must match at exactly `lastIndex` (here 2). Unlike `/g`, it will not scan ahead to find a later match.",
  },
  {
    id: "rx-h-10",
    difficulty: "hard",
    type: "single",
    prompt: "What does this expression return?",
    snippet: "/^(?:\\d{1,3}\\.){3}\\d{1,3}$/.test(\"256.1.1.1\")",
    sampleInput: "256.1.1.1",
    options: [
      { id: "a", text: "true — the pattern only checks shape (1–3 digits × 4), not byte range 0–255" },
      { id: "b", text: "false — 256 is rejected as an invalid IPv4 octet" },
      { id: "c", text: "false — dots must be escaped differently" },
      { id: "d", text: "true only with the u flag" },
    ],
    correct: ["a"],
    explanation:
      "This classic “IPv4-looking” regex allows `256` because it only constrains digit count, not numeric range. Real IPv4 validation needs tighter rules.",
  },
];

export const difficultyLabels = { easy: "Easy", medium: "Medium", hard: "Hard" };

export function questionsForDifficulty(difficulty) {
  if (!difficultyLabels[difficulty]) throw new Error(`Unknown difficulty: ${difficulty}`);
  return regexQuestions.filter((q) => q.difficulty === difficulty);
}

export const regexBanks = ["easy", "medium", "hard"].map((difficulty) => ({
  key: `regex:${difficulty}`,
  difficulty,
  title: `Regex — ${difficultyLabels[difficulty]}`,
  intro:
    difficulty === "easy"
      ? "Foundations: character classes, quantifiers, anchors, flags, and simple .test/.match results."
      : difficulty === "medium"
        ? "Groups, boundaries, greediness, global matching pitfalls, and reading what a pattern allows."
        : "Lookarounds, named groups, Unicode properties, sticky matching, split quirks, and ReDoS awareness.",
  questions: questionsForDifficulty(difficulty),
}));
