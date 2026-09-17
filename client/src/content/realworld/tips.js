// Analysis notes + reference fixes for Real World / AI Red Team drills.
// Steps walk the DataAnnotation loop: what the model claimed, why it looked
// done, the actual failure, then the production patch.

export const tipsByProblemId = {
  "rw-rt-slugify": {
    steps: [
      "Run the starter before editing. Both visible examples pass — that is the trap.",
      "The model hardcoded the two strings from the prompt. Anything else falls through to a naive space-to-hyphen replace.",
      "That fallback never strips punctuation, never collapses whitespace, and never trims hyphens.",
      "Implement the real rules: lowercase, whitespace → hyphen, drop illegal characters, collapse and trim hyphens.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function slugify(title) {\n  return title\n    .toLowerCase()\n    .replace(/\\s+/g, \"-\")\n    .replace(/[^a-z0-9-]+/g, \"\")\n    .replace(/-+/g, \"-\")\n    .replace(/^-|-$/g, \"\");\n}\n",
    time: "O(n) — a few linear scans of the title",
    space: "O(n) — the slug string",
  },

  "rw-rt-add-money": {
    steps: [
      "The model said it used integer cents. Read the body: it still does parseFloat(a) * 100.",
      "Many two-decimal strings are not binary-exact. 2.30 * 100 is 229.999…, and Math.floor then loses a cent.",
      "Visible cases use .00 and .50, which survive that bug, so the sample \"passes\".",
      "Parse the string into whole cents with no float multiply: split on \".\", pad the fraction to two digits, then add integers.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function addMoney(amounts) {\n  let cents = 0;\n  for (const a of amounts) {\n    const [w, f = \"\"] = a.split(\".\");\n    cents += Number(w) * 100 + Number((f + \"00\").slice(0, 2));\n  }\n  return Math.floor(cents / 100) + \".\" + String(cents % 100).padStart(2, \"0\");\n}\n",
    time: "O(n) — one pass over the amounts",
    space: "O(1) — running integer cents",
  },

  "rw-rt-distinct-mailboxes": {
    steps: [
      "A Set of the raw strings only drops exact duplicates.",
      "\"A@x.com\" and \"a@x.com\" are the same mailbox after normalize, but they are different Set keys.",
      "Leading/trailing spaces are the same class of miss — they look unique and ship.",
      "Trim and lowercase first, then remember the normalized value in first-seen order.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function distinctMailboxes(addresses) {\n  const seen = new Set();\n  const out = [];\n  for (const raw of addresses) {\n    const email = raw.trim().toLowerCase();\n    if (seen.has(email)) continue;\n    seen.add(email);\n    out.push(email);\n  }\n  return out;\n}\n",
    time: "O(n) — one pass, Set lookups",
    space: "O(n) — seen set and output",
  },

  "rw-rt-should-retry": {
    steps: [
      "Retrying every status >= 400 treats 401 and 404 as transient. They are not.",
      "501 (not implemented) is also a 5xx that should not be hammered.",
      "The sample only showed 500 and 200, so the overly broad rule looked correct.",
      "Allow-list the retryable codes: 408, 429, 500, 502, 503, 504.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function shouldRetry(status) {\n  return [408, 429, 500, 502, 503, 504].includes(status);\n}\n",
    time: "O(1)",
    space: "O(1)",
  },

  "rw-rt-escape-html": {
    steps: [
      "Escaping only < and > leaves &, quotes, and apostrophes intact.",
      "Unescaped quotes break out of HTML attributes. Unescaped & can also start a new character reference.",
      "The visible tests only used a tag pair, so the model looked done.",
      "Replace & first, then <, >, \", and '. Use &amp; &lt; &gt; &quot; and &#39;.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function escapeHtml(s) {\n  return s\n    .replace(/&/g, \"&amp;\")\n    .replace(/</g, \"&lt;\")\n    .replace(/>/g, \"&gt;\")\n    .replace(/\"/g, \"&quot;\")\n    .replace(/'/g, \"&#39;\");\n}\n",
    time: "O(n)",
    space: "O(n)",
  },

  "rw-rt-safe-join": {
    steps: [
      "startsWith(\"..\") only catches a path that begins with parent. Nested \"reports/../../etc/passwd\" is allowed.",
      "String concat also keeps \".\" and \"..\" in the result instead of normalizing.",
      "Walk segments. \".\" is a no-op. \"..\" pops one segment, but if that would leave root, return null.",
      "Reject an absolute relative path. Join the remaining segments under root.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function safeJoin(root, relative) {\n  if (relative.startsWith(\"/\") || relative.includes(\"\\0\")) return null;\n  const rootParts = root.split(\"/\").filter(Boolean);\n  const out = [...rootParts];\n  for (const seg of relative.split(\"/\")) {\n    if (seg === \"\" || seg === \".\") continue;\n    if (seg === \"..\") {\n      if (out.length <= rootParts.length) return null;\n      out.pop();\n      continue;\n    }\n    out.push(seg);\n  }\n  return \"/\" + out.join(\"/\");\n}\n",
    time: "O(n) — one pass over path segments",
    space: "O(n) — the segment stack",
  },

  "rw-rt-final-price": {
    steps: [
      "The model subtracts each percent from the original list price, not the running total.",
      "Two 10% coupons on 1000 should be 1000 → 900 → 810. Off-original gives 800.",
      "Math.round after float percent math also drifts (101 at 10% is 90.9 → 91, but floor-of-current is 90).",
      "Apply each coupon to the current integer price; clamp at 0.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function finalPrice(cents, coupons) {\n  let price = cents;\n  for (const c of coupons) {\n    if (c.type === \"percent\") price = Math.floor(price * (100 - c.value) / 100);\n    else price -= c.value;\n    if (price < 0) price = 0;\n  }\n  return price;\n}\n",
    time: "O(k) — one pass over coupons",
    space: "O(1)",
  },

  "rw-rt-visible-records": {
    steps: [
      "if (user.role) is true for \"viewer\", \"guest\", and any non-empty string — not just admin.",
      "ownerId == user.id also lets \"5\" match 5. Authorization checks need ===.",
      "Public rows (private === false) must stay visible even when the viewer does not own them.",
      "Keep a record when it is public, strictly owned, or the user role is exactly \"admin\".",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function visibleRecords(user, records) {\n  return records.filter((r) => {\n    if (!r.private) return true;\n    if (r.ownerId === user.id) return true;\n    return user.role === \"admin\";\n  });\n}\n",
    time: "O(n)",
    space: "O(n) — the filtered array",
  },

  "rw-rt-redact-secrets": {
    steps: [
      "Checking only the exact key \"password\" leaves apiToken, SECRET, and api_key in the clear.",
      "The visible test used password, so the logger looked safe.",
      "Normalize each key: lowercase, strip non-letters, then look for password, secret, token, or apikey.",
      "Copy the object. Do not mutate the input.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "function redactSecrets(obj) {\n  const out = {};\n  for (const [key, value] of Object.entries(obj)) {\n    const norm = key.toLowerCase().replace(/[^a-z]/g, \"\");\n    const hot =\n      norm.includes(\"password\") ||\n      norm.includes(\"secret\") ||\n      norm.includes(\"token\") ||\n      norm.includes(\"apikey\");\n    out[key] = hot ? \"***\" : value;\n  }\n  return out;\n}\n",
    time: "O(k) — one pass over keys",
    space: "O(k) — the shallow copy",
  },

  "rw-rt-refund-ledger": {
    steps: [
      "The sample refunds each order once, so a running total looks sufficient.",
      "A second refund(orderId, cents) must return 0 and leave the total unchanged.",
      "Different order ids still credit independently.",
      "Remember which ids have already been refunded (Map or Set), and only add on the first credit.",
      "Stuck? Reveal the reference fix below.",
    ],
    solution:
      "class RefundLedger {\n  constructor() {\n    this.seen = new Set();\n    this.total = 0;\n  }\n  refund(orderId, cents) {\n    if (this.seen.has(orderId)) return 0;\n    this.seen.add(orderId);\n    this.total += cents;\n    return cents;\n  }\n  totalRefunded() {\n    return this.total;\n  }\n}\n",
    time: "O(1) per refund / totalRefunded",
    space: "O(n) — one entry per refunded order",
  },
};
