// Data Structures & Algorithms practice problems.
//
// Original coding exercises inspired by common computer-science and
// technical-interview patterns. Algorithms and ideas are not proprietary;
// titles, scenarios, prompts, and fixtures are independently authored.
//
// Each problem is graded by running the user's function against `tests`.
// `input` is the array of arguments passed to the function; `expected` is the
// value it must return. ANY implementation that returns the expected outputs
// passes — that is how two different correct solutions both score "correct".
//
// Shape:
//   { id, topic, title, difficulty, fnName, prompt, starter, tests: [{ input, expected }] }

import { expansionProblems } from "./expansion.data.js";

export const problems = [
  {
    id: "dsa-matching-pair",
    topic: "Arrays",
    title: "Find a Matching Pair",
    difficulty: "easy",
    fnName: "findPair",
    prompt:
      "A payment processor receives a list of transaction amounts and a required combined total. Return the two positions whose values produce that total. A valid pair is guaranteed, and one position cannot be used twice. Return the indices in ascending order.",
    starter:
      "function findPair(amounts, total) {\n  // return [i, j]\n}\n",
    tests: [
      { input: [[14, 3, 22, 9], 31], expected: [2, 3] },
      { input: [[-6, 12, 4, 19], 6], expected: [0, 1] },
      { input: [[8, 1, 5, 13], 6], expected: [1, 2] },
      { input: [[10, -3, 7, 4], 1], expected: [1, 3] },
    ],
  },
  {
    id: "dsa-flip-message",
    topic: "Strings",
    title: "Flip the Message",
    difficulty: "easy",
    fnName: "flipText",
    prompt:
      "A chat tool stores a message as a string. Return a new string with the characters in reverse order.",
    starter: "function flipText(text) {\n  // return the reversed string\n}\n",
    tests: [
      { input: ["cloud"], expected: "duolc" },
      { input: ["X"], expected: "X" },
      { input: [""], expected: "" },
      { input: ["hi there"], expected: "ereht ih" },
    ],
  },
  {
    id: "dsa-label-count",
    topic: "Math",
    title: "Label the Count",
    difficulty: "easy",
    fnName: "labelCount",
    prompt:
      "You're given a single integer `n` (not an array). Build labels for the numbers 1 through n and return an array of length `n`, where index i holds the label for i+1. Multiples of both 3 and 5 → 'FizzBuzz', multiples of 3 → 'Fizz', multiples of 5 → 'Buzz', otherwise the number itself as a string. Example: labelCount(4) → ['1', '2', 'Fizz', '4'].",
    starter: "function labelCount(n) {\n  // return an array of strings\n}\n",
    tests: [
      { input: [4], expected: ["1", "2", "Fizz", "4"] },
      { input: [7], expected: ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7"] },
      {
        input: [16],
        expected: [
          "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
          "11", "Fizz", "13", "14", "FizzBuzz", "16",
        ],
      },
    ],
  },
  {
    id: "dsa-best-contiguous-gain",
    topic: "Arrays",
    title: "Best Contiguous Gain",
    difficulty: "medium",
    fnName: "bestStretch",
    prompt:
      "An analytics feed reports daily deltas as integers (gains and losses). Return the largest sum achievable from any contiguous non-empty stretch of days.",
    starter: "function bestStretch(deltas) {\n  // return the maximum contiguous sum\n}\n",
    tests: [
      { input: [[4, -2, 5, -1, 3]], expected: 9 },
      { input: [[9]], expected: 9 },
      { input: [[2, -5, 8, -1, 4]], expected: 11 },
      { input: [[-8, -3, -1]], expected: -1 },
    ],
  },
  {
    id: "dsa-any-repeated-value",
    topic: "Hashing",
    title: "Any Repeated Value",
    difficulty: "easy",
    fnName: "hasRepeat",
    prompt:
      "Given a list of sensor readings, return `true` if any reading appears more than once, otherwise `false`.",
    starter: "function hasRepeat(readings) {\n  // return true or false\n}\n",
    tests: [
      { input: [[9, 4, 2, 9]], expected: true },
      { input: [[5, 1, 8, 3]], expected: false },
      { input: [[7, 7, 7]], expected: true },
      { input: [[]], expected: false, hidden: true },
    ],
  },
  {
    id: "dsa-same-letter-inventory",
    topic: "Hashing",
    title: "Same Letter Inventory",
    difficulty: "easy",
    fnName: "sameLetterBag",
    prompt:
      "Two words are rearrangements of each other when they use the same characters with the same frequencies. Return `true` if `a` and `b` match that way, otherwise `false`.",
    starter: "function sameLetterBag(a, b) {\n  // return true or false\n}\n",
    tests: [
      { input: ["listen", "silent"], expected: true },
      { input: ["hello", "world"], expected: false },
      { input: ["a", "aa"], expected: false },
      { input: ["", ""], expected: true, hidden: true },
    ],
  },
  {
    id: "dsa-mirrored-phrase",
    topic: "Two Pointers",
    title: "Mirrored Phrase",
    difficulty: "easy",
    fnName: "isMirroredPhrase",
    prompt:
      "Decide whether a phrase reads the same forward and backward after ignoring case and every non-alphanumeric character.",
    starter: "function isMirroredPhrase(phrase) {\n  // return true or false\n}\n",
    tests: [
      { input: ["Never odd or even"], expected: true },
      { input: ["plan a canal"], expected: false },
      { input: [" "], expected: true },
      { input: ["1A"], expected: false, hidden: true },
    ],
  },
  {
    id: "dsa-balanced-brackets",
    topic: "Stacks",
    title: "Balanced Brackets",
    difficulty: "easy",
    fnName: "bracketsBalanced",
    prompt:
      "A config string uses only `()[]{}`. Return `true` when every opener is closed by the matching type in the correct nesting order.",
    starter: "function bracketsBalanced(s) {\n  // return true or false\n}\n",
    tests: [
      { input: ["[{()}]"], expected: true },
      { input: ["{[()]}"], expected: true },
      { input: ["{(})"], expected: false },
      { input: ["((("], expected: false },
      { input: [")("], expected: false },
      { input: ["]"], expected: false },
      { input: ["["], expected: false },
      { input: [""], expected: true, hidden: true },
    ],
  },
  {
    id: "dsa-lone-survivor",
    topic: "Bit Manipulation",
    title: "Lone Duplicate Survivor",
    difficulty: "medium",
    fnName: "loneValue",
    prompt:
      "Every value in a non-empty list appears exactly twice except one value that appears once. Return that unique value.",
    starter: "function loneValue(values) {\n  // return the unique number\n}\n",
    tests: [
      { input: [[5, 5, 8]], expected: 8 },
      { input: [[3, 9, 3, 1, 9]], expected: 1 },
      { input: [[42]], expected: 42 },
      { input: [[11, 4, 11, 4, 6]], expected: 6, hidden: true },
    ],
  },
  {
    id: "dsa-dominant-vote",
    topic: "Arrays",
    title: "Dominant Vote",
    difficulty: "medium",
    fnName: "dominantVote",
    prompt:
      "In a ballot array of length n, one candidate appears more than ⌊n / 2⌋ times. Return that candidate (it is guaranteed to exist).",
    starter: "function dominantVote(votes) {\n  // return the majority value\n}\n",
    tests: [
      { input: [[4, 4, 1, 4]], expected: 4 },
      { input: [[9, 8, 9, 9, 8, 9, 8, 9, 9]], expected: 9 },
      { input: [[0]], expected: 0 },
      { input: [[2, 2, 3, 2]], expected: 2, hidden: true },
    ],
  },
  {
    id: "dsa-sequence-term",
    topic: "Dynamic Programming",
    title: "Sequence Term",
    difficulty: "easy",
    fnName: "fibTerm",
    prompt:
      "Return term n of the classic Fibonacci sequence where term(0) = 0, term(1) = 1, and each later term is the sum of the previous two.",
    starter: "function fibTerm(n) {\n  // return term n\n}\n",
    tests: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [7], expected: 13 },
      { input: [12], expected: 144 },
      { input: [15], expected: 610, hidden: true },
    ],
  },
  {
    id: "dsa-step-combinations",
    topic: "Dynamic Programming",
    title: "Step Combinations",
    difficulty: "easy",
    fnName: "stepPaths",
    prompt:
      "A staircase has `n` steps. From any step you may climb 1 or 2 steps. Return how many distinct sequences reach the top.",
    starter: "function stepPaths(n) {\n  // return the number of sequences\n}\n",
    tests: [
      { input: [1], expected: 1 },
      { input: [4], expected: 5 },
      { input: [6], expected: 13 },
      { input: [8], expected: 34 },
      { input: [11], expected: 144, hidden: true },
    ],
  },
  {
    id: "dsa-skip-adjacent-loot",
    topic: "Dynamic Programming",
    title: "Skip-Adjacent Loot",
    difficulty: "medium",
    fnName: "maxSkipLoot",
    prompt:
      "Along a street, each house holds an integer stash. Collect as much as possible without taking from two neighboring houses.",
    starter: "function maxSkipLoot(houses) {\n  // return the maximum total\n}\n",
    tests: [
      { input: [[4, 1, 5, 2]], expected: 9 },
      { input: [[6, 3, 8, 2, 7]], expected: 21 },
      { input: [[3, 10, 3, 10]], expected: 20 },
      // Catches "sum even indices vs odd indices" — optimal is both ends: 4+4=8, not max(5,5).
      { input: [[4, 1, 1, 4]], expected: 8 },
      { input: [[8]], expected: 8, hidden: true },
    ],
  },
  {
    id: "dsa-fewest-tokens",
    topic: "Dynamic Programming",
    title: "Fewest Tokens",
    difficulty: "medium",
    fnName: "fewestTokens",
    prompt:
      "You have unlimited coins of several denominations and need to reach an exact total. Return the smallest number of coins that sum to that total, or -1 if it is impossible.",
    starter:
      "function fewestTokens(denoms, total) {\n  // return the minimum coin count, or -1\n}\n",
    tests: [
      { input: [[1, 4, 6], 12], expected: 2 },
      { input: [[5], 3], expected: -1 },
      { input: [[2, 5], 0], expected: 0 },
      { input: [[1, 5, 10], 27], expected: 5, hidden: true },
    ],
  },
  {
    id: "dsa-phrase-from-catalog",
    topic: "Dynamic Programming",
    title: "Phrase From Catalog",
    difficulty: "hard",
    fnName: "canAssemble",
    prompt:
      "Given a continuous string and a catalog of allowed words, return true if the string can be built by concatenating one or more catalog words (reuse is allowed).",
    starter:
      "function canAssemble(phrase, catalog) {\n  // return true or false\n}\n",
    tests: [
      { input: ["notebook", ["note", "book"]], expected: true },
      { input: ["blueberryjam", ["blue", "berry", "jam"]], expected: true },
      { input: ["roadster", ["road", "ster", "star"]], expected: true },
      { input: ["xyzzy", ["xy", "yz", "zz"]], expected: false, hidden: true },
    ],
  },
  {
    id: "dsa-digit-mirror",
    topic: "Math",
    title: "Digit Mirror",
    difficulty: "easy",
    fnName: "isDigitMirror",
    prompt:
      "Return true if an integer looks identical when its digits are reversed. Negative numbers are never mirrors.",
    starter:
      "function isDigitMirror(x) {\n  // return true or false\n}\n",
    tests: [
      { input: [1331], expected: true },
      { input: [-44], expected: false },
      { input: [100], expected: false },
      { input: [0], expected: true },
      { input: [7], expected: true },
      { input: [4554], expected: true, hidden: true },
    ],
  },
  {
    id: "dsa-absent-slot",
    topic: "Arrays",
    title: "Absent Slot",
    difficulty: "easy",
    fnName: "absentSlot",
    prompt:
      "You are given n distinct integers drawn from the inclusive range 0..n. Exactly one value in that range is missing — return it.",
    starter: "function absentSlot(seen) {\n  // return the missing number\n}\n",
    tests: [
      { input: [[1, 2, 0]], expected: 3 },
      { input: [[2, 0]], expected: 1 },
      { input: [[0]], expected: 1 },
      { input: [[1]], expected: 0 },
      { input: [[4, 2, 1, 0]], expected: 3, hidden: true },
    ],
  },
  {
    id: "dsa-single-trade-peak",
    topic: "Arrays",
    title: "Single Trade Peak",
    difficulty: "easy",
    fnName: "bestSingleTrade",
    prompt:
      "Daily quotes arrive in order. Buy once and sell once on a later day to maximize profit. Return that profit, or 0 if no profitable trade exists.",
    starter: "function bestSingleTrade(quotes) {\n  // return the maximum profit\n}\n",
    tests: [
      { input: [[9, 3, 7, 2, 8, 5]], expected: 6 },
      { input: [[5, 4, 3, 2]], expected: 0 },
      { input: [[3, 10]], expected: 7 },
      { input: [[4, 6, 2, 9, 1, 5]], expected: 7 },
      { input: [[8, 9, 1, 3]], expected: 2, hidden: true },
    ],
  },
  {
    id: "dsa-slide-zeros-back",
    version: 2,
    topic: "Two Pointers",
    title: "Slide Zeros Back — In Place",
    difficulty: "medium",
    fnName: "slideZerosBack",
    outputKind: "mutated-first-arg",
    prompt:
      "Given an integer array, move every zero to the end IN PLACE while keeping the relative order of non-zero values. Write into the same array the caller passed you; do not allocate a second results array. Keep the length unchanged. Aim for O(n) time and O(1) extra space. No return value is required: the grader inspects the array after your function finishes. Reassigning the parameter to a new array only changes your local binding. Empty arrays are valid.",
    starter:
      "function slideZerosBack(values) {\n  // Modify values itself. Do not create a results array.\n  // No return statement is needed.\n}\n",
    tests: [
      { input: [[4, 0, 5, 0, 0, 6]], expected: [4, 5, 6, 0, 0, 0] },
      { input: [[0]], expected: [0] },
      { input: [[8, 9, 1]], expected: [8, 9, 1] },
      { input: [[0, 0, 0]], expected: [0, 0, 0] },
      { input: [[]], expected: [] },
      { input: [[0, 0, 9]], expected: [9, 0, 0], hidden: true },
      { input: [[-3, 0, -3, 5, 0, -2]], expected: [-3, -3, 5, -2, 0, 0], hidden: true },
      { input: [[0, 4, 0, 4, 0, 1, 0]], expected: [4, 4, 1, 0, 0, 0, 0], hidden: true },
      { input: [[6, 0, 0]], expected: [6, 0, 0], hidden: true },
    ],
  },
  {
    id: "dsa-neighbor-product-map",
    topic: "Arrays",
    title: "Neighbor Product Map",
    difficulty: "medium",
    fnName: "productsWithoutSelf",
    prompt:
      "For each index i, compute the product of every other entry in the list (exclude the value at i). Return an array of those products.",
    starter:
      "function productsWithoutSelf(values) {\n  // return the products array\n}\n",
    tests: [
      { input: [[2, 4, 6]], expected: [24, 12, 8] },
      { input: [[-2, 3, 0, 4]], expected: [0, 0, -24, 0] },
      { input: [[5, 5]], expected: [5, 5] },
      { input: [[0, 0, 2]], expected: [0, 0, 0] },
      { input: [[3, 1, 2]], expected: [2, 6, 3], hidden: true },
    ],
  },
  {
    id: "dsa-locate-in-ordered-list",
    topic: "Binary Search",
    title: "Locate in Ordered List",
    difficulty: "easy",
    fnName: "indexInSorted",
    prompt:
      "A list of integers is sorted ascending. Return the index of `needle`, or -1 if it is absent. Aim for O(log n).",
    starter:
      "function indexInSorted(sorted, needle) {\n  // return the index of needle, or -1\n}\n",
    tests: [
      { input: [[1, 4, 7, 10, 15, 20], 15], expected: 4 },
      { input: [[1, 4, 7, 10, 15, 20], 8], expected: -1 },
      { input: [[1, 4, 7, 10, 15, 20], 1], expected: 0 },
      { input: [[11], 11], expected: 0 },
      { input: [[3, 9], 1], expected: -1, hidden: true },
    ],
  },
  {
    id: "dsa-pair-from-sorted-ledger",
    topic: "Two Pointers",
    title: "Pair From Sorted Ledger",
    difficulty: "medium",
    fnName: "pairFromSorted",
    prompt:
      "A ledger of amounts is sorted ascending and uses 1-based positions. Return the 1-based indices [i, j] (i < j) of the two amounts that sum to `total`. Exactly one solution exists. Prefer a two-pointer scan.",
    starter:
      "function pairFromSorted(sorted, total) {\n  // return [i, j] (1-indexed)\n}\n",
    tests: [
      { input: [[1, 4, 6, 10], 10], expected: [2, 3] },
      { input: [[3, 5, 8], 11], expected: [1, 3] },
      { input: [[-4, -1], -5], expected: [1, 2] },
      { input: [[2, 3, 5, 7, 11], 10], expected: [2, 4], hidden: true },
    ],
  },
  {
    id: "dsa-longest-unique-window",
    topic: "Sliding Window",
    title: "Longest Unique Window",
    difficulty: "medium",
    fnName: "longestUniqueRun",
    prompt:
      "Return the length of the longest contiguous slice of a string in which every character appears at most once.",
    starter:
      "function longestUniqueRun(text) {\n  // return the length\n}\n",
    tests: [
      { input: ["abcaefg"], expected: 6 },
      { input: ["zzzz"], expected: 1 },
      { input: [""], expected: 0 },
      { input: ["abba"], expected: 2 },
      { input: ["aab"], expected: 2, hidden: true },
    ],
  },
  {
    id: "dsa-landmass-count",
    topic: "Graphs",
    title: "Landmass Count",
    difficulty: "hard",
    fnName: "countLandmasses",
    prompt:
      "A coastal survey grid uses `'#'` for land and `'.'` for water. Count how many separate landmasses exist. Cells connect only up, down, left, and right — not diagonally.",
    starter: "function countLandmasses(grid) {\n  // return the number of landmasses\n}\n",
    tests: [
      {
        input: [
          [
            ["#", "#", "."],
            ["#", ".", "."],
            [".", ".", "#"],
          ],
        ],
        expected: 2,
      },
      {
        input: [
          [
            ["#", "#", "#"],
            [".", "#", "."],
            ["#", "#", "#"],
          ],
        ],
        expected: 1,
      },
      { input: [[["."]]], expected: 0 },
      {
        input: [
          [
            ["#", ".", "#"],
            [".", ".", "."],
            ["#", ".", "#"],
          ],
        ],
        expected: 4,
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-basin-capacity",
    topic: "Two Pointers",
    title: "Basin Capacity",
    difficulty: "hard",
    fnName: "basinCapacity",
    prompt:
      "Elevations form a bar chart with unit width. After rain, how many unit cubes of water settle in the basins between higher bars?",
    starter: "function basinCapacity(elevations) {\n  // return units of trapped water\n}\n",
    tests: [
      { input: [[3, 0, 2, 0, 4]], expected: 7 },
      { input: [[6, 1, 2, 1, 5]], expected: 11 },
      { input: [[2, 0, 2]], expected: 2 },
      { input: [[5, 4, 3]], expected: 0 },
      { input: [[1, 2, 1, 2, 1]], expected: 1, hidden: true },
    ],
  },
  {
    id: "dsa-floor-tracking-stack",
    topic: "Stacks",
    title: "Floor-Tracking Stack",
    difficulty: "medium",
    kind: "design",
    className: "FloorStack",
    prompt:
      "Build a stack that supports push, pop, top, and reading the current minimum — each in O(1) time. Methods: push(val), pop(), top(), getMin().",
    starter:
      "class FloorStack {\n  constructor() {\n\n  }\n  push(val) {\n\n  }\n  pop() {\n\n  }\n  top() {\n\n  }\n  getMin() {\n\n  }\n}\n",
    tests: [
      {
        ops: ["FloorStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
        args: [[], [4], [-1], [0], [], [], [], []],
        expected: [null, null, null, null, -1, null, -1, -1],
      },
      {
        ops: ["FloorStack", "push", "getMin", "top"],
        args: [[], [7], [], []],
        expected: [null, null, 7, 7],
      },
      {
        ops: ["FloorStack", "push", "push", "pop", "getMin"],
        args: [[], [9], [3], [], []],
        expected: [null, null, null, null, 9],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-fifo-from-two-stacks",
    topic: "Queues",
    title: "FIFO From Two Stacks",
    difficulty: "easy",
    kind: "design",
    className: "DualStackFifo",
    prompt:
      "Implement a first-in-first-out queue using only stack push/pop behavior. push(x) enqueues at the back, pop() dequeues from the front, peek() returns the front without removing it, empty() reports whether the queue holds nothing.",
    starter:
      "class DualStackFifo {\n  constructor() {\n\n  }\n  push(x) {\n\n  }\n  pop() {\n\n  }\n  peek() {\n\n  }\n  empty() {\n\n  }\n}\n",
    tests: [
      {
        ops: ["DualStackFifo", "push", "push", "peek", "pop", "empty"],
        args: [[], [9], [3], [], [], []],
        expected: [null, null, null, 9, 9, false],
      },
      {
        ops: ["DualStackFifo", "empty"],
        args: [[], []],
        expected: [null, true],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-simple-key-store",
    topic: "Hashing",
    title: "Simple Key Store",
    difficulty: "easy",
    kind: "design",
    className: "SimpleKeyStore",
    prompt:
      "Implement a key-value store without relying on Map or other hash-table libraries. put(key, value) inserts or updates, get(key) returns the value or -1 when absent, remove(key) deletes the key.",
    starter:
      "class SimpleKeyStore {\n  constructor() {\n\n  }\n  put(key, value) {\n\n  }\n  get(key) {\n\n  }\n  remove(key) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["SimpleKeyStore", "put", "put", "get", "get", "put", "get", "remove", "get"],
        args: [[], [10, 100], [20, 200], [10], [30], [20, 250], [20], [20], [20]],
        expected: [null, null, null, 100, -1, null, 250, null, -1],
      },
      {
        ops: ["SimpleKeyStore", "get"],
        args: [[], [99]],
        expected: [null, -1],
        hidden: true,
      },
      {
        ops: ["SimpleKeyStore", "put", "get", "remove", "get"],
        args: [[], [4, 0], [4], [4], [4]],
        expected: [null, null, 0, null, -1],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-prefix-lexicon",
    topic: "Trees",
    title: "Prefix Lexicon",
    difficulty: "medium",
    kind: "design",
    className: "PrefixLexicon",
    prompt:
      "Implement a prefix tree with insert(word), search(word) (exact word present?), and startsWith(prefix) (any inserted word begins with the prefix?).",
    starter:
      "class PrefixLexicon {\n  constructor() {\n\n  }\n  insert(word) {\n\n  }\n  search(word) {\n\n  }\n  startsWith(prefix) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["PrefixLexicon", "insert", "search", "search", "startsWith", "insert", "search"],
        args: [[], ["mango"], ["mango"], ["man"], ["man"], ["man"], ["man"]],
        expected: [null, null, true, false, true, null, true],
      },
      {
        ops: ["PrefixLexicon", "insert", "startsWith"],
        args: [[], ["orbit"], ["orb"]],
        expected: [null, null, true],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-bounded-recent-cache",
    topic: "Design",
    title: "Bounded Recent Cache",
    difficulty: "hard",
    kind: "design",
    className: "BoundedRecentCache",
    prompt:
      "Design a fixed-capacity cache that evicts the least recently used entry when full. The constructor receives capacity. get(key) returns the value or -1 and marks the key as most recently used; put(key, value) inserts or updates and may evict.",
    starter:
      "class BoundedRecentCache {\n  constructor(capacity) {\n\n  }\n  get(key) {\n\n  }\n  put(key, value) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["BoundedRecentCache", "put", "put", "put", "get", "put", "get", "get", "get", "get"],
        args: [[3], [10, 100], [20, 200], [30, 300], [10], [40, 400], [20], [30], [10], [40]],
        expected: [null, null, null, null, 100, null, -1, 300, 100, 400],
      },
      {
        ops: ["BoundedRecentCache", "put", "get", "put", "get", "get"],
        args: [[1], [5, 50], [5], [8, 80], [5], [8]],
        expected: [null, null, 50, null, -1, 80],
        hidden: true,
      },
    ],
  },
];

problems.push(...expansionProblems);

export const dsaTopics = [...new Set(problems.map((p) => p.topic))];

export const problemById = Object.fromEntries(problems.map((p) => [p.id, p]));
