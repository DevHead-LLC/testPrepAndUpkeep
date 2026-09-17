# DSA coding and quiz coverage

All 47 coding exercises have a named Problem Recognition question and three Trigger Practice variations (141 trigger questions total). The 40 technique labels are shared where appropriate. Each quiz round includes every exercise once; grouping by exercise ID ensures shared labels never hide an exercise. The DSA Patterns study guide displays the same names and mental triggers.

| Coding exercise | Technique / answer | Mental trigger |
|---|---|---|
| Two Sum | Map | Need a value’s matching complement and its original index. |
| Contains Duplicate | Set | Need membership only: have I seen this value before? |
| Valid Parentheses | Stack | Need to match the most recent unmatched opening bracket. |
| Process a FIFO Queue | Queue | Need the oldest waiting item first: FIFO. |
| Best Time to Buy and Sell Stock | Running State / Greedy | Need the best earlier price and best profit while scanning once. |
| Two Sum II — Sorted Input | Two Pointers | Need a pair sum in sorted data: work inward from both ends. |
| Minimum Size Subarray Sum | Sliding Window | Need a growing/shrinking positive-sum range that meets a threshold. |
| Binary Search | Binary Search | Need to halve a sorted search range. |
| Range Sum Queries | Prefix Sum | Need repeated range totals from cumulative sums. |
| Merge Overlapping Intervals | Merge Intervals / Sort + Sweep | Need to combine overlapping ranges after ordering their starts. |
| Linked List Cycle | Fast & Slow Pointers | Need constant-space linked-list cycle detection using different pointer speeds. |
| Reverse Linked List | Reverse Linked List | Need to rewire the original next links with previous/current/next references. |
| Binary Tree Preorder Traversal | Tree DFS / Preorder | Need node, then left branch, then right branch. |
| Binary Tree Level Order Traversal | BFS / Level Order | Need tree values grouped by depth. |
| Depth-First Graph Traversal | Graph DFS | Need to explore one graph path deeply before backing up. |
| Number of Islands | Grid DFS / Connected Components | Need to flood-fill and count connected land regions. |
| All Permutations | Backtracking | Need every arrangement: choose, explore, undo. |
| K Largest Values | Heap / Priority Queue | Need to retain the best K candidates using repeated minimum access. |
| Daily Temperatures | Monotonic Stack | Need to resolve pending days when a strictly warmer value arrives. |
| Climbing Stairs | Dynamic Programming / 1D DP | Need a count built from the previous two smaller counts. |
| House Robber | House Robber | Need maximum value from non-adjacent selections: take or skip. |
| Coin Change | Coin Change | Need the fewest reusable denominations for an exact amount. |
| Implement Trie (Prefix Tree) | Trie / Prefix Tree | Need shared character paths for word and prefix lookup. |
| Union Find / Disjoint Set | Union Find / Disjoint Set | Need repeated group merges and connectivity checks. |
| Single Number | XOR / Bit Manipulation | Need equal integer pairs to cancel, leaving one unmatched value. |
| Shortest Path in an Unweighted Graph | Graph BFS / Shortest Path | Need the fewest edges in an unweighted graph. |
| Spiral Matrix | Spiral Matrix / Boundary Pointers | Need to peel matrix boundaries inward in clockwise order. |
| Jump Game | Jump Game / Greedy | Need the farthest reachable index so far. |
| Majority Element | Boyer-Moore | Need a guaranteed strict majority using candidate/vote cancellation. |
| Maximum Subarray | Kadane’s Algorithm | Need the best contiguous sum: extend or restart. |
| Course / Task Order | Topological Sort | Need tasks ordered so every prerequisite comes first. |
| Word Break | Word Break / String DP | Need to track which string prefixes can be split into dictionary words. |
| Reverse String | String Reversal | You need to emit the characters of a string from last to first. Which operation fits? |
| FizzBuzz | Modulo / Divisibility | You must classify integers by whether division leaves a zero remainder. Which technique fits? |
| Valid Anagram | Map | Two strings contain the same distinct letters, but you also need their multiplicities to match. Which structure stores those counts? |
| Valid Palindrome | Two Pointers | You compare the leftmost and rightmost meaningful characters, skipping punctuation and moving inward. Which technique fits? |
| Fibonacci Number | Dynamic Programming / 1D DP | Each sequence value is the sum of the previous two, and naive recursion repeatedly solves identical states. Which general pattern avoids that repetition? |
| Palindrome Number | Digit Reversal / Half Reversal | You repeatedly take x % 10 and shorten x with integer division, building the reversed lower half of its digits. Which technique is this? |
| Missing Number | Arithmetic Sum / Missing Number | Exactly one value is missing from a complete consecutive integer range. You compare the range’s expected total with its actual total. Which technique fits? |
| Move Zeroes — In Place | Two Pointers | You scan with a read index and copy each non-zero value into the next write slot of the same array, then overwrite the remaining slots with zeroes. Which technique fits? |
| Product of Array Except Self | Prefix / Suffix Products | Each output needs the product before its index multiplied by the product after it. Which technique avoids dividing by the current value? |
| Longest Substring Without Repeating Characters | Sliding Window | You grow a substring until its uniqueness rule fails, then move the left boundary past the conflicting occurrence. Which range-management pattern fits? |
| Trapping Rain Water | Two Pointers | You scan inward from both ends of an elevation array and use the shorter boundary’s running maximum to count trapped water. Which technique fits? |
| Min Stack | Min Stack / Auxiliary Min Stack | After popping the smallest stack value, you need to recover the previous minimum immediately. Which structure remembers a minimum at every depth? |
| Implement Queue using Stacks | Queue Using Two Stacks | You need oldest-first behavior using only last-in, first-out containers. Which design reverses incoming items into a second stack? |
| Design HashMap | Map | You need key-based insertion, replacement, lookup, and deletion of associated values. Which abstract structure fits? |
| LRU Cache | LRU Cache / Recency Tracking | Cache eviction must follow last access time rather than insertion age, and reading a key refreshes its position. Which pattern fits? |

