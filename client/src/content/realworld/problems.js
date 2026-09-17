// "Real World" practice — applied, scenario-based problems you might hit
// building real systems. Original problems (not copied), but they exercise the
// same concepts and structures as common interview/LeetCode questions.
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
    id: "rw-merge-intervals",
    topic: "Intervals",
    title: "Merge Meeting Times",
    difficulty: "medium",
    fnName: "mergeIntervals",
    prompt:
      "Given a list of [start, end] meeting intervals, merge any that overlap and return the merged list sorted by start time. Touching ends that overlap (e.g. [1,4] and [4,5]) should merge.",
    starter:
      "function mergeIntervals(intervals) {\n  // return the merged list of [start, end]\n}\n",
    tests: [
      {
        input: [[[1, 3], [2, 6], [8, 10], [15, 18]]],
        expected: [[1, 6], [8, 10], [15, 18]],
      },
      { input: [[[1, 4], [4, 5]]], expected: [[1, 5]] },
      { input: [[[1, 2]]], expected: [[1, 2]] },
      { input: [[[1, 4], [0, 4]]], expected: [[0, 4]], hidden: true },
    ],
  },
  {
    id: "rw-can-attend",
    topic: "Intervals",
    title: "Can Attend All Meetings",
    difficulty: "easy",
    fnName: "canAttendMeetings",
    prompt:
      "Given a list of [start, end] meeting intervals, return true if a person can attend all meetings (no two meetings overlap). Meetings that only touch at an endpoint do not conflict.",
    starter:
      "function canAttendMeetings(intervals) {\n  // return true or false\n}\n",
    tests: [
      { input: [[[0, 30], [5, 10], [15, 20]]], expected: false },
      { input: [[[7, 10], [2, 4]]], expected: true },
      { input: [[]], expected: true },
      { input: [[[1, 2], [2, 3]]], expected: true, hidden: true },
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
    id: "rw-summarize-ranges",
    topic: "Arrays & Data",
    title: "Summarize Number Ranges",
    difficulty: "medium",
    fnName: "summarizeRanges",
    prompt:
      "Given a sorted array of unique integers, return the consecutive ranges as strings. A single number is \"n\"; a run is \"a->b\". Example: [0,1,2,4,5,7] -> [\"0->2\",\"4->5\",\"7\"].",
    starter:
      "function summarizeRanges(nums) {\n  // return an array of range strings\n}\n",
    tests: [
      { input: [[0, 1, 2, 4, 5, 7]], expected: ["0->2", "4->5", "7"] },
      { input: [[0, 2, 3, 4, 6, 8, 9]], expected: ["0", "2->4", "6", "8->9"] },
      { input: [[]], expected: [] },
      { input: [[1]], expected: ["1"], hidden: true },
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
    id: "rw-leaderboard",
    topic: "Design",
    title: "Game Leaderboard",
    difficulty: "medium",
    kind: "design",
    className: "Leaderboard",
    prompt:
      "Design a leaderboard. addScore(playerId, score) adds to a player's cumulative score (creating them if new). top(K) returns the sum of the K highest player scores. reset(playerId) sets that player's score back to 0.",
    starter:
      "class Leaderboard {\n  constructor() {\n\n  }\n  addScore(playerId, score) {\n\n  }\n  top(K) {\n\n  }\n  reset(playerId) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["Leaderboard", "addScore", "addScore", "addScore", "top", "reset", "top"],
        args: [[], [1, 50], [2, 30], [3, 20], [2], [1], [2]],
        expected: [null, null, null, null, 80, null, 50],
      },
      {
        ops: ["Leaderboard", "addScore", "addScore", "top"],
        args: [[], [1, 5], [1, 3], [1]],
        expected: [null, null, null, 8],
        hidden: true,
      },
    ],
  },
  ...redteamProblems,
];
