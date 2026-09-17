// Step-by-step solution guides for DSA problems.
// Each problem gets one canonical approach: conceptual steps, a full solution,
// and the Big-O time/space complexity of that solution.
//
// Shape: { steps: string[], solution: string, time: string, space: string }

import { expansionTips } from "./expansion-tips.data.js";

export const tipsByProblemId = {
  ...expansionTips,
  "dsa-matching-pair": {
    steps: [
      "Use a Map (value → index) to remember amounts you've already seen.",
      "Loop through `amounts`.",
      "Find the complement for the current amount: `total - amounts[i]`.",
      "If the complement has been seen, return that index with the current index.",
      "Otherwise store `amounts[i] → i` in the Map for later lookups.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function findPair(amounts, total) {\n  const seen = new Map();\n  for (let i = 0; i < amounts.length; i++) {\n    const need = total - amounts[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(amounts[i], i);\n  }\n}\n",
    time: "O(n) — one pass over the array",
    space: "O(n) — the Map can hold up to n entries",
  },

  "dsa-flip-message": {
    steps: [
      "Use a result string (or an array + `.join('')`).",
      "Loop from the last index down to 0.",
      "Append each character `text[i]` to the result.",
      "Return the result (empty string stays `''`).",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function flipText(text) {\n  let out = '';\n  for (let i = text.length - 1; i >= 0; i--) {\n    out += text[i];\n  }\n  return out;\n}\n",
    time: "O(n) — visit each character once",
    space: "O(n) — the reversed string of length n",
  },

  "dsa-label-count": {
    steps: [
      "Use a result array.",
      "Loop from 1 to n.",
      "Check divisibility with `%`, testing 15 first, then 3, then 5.",
      "Push `'FizzBuzz'` / `'Fizz'` / `'Buzz'`, else push the number as a string.",
      "Return the array.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function labelCount(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push('FizzBuzz');\n    else if (i % 3 === 0) out.push('Fizz');\n    else if (i % 5 === 0) out.push('Buzz');\n    else out.push(String(i));\n  }\n  return out;\n}\n",
    time: "O(n) — one iteration per number",
    space: "O(n) — the output array of length n",
  },

  "dsa-best-contiguous-gain": {
    steps: [
      "Use Kadane's algorithm with two variables: `current` and `best`.",
      "Initialize both to `deltas[0]`.",
      "Loop from index 1: `current = Math.max(deltas[i], current + deltas[i])`.",
      "Update `best = Math.max(best, current)`.",
      "Return `best`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function bestStretch(deltas) {\n  let current = deltas[0];\n  let best = deltas[0];\n  for (let i = 1; i < deltas.length; i++) {\n    current = Math.max(deltas[i], current + deltas[i]);\n    best = Math.max(best, current);\n  }\n  return best;\n}\n",
    time: "O(n) — single pass (Kadane's algorithm)",
    space: "O(1) — two running variables",
  },

  "dsa-any-repeated-value": {
    steps: [
      "Use a Set to track values you've seen.",
      "Loop through `readings`.",
      "If the current value is already in the Set, return `true`.",
      "Otherwise add it to the Set.",
      "If the loop finishes, return `false`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function hasRepeat(readings) {\n  const seen = new Set();\n  for (const n of readings) {\n    if (seen.has(n)) return true;\n    seen.add(n);\n  }\n  return false;\n}\n",
    time: "O(n) — one pass with O(1) Set lookups",
    space: "O(n) — the Set can hold up to n values",
  },

  "dsa-same-letter-inventory": {
    steps: [
      "If `a` and `b` differ in length, return `false`.",
      "Use a Map to count each character in `a`.",
      "Loop through `b`, decrementing each character's count.",
      "If a character is missing or its count runs out early, return `false`.",
      "Return `true` if all counts balance out.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function sameLetterBag(a, b) {\n  if (a.length !== b.length) return false;\n  const count = new Map();\n  for (const ch of a) count.set(ch, (count.get(ch) || 0) + 1);\n  for (const ch of b) {\n    if (!count.has(ch)) return false;\n    count.set(ch, count.get(ch) - 1);\n    if (count.get(ch) === 0) count.delete(ch);\n  }\n  return count.size === 0;\n}\n",
    time: "O(n) — two passes over strings of length n",
    space: "O(k) — k = number of distinct characters",
  },

  "dsa-mirrored-phrase": {
    steps: [
      "Use two pointers: `left` at the start, `right` at the end.",
      "Move each pointer inward, skipping non-alphanumeric characters.",
      "Compare the two characters (lowercased); if they differ, return `false`.",
      "Continue until `left >= right`, then return `true`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function isMirroredPhrase(phrase) {\n  const isAlnum = (c) => /[a-z0-9]/i.test(c);\n  let left = 0, right = phrase.length - 1;\n  while (left < right) {\n    while (left < right && !isAlnum(phrase[left])) left++;\n    while (left < right && !isAlnum(phrase[right])) right--;\n    if (phrase[left].toLowerCase() !== phrase[right].toLowerCase()) return false;\n    left++;\n    right--;\n  }\n  return true;\n}\n",
    time: "O(n) — each pointer crosses the string once",
    space: "O(1) — two pointers, in place",
  },

  "dsa-balanced-brackets": {
    steps: [
      "Use a stack and a map of closing → opening brackets.",
      "Loop through the string.",
      "Push opening brackets onto the stack.",
      "On a closing bracket, pop — if the stack is empty or mismatched, return `false`.",
      "Return `true` only if the stack is empty at the end.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function bracketsBalanced(s) {\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  const stack = [];\n  for (const ch of s) {\n    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);\n    else {\n      if (stack.pop() !== pairs[ch]) return false;\n    }\n  }\n  return stack.length === 0;\n}\n",
    time: "O(n) — one pass over the string",
    space: "O(n) — the stack in the worst case (all openers)",
  },

  "dsa-lone-survivor": {
    steps: [
      "Use XOR (`a ^ a = 0` and `a ^ 0 = a`, so duplicates cancel).",
      "Initialize `result = 0`.",
      "Loop through `values`, XOR-ing each value into `result`.",
      "Return `result` — the survivor is the unique number.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function loneValue(values) {\n  let result = 0;\n  for (const n of values) result ^= n;\n  return result;\n}\n",
    time: "O(n) — one XOR pass",
    space: "O(1) — a single accumulator",
  },

  "dsa-dominant-vote": {
    steps: [
      "Use Boyer-Moore voting: a `candidate` and a `count`.",
      "Loop through `votes`.",
      "If `count` is 0, set `candidate = votes[i]`.",
      "Increment `count` if the value matches the candidate, else decrement.",
      "Return `candidate`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function dominantVote(votes) {\n  let candidate = votes[0];\n  let count = 1;\n  for (let i = 1; i < votes.length; i++) {\n    if (count === 0) {\n      candidate = votes[i];\n      count = 1;\n    } else if (votes[i] === candidate) count++;\n    else count--;\n  }\n  return candidate;\n}\n",
    time: "O(n) — single pass (Boyer-Moore voting)",
    space: "O(1) — candidate and count only",
  },

  "dsa-sequence-term": {
    steps: [
      "Use two rolling variables: `prev` and `curr`.",
      "Handle base cases: `n <= 1` returns `n`.",
      "Loop from 2 to n: `next = prev + curr`.",
      "Shift `prev = curr`, `curr = next`.",
      "Return `curr`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function fibTerm(n) {\n  if (n <= 1) return n;\n  let prev = 0, curr = 1;\n  for (let i = 2; i <= n; i++) {\n    const next = prev + curr;\n    prev = curr;\n    curr = next;\n  }\n  return curr;\n}\n",
    time: "O(n) — one loop to n",
    space: "O(1) — two rolling variables",
  },

  "dsa-step-combinations": {
    steps: [
      "Recognize it's Fibonacci: `ways(i) = ways(i-1) + ways(i-2)`.",
      "Handle base cases: `n <= 2` returns `n`.",
      "Use two rolling variables: `prev` and `curr`.",
      "Loop from 3 to n: `next = prev + curr`, then shift `prev = curr`, `curr = next`.",
      "Return `curr`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function stepPaths(n) {\n  if (n <= 2) return n;\n  let prev = 1, curr = 2;\n  for (let i = 3; i <= n; i++) {\n    const next = prev + curr;\n    prev = curr;\n    curr = next;\n  }\n  return curr;\n}\n",
    time: "O(n) — one loop to n",
    space: "O(1) — two rolling variables",
  },

  "dsa-skip-adjacent-loot": {
    steps: [
      "Use two rolling DP values: `prev2` and `prev1` (both start at 0).",
      "Loop through `houses`.",
      "Compute `curr = Math.max(prev1, prev2 + house)`.",
      "Shift `prev2 = prev1`, `prev1 = curr`.",
      "Return `prev1`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function maxSkipLoot(houses) {\n  let prev2 = 0, prev1 = 0;\n  for (const house of houses) {\n    const curr = Math.max(prev1, prev2 + house);\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}\n",
    time: "O(n) — one pass over the houses",
    space: "O(1) — two rolling DP values",
  },

  "dsa-fewest-tokens": {
    steps: [
      "Use a `dp` array of size `total + 1`, filled with `Infinity`, and set `dp[0] = 0`.",
      "Loop `a` from 1 to `total`.",
      "For each denom ≤ `a`: `dp[a] = Math.min(dp[a], dp[a - denom] + 1)`.",
      "Return `dp[total]`, or -1 if it's still `Infinity`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function fewestTokens(denoms, total) {\n  const dp = Array(total + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let a = 1; a <= total; a++) {\n    for (const denom of denoms) {\n      if (denom <= a) dp[a] = Math.min(dp[a], dp[a - denom] + 1);\n    }\n  }\n  return dp[total] === Infinity ? -1 : dp[total];\n}\n",
    time: "O(total × denoms) — nested loops",
    space: "O(total) — the dp array",
  },

  "dsa-phrase-from-catalog": {
    steps: [
      "Put `catalog` into a Set for O(1) lookup.",
      "Use a `dp` boolean array of size `phrase.length + 1`, with `dp[0] = true`.",
      "Loop end index `i` from 1 to `phrase.length`.",
      "For each start `j < i`: if `dp[j]` and `phrase.slice(j, i)` is in the set, set `dp[i] = true` and break.",
      "Return `dp[phrase.length]`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function canAssemble(phrase, catalog) {\n  const words = new Set(catalog);\n  const dp = Array(phrase.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= phrase.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && words.has(phrase.slice(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[phrase.length];\n}\n",
    time: "O(n²) substrings (× slice cost) — n = length of phrase",
    space: "O(n + w) — dp array plus the word Set",
  },

  "dsa-digit-mirror": {
    steps: [
      "Handle early: negatives and numbers ending in 0 (but not 0) aren't mirrors.",
      "Reverse only the lower half of the digits mathematically.",
      "Loop while `x > reversed`: `reversed = reversed * 10 + x % 10`, then `x = Math.floor(x / 10)`.",
      "Return `x === reversed || x === Math.floor(reversed / 10)`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function isDigitMirror(x) {\n  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;\n  let reversed = 0;\n  while (x > reversed) {\n    reversed = reversed * 10 + x % 10;\n    x = Math.floor(x / 10);\n  }\n  return x === reversed || x === Math.floor(reversed / 10);\n}\n",
    time: "O(log₁₀ x) — processes half the digits",
    space: "O(1) — a couple of integers",
  },

  "dsa-absent-slot": {
    steps: [
      "Use Gauss's formula for the expected sum: `n * (n + 1) / 2`.",
      "Loop through `seen` to get the actual sum.",
      "Return `expected - actual` — that's the missing number.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function absentSlot(seen) {\n  const n = seen.length;\n  const expected = (n * (n + 1)) / 2;\n  let actual = 0;\n  for (const num of seen) actual += num;\n  return expected - actual;\n}\n",
    time: "O(n) — one pass to sum the values",
    space: "O(1) — just running totals",
  },

  "dsa-single-trade-peak": {
    steps: [
      "Use two variables: `minPrice` and `maxProfit`.",
      "Loop through `quotes`.",
      "Update `minPrice = Math.min(minPrice, p)`.",
      "Update `maxProfit = Math.max(maxProfit, p - minPrice)`.",
      "Return `maxProfit`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function bestSingleTrade(quotes) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (const p of quotes) {\n    minPrice = Math.min(minPrice, p);\n    maxProfit = Math.max(maxProfit, p - minPrice);\n  }\n  return maxProfit;\n}\n",
    time: "O(n) — single pass over quotes",
    space: "O(1) — two running variables",
  },

  "dsa-slide-zeros-back": {
    steps: [
      "In place means changing array slots: values[0] = 7 updates the caller’s array. values = [7] only replaces your local reference. You do not need to return anything.",
      "Keep your two-pass idea, but replace the results array with a write index. Start write = 0: this is where the next non-zero value belongs.",
      "Use a read index to scan every original slot from left to right. When values[read] !== 0, assign values[write] = values[read], then increment write.",
      "Why is overwriting safe? write never gets ahead of read, so you only write to slots already examined. The unread values remain available.",
      "For [4, 0, 5, 0, 0, 6], copying non-zero values forward leaves leftovers past write. Fill the remaining slots with zeroes.",
      "Fill values[write] through the last slot with zeroes. Overwrite these slots rather than pushing: push would increase the array length.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function slideZerosBack(values) {\n  let write = 0;\n  for (let read = 0; read < values.length; read++) {\n    if (values[read] !== 0) {\n      values[write] = values[read];\n      write++;\n    }\n  }\n  while (write < values.length) {\n    values[write] = 0;\n    write++;\n  }\n}\n",
    time: "O(n) — one scan followed by filling the remaining slots",
    space: "O(1) — only read/write indices; no second array",
  },

  "dsa-neighbor-product-map": {
    steps: [
      "Use an `answer` array filled with 1s and prefix/suffix products.",
      "First pass left→right: set `answer[i] = prefix`, then `prefix *= values[i]`.",
      "Second pass right→left: `answer[i] *= suffix`, then `suffix *= values[i]`.",
      "Return `answer`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function productsWithoutSelf(values) {\n  const answer = Array(values.length).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < values.length; i++) {\n    answer[i] = prefix;\n    prefix *= values[i];\n  }\n  let suffix = 1;\n  for (let i = values.length - 1; i >= 0; i--) {\n    answer[i] *= suffix;\n    suffix *= values[i];\n  }\n  return answer;\n}\n",
    time: "O(n) — two passes over the array",
    space: "O(1) — extra space, excluding the output array",
  },

  "dsa-locate-in-ordered-list": {
    steps: [
      "Use two pointers: `left = 0`, `right = sorted.length - 1`.",
      "While `left <= right`, compute `mid = Math.floor((left + right) / 2)`.",
      "If `sorted[mid] === needle`, return `mid`.",
      "If `sorted[mid] < needle`, go right (`left = mid + 1`); else go left (`right = mid - 1`).",
      "Return -1 if the needle isn't found.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function indexInSorted(sorted, needle) {\n  let left = 0, right = sorted.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (sorted[mid] === needle) return mid;\n    if (sorted[mid] < needle) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n",
    time: "O(log n) — halves the range each step",
    space: "O(1) — two index pointers",
  },

  "dsa-pair-from-sorted-ledger": {
    steps: [
      "Use two pointers: `left = 0`, `right = sorted.length - 1`.",
      "Compute `sum = sorted[left] + sorted[right]`.",
      "If it equals total, return `[left + 1, right + 1]` (1-based).",
      "If the sum is too small, `left++`; if too big, `right--`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function pairFromSorted(sorted, total) {\n  let left = 0, right = sorted.length - 1;\n  while (left < right) {\n    const sum = sorted[left] + sorted[right];\n    if (sum === total) return [left + 1, right + 1];\n    if (sum < total) left++;\n    else right--;\n  }\n}\n",
    time: "O(n) — pointers converge in one pass",
    space: "O(1) — two pointers, no extra structure",
  },

  "dsa-longest-unique-window": {
    steps: [
      "Use a sliding window with a Map (character → last index seen).",
      "Loop `right` through the string.",
      "If `text[right]` was seen at or after `left`, move `left` to `lastIndex + 1`.",
      "Record the character's index and update `best = Math.max(best, right - left + 1)`.",
      "Return `best`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function longestUniqueRun(text) {\n  const last = new Map();\n  let left = 0, best = 0;\n  for (let right = 0; right < text.length; right++) {\n    if (last.has(text[right]) && last.get(text[right]) >= left) {\n      left = last.get(text[right]) + 1;\n    }\n    last.set(text[right], right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n",
    time: "O(n) — each character visited once (sliding window)",
    space: "O(k) — k = number of distinct characters",
  },

  "dsa-landmass-count": {
    steps: [
      "Use DFS (or BFS) to sink each landmass.",
      "Loop over every cell.",
      "When you find `'#'`, increment `count` and DFS from that cell.",
      "In DFS, set the cell to `'.'` and recurse to in-bounds `'#'` neighbors.",
      "Return `count`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function countLandmasses(grid) {\n  const rows = grid.length, cols = grid[0].length;\n  let count = 0;\n  function dfs(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '#') return;\n    grid[r][c] = '.';\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === '#') { count++; dfs(r, c); }\n    }\n  }\n  return count;\n}\n",
    time: "O(rows × cols) — each cell visited once",
    space: "O(rows × cols) — recursion stack worst case",
  },

  "dsa-basin-capacity": {
    steps: [
      "Use two pointers `left`/`right` with `leftMax`/`rightMax`.",
      "Compare the two end heights (not the maxes).",
      "Process the shorter side: update its max, then add `sideMax - elevations[pointer]` to `water`.",
      "Move that pointer inward; continue until the pointers meet.",
      "Return `water`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function basinCapacity(elevations) {\n  let left = 0, right = elevations.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (left < right) {\n    if (elevations[left] < elevations[right]) {\n      leftMax = Math.max(leftMax, elevations[left]);\n      water += leftMax - elevations[left];\n      left++;\n    } else {\n      rightMax = Math.max(rightMax, elevations[right]);\n      water += rightMax - elevations[right];\n      right--;\n    }\n  }\n  return water;\n}\n",
    time: "O(n) — pointers converge in one pass",
    space: "O(1) — a few scalar variables",
  },

  "dsa-floor-tracking-stack": {
    steps: [
      "Use two stacks: `stack` for values, `mins` for the running minimum.",
      "`push(val)`: push to `stack`, and push `Math.min(val, mins.top())` to `mins`.",
      "`pop()`: pop both stacks.",
      "`top()` reads the `stack` top; `getMin()` reads the `mins` top.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class FloorStack {\n  constructor() {\n    this.stack = [];\n    this.mins = [];\n  }\n  push(val) {\n    this.stack.push(val);\n    const min = this.mins.length === 0 ? val : Math.min(val, this.mins[this.mins.length - 1]);\n    this.mins.push(min);\n  }\n  pop() {\n    this.stack.pop();\n    this.mins.pop();\n  }\n  top() {\n    return this.stack[this.stack.length - 1];\n  }\n  getMin() {\n    return this.mins[this.mins.length - 1];\n  }\n}\n",
    time: "O(1) — every operation is constant time",
    space: "O(n) — two stacks of up to n elements",
  },

  "dsa-fifo-from-two-stacks": {
    steps: [
      "Use two stacks: `in` (push here) and `out` (pop/peek here).",
      "`push(x)` always goes on `in`.",
      "For `pop`/`peek`: if `out` is empty, pour all of `in` into `out` (reversing order).",
      "`empty()` returns true when both stacks are empty.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class DualStackFifo {\n  constructor() {\n    this.in = [];\n    this.out = [];\n  }\n  push(x) { this.in.push(x); }\n  _pour() {\n    if (this.out.length === 0) {\n      while (this.in.length) this.out.push(this.in.pop());\n    }\n  }\n  pop() { this._pour(); return this.out.pop(); }\n  peek() { this._pour(); return this.out[this.out.length - 1]; }\n  empty() { return this.in.length === 0 && this.out.length === 0; }\n}\n",
    time: "Amortized O(1) per operation (each item moves once)",
    space: "O(n) — two stacks holding n elements total",
  },

  "dsa-simple-key-store": {
    steps: [
      "Use a plain object `{}` as the backing store (`this.map = {}`).",
      "`put(key, value)` sets `this.map[key] = value`.",
      "`get(key)` returns the value if present, else `-1`.",
      "`remove(key)` deletes the key with `delete`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class SimpleKeyStore {\n  constructor() {\n    this.map = {};\n  }\n  put(key, value) {\n    this.map[key] = value;\n  }\n  get(key) {\n    return key in this.map ? this.map[key] : -1;\n  }\n  remove(key) {\n    delete this.map[key];\n  }\n}\n",
    time: "O(1) average per operation",
    space: "O(n) — one entry per stored key",
  },

  "dsa-prefix-lexicon": {
    steps: [
      "Use nodes with `children` (object/map) and an end marker.",
      "`insert(word)`: walk each character, creating child nodes, and mark the last node as an end.",
      "`search(word)`: walk the path; return `false` if a child is missing, else return the end marker.",
      "`startsWith(prefix)`: same walk, but return `true` once the full prefix is consumed.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class PrefixLexicon {\n  constructor() {\n    this.root = {};\n  }\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node[ch]) node[ch] = {};\n      node = node[ch];\n    }\n    node.$ = true;\n  }\n  _walk(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node[ch]) return null;\n      node = node[ch];\n    }\n    return node;\n  }\n  search(word) {\n    const node = this._walk(word);\n    return node !== null && node.$ === true;\n  }\n  startsWith(prefix) {\n    return this._walk(prefix) !== null;\n  }\n}\n",
    time: "O(L) per operation — L = length of the word/prefix",
    space: "O(total characters inserted) across all words",
  },

  "dsa-bounded-recent-cache": {
    steps: [
      "Use a `Map` (it preserves insertion order).",
      "`get(key)`: if missing return -1; otherwise delete + re-set the key to mark it most recent, then return the value.",
      "`put(key, value)`: delete the key if it exists, then set it.",
      "If size exceeds capacity, delete the first (oldest) key: `map.keys().next().value`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class BoundedRecentCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    this.map.set(key, value);\n    if (this.map.size > this.capacity) {\n      const lru = this.map.keys().next().value;\n      this.map.delete(lru);\n    }\n  }\n}\n",
    time: "O(1) — get and put are constant time",
    space: "O(capacity) — at most `capacity` entries",
  },
};