## Local content

- Original exercises: `client/src/content/dsa/problems.js` (also exports the combined bank).
- Added exercises: `client/src/content/dsa/expansion.data.js`.
- Added progressive tips, reference code, and complexity notes: `client/src/content/dsa/expansion-tips.data.js`, combined through `tips.js`.
- Coverage mapping: `client/src/content/dsa/coverage.data.js`.
- Visible tests supply the examples; hidden tests cover edge cases.

## Grading contracts

- Most exercises use the existing function or design-class protocol and exact output comparison.
- `inputKind: binary-tree` converts level-order values into actual `{ val, left, right }` nodes. Null children are skipped as parents when assigning the remaining values.
- `inputKind: linked-list-cycle` converts values plus tail-connection index (-1 for none) into actual `{ val, next }` nodes. Only head is passed to the solution.
- `inputKind: linked-list` builds an acyclic list and verifies the returned head reuses every original node in reverse order, with unchanged values and a null terminator.
- `outputKind: unordered` accepts any outer ordering for permutations and top-K, while enforcing multiplicities.
- `outputKind: topological-order` accepts any complete ordering that satisfies every prerequisite; known cyclic fixtures require an empty result.
- Grading checks behavior rather than inspecting the algorithm or proving Big-O bounds. Complexity targets are taught in the tips. Inputs are cloned per test; execution remains in a killable browser worker.

## Verification

From `client/`: `npm run validate`, `npm run test:dsa`, `npm run build`, and `npm run lint`. The runner tests execute all 47 reference solutions (237 cases), reject unfinished starters, exercise alternative outputs and invalid list reversals, and test the worker message protocol and timeout through a Node worker bridge. Existing Real World references also passed all 46 cases. Browser interaction remains for local user testing; the dev server was not started.

- `outputKind: mutated-first-arg` grades the first argument after the call and ignores the return value (Move Zeroes). Visible examples label the post-call array. Exercise version 2 excludes earlier return-array attempts from its current progress, without deleting saved history.
