// AI Red Team drills — the starter is a model's "finished" solution.
// Your job is the DataAnnotation loop: run it, find why it fails production
// standards, explain the failure, and patch it. Hidden tests catch the
// interesting miss.
//
// Independently authored educational exercises. Failure modes and fixtures
// are original practice content, not copied problem banks.

export const FAILURE_LABELS = {
  "faked-tests": "Faked tests",
  "confidently-wrong": "Confidently wrong",
  "unsafe": "Unsafe code",
  "silent-bug": "Silent bug",
};

export const redteamProblems = [
  {
    id: "rw-rt-slugify",
    topic: "AI Red Team",
    title: "Slugify — Memorized Examples",
    difficulty: "easy",
    mode: "redteam",
    failureMode: "faked-tests",
    modelClaim: "Passes both examples. Ready to ship.",
    fnName: "slugify",
    prompt:
      "slugify(title) lowercases the title, turns runs of whitespace into a single hyphen, drops any character that is not a-z, 0-9, or hyphen, collapses repeated hyphens, and trims hyphens from both ends. Example: \"Hello World\" → \"hello-world\". Example: \"AI Red Team!\" → \"ai-red-team\".",
    starter:
      "function slugify(title) {\n  // Covered both examples from the prompt.\n  if (title === \"Hello World\") return \"hello-world\";\n  if (title === \"AI Red Team!\") return \"ai-red-team\";\n  return title.toLowerCase().replaceAll(\" \", \"-\");\n}\n",
    tests: [
      { input: ["Hello World"], expected: "hello-world" },
      { input: ["AI Red Team!"], expected: "ai-red-team" },
      { input: ["Foo Bar Baz"], expected: "foo-bar-baz", hidden: true },
      { input: ["C++ & Rust"], expected: "c-rust", hidden: true },
      { input: ["  Hello  "], expected: "hello", hidden: true },
    ],
  },
  {
    id: "rw-rt-add-money",
    topic: "AI Red Team",
    title: "Add Money — Fake Cents",
    difficulty: "easy",
    mode: "redteam",
    failureMode: "confidently-wrong",
    modelClaim: "Converted to integer cents so floats cannot bite us.",
    fnName: "addMoney",
    prompt:
      "addMoney(amounts) takes an array of decimal money strings with at most two fraction digits (\"10.00\", \"5.5\", \"3\") and returns their sum as a string with exactly two fraction digits. Work in integer cents. Do not use floating-point arithmetic.",
    starter:
      "function addMoney(amounts) {\n  // Integer cents — no float bugs.\n  const cents = amounts.reduce((sum, a) => sum + Math.floor(parseFloat(a) * 100), 0);\n  return (cents / 100).toFixed(2);\n}\n",
    tests: [
      { input: [["10.00", "5.50"]], expected: "15.50" },
      { input: [[]], expected: "0.00" },
      { input: [["2.30", "2.30"]], expected: "4.60", hidden: true },
      { input: [["1.15", "1.15"]], expected: "2.30", hidden: true },
      { input: [["5.5", "3"]], expected: "8.50", hidden: true },
    ],
  },
  {
    id: "rw-rt-distinct-mailboxes",
    topic: "AI Red Team",
    title: "Distinct Mailboxes — Exact Match Only",
    difficulty: "easy",
    mode: "redteam",
    failureMode: "silent-bug",
    modelClaim: "Set gives uniqueness in linear time. Done.",
    fnName: "distinctMailboxes",
    prompt:
      "distinctMailboxes(addresses) returns unique addresses in first-seen order after normalizing each value with trim + lowercase. Return the normalized form.",
    starter:
      "function distinctMailboxes(addresses) {\n  return [...new Set(addresses)];\n}\n",
    tests: [
      { input: [["a@x.com", "b@x.com", "a@x.com"]], expected: ["a@x.com", "b@x.com"] },
      { input: [[]], expected: [] },
      { input: [["A@x.com", "a@x.com"]], expected: ["a@x.com"], hidden: true },
      { input: [["  b@x.com  ", "b@x.com"]], expected: ["b@x.com"], hidden: true },
    ],
  },
  {
    id: "rw-rt-should-retry",
    topic: "AI Red Team",
    title: "Retry Policy — Retry All Errors",
    difficulty: "easy",
    mode: "redteam",
    failureMode: "confidently-wrong",
    modelClaim: "Anything 400+ is an error, so we retry. Obvious.",
    fnName: "shouldRetry",
    prompt:
      "shouldRetry(status) is true only for retryable HTTP statuses: 408, 429, 500, 502, 503, and 504. Client errors like 400, 401, and 404 must return false. Success codes return false.",
    starter:
      "function shouldRetry(status) {\n  return status >= 400;\n}\n",
    tests: [
      { input: [500], expected: true },
      { input: [200], expected: false },
      { input: [404], expected: false, hidden: true },
      { input: [401], expected: false, hidden: true },
      { input: [429], expected: true, hidden: true },
      { input: [408], expected: true, hidden: true },
      { input: [501], expected: false, hidden: true },
    ],
  },
  {
    id: "rw-rt-escape-html",
    topic: "AI Red Team",
    title: "Escape HTML — Tags Only",
    difficulty: "medium",
    mode: "redteam",
    failureMode: "unsafe",
    modelClaim: "Escaping < and > stops markup injection.",
    fnName: "escapeHtml",
    prompt:
      "escapeHtml(s) returns s with HTML-sensitive characters replaced: & → &amp;, < → &lt;, > → &gt;, \" → &quot;, ' → &#39;. Escape & first so you do not double-encode.",
    starter:
      "function escapeHtml(s) {\n  return s.replace(/</g, \"&lt;\").replace(/>/g, \"&gt;\");\n}\n",
    tests: [
      { input: ["hello"], expected: "hello" },
      { input: ["<b>hi</b>"], expected: "&lt;b&gt;hi&lt;/b&gt;" },
      { input: ["a&b"], expected: "a&amp;b", hidden: true },
      { input: ['x="y"'], expected: "x=&quot;y&quot;", hidden: true },
      { input: ["it's"], expected: "it&#39;s", hidden: true },
    ],
  },
  {
    id: "rw-rt-safe-join",
    topic: "AI Red Team",
    title: "Safe Path Join — Prefix Check",
    difficulty: "medium",
    mode: "redteam",
    failureMode: "unsafe",
    modelClaim: "Reject anything that starts with .. or /. The rest is a simple join.",
    fnName: "safeJoin",
    prompt:
      "safeJoin(root, relative) joins an absolute Unix root (e.g. \"/var/data\") to a relative path. Treat \".\" as a no-op and \"..\" as parent. Return null if relative is absolute, contains a NUL, or any \"..\" would leave root. Otherwise return the normalized absolute path with no trailing slash (except root itself, which is not used here).",
    starter:
      "function safeJoin(root, relative) {\n  if (relative.startsWith(\"..\") || relative.startsWith(\"/\")) return null;\n  return root.replace(/\\/$/, \"\") + \"/\" + relative;\n}\n",
    tests: [
      { input: ["/var/data", "reports/q1.csv"], expected: "/var/data/reports/q1.csv" },
      { input: ["/var/data", "../etc/passwd"], expected: null },
      { input: ["/var/data", "reports/../../etc/passwd"], expected: null, hidden: true },
      { input: ["/var/data", "ok/./file.txt"], expected: "/var/data/ok/file.txt", hidden: true },
      { input: ["/var/data", "ok/../file.txt"], expected: "/var/data/file.txt", hidden: true },
    ],
  },
  {
    id: "rw-rt-final-price",
    topic: "AI Red Team",
    title: "Stacked Coupons — Off Original",
    difficulty: "medium",
    mode: "redteam",
    failureMode: "confidently-wrong",
    modelClaim: "Percents off the list price, then flats. Rounded. Looks right on the sample.",
    fnName: "finalPrice",
    prompt:
      "finalPrice(cents, coupons) applies coupons in order to the current price. A percent coupon uses Math.floor(price * (100 - value) / 100). A flat coupon subtracts value cents. Never return below 0. Percent must use the current price, not the original list price.",
    starter:
      "function finalPrice(cents, coupons) {\n  let price = cents;\n  for (const c of coupons) {\n    if (c.type === \"percent\") price -= cents * (c.value / 100);\n    else price -= c.value;\n  }\n  return Math.max(0, Math.round(price));\n}\n",
    tests: [
      { input: [1000, [{ type: "percent", value: 10 }]], expected: 900 },
      { input: [500, [{ type: "flat", value: 100 }]], expected: 400 },
      {
        input: [1000, [{ type: "percent", value: 10 }, { type: "percent", value: 10 }]],
        expected: 810,
        hidden: true,
      },
      { input: [101, [{ type: "percent", value: 10 }]], expected: 90, hidden: true },
      { input: [100, [{ type: "flat", value: 150 }]], expected: 0, hidden: true },
    ],
  },
  {
    id: "rw-rt-visible-records",
    topic: "AI Red Team",
    title: "Visible Records — Role Is Enough",
    difficulty: "medium",
    mode: "redteam",
    failureMode: "unsafe",
    modelClaim: "Admins see everything; everyone else sees their own rows. Role check first.",
    fnName: "visibleRecords",
    prompt:
      "visibleRecords(user, records) returns the records `user` may see, in original order. A record is visible when it is not private, or ownerId === user.id (strict), or user.role === \"admin\". Any other role (including \"viewer\") does not unlock private rows they do not own.",
    starter:
      "function visibleRecords(user, records) {\n  if (user.role) return records;\n  return records.filter((r) => r.ownerId == user.id);\n}\n",
    tests: [
      {
        input: [
          { id: 1, role: "admin" },
          [
            { id: "a", ownerId: 1, private: true },
            { id: "b", ownerId: 2, private: true },
          ],
        ],
        expected: [
          { id: "a", ownerId: 1, private: true },
          { id: "b", ownerId: 2, private: true },
        ],
      },
      {
        input: [
          { id: 1, role: "viewer" },
          [{ id: "a", ownerId: 1, private: true }],
        ],
        expected: [{ id: "a", ownerId: 1, private: true }],
      },
      {
        input: [
          { id: 1, role: "viewer" },
          [
            { id: "pub", ownerId: 2, private: false },
            { id: "hid", ownerId: 2, private: true },
          ],
        ],
        expected: [{ id: "pub", ownerId: 2, private: false }],
        hidden: true,
      },
      {
        input: [
          { id: "5", role: "viewer" },
          [{ id: "x", ownerId: 5, private: true }],
        ],
        expected: [],
        hidden: true,
      },
    ],
  },
  {
    id: "rw-rt-redact-secrets",
    topic: "AI Red Team",
    title: "Redact Secrets — Password Only",
    difficulty: "medium",
    mode: "redteam",
    failureMode: "silent-bug",
    modelClaim: "We never log passwords. Other fields are fine.",
    fnName: "redactSecrets",
    prompt:
      "redactSecrets(obj) returns a shallow copy. A key is redacted to \"***\" when, after lowercasing and stripping non-letters, it contains password, secret, token, or apikey. Do not mutate the input object.",
    starter:
      "function redactSecrets(obj) {\n  const out = { ...obj };\n  if (\"password\" in out) out.password = \"***\";\n  return out;\n}\n",
    tests: [
      {
        input: [{ password: "x", name: "ada" }],
        expected: { password: "***", name: "ada" },
      },
      { input: [{ name: "ada" }], expected: { name: "ada" } },
      {
        input: [{ apiToken: "abc", email: "a@b.c" }],
        expected: { apiToken: "***", email: "a@b.c" },
        hidden: true,
      },
      {
        input: [{ SECRET: "z", api_key: "k" }],
        expected: { SECRET: "***", api_key: "***" },
        hidden: true,
      },
    ],
  },
  {
    id: "rw-rt-refund-ledger",
    topic: "AI Red Team",
    title: "Refund Ledger — Not Idempotent",
    difficulty: "medium",
    kind: "design",
    mode: "redteam",
    failureMode: "faked-tests",
    modelClaim: "Add the cents, return them, keep a running total. The sample sequence passes.",
    className: "RefundLedger",
    prompt:
      "Design RefundLedger. refund(orderId, cents) credits that order once and returns the credited cents. A later refund for the same orderId is a no-op and returns 0. totalRefunded() is the sum of successful credits (0 when empty).",
    starter:
      "class RefundLedger {\n  constructor() {\n    this.total = 0;\n  }\n  refund(orderId, cents) {\n    this.total += cents;\n    return cents;\n  }\n  totalRefunded() {\n    return this.total;\n  }\n}\n",
    tests: [
      {
        ops: ["RefundLedger", "refund", "totalRefunded"],
        args: [[], ["o1", 500], []],
        expected: [null, 500, 500],
      },
      {
        ops: ["RefundLedger", "totalRefunded"],
        args: [[], []],
        expected: [null, 0],
      },
      {
        ops: ["RefundLedger", "refund", "refund", "totalRefunded"],
        args: [[], ["o1", 500], ["o1", 500], []],
        expected: [null, 500, 0, 500],
        hidden: true,
      },
      {
        ops: ["RefundLedger", "refund", "refund", "totalRefunded"],
        args: [[], ["a", 100], ["b", 50], []],
        expected: [null, 100, 50, 150],
        hidden: true,
      },
    ],
  },
];
