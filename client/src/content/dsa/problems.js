// Data Structures & Algorithms practice problems.
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
    id: "dsa-two-sum",
    topic: "Arrays",
    title: "Two Sum",
    difficulty: "easy",
    fnName: "twoSum",
    prompt:
      "Given an array of integers `nums` and an integer `target`, return the indices of the two numbers that add up to `target`. Exactly one solution exists, and you may not use the same element twice. Return the indices in ascending order.",
    starter:
      "function twoSum(nums, target) {\n  // return [i, j]\n}\n",
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
      { input: [[-1, -2, -3, -4, -5], -8], expected: [2, 4] },
    ],
  },
  {
    id: "dsa-reverse-string",
    topic: "Strings",
    title: "Reverse String",
    difficulty: "easy",
    fnName: "reverseString",
    prompt:
      "Given a string `s`, return the string reversed.",
    starter: "function reverseString(s) {\n  // return the reversed string\n}\n",
    tests: [
      { input: ["hello"], expected: "olleh" },
      { input: ["a"], expected: "a" },
      { input: [""], expected: "" },
      { input: ["AWS rocks"], expected: "skcor SWA" },
    ],
  },
  {
    id: "dsa-fizzbuzz",
    topic: "Math",
    title: "FizzBuzz",
    difficulty: "easy",
    fnName: "fizzBuzz",
    prompt:
      "You're given a single integer `n` (not an array). Generate the numbers 1 through n yourself and return an array of length `n`, where index i holds the answer for the number i+1. For each number: multiples of both 3 and 5 → 'FizzBuzz', multiples of 3 → 'Fizz', multiples of 5 → 'Buzz', otherwise the number itself as a string. Example: fizzBuzz(5) → ['1', '2', 'Fizz', '4', 'Buzz'].",
    starter: "function fizzBuzz(n) {\n  // return an array of strings\n}\n",
    tests: [
      { input: [3], expected: ["1", "2", "Fizz"] },
      { input: [5], expected: ["1", "2", "Fizz", "4", "Buzz"] },
      {
        input: [15],
        expected: [
          "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz",
          "11", "Fizz", "13", "14", "FizzBuzz",
        ],
      },
    ],
  },
  {
    id: "dsa-max-subarray",
    topic: "Arrays",
    title: "Maximum Subarray",
    difficulty: "medium",
    fnName: "maxSubArray",
    prompt:
      "Given an integer array `nums`, return the largest sum of any contiguous non-empty subarray.",
    starter: "function maxSubArray(nums) {\n  // return the maximum subarray sum\n}\n",
    tests: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expected: 6 },
      { input: [[1]], expected: 1 },
      { input: [[5, 4, -1, 7, 8]], expected: 23 },
      { input: [[-1, -2, -3]], expected: -1 },
    ],
  },
  {
    id: "dsa-contains-duplicate",
    topic: "Hashing",
    title: "Contains Duplicate",
    difficulty: "easy",
    fnName: "containsDuplicate",
    prompt:
      "Given an integer array `nums`, return `true` if any value appears at least twice, and `false` if every element is distinct.",
    starter: "function containsDuplicate(nums) {\n  // return true or false\n}\n",
    tests: [
      { input: [[1, 2, 3, 1]], expected: true },
      { input: [[1, 2, 3, 4]], expected: false },
      { input: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], expected: true },
      { input: [[]], expected: false, hidden: true },
    ],
  },
  {
    id: "dsa-valid-anagram",
    topic: "Hashing",
    title: "Valid Anagram",
    difficulty: "easy",
    fnName: "isAnagram",
    prompt:
      "Given two strings `s` and `t`, return `true` if `t` is an anagram of `s` (same characters with the same counts), otherwise `false`.",
    starter: "function isAnagram(s, t) {\n  // return true or false\n}\n",
    tests: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false },
      { input: ["a", "ab"], expected: false },
      { input: ["", ""], expected: true, hidden: true },
    ],
  },
  {
    id: "dsa-valid-palindrome",
    topic: "Two Pointers",
    title: "Valid Palindrome",
    difficulty: "easy",
    fnName: "isPalindrome",
    prompt:
      "Given a string `s`, return `true` if it reads the same forward and backward considering only alphanumeric characters and ignoring case.",
    starter: "function isPalindrome(s) {\n  // return true or false\n}\n",
    tests: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true },
      { input: ["0P"], expected: false, hidden: true },
    ],
  },
  {
    id: "dsa-valid-parentheses",
    topic: "Stacks",
    title: "Valid Parentheses",
    difficulty: "easy",
    fnName: "isValid",
    prompt:
      "Given a string `s` containing only the characters `()[]{}`, return `true` if every opening bracket is closed by the same type in the correct order.",
    starter: "function isValid(s) {\n  // return true or false\n}\n",
    tests: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
      { input: [")"], expected: false },
      { input: ["("], expected: false },
      { input: [""], expected: true, hidden: true },
    ],
  },
  {
    id: "dsa-single-number",
    topic: "Bit Manipulation",
    title: "Single Number",
    difficulty: "medium",
    fnName: "singleNumber",
    prompt:
      "Given a non-empty array `nums` where every element appears exactly twice except for one, return that single element.",
    starter: "function singleNumber(nums) {\n  // return the unique number\n}\n",
    tests: [
      { input: [[2, 2, 1]], expected: 1 },
      { input: [[4, 1, 2, 1, 2]], expected: 4 },
      { input: [[1]], expected: 1 },
      { input: [[7, 3, 3, 7, 9]], expected: 9, hidden: true },
    ],
  },
  {
    id: "dsa-majority-element",
    topic: "Arrays",
    title: "Majority Element",
    difficulty: "medium",
    fnName: "majorityElement",
    prompt:
      "Given an array `nums` of size n, return the element that appears more than ⌊n / 2⌋ times. You may assume it always exists.",
    starter: "function majorityElement(nums) {\n  // return the majority element\n}\n",
    tests: [
      { input: [[3, 2, 3]], expected: 3 },
      { input: [[2, 2, 1, 1, 1, 2, 2]], expected: 2 },
      { input: [[1]], expected: 1 },
      { input: [[6, 5, 5]], expected: 5, hidden: true },
    ],
  },
  {
    id: "dsa-fibonacci",
    topic: "Dynamic Programming",
    title: "Fibonacci Number",
    difficulty: "easy",
    fnName: "fib",
    prompt:
      "Return the nth Fibonacci number, where fib(0) = 0, fib(1) = 1, and fib(n) = fib(n-1) + fib(n-2).",
    starter: "function fib(n) {\n  // return the nth Fibonacci number\n}\n",
    tests: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [2], expected: 1 },
      { input: [10], expected: 55 },
      { input: [20], expected: 6765, hidden: true },
    ],
  },
  {
    id: "dsa-climbing-stairs",
    topic: "Dynamic Programming",
    title: "Climbing Stairs",
    difficulty: "easy",
    fnName: "climbStairs",
    prompt:
      "You can climb 1 or 2 steps at a time. Return the number of distinct ways to climb to the top of a staircase with n steps.",
    starter: "function climbStairs(n) {\n  // return the number of distinct ways\n}\n",
    tests: [
      { input: [1], expected: 1 },
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 },
      { input: [10], expected: 89, hidden: true },
    ],
  },
  {
    id: "dsa-house-robber",
    topic: "Dynamic Programming",
    title: "House Robber",
    difficulty: "medium",
    fnName: "rob",
    prompt:
      "Given an array `nums` of house values, return the maximum amount you can rob without robbing two adjacent houses.",
    starter: "function rob(nums) {\n  // return the maximum amount\n}\n",
    tests: [
      { input: [[1, 2, 3, 1]], expected: 4 },
      { input: [[2, 7, 9, 3, 1]], expected: 12 },
      { input: [[2, 1, 1, 2]], expected: 4 },
      { input: [[5]], expected: 5, hidden: true },
    ],
  },
  {
    id: "dsa-coin-change",
    topic: "Dynamic Programming",
    title: "Coin Change",
    difficulty: "medium",
    fnName: "coinChange",
    prompt:
      "Given an array of `coins` and an `amount`, return the fewest number of coins needed to make up that amount, or -1 if it cannot be made.",
    starter:
      "function coinChange(coins, amount) {\n  // return the minimum number of coins, or -1\n}\n",
    tests: [
      { input: [[1, 2, 5], 11], expected: 3 },
      { input: [[2], 3], expected: -1 },
      { input: [[1], 0], expected: 0 },
      { input: [[1, 2, 5], 100], expected: 20, hidden: true },
    ],
  },
  {
    id: "dsa-word-break",
    topic: "Dynamic Programming",
    title: "Word Break",
    difficulty: "hard",
    fnName: "wordBreak",
    prompt:
      "Given a string `s` and a list `wordDict`, return true if `s` can be segmented into a space-separated sequence of one or more dictionary words (words may be reused).",
    starter:
      "function wordBreak(s, wordDict) {\n  // return true or false\n}\n",
    tests: [
      { input: ["leetcode", ["leet", "code"]], expected: true },
      { input: ["applepenapple", ["apple", "pen"]], expected: true },
      { input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expected: false },
      { input: ["aaaaaaa", ["aaaa", "aaa"]], expected: true, hidden: true },
    ],
  },
  {
    id: "dsa-palindrome-number",
    topic: "Math",
    title: "Palindrome Number",
    difficulty: "easy",
    fnName: "isPalindromeNumber",
    prompt:
      "Given an integer `x`, return true if it reads the same backward as forward. Negative numbers are not palindromes.",
    starter:
      "function isPalindromeNumber(x) {\n  // return true or false\n}\n",
    tests: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false },
      { input: [0], expected: true },
      { input: [1221], expected: true },
      { input: [12321], expected: true, hidden: true },
    ],
  },
  {
    id: "dsa-missing-number",
    topic: "Arrays",
    title: "Missing Number",
    difficulty: "easy",
    fnName: "missingNumber",
    prompt:
      "Given an array `nums` containing n distinct numbers taken from the range 0..n, return the one number that is missing from the range.",
    starter: "function missingNumber(nums) {\n  // return the missing number\n}\n",
    tests: [
      { input: [[3, 0, 1]], expected: 2 },
      { input: [[0, 1]], expected: 2 },
      { input: [[0]], expected: 1 },
      { input: [[1]], expected: 0 },
      { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expected: 8, hidden: true },
    ],
  },
  {
    id: "dsa-max-profit",
    topic: "Arrays",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    fnName: "maxProfit",
    prompt:
      "Given an array `prices` where prices[i] is the price on day i, return the maximum profit from buying on one day and selling on a later day. Return 0 if no profit is possible.",
    starter: "function maxProfit(prices) {\n  // return the maximum profit\n}\n",
    tests: [
      { input: [[7, 1, 5, 3, 6, 4]], expected: 5 },
      { input: [[7, 6, 4, 3, 1]], expected: 0 },
      { input: [[1, 2]], expected: 1 },
      { input: [[6, 8, 4, 9, 1, 5]], expected: 5 },
      { input: [[2, 4, 1]], expected: 2, hidden: true },
    ],
  },
  {
    id: "dsa-move-zeroes",
    version: 2,
    topic: "Two Pointers",
    title: "Move Zeroes — In Place",
    difficulty: "medium",
    fnName: "moveZeroes",
    outputKind: "mutated-first-arg",
    prompt:
      "Given an integer array nums, move all zeroes to the end IN PLACE while preserving the relative order of non-zero values. In place means writing into the same array the caller passed you, without building a second array. Keep its length unchanged. Aim for O(n) time and O(1) extra space. No return value is required: the grader checks nums after your function finishes and ignores the return value. Reassigning nums to a new array only changes your local variable and does not update the caller's array. Empty arrays are valid.",
    starter:
      "function moveZeroes(nums) {\n  // Modify nums itself. Do not create a results array.\n  // No return statement is needed.\n}\n",
    tests: [
      { input: [[0, 1, 0, 3, 12]], expected: [1, 3, 12, 0, 0] },
      { input: [[0]], expected: [0] },
      { input: [[1, 2, 3]], expected: [1, 2, 3] },
      { input: [[0, 0, 0]], expected: [0, 0, 0] },
      { input: [[]], expected: [] },
      { input: [[0, 0, 1]], expected: [1, 0, 0], hidden: true },
      { input: [[-2, 0, -2, 4, 0, -1]], expected: [-2, -2, 4, -1, 0, 0], hidden: true },
      { input: [[0, 5, 0, 5, 0, 2, 0]], expected: [5, 5, 2, 0, 0, 0, 0], hidden: true },
      { input: [[7, 0, 0]], expected: [7, 0, 0], hidden: true },
    ],
  },
  {
    id: "dsa-product-except-self",
    topic: "Arrays",
    title: "Product of Array Except Self",
    difficulty: "medium",
    fnName: "productExceptSelf",
    prompt:
      "Given an array `nums`, return an array `answer` where answer[i] is the product of all elements of nums except nums[i].",
    starter:
      "function productExceptSelf(nums) {\n  // return the products array\n}\n",
    tests: [
      { input: [[1, 2, 3, 4]], expected: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expected: [0, 0, 9, 0, 0] },
      { input: [[2, 3]], expected: [3, 2] },
      { input: [[0, 4, 0]], expected: [0, 0, 0] },
      { input: [[1, 1, 1]], expected: [1, 1, 1], hidden: true },
    ],
  },
  {
    id: "dsa-binary-search",
    topic: "Binary Search",
    title: "Binary Search",
    difficulty: "easy",
    fnName: "search",
    prompt:
      "Given a sorted (ascending) array `nums` and a `target`, return the index of target, or -1 if it is not present. Aim for O(log n).",
    starter:
      "function search(nums, target) {\n  // return the index of target, or -1\n}\n",
    tests: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { input: [[-1, 0, 3, 5, 9, 12], -1], expected: 0 },
      { input: [[5], 5], expected: 0 },
      { input: [[2, 5], 0], expected: -1, hidden: true },
    ],
  },
  {
    id: "dsa-two-sum-ii",
    topic: "Two Pointers",
    title: "Two Sum II — Sorted Input",
    difficulty: "medium",
    fnName: "twoSumSorted",
    prompt:
      "Given a 1-indexed array `numbers` sorted in ascending order, return the 1-based indices [i, j] of the two numbers that add up to `target` (exactly one solution; i < j). This is the classic two-pointer problem.",
    starter:
      "function twoSumSorted(numbers, target) {\n  // return [i, j] (1-indexed)\n}\n",
    tests: [
      { input: [[2, 7, 11, 15], 9], expected: [1, 2] },
      { input: [[2, 3, 4], 6], expected: [1, 3] },
      { input: [[-1, 0], -1], expected: [1, 2] },
      { input: [[1, 2, 3, 4, 4, 9, 56, 90], 8], expected: [4, 5], hidden: true },
    ],
  },
  {
    id: "dsa-longest-substring",
    topic: "Sliding Window",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    fnName: "lengthOfLongestSubstring",
    prompt:
      "Given a string `s`, return the length of the longest substring that contains no repeating characters.",
    starter:
      "function lengthOfLongestSubstring(s) {\n  // return the length\n}\n",
    tests: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: [""], expected: 0 },
      { input: ["pwwkew"], expected: 3 },
      { input: ["dvdf"], expected: 3, hidden: true },
    ],
  },
  {
    id: "dsa-num-islands",
    topic: "Graphs",
    title: "Number of Islands",
    difficulty: "hard",
    fnName: "numIslands",
    prompt:
      "Given a 2D grid of '1' (land) and '0' (water) strings, return the number of islands. An island is connected land cells joined horizontally or vertically.",
    starter: "function numIslands(grid) {\n  // return the number of islands\n}\n",
    tests: [
      {
        input: [
          [
            ["1", "1", "0"],
            ["1", "0", "0"],
            ["0", "0", "1"],
          ],
        ],
        expected: 2,
      },
      {
        input: [
          [
            ["1", "1", "1"],
            ["0", "1", "0"],
            ["1", "1", "1"],
          ],
        ],
        expected: 1,
      },
      { input: [[["0"]]], expected: 0 },
      {
        input: [
          [
            ["1", "0", "1"],
            ["0", "0", "0"],
            ["1", "0", "1"],
          ],
        ],
        expected: 4,
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-trapping-rain-water",
    topic: "Two Pointers",
    title: "Trapping Rain Water",
    difficulty: "hard",
    fnName: "trap",
    prompt:
      "Given an array `height` representing an elevation map (bar widths of 1), return how many units of water can be trapped after raining.",
    starter: "function trap(height) {\n  // return units of trapped water\n}\n",
    tests: [
      { input: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], expected: 6 },
      { input: [[4, 2, 0, 3, 2, 5]], expected: 9 },
      { input: [[1, 0, 1]], expected: 1 },
      { input: [[3, 2, 1]], expected: 0 },
      { input: [[4, 2, 3]], expected: 1, hidden: true },
    ],
  },
  {
    id: "dsa-min-stack",
    topic: "Stacks",
    title: "Min Stack",
    difficulty: "medium",
    kind: "design",
    className: "MinStack",
    prompt:
      "Design a stack that supports push, pop, top, and retrieving the minimum element — all in O(1) time. push(val), pop(), top(), getMin().",
    starter:
      "class MinStack {\n  constructor() {\n\n  }\n  push(val) {\n\n  }\n  pop() {\n\n  }\n  top() {\n\n  }\n  getMin() {\n\n  }\n}\n",
    tests: [
      {
        ops: ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
        args: [[], [-2], [0], [-3], [], [], [], []],
        expected: [null, null, null, null, -3, null, 0, -2],
      },
      {
        ops: ["MinStack", "push", "getMin", "top"],
        args: [[], [1], [], []],
        expected: [null, null, 1, 1],
      },
      {
        ops: ["MinStack", "push", "push", "pop", "getMin"],
        args: [[], [2], [1], [], []],
        expected: [null, null, null, null, 2],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-my-queue",
    topic: "Queues",
    title: "Implement Queue using Stacks",
    difficulty: "easy",
    kind: "design",
    className: "MyQueue",
    prompt:
      "Implement a first-in-first-out (FIFO) queue using only stack-like operations. push(x) adds to the back, pop() removes from the front, peek() returns the front, empty() returns whether the queue is empty.",
    starter:
      "class MyQueue {\n  constructor() {\n\n  }\n  push(x) {\n\n  }\n  pop() {\n\n  }\n  peek() {\n\n  }\n  empty() {\n\n  }\n}\n",
    tests: [
      {
        ops: ["MyQueue", "push", "push", "peek", "pop", "empty"],
        args: [[], [1], [2], [], [], []],
        expected: [null, null, null, 1, 1, false],
      },
      {
        ops: ["MyQueue", "empty"],
        args: [[], []],
        expected: [null, true],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-my-hashmap",
    topic: "Hashing",
    title: "Design HashMap",
    difficulty: "easy",
    kind: "design",
    className: "MyHashMap",
    prompt:
      "Design a key-value map without using built-in hash table libraries. put(key, value) inserts or updates, get(key) returns the value or -1 if absent, remove(key) deletes the key.",
    starter:
      "class MyHashMap {\n  constructor() {\n\n  }\n  put(key, value) {\n\n  }\n  get(key) {\n\n  }\n  remove(key) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"],
        args: [[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]],
        expected: [null, null, null, 1, -1, null, 1, null, -1],
      },
      {
        ops: ["MyHashMap", "get"],
        args: [[], [5]],
        expected: [null, -1],
        hidden: true,
      },
      {
        ops: ["MyHashMap", "put", "get", "remove", "get"],
        args: [[], [1, 0], [1], [1], [1]],
        expected: [null, null, 0, null, -1],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-trie",
    topic: "Trees",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "medium",
    kind: "design",
    className: "Trie",
    prompt:
      "Implement a trie with insert(word), search(word) returning whether the exact word was inserted, and startsWith(prefix) returning whether any inserted word starts with the prefix.",
    starter:
      "class Trie {\n  constructor() {\n\n  }\n  insert(word) {\n\n  }\n  search(word) {\n\n  }\n  startsWith(prefix) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"],
        args: [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
        expected: [null, null, true, false, true, null, true],
      },
      {
        ops: ["Trie", "insert", "startsWith"],
        args: [[], ["hello"], ["he"]],
        expected: [null, null, true],
        hidden: true,
      },
    ],
  },
  {
    id: "dsa-lru-cache",
    topic: "Design",
    title: "LRU Cache",
    difficulty: "hard",
    kind: "design",
    className: "LRUCache",
    prompt:
      "Design a Least Recently Used (LRU) cache with a fixed capacity (passed to the constructor). get(key) returns the value or -1 and marks it most-recently used; put(key, value) inserts/updates and evicts the least-recently-used entry when over capacity.",
    starter:
      "class LRUCache {\n  constructor(capacity) {\n\n  }\n  get(key) {\n\n  }\n  put(key, value) {\n\n  }\n}\n",
    tests: [
      {
        ops: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
        args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
        expected: [null, null, null, 1, null, -1, null, -1, 3, 4],
      },
      {
        ops: ["LRUCache", "put", "get", "put", "get", "get"],
        args: [[1], [2, 1], [2], [3, 2], [2], [3]],
        expected: [null, null, 1, null, -1, 2],
        hidden: true,
      },
    ],
  },
];

problems.push(...expansionProblems);

export const dsaTopics = [...new Set(problems.map((p) => p.topic))];

export const problemById = Object.fromEntries(problems.map((p) => [p.id, p]));
