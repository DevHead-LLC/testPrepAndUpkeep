// "Real World" practice — applied, scenario-based problems you might hit
// building real systems.
//
// Independently authored educational exercises inspired by common
// computer-science and production-engineering patterns. Concepts are not
// proprietary; titles, scenarios, prompts, and fixtures are original.
//
// Same shape and grading as the DSA track (see content/dsa/problems.js):
//  - "function" problems: define `fnName`; tests are { input: [...args], expected }.
//  - "design" problems: define class `className`; tests are { ops, args, expected }.
// AI Red Team drills live in redteam.data.js (mode: "redteam"): the starter is
// a model's finished attempt; hidden tests catch the production miss.

import { redteamProblems } from "./redteam.data.js";

export const topics = [
  "AI Red Team",
  "Intervals",
  "Parsing",
  "Arrays & Data",
  "Validation",
  "Reliability",
  "Design",
];

export const problems = [
  {
    id: "rw-collapse-calendar",
    topic: "Intervals",
    title: "Collapse Calendar Blocks",
    difficulty: "medium",
    fnName: "collapseCalendarBlocks",
    prompt:
      "A calendar API returns booked spans as [start, end] minute offsets. Merge any overlapping or touching spans and return the result sorted by start. Touching endpoints merge: [10, 25] and [25, 40] become [10, 40].",
    starter:
      "function collapseCalendarBlocks(spans) {\n  // return the merged list of [start, end]\n}\n",
    tests: [
      {
        input: [[[10, 25], [20, 45], [60, 75], [90, 110]]],
        expected: [[10, 45], [60, 75], [90, 110]],
      },
      { input: [[[12, 30], [30, 38]]], expected: [[12, 38]] },
      { input: [[[5, 9]]], expected: [[5, 9]] },
      { input: [[[8, 20], [3, 20]]], expected: [[3, 20]], hidden: true },
    ],
  },
  {
    id: "rw-schedule-fits",
    topic: "Intervals",
    title: "Schedule Fits Without Clash",
    difficulty: "easy",
    fnName: "scheduleFits",
    prompt:
      "Given proposed [start, end] appointments, return true if a single person can take every appointment without overlap. Spans that only touch at an endpoint do not conflict.",
    starter:
      "function scheduleFits(appointments) {\n  // return true or false\n}\n",
    tests: [
      { input: [[[9, 50], [15, 25], [35, 45]]], expected: false },
      { input: [[[40, 55], [10, 20]]], expected: true },
      { input: [[]], expected: true },
      { input: [[[4, 8], [8, 12]]], expected: true, hidden: true },
    ],
  },
  {
    id: "rw-parse-query",
    topic: "Parsing",
    title: "Parse Query String",
    difficulty: "easy",
    fnName: "parseQueryString",
    prompt:
      "Parse a URL query string like \"a=1&b=2\" into an object { a: \"1\", b: \"2\" } (values are strings). An empty string returns {}. If a key repeats, the last value wins.",
    starter:
      "function parseQueryString(qs) {\n  // return an object of key/value pairs\n}\n",
    tests: [
      { input: ["a=1&b=2"], expected: { a: "1", b: "2" } },
      { input: [""], expected: {} },
      { input: ["x=hello"], expected: { x: "hello" } },
      { input: ["a=1&a=2"], expected: { a: "2" }, hidden: true },
    ],
  },
  {
    id: "rw-parse-csv-row",
    topic: "Parsing",
    title: "Parse a CSV Row",
    difficulty: "easy",
    fnName: "parseCsvRow",
    prompt:
      "Split a single CSV line into its fields on commas. Empty fields are preserved as empty strings. (No quoted-comma handling needed.)",
    starter:
      "function parseCsvRow(line) {\n  // return an array of field strings\n}\n",
    tests: [
      { input: ["a,b,c"], expected: ["a", "b", "c"] },
      { input: ["a,,c"], expected: ["a", "", "c"] },
      { input: ["single"], expected: ["single"] },
      { input: ["1,2,3,4"], expected: ["1", "2", "3", "4"], hidden: true },
    ],
  },
  {
    id: "rw-paginate",
    topic: "Arrays & Data",
    title: "Paginate Results",
    difficulty: "easy",
    fnName: "paginate",
    prompt:
      "Given an array `items`, a `pageSize`, and a 1-based `pageNumber`, return the slice of items for that page. Pages past the end return an empty array.",
    starter:
      "function paginate(items, pageSize, pageNumber) {\n  // return the items for the requested page\n}\n",
    tests: [
      { input: [[10, 20, 30, 40, 50], 2, 1], expected: [10, 20] },
      { input: [[10, 20, 30, 40, 50], 2, 3], expected: [50] },
      { input: [[10, 20, 30, 40, 50], 2, 4], expected: [] },
      { input: [[1, 2, 3], 5, 1], expected: [1, 2, 3], hidden: true },
    ],
  },
  {
    id: "rw-totals-by-category",
    topic: "Arrays & Data",
    title: "Totals by Category",
    difficulty: "easy",
    fnName: "totalsByCategory",
    prompt:
      "Given an array of records like { category, amount }, return an object mapping each category to the sum of its amounts.",
    starter:
      "function totalsByCategory(records) {\n  // return an object of category -> total\n}\n",
    tests: [
      {
        input: [[
          { category: "a", amount: 5 },
          { category: "b", amount: 3 },
          { category: "a", amount: 2 },
        ]],
        expected: { a: 7, b: 3 },
      },
      { input: [[]], expected: {} },
      { input: [[{ category: "x", amount: 10 }]], expected: { x: 10 }, hidden: true },
    ],
  },
  {
    id: "rw-dedupe",
    topic: "Arrays & Data",
    title: "Deduplicate Preserving Order",
    difficulty: "easy",
    fnName: "dedupe",
    prompt:
      "Return a new array with duplicates removed, keeping the first occurrence of each value in its original order.",
    starter: "function dedupe(arr) {\n  // return the de-duplicated array\n}\n",
    tests: [
      { input: [[1, 2, 2, 3, 1]], expected: [1, 2, 3] },
      { input: [["a", "a", "b"]], expected: ["a", "b"] },
      { input: [[]], expected: [] },
      { input: [[3, 3, 3]], expected: [3], hidden: true },
    ],
  },
  {
    id: "rw-compress-sorted-runs",
    topic: "Arrays & Data",
    title: "Compress Sorted Runs",
    difficulty: "medium",
    fnName: "compressSortedRuns",
    prompt:
      "Given a sorted list of unique integers, describe consecutive runs as strings. A lone value is \"n\"; a contiguous run is \"a..b\". Example: [3, 4, 5, 8, 10, 11] → [\"3..5\", \"8\", \"10..11\"].",
    starter:
      "function compressSortedRuns(nums) {\n  // return an array of run strings\n}\n",
    tests: [
      { input: [[3, 4, 5, 8, 10, 11]], expected: ["3..5", "8", "10..11"] },
      { input: [[1, 3, 4, 5, 7, 9, 10]], expected: ["1", "3..5", "7", "9..10"] },
      { input: [[]], expected: [] },
      { input: [[6]], expected: ["6"], hidden: true },
    ],
  },
  {
    id: "rw-validate-ipv4",
    topic: "Validation",
    title: "Validate an IPv4 Address",
    difficulty: "medium",
    fnName: "isValidIPv4",
    prompt:
      "Return true if the string is a valid IPv4 address: four dot-separated parts, each an integer from 0 to 255, digits only, with no leading zeros (\"0\" itself is allowed).",
    starter:
      "function isValidIPv4(s) {\n  // return true or false\n}\n",
    tests: [
      { input: ["192.168.0.1"], expected: true },
      { input: ["256.1.1.1"], expected: false },
      { input: ["1.1.1"], expected: false },
      { input: ["1.1.1.1"], expected: true },
      { input: ["01.2.3.4"], expected: false, hidden: true },
    ],
  },
  {
    id: "rw-backoff",
    topic: "Reliability",
    title: "Exponential Backoff Schedule",
    difficulty: "easy",
    fnName: "backoffDelays",
    prompt:
      "Return the retry delays for `retries` attempts using exponential backoff: delay i (0-based) is baseMs * 2^i. backoffDelays(3, 100) -> [100, 200, 400]. Zero retries returns [].",
    starter:
      "function backoffDelays(retries, baseMs) {\n  // return an array of delays\n}\n",
    tests: [
      { input: [3, 100], expected: [100, 200, 400] },
      { input: [1, 50], expected: [50] },
      { input: [0, 100], expected: [] },
      { input: [4, 1], expected: [1, 2, 4, 8], hidden: true },
    ],
  },
  {
    id: "rw-rate-limiter",
    topic: "Design",
    title: "Fixed-Count Rate Limiter",
    difficulty: "medium",
    kind: "design",
    className: "RateLimiter",
    prompt:
      "Design a rate limiter created with a `limit`. allow() returns true while fewer than `limit` calls have been allowed, then false. reset() clears the count so allow() succeeds again.",
    starter:
      "class RateLimiter {\n  constructor(limit) {\n\n  }\n  allow() {\n\n  }\n  reset() {\n\n  }\n}\n",
    tests: [
      {
        ops: ["RateLimiter", "allow", "allow", "allow", "reset", "allow"],
        args: [[2], [], [], [], [], []],
        expected: [null, true, true, false, null, true],
      },
      {
        ops: ["RateLimiter", "allow"],
        args: [[1], []],
        expected: [null, true],
        hidden: true,
      },
    ],
  },
  {
    id: "rw-shopping-cart",
    topic: "Design",
    title: "Shopping Cart",
    difficulty: "easy",
    kind: "design",
    className: "Cart",
    prompt:
      "Design a shopping cart. addItem(name, price, qty) adds a line, removeItem(name) removes all lines for that name, and total() returns the current sum of price * qty across all items (0 when empty).",
    starter:
      "class Cart {\n  constructor() {\n\n  }\n  addItem(name, price, qty) {\n\n  }\n  removeItem(name) {\n\n  }\n  total() {\n\n  }\n}\n",
    tests: [
      {
        ops: ["Cart", "addItem", "addItem", "total", "removeItem", "total"],
        args: [[], ["apple", 2, 3], ["bread", 1.5, 2], [], ["apple"], []],
        expected: [null, null, null, 9, null, 3],
      },
      {
        ops: ["Cart", "total"],
        args: [[], []],
        expected: [null, 0],
        hidden: true,
      },
    ],
  },
  {
    id: "rw-scoreboard",
    topic: "Design",
    title: "Cumulative Scoreboard",
    difficulty: "medium",
    kind: "design",
    className: "Scoreboard",
    prompt:
      "Design a scoreboard. recordPoints(playerId, points) adds to a player's running total (creating them if new). bestSum(K) returns the sum of the K highest player totals. clearPlayer(playerId) sets that player's total back to 0.",
    starter:
      "class Scoreboard {\n  constructor() {\n\n  }\n  recordPoints(playerId, points) {\n\n  }\n  bestSum(K) {\n\n  }\n  clearPlayer(playerId) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["Scoreboard", "recordPoints", "recordPoints", "recordPoints", "bestSum", "clearPlayer", "bestSum"],
        args: [[], [10, 40], [20, 25], [30, 15], [2], [10], [2]],
        expected: [null, null, null, null, 65, null, 40],
      },
      {
        ops: ["Scoreboard", "recordPoints", "recordPoints", "bestSum"],
        args: [[], [7, 4], [7, 6], [1]],
        expected: [null, null, null, 10],
        hidden: true,
      },
    ],
  },
  ...redteamProblems,
];
