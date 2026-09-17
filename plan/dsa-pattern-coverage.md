# DSA coding and quiz coverage

All 47 coding exercises have a named Problem Recognition question and three Trigger Practice variations (141 trigger questions total). The technique labels are shared where appropriate. Each quiz round includes every exercise once; grouping by exercise ID ensures shared labels never hide an exercise.

Independently authored exercises inspired by common computer-science and interview patterns. Titles, prompts, and fixtures are original to this project.

| Coding exercise | Technique / answer | Mental trigger |
|---|---|---|
| Find a Matching Pair | Map | Need a value’s matching complement and its original index. |
| Any Repeated Value | Set | Need membership only: have I seen this value before? |
| Balanced Brackets | Stack | Need to match the most recent unmatched opening bracket. |
| Run FIFO Operations | Queue | Need the oldest waiting item first: FIFO. |
| Single Trade Peak | Running State / Greedy | Need the best earlier price and best profit while scanning once. |
| Pair From Sorted Ledger | Two Pointers | Need a pair sum in sorted data: work inward from both ends. |
| Shortest Qualifying Stretch | Sliding Window | Need a growing/shrinking positive-sum range that meets a threshold. |
| Locate in Ordered List | Binary Search | Need to halve a sorted search range. |
| Batch Range Totals | Prefix Sum | Need repeated range totals from cumulative sums. |
| Collapse Overlapping Spans | Collapse Overlaps / Sort + Sweep | Need to combine overlapping ranges after ordering their starts. |
| Loop in a Chain | Fast & Slow Pointers | Need constant-space linked-list cycle detection using different pointer speeds. |
| Flip a Chain | Flip Chain / In-Place Reverse | Need to rewire the original next links with previous/current/next references. |
| Node-Left-Right Walk | Tree DFS / Preorder | Need node, then left branch, then right branch. |
| Level-by-Level Walk | BFS / Level Order | Need tree values grouped by depth. |
| Deep Graph Walk | Graph DFS | Need to explore one graph path deeply before backing up. |
| Landmass Count | Grid DFS / Connected Components | Need to flood-fill and count connected land regions. |
| All Distinct Arrangements | Backtracking | Need every arrangement: choose, explore, undo. |
| K Biggest Values | Heap / Priority Queue | Need to retain the best K candidates using repeated minimum access. |
| Days Until Warmer | Monotonic Stack | Need to resolve pending days when a strictly warmer value arrives. |
| Step Combinations | Dynamic Programming / 1D DP | Need a count built from the previous two smaller counts. |
| Skip-Adjacent Loot | Skip-Adjacent Loot / DP | Need maximum value from non-adjacent selections: take or skip. |
| Fewest Tokens | Fewest Tokens / Unbounded DP | Need the fewest reusable denominations for an exact amount. |
| Prefix Lexicon | Trie / Prefix Tree | Need shared character paths for word and prefix lookup. |
| Disjoint Groups | Union Find / Disjoint Set | Need repeated group merges and connectivity checks. |
| Lone Duplicate Survivor | XOR / Bit Manipulation | Need equal integer pairs to cancel, leaving one unmatched value. |
| Fewest Hops | Graph BFS / Shortest Path | Need the fewest edges in an unweighted graph. |
| Clockwise Unwind | Clockwise Unwind / Boundary Pointers | Need to peel matrix boundaries inward in clockwise order. |
| Reach the Final Index | Reach Final Index / Greedy | Need the farthest reachable index so far. |
| Dominant Vote | Boyer-Moore | Need a guaranteed strict majority using candidate/vote cancellation. |
| Best Contiguous Gain | Kadane’s Algorithm | Need the best contiguous sum: extend or restart. |
| Task Dependency Order | Topological Sort | Need tasks ordered so every prerequisite comes first. |
| Phrase From Catalog | Phrase Assembly / String DP | Need to track which string prefixes can be split into dictionary words. |
| Flip the Message | String Reversal | Emit characters from last to first. |
| Label the Count | Modulo / Divisibility | Classify integers by whether division leaves a zero remainder. |
| Same Letter Inventory | Map | Track character frequencies across two strings. |
| Mirrored Phrase | Two Pointers | Compare inward ends while skipping non-alphanumerics. |
| Sequence Term | Dynamic Programming / 1D DP | Reuse the previous two Fibonacci values. |
| Digit Mirror | Digit Reversal / Half Reversal | Reverse only the lower half of an integer’s digits. |
| Absent Slot | Arithmetic Sum / Absent Slot | Compare expected range total to actual sum. |
| Slide Zeros Back | Two Pointers | Separate read/write indices in the same array. |
| Neighbor Product Map | Prefix / Suffix Products | Combine left and right products without division. |
| Longest Unique Window | Sliding Window | Expand right and advance left when uniqueness breaks. |
| Basin Capacity | Two Pointers | Process the shorter elevation boundary first. |
| Floor-Tracking Stack | Floor Stack / Auxiliary Min Stack | Keep a synchronized minimum for each stack depth. |
| FIFO From Two Stacks | FIFO From Two Stacks | Pour incoming values into an outgoing stack. |
| Simple Key Store | Map | Put, get, and remove associated values by key. |
| Bounded Recent Cache | Bounded Recent Cache / Recency Tracking | Evict least-recently-used; refresh on access. |
