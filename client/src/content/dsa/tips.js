// Step-by-step solution guides for DSA problems.
// Each problem gets one canonical approach: conceptual steps, a full solution,
// and the Big-O time/space complexity of that solution.
//
// Shape: { steps: string[], solution: string, time: string, space: string }

import { expansionTips } from "./expansion-tips.data.js";

export const tipsByProblemId = {
  ...expansionTips,
  "dsa-two-sum": {
    steps: [
      "Use a Map (value → index) to remember numbers you've already seen.",
      "Loop through `nums`.",
      "Find the complement / need for the current number: `target - nums[i]`.",
      "If the need/complement has been seen, return that index with the current index.",
      "If no need/complement has been seen, set `nums[i] → i` in the Map for the next loop.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function twoSum(nums, target) {\n  const seen = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const need = target - nums[i];\n    if (seen.has(need)) return [seen.get(need), i];\n    seen.set(nums[i], i);\n  }\n}\n",
    time: "O(n) — one pass over the array",
    space: "O(n) — the Map can hold up to n entries",
  },

  "dsa-reverse-string": {
    steps: [
      "Use a result string (or an array + `.join('')`).",
      "Loop from the last index down to 0.",
      "Append each character `s[i]` to the result.",
      "Return the result (empty string stays `''`).",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function reverseString(s) {\n  let out = '';\n  for (let i = s.length - 1; i >= 0; i--) {\n    out += s[i];\n  }\n  return out;\n}\n",
    time: "O(n) — visit each character once",
    space: "O(n) — the reversed string of length n",
  },

  "dsa-fizzbuzz": {
    steps: [
      "Use a result array.",
      "Loop from 1 to n.",
      "Check divisibility with `%`, testing 15 first, then 3, then 5.",
      "Push `'FizzBuzz'` / `'Fizz'` / `'Buzz'`, else push the number as a string.",
      "Return the array.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function fizzBuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push('FizzBuzz');\n    else if (i % 3 === 0) out.push('Fizz');\n    else if (i % 5 === 0) out.push('Buzz');\n    else out.push(String(i));\n  }\n  return out;\n}\n",
    time: "O(n) — one iteration per number",
    space: "O(n) — the output array of length n",
  },

  "dsa-max-subarray": {
    steps: [
      "Use Kadane's algorithm with two variables: `current` and `best`.",
      "Initialize both to `nums[0]`.",
      "Loop from index 1: `current = Math.max(nums[i], current + nums[i])`.",
      "Update `best = Math.max(best, current)`.",
      "Return `best`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function maxSubArray(nums) {\n  let current = nums[0];\n  let best = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    current = Math.max(nums[i], current + nums[i]);\n    best = Math.max(best, current);\n  }\n  return best;\n}\n",
    time: "O(n) — single pass (Kadane's algorithm)",
    space: "O(1) — two running variables",
  },

  "dsa-contains-duplicate": {
    steps: [
      "Use a Set to track values you've seen.",
      "Loop through `nums`.",
      "If the current value is already in the Set, return `true`.",
      "Otherwise add it to the Set.",
      "If the loop finishes, return `false`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function containsDuplicate(nums) {\n  const seen = new Set();\n  for (const n of nums) {\n    if (seen.has(n)) return true;\n    seen.add(n);\n  }\n  return false;\n}\n",
    time: "O(n) — one pass with O(1) Set lookups",
    space: "O(n) — the Set can hold up to n values",
  },

  "dsa-valid-anagram": {
    steps: [
      "If `s` and `t` differ in length, return `false`.",
      "Use a Map to count each character in `s`.",
      "Loop through `t`, decrementing each character's count.",
      "If a character is missing or its count runs out early, return `false`.",
      "Return `true` if all counts balance out.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = new Map();\n  for (const ch of s) count.set(ch, (count.get(ch) || 0) + 1);\n  for (const ch of t) {\n    if (!count.has(ch)) return false;\n    count.set(ch, count.get(ch) - 1);\n    if (count.get(ch) === 0) count.delete(ch);\n  }\n  return count.size === 0;\n}\n",
    time: "O(n) — two passes over strings of length n",
    space: "O(k) — k = number of distinct characters",
  },

  "dsa-valid-palindrome": {
    steps: [
      "Use two pointers: `left` at the start, `right` at the end.",
      "Move each pointer inward, skipping non-alphanumeric characters.",
      "Compare the two characters (lowercased); if they differ, return `false`.",
      "Continue until `left >= right`, then return `true`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function isPalindrome(s) {\n  const isAlnum = (c) => /[a-z0-9]/i.test(c);\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    while (left < right && !isAlnum(s[left])) left++;\n    while (left < right && !isAlnum(s[right])) right--;\n    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;\n    left++;\n    right--;\n  }\n  return true;\n}\n",
    time: "O(n) — each pointer crosses the string once",
    space: "O(1) — two pointers, in place",
  },

  "dsa-valid-parentheses": {
    steps: [
      "Use a stack and a map of closing → opening brackets.",
      "Loop through the string.",
      "Push opening brackets onto the stack.",
      "On a closing bracket, pop — if the stack is empty or mismatched, return `false`.",
      "Return `true` only if the stack is empty at the end.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function isValid(s) {\n  const pairs = { ')': '(', ']': '[', '}': '{' };\n  const stack = [];\n  for (const ch of s) {\n    if (ch === '(' || ch === '[' || ch === '{') stack.push(ch);\n    else {\n      if (stack.pop() !== pairs[ch]) return false;\n    }\n  }\n  return stack.length === 0;\n}\n",
    time: "O(n) — one pass over the string",
    space: "O(n) — the stack in the worst case (all openers)",
  },

  "dsa-single-number": {
    steps: [
      "Use XOR (`a ^ a = 0` and `a ^ 0 = a`, so duplicates cancel).",
      "Initialize `result = 0`.",
      "Loop through `nums`, XOR-ing each value into `result`.",
      "Return `result` — the survivor is the unique number.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function singleNumber(nums) {\n  let result = 0;\n  for (const n of nums) result ^= n;\n  return result;\n}\n",
    time: "O(n) — one XOR pass",
    space: "O(1) — a single accumulator",
  },

  "dsa-majority-element": {
    steps: [
      "Use Boyer-Moore voting: a `candidate` and a `count`.",
      "Loop through `nums`.",
      "If `count` is 0, set `candidate = nums[i]`.",
      "Increment `count` if the value matches the candidate, else decrement.",
      "Return `candidate`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function majorityElement(nums) {\n  let candidate = nums[0];\n  let count = 1;\n  for (let i = 1; i < nums.length; i++) {\n    if (count === 0) {\n      candidate = nums[i];\n      count = 1;\n    } else if (nums[i] === candidate) count++;\n    else count--;\n  }\n  return candidate;\n}\n",
    time: "O(n) — single pass (Boyer-Moore voting)",
    space: "O(1) — candidate and count only",
  },

  "dsa-fibonacci": {
    steps: [
      "Use two rolling variables: `prev` and `curr`.",
      "Handle base cases: `n <= 1` returns `n`.",
      "Loop from 2 to n: `next = prev + curr`.",
      "Shift `prev = curr`, `curr = next`.",
      "Return `curr`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function fib(n) {\n  if (n <= 1) return n;\n  let prev = 0, curr = 1;\n  for (let i = 2; i <= n; i++) {\n    const next = prev + curr;\n    prev = curr;\n    curr = next;\n  }\n  return curr;\n}\n",
    time: "O(n) — one loop to n",
    space: "O(1) — two rolling variables",
  },

  "dsa-climbing-stairs": {
    steps: [
      "Recognize it's Fibonacci: `ways(i) = ways(i-1) + ways(i-2)`.",
      "Handle base cases: `n <= 2` returns `n`.",
      "Use two rolling variables: `prev` and `curr`.",
      "Loop from 3 to n: `next = prev + curr`, then shift `prev = curr`, `curr = next`.",
      "Return `curr`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev = 1, curr = 2;\n  for (let i = 3; i <= n; i++) {\n    const next = prev + curr;\n    prev = curr;\n    curr = next;\n  }\n  return curr;\n}\n",
    time: "O(n) — one loop to n",
    space: "O(1) — two rolling variables",
  },

  "dsa-house-robber": {
    steps: [
      "Use two rolling DP values: `prev2` and `prev1` (both start at 0).",
      "Loop through `nums`.",
      "Compute `curr = Math.max(prev1, prev2 + nums[i])`.",
      "Shift `prev2 = prev1`, `prev1 = curr`.",
      "Return `prev1`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function rob(nums) {\n  let prev2 = 0, prev1 = 0;\n  for (const n of nums) {\n    const curr = Math.max(prev1, prev2 + n);\n    prev2 = prev1;\n    prev1 = curr;\n  }\n  return prev1;\n}\n",
    time: "O(n) — one pass over the houses",
    space: "O(1) — two rolling DP values",
  },

  "dsa-coin-change": {
    steps: [
      "Use a `dp` array of size `amount + 1`, filled with `Infinity`, and set `dp[0] = 0`.",
      "Loop `a` from 1 to `amount`.",
      "For each coin ≤ `a`: `dp[a] = Math.min(dp[a], dp[a - coin] + 1)`.",
      "Return `dp[amount]`, or -1 if it's still `Infinity`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function coinChange(coins, amount) {\n  const dp = Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let a = 1; a <= amount; a++) {\n    for (const coin of coins) {\n      if (coin <= a) dp[a] = Math.min(dp[a], dp[a - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}\n",
    time: "O(amount × coins) — nested loops",
    space: "O(amount) — the dp array",
  },

  "dsa-word-break": {
    steps: [
      "Put `wordDict` into a Set for O(1) lookup.",
      "Use a `dp` boolean array of size `s.length + 1`, with `dp[0] = true`.",
      "Loop end index `i` from 1 to `s.length`.",
      "For each start `j < i`: if `dp[j]` and `s.slice(j, i)` is in the set, set `dp[i] = true` and break.",
      "Return `dp[s.length]`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function wordBreak(s, wordDict) {\n  const words = new Set(wordDict);\n  const dp = Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && words.has(s.slice(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}\n",
    time: "O(n²) substrings (× slice cost) — n = length of s",
    space: "O(n + w) — dp array plus the word Set",
  },

  "dsa-palindrome-number": {
    steps: [
      "Handle early: negatives and numbers ending in 0 (but not 0) aren't palindromes.",
      "Reverse only the lower half of the digits mathematically.",
      "Loop while `x > reversed`: `reversed = reversed * 10 + x % 10`, then `x = Math.floor(x / 10)`.",
      "Return `x === reversed || x === Math.floor(reversed / 10)`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function isPalindromeNumber(x) {\n  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;\n  let reversed = 0;\n  while (x > reversed) {\n    reversed = reversed * 10 + x % 10;\n    x = Math.floor(x / 10);\n  }\n  return x === reversed || x === Math.floor(reversed / 10);\n}\n",
    time: "O(log₁₀ x) — processes half the digits",
    space: "O(1) — a couple of integers",
  },

  "dsa-missing-number": {
    steps: [
      "Use Gauss's formula for the expected sum: `n * (n + 1) / 2`.",
      "Loop through `nums` to get the actual sum.",
      "Return `expected - actual` — that's the missing number.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function missingNumber(nums) {\n  const n = nums.length;\n  const expected = (n * (n + 1)) / 2;\n  let actual = 0;\n  for (const num of nums) actual += num;\n  return expected - actual;\n}\n",
    time: "O(n) — one pass to sum the values",
    space: "O(1) — just running totals",
  },

  "dsa-max-profit": {
    steps: [
      "Use two variables: `minPrice` and `maxProfit`.",
      "Loop through `prices`.",
      "Update `minPrice = Math.min(minPrice, p)`.",
      "Update `maxProfit = Math.max(maxProfit, p - minPrice)`.",
      "Return `maxProfit`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (const p of prices) {\n    minPrice = Math.min(minPrice, p);\n    maxProfit = Math.max(maxProfit, p - minPrice);\n  }\n  return maxProfit;\n}\n",
    time: "O(n) — single pass over prices",
    space: "O(1) — two running variables",
  },

  "dsa-move-zeroes": {
    "steps": [
        "In place means changing array slots: nums[0] = 7 updates the caller’s array. nums = [7] only replaces your local reference. You do not need to return anything.",
        "Keep your two-pass idea, but replace the results array with a write index. Start write = 0: this is where the next non-zero value belongs.",
        "Use a read index to scan every original slot from left to right. When nums[read] !== 0, assign nums[write] = nums[read], then increment write.",
        "Why is overwriting safe? write never gets ahead of read, so you only write to slots already examined. The unread values remain available.",
        "For [0, 1, 0, 3, 12], copying non-zero values forward leaves [1, 3, 12, 3, 12] with write = 3. The last two values are leftovers, not the final answer.",
        "Fill nums[write] through the last slot with zeroes. That gives [1, 3, 12, 0, 0]. Overwrite these slots rather than pushing: push would increase the array length.",
        "Stuck? Reveal the reference solution below."
    ],
    "solution": "function moveZeroes(nums) {\n  let write = 0;\n  for (let read = 0; read < nums.length; read++) {\n    if (nums[read] !== 0) {\n      nums[write] = nums[read];\n      write++;\n    }\n  }\n  while (write < nums.length) {\n    nums[write] = 0;\n    write++;\n  }\n}\n",
    "time": "O(n) — one scan followed by filling the remaining slots",
    "space": "O(1) — only read/write indices; no second array"
},

  "dsa-product-except-self": {
    steps: [
      "Use an `answer` array filled with 1s and prefix/suffix products.",
      "First pass left→right: set `answer[i] = prefix`, then `prefix *= nums[i]`.",
      "Second pass right→left: `answer[i] *= suffix`, then `suffix *= nums[i]`.",
      "Return `answer`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function productExceptSelf(nums) {\n  const answer = Array(nums.length).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < nums.length; i++) {\n    answer[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    answer[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return answer;\n}\n",
    time: "O(n) — two passes over the array",
    space: "O(1) — extra space, excluding the output array",
  },

  "dsa-binary-search": {
    steps: [
      "Use two pointers: `left = 0`, `right = nums.length - 1`.",
      "While `left <= right`, compute `mid = Math.floor((left + right) / 2)`.",
      "If `nums[mid] === target`, return `mid`.",
      "If `nums[mid] < target`, go right (`left = mid + 1`); else go left (`right = mid - 1`).",
      "Return -1 if the target isn't found.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function search(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}\n",
    time: "O(log n) — halves the range each step",
    space: "O(1) — two index pointers",
  },

  "dsa-two-sum-ii": {
    steps: [
      "Use two pointers: `left = 0`, `right = nums.length - 1`.",
      "Compute `sum = nums[left] + nums[right]`.",
      "If it equals target, return `[left + 1, right + 1]` (1-based).",
      "If the sum is too small, `left++`; if too big, `right--`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function twoSumSorted(numbers, target) {\n  let left = 0, right = numbers.length - 1;\n  while (left < right) {\n    const sum = numbers[left] + numbers[right];\n    if (sum === target) return [left + 1, right + 1];\n    if (sum < target) left++;\n    else right--;\n  }\n}\n",
    time: "O(n) — pointers converge in one pass",
    space: "O(1) — two pointers, no extra structure",
  },

  "dsa-longest-substring": {
    steps: [
      "Use a sliding window with a Map (character → last index seen).",
      "Loop `right` through the string.",
      "If `s[right]` was seen at or after `left`, move `left` to `lastIndex + 1`.",
      "Record the character's index and update `best = Math.max(best, right - left + 1)`.",
      "Return `best`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function lengthOfLongestSubstring(s) {\n  const last = new Map();\n  let left = 0, best = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (last.has(s[right]) && last.get(s[right]) >= left) {\n      left = last.get(s[right]) + 1;\n    }\n    last.set(s[right], right);\n    best = Math.max(best, right - left + 1);\n  }\n  return best;\n}\n",
    time: "O(n) — each character visited once (sliding window)",
    space: "O(k) — k = number of distinct characters",
  },

  "dsa-num-islands": {
    steps: [
      "Use DFS (or BFS) to sink each island.",
      "Loop over every cell.",
      "When you find `'1'`, increment `count` and DFS from that cell.",
      "In DFS, set the cell to `'0'` and recurse to in-bounds `'1'` neighbors.",
      "Return `count`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function numIslands(grid) {\n  const rows = grid.length, cols = grid[0].length;\n  let count = 0;\n  function dfs(r, c) {\n    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') return;\n    grid[r][c] = '0';\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < rows; r++) {\n    for (let c = 0; c < cols; c++) {\n      if (grid[r][c] === '1') { count++; dfs(r, c); }\n    }\n  }\n  return count;\n}\n",
    time: "O(rows × cols) — each cell visited once",
    space: "O(rows × cols) — recursion stack worst case",
  },

  "dsa-trapping-rain-water": {
    steps: [
      "Use two pointers `left`/`right` with `leftMax`/`rightMax`.",
      "Compare the two end heights (not the maxes).",
      "Process the shorter side: update its max, then add `sideMax - height[pointer]` to `water`.",
      "Move that pointer inward; continue until the pointers meet.",
      "Return `water`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "function trap(height) {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      leftMax = Math.max(leftMax, height[left]);\n      water += leftMax - height[left];\n      left++;\n    } else {\n      rightMax = Math.max(rightMax, height[right]);\n      water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}\n",
    time: "O(n) — pointers converge in one pass",
    space: "O(1) — a few scalar variables",
  },

  "dsa-min-stack": {
    steps: [
      "Use two stacks: `stack` for values, `mins` for the running minimum.",
      "`push(val)`: push to `stack`, and push `Math.min(val, mins.top())` to `mins`.",
      "`pop()`: pop both stacks.",
      "`top()` reads the `stack` top; `getMin()` reads the `mins` top.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class MinStack {\n  constructor() {\n    this.stack = [];\n    this.mins = [];\n  }\n  push(val) {\n    this.stack.push(val);\n    const min = this.mins.length === 0 ? val : Math.min(val, this.mins[this.mins.length - 1]);\n    this.mins.push(min);\n  }\n  pop() {\n    this.stack.pop();\n    this.mins.pop();\n  }\n  top() {\n    return this.stack[this.stack.length - 1];\n  }\n  getMin() {\n    return this.mins[this.mins.length - 1];\n  }\n}\n",
    time: "O(1) — every operation is constant time",
    space: "O(n) — two stacks of up to n elements",
  },

  "dsa-my-queue": {
    steps: [
      "Use two stacks: `in` (push here) and `out` (pop/peek here).",
      "`push(x)` always goes on `in`.",
      "For `pop`/`peek`: if `out` is empty, pour all of `in` into `out` (reversing order).",
      "`empty()` returns true when both stacks are empty.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class MyQueue {\n  constructor() {\n    this.in = [];\n    this.out = [];\n  }\n  push(x) { this.in.push(x); }\n  _pour() {\n    if (this.out.length === 0) {\n      while (this.in.length) this.out.push(this.in.pop());\n    }\n  }\n  pop() { this._pour(); return this.out.pop(); }\n  peek() { this._pour(); return this.out[this.out.length - 1]; }\n  empty() { return this.in.length === 0 && this.out.length === 0; }\n}\n",
    time: "Amortized O(1) per operation (each item moves once)",
    space: "O(n) — two stacks holding n elements total",
  },

  "dsa-my-hashmap": {
    steps: [
      "Use a plain object `{}` as the backing store (`this.map = {}`).",
      "`put(key, value)` sets `this.map[key] = value`.",
      "`get(key)` returns the value if present, else `-1`.",
      "`remove(key)` deletes the key with `delete`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class MyHashMap {\n  constructor() {\n    this.map = {};\n  }\n  put(key, value) {\n    this.map[key] = value;\n  }\n  get(key) {\n    return key in this.map ? this.map[key] : -1;\n  }\n  remove(key) {\n    delete this.map[key];\n  }\n}\n",
    time: "O(1) average per operation",
    space: "O(n) — one entry per stored key",
  },

  "dsa-trie": {
    steps: [
      "Use nodes with `children` (object/map) and an end marker.",
      "`insert(word)`: walk each character, creating child nodes, and mark the last node as an end.",
      "`search(word)`: walk the path; return `false` if a child is missing, else return the end marker.",
      "`startsWith(prefix)`: same walk, but return `true` once the full prefix is consumed.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class Trie {\n  constructor() {\n    this.root = {};\n  }\n  insert(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node[ch]) node[ch] = {};\n      node = node[ch];\n    }\n    node.$ = true;\n  }\n  _walk(word) {\n    let node = this.root;\n    for (const ch of word) {\n      if (!node[ch]) return null;\n      node = node[ch];\n    }\n    return node;\n  }\n  search(word) {\n    const node = this._walk(word);\n    return node !== null && node.$ === true;\n  }\n  startsWith(prefix) {\n    return this._walk(prefix) !== null;\n  }\n}\n",
    time: "O(L) per operation — L = length of the word/prefix",
    space: "O(total characters inserted) across all words",
  },

  "dsa-lru-cache": {
    steps: [
      "Use a `Map` (it preserves insertion order).",
      "`get(key)`: if missing return -1; otherwise delete + re-set the key to mark it most recent, then return the value.",
      "`put(key, value)`: delete the key if it exists, then set it.",
      "If size exceeds capacity, delete the first (oldest) key: `map.keys().next().value`.",
      "Stuck? Reveal the reference solution below.",
    ],
    solution:
      "class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.map = new Map();\n  }\n  get(key) {\n    if (!this.map.has(key)) return -1;\n    const val = this.map.get(key);\n    this.map.delete(key);\n    this.map.set(key, val);\n    return val;\n  }\n  put(key, value) {\n    if (this.map.has(key)) this.map.delete(key);\n    this.map.set(key, value);\n    if (this.map.size > this.capacity) {\n      const lru = this.map.keys().next().value;\n      this.map.delete(lru);\n    }\n  }\n}\n",
    time: "O(1) — get and put are constant time",
    space: "O(capacity) — at most `capacity` entries",
  },
};
