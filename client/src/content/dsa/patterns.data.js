// Local four-choice questions. Independently authored recognition prompts
// paired with coding exercises. Technique ideas are common CS patterns;
// wording and IDs are original to this project.
export const patternQuestions = [
  {
    "id": "pattern-matching-pair",
    "type": "single",
    "prompt": "A payment ledger lists amounts; you must return the two positions that sum to a required total. Which structure remembers prior values and their indices for complement lookup?",
    "options": [
      {
        "id": "a",
        "text": "Map"
      },
      {
        "id": "b",
        "text": "Set"
      },
      {
        "id": "c",
        "text": "Running State / Greedy"
      },
      {
        "id": "d",
        "text": "Trie / Prefix Tree"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Store previously seen values and their indices in a Map; look up the complement before inserting each value.",
    "exerciseId": "dsa-matching-pair",
    "mentalTrigger": "Need a value’s matching complement and its original index."
  },
  {
    "id": "pattern-repeated-value",
    "type": "single",
    "prompt": "Sensor readings arrive in a list. You only need to know whether any reading appears more than once. Which membership structure fits?",
    "options": [
      {
        "id": "a",
        "text": "Set"
      },
      {
        "id": "b",
        "text": "Stack"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Trie / Prefix Tree"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "A Set tracks seen values. Encountering a value already present proves a duplicate exists.",
    "exerciseId": "dsa-any-repeated-value",
    "mentalTrigger": "Need membership only: have I seen this value before?"
  },
  {
    "id": "pattern-balanced-brackets",
    "type": "single",
    "prompt": "A config string uses (), [], and {}. You must verify every opener is closed by the matching type in correct nesting order. Which structure holds unmatched openers?",
    "options": [
      {
        "id": "a",
        "text": "Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Set"
      },
      {
        "id": "d",
        "text": "Prefix Sum"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Push opening brackets and match each closing bracket against the most recent opening bracket.",
    "exerciseId": "dsa-balanced-brackets",
    "mentalTrigger": "Need to match the most recent unmatched opening bracket."
  },
  {
    "id": "pattern-fifo-ops",
    "type": "single",
    "prompt": "A ticket desk processes enqueue, dequeue, peek, and empty operations in arrival order. Which structure models that FIFO workflow?",
    "options": [
      {
        "id": "a",
        "text": "Queue"
      },
      {
        "id": "b",
        "text": "Stack"
      },
      {
        "id": "c",
        "text": "Heap / Priority Queue"
      },
      {
        "id": "d",
        "text": "Trie / Prefix Tree"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Use the simple queue representation: enqueue at the back and dequeue from the front. No custom queue design is required.",
    "exerciseId": "dsa-fifo-ops",
    "mentalTrigger": "Need the oldest waiting item first: FIFO."
  },
  {
    "id": "pattern-single-trade",
    "type": "single",
    "prompt": "Daily quotes arrive in order. You may buy once and sell once later. Which one-pass pattern tracks the best earlier price and best profit so far?",
    "options": [
      {
        "id": "a",
        "text": "Running State / Greedy"
      },
      {
        "id": "b",
        "text": "Binary Search"
      },
      {
        "id": "c",
        "text": "Prefix Sum"
      },
      {
        "id": "d",
        "text": "Heap / Priority Queue"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Track the lowest price seen so far and the best profit from selling at the current price.",
    "exerciseId": "dsa-single-trade-peak",
    "mentalTrigger": "Need the best earlier price and best profit while scanning once."
  },
  {
    "id": "pattern-sorted-pair",
    "type": "single",
    "prompt": "A sorted ledger must yield a pair of positions whose amounts sum to a total. Which two-end scan adjusts based on whether the current sum is too small or too large?",
    "options": [
      {
        "id": "a",
        "text": "Two Pointers"
      },
      {
        "id": "b",
        "text": "Stack"
      },
      {
        "id": "c",
        "text": "Trie / Prefix Tree"
      },
      {
        "id": "d",
        "text": "Prefix Sum"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Start at opposite ends. Move the left pointer when the sum is too small and the right pointer when it is too large.",
    "exerciseId": "dsa-pair-from-sorted-ledger",
    "mentalTrigger": "Need a pair sum in sorted data: work inward from both ends."
  },
  {
    "id": "pattern-shortest-stretch",
    "type": "single",
    "prompt": "Positive values form a list and you need the shortest contiguous stretch whose sum meets a threshold. Which growing/shrinking window pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "Sliding Window"
      },
      {
        "id": "b",
        "text": "Binary Search"
      },
      {
        "id": "c",
        "text": "Heap / Priority Queue"
      },
      {
        "id": "d",
        "text": "Monotonic Stack"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Expand the right edge, then shrink the left edge while the sum meets the target. Positive values make these adjustments predictable.",
    "exerciseId": "dsa-shortest-qualifying-stretch",
    "mentalTrigger": "Need a growing/shrinking positive-sum range that meets a threshold."
  },
  {
    "id": "pattern-ordered-locate",
    "type": "single",
    "prompt": "A sorted list must return the index of a needle, or -1 if absent, in logarithmic time. Which search pattern repeatedly discards half the range?",
    "options": [
      {
        "id": "a",
        "text": "Binary Search"
      },
      {
        "id": "b",
        "text": "Stack"
      },
      {
        "id": "c",
        "text": "Queue"
      },
      {
        "id": "d",
        "text": "Trie / Prefix Tree"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Compare with the middle element and discard the half that cannot contain the target.",
    "exerciseId": "dsa-locate-in-ordered-list",
    "mentalTrigger": "Need to halve a sorted search range."
  },
  {
    "id": "pattern-range-totals",
    "type": "single",
    "prompt": "An unchanged integer list will receive many inclusive range-total queries. Which preprocessing pattern answers each query in constant time?",
    "options": [
      {
        "id": "a",
        "text": "Prefix Sum"
      },
      {
        "id": "b",
        "text": "Sliding Window"
      },
      {
        "id": "c",
        "text": "Heap / Priority Queue"
      },
      {
        "id": "d",
        "text": "XOR / Bit Manipulation"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Store cumulative sums once. An inclusive range sum is prefix[right + 1] minus prefix[left].",
    "exerciseId": "dsa-range-total-queries",
    "mentalTrigger": "Need repeated range totals from cumulative sums."
  },
  {
    "id": "pattern-collapse-overlaps",
    "type": "single",
    "prompt": "Calendar spans may overlap or touch. After ordering by start, which sweep merges them into a minimal covering list?",
    "options": [
      {
        "id": "a",
        "text": "Collapse Overlaps / Sort + Sweep"
      },
      {
        "id": "b",
        "text": "Binary Search"
      },
      {
        "id": "c",
        "text": "Trie / Prefix Tree"
      },
      {
        "id": "d",
        "text": "XOR / Bit Manipulation"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Sort by start time, then extend the current interval when the next interval overlaps it.",
    "exerciseId": "dsa-collapse-overlaps",
    "mentalTrigger": "Need to combine overlapping ranges after ordering their starts."
  },
  {
    "id": "pattern-loop-in-chain",
    "type": "single",
    "prompt": "A singly linked chain may reconnect onto an earlier node. Which constant-space technique detects that loop using two differently paced references?",
    "options": [
      {
        "id": "a",
        "text": "Fast & Slow Pointers"
      },
      {
        "id": "b",
        "text": "Set"
      },
      {
        "id": "c",
        "text": "Map"
      },
      {
        "id": "d",
        "text": "Flip Chain / In-Place Reverse"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Move one pointer one node per step and another two. They meet inside a cycle; reaching the end means no cycle.",
    "exerciseId": "dsa-loop-in-chain",
    "mentalTrigger": "Need constant-space linked-list cycle detection using different pointer speeds."
  },
  {
    "id": "pattern-flip-chain",
    "type": "single",
    "prompt": "An acyclic node chain must be reversed in place by rewiring next links. Which previous/current/next walk fits?",
    "options": [
      {
        "id": "a",
        "text": "Flip Chain / In-Place Reverse"
      },
      {
        "id": "b",
        "text": "Fast & Slow Pointers"
      },
      {
        "id": "c",
        "text": "Queue"
      },
      {
        "id": "d",
        "text": "Binary Search"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Keep previous, current, and next references. Redirect each next pointer to the previous node, then advance.",
    "exerciseId": "dsa-flip-chain",
    "mentalTrigger": "Need to rewire the original next links with previous/current/next references."
  },
  {
    "id": "pattern-node-left-right",
    "type": "single",
    "prompt": "A binary tree report must emit each node before its left subtree and then its right subtree. Which traversal order is that?",
    "options": [
      {
        "id": "a",
        "text": "Tree DFS / Preorder"
      },
      {
        "id": "b",
        "text": "BFS / Level Order"
      },
      {
        "id": "c",
        "text": "Topological Sort"
      },
      {
        "id": "d",
        "text": "Binary Search"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Visit the current node before recursively traversing its left and right subtrees.",
    "exerciseId": "dsa-node-left-right-walk",
    "mentalTrigger": "Need node, then left branch, then right branch."
  },
  {
    "id": "pattern-level-by-level",
    "type": "single",
    "prompt": "You need tree values grouped by depth from the root downward. Which breadth-first pattern processes one level at a time?",
    "options": [
      {
        "id": "a",
        "text": "BFS / Level Order"
      },
      {
        "id": "b",
        "text": "Tree DFS / Preorder"
      },
      {
        "id": "c",
        "text": "Monotonic Stack"
      },
      {
        "id": "d",
        "text": "Binary Search"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Use a queue, processing the current level before moving to the children at the next level.",
    "exerciseId": "dsa-level-by-level-walk",
    "mentalTrigger": "Need tree values grouped by depth."
  },
  {
    "id": "pattern-deep-graph",
    "type": "single",
    "prompt": "From a start node in an adjacency list, explore one unvisited neighbor chain fully before backing up. Which graph traversal is that?",
    "options": [
      {
        "id": "a",
        "text": "Graph DFS"
      },
      {
        "id": "b",
        "text": "Graph BFS / Shortest Path"
      },
      {
        "id": "c",
        "text": "Topological Sort"
      },
      {
        "id": "d",
        "text": "Union Find / Disjoint Set"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Use recursion or a stack and mark visited nodes to avoid repeatedly exploring cycles.",
    "exerciseId": "dsa-deep-graph-walk",
    "mentalTrigger": "Need to explore one graph path deeply before backing up."
  },
  {
    "id": "pattern-landmass",
    "type": "single",
    "prompt": "A coastal grid marks land versus water; land connects only orthogonally. Which flood-fill pattern counts separate landmasses?",
    "options": [
      {
        "id": "a",
        "text": "Grid DFS / Connected Components"
      },
      {
        "id": "b",
        "text": "Binary Search"
      },
      {
        "id": "c",
        "text": "Prefix Sum"
      },
      {
        "id": "d",
        "text": "Clockwise Unwind / Boundary Pointers"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Start a flood fill at each unvisited land cell and mark its connected land. Each new flood fill counts one landmass.",
    "exerciseId": "dsa-landmass-count",
    "mentalTrigger": "Need to flood-fill and count connected land regions."
  },
  {
    "id": "pattern-all-arrangements",
    "type": "single",
    "prompt": "Distinct values must produce every arrangement exactly once via choose, explore, and undo. Which search pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "Backtracking"
      },
      {
        "id": "b",
        "text": "Running State / Greedy"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Reach Final Index / Greedy"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Choose an unused number, explore that choice, then undo it so other permutations can be generated.",
    "exerciseId": "dsa-all-arrangements",
    "mentalTrigger": "Need every arrangement: choose, explore, undo."
  },
  {
    "id": "pattern-k-biggest",
    "type": "single",
    "prompt": "From a large list you need the K biggest values without fully sorting. Which structure repeatedly exposes the current minimum retained candidate?",
    "options": [
      {
        "id": "a",
        "text": "Heap / Priority Queue"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Trie / Prefix Tree"
      },
      {
        "id": "d",
        "text": "Prefix Sum"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Keep a min-heap of at most K values. Remove its smallest value whenever the heap grows beyond K.",
    "exerciseId": "dsa-k-biggest-values",
    "mentalTrigger": "Need to retain the best K candidates using repeated minimum access."
  },
  {
    "id": "pattern-days-until-warmer",
    "type": "single",
    "prompt": "For each daily reading, return how many days until a strictly higher reading appears later. Which stack resolves pending earlier days?",
    "options": [
      {
        "id": "a",
        "text": "Monotonic Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Prefix Sum"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Keep unresolved indices in decreasing reading order. A warmer day resolves indices popped from the stack.",
    "exerciseId": "dsa-days-until-warmer",
    "mentalTrigger": "Need to resolve pending days when a strictly warmer value arrives."
  },
  {
    "id": "pattern-step-combinations",
    "type": "single",
    "prompt": "A staircase allows steps of size 1 or 2; ways to reach step i reuse the two previous counts. Which DP pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "Dynamic Programming / 1D DP"
      },
      {
        "id": "b",
        "text": "Running State / Greedy"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Heap / Priority Queue"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Ways to reach step n equal ways to reach n - 1 plus ways to reach n - 2. Retain the two previous counts.",
    "exerciseId": "dsa-step-combinations",
    "mentalTrigger": "Need a count built from the previous two smaller counts."
  },
  {
    "id": "pattern-skip-adjacent",
    "type": "single",
    "prompt": "Along a row of rewards, maximizing the total forbids taking two neighbors. Which take-or-skip DP pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "Skip-Adjacent Loot / DP"
      },
      {
        "id": "b",
        "text": "Fewest Tokens / Unbounded DP"
      },
      {
        "id": "c",
        "text": "Reach Final Index / Greedy"
      },
      {
        "id": "d",
        "text": "Kadane’s Algorithm"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "At each stash, compare skipping it with taking its value plus the best total ending at least two positions earlier.",
    "exerciseId": "dsa-skip-adjacent-loot",
    "mentalTrigger": "Need maximum value from non-adjacent selections: take or skip."
  },
  {
    "id": "pattern-fewest-tokens",
    "type": "single",
    "prompt": "Unlimited token denominations must reach an exact total with as few tokens as possible. Which unbounded DP pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "Fewest Tokens / Unbounded DP"
      },
      {
        "id": "b",
        "text": "Running State / Greedy"
      },
      {
        "id": "c",
        "text": "Skip-Adjacent Loot / DP"
      },
      {
        "id": "d",
        "text": "Boyer-Moore"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Build minimum counts for smaller amounts, using each coin as a possible last coin. Unreachable amounts remain impossible; assume positive denominations with unlimited supply.",
    "exerciseId": "dsa-fewest-tokens",
    "mentalTrigger": "Need the fewest reusable denominations for an exact amount."
  },
  {
    "id": "pattern-prefix-lexicon",
    "type": "single",
    "prompt": "A word collection needs insert, exact search, and shared-prefix checks via character paths. Which tree structure fits?",
    "options": [
      {
        "id": "a",
        "text": "Trie / Prefix Tree"
      },
      {
        "id": "b",
        "text": "Set"
      },
      {
        "id": "c",
        "text": "Stack"
      },
      {
        "id": "d",
        "text": "Heap / Priority Queue"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Store characters along shared paths. An end-of-word marker distinguishes a complete word from a prefix.",
    "exerciseId": "dsa-prefix-lexicon",
    "mentalTrigger": "Need shared character paths for word and prefix lookup."
  },
  {
    "id": "pattern-disjoint-groups",
    "type": "single",
    "prompt": "Nodes start alone; unions merge groups and connectivity queries ask whether two share a group. Which structure fits?",
    "options": [
      {
        "id": "a",
        "text": "Union Find / Disjoint Set"
      },
      {
        "id": "b",
        "text": "Topological Sort"
      },
      {
        "id": "c",
        "text": "Trie / Prefix Tree"
      },
      {
        "id": "d",
        "text": "Monotonic Stack"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Each group has a representative. Union merges groups and find identifies a node’s current representative.",
    "exerciseId": "dsa-disjoint-groups",
    "mentalTrigger": "Need repeated group merges and connectivity checks."
  },
  {
    "id": "pattern-lone-survivor",
    "type": "single",
    "prompt": "Every value appears twice except one. Which constant-space bit operation cancels equal pairs?",
    "options": [
      {
        "id": "a",
        "text": "XOR / Bit Manipulation"
      },
      {
        "id": "b",
        "text": "Set"
      },
      {
        "id": "c",
        "text": "Map"
      },
      {
        "id": "d",
        "text": "Heap / Priority Queue"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "XOR cancels equal pairs because x XOR x is zero and x XOR zero is x.",
    "exerciseId": "dsa-lone-survivor",
    "mentalTrigger": "Need equal integer pairs to cancel, leaving one unmatched value."
  },
  {
    "id": "pattern-fewest-hops",
    "type": "single",
    "prompt": "Every directed edge costs one hop. Which search finds the fewest hops from start to target?",
    "options": [
      {
        "id": "a",
        "text": "Graph BFS / Shortest Path"
      },
      {
        "id": "b",
        "text": "Graph DFS"
      },
      {
        "id": "c",
        "text": "Topological Sort"
      },
      {
        "id": "d",
        "text": "Union Find / Disjoint Set"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "BFS explores nodes in increasing edge distance. The first visit to the target gives a shortest path length.",
    "exerciseId": "dsa-unweighted-shortest-hops",
    "mentalTrigger": "Need the fewest edges in an unweighted graph."
  },
  {
    "id": "pattern-clockwise-unwind",
    "type": "single",
    "prompt": "A rectangular grid must be read clockwise from the outside inward. Which boundary-pointer pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "Clockwise Unwind / Boundary Pointers"
      },
      {
        "id": "b",
        "text": "Grid DFS / Connected Components"
      },
      {
        "id": "c",
        "text": "Prefix Sum"
      },
      {
        "id": "d",
        "text": "Binary Search"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Track top, bottom, left, and right bounds. Traverse each remaining edge and shrink the bounds, checking for an exhausted row or column.",
    "exerciseId": "dsa-clockwise-unwind",
    "mentalTrigger": "Need to peel matrix boundaries inward in clockwise order."
  },
  {
    "id": "pattern-reach-final",
    "type": "single",
    "prompt": "Each index stores a maximum forward jump. Which greedy farthest-reach scan decides whether the last index is reachable?",
    "options": [
      {
        "id": "a",
        "text": "Reach Final Index / Greedy"
      },
      {
        "id": "b",
        "text": "Skip-Adjacent Loot / DP"
      },
      {
        "id": "c",
        "text": "Fewest Tokens / Unbounded DP"
      },
      {
        "id": "d",
        "text": "Boyer-Moore"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Track the farthest reachable index. An index beyond that reach is a gap; otherwise extend reach with its jump distance.",
    "exerciseId": "dsa-reach-final-index",
    "mentalTrigger": "Need the farthest reachable index so far."
  },
  {
    "id": "pattern-dominant-vote",
    "type": "single",
    "prompt": "One value is guaranteed to appear more than half the time. Which constant-space voting technique finds it?",
    "options": [
      {
        "id": "a",
        "text": "Boyer-Moore"
      },
      {
        "id": "b",
        "text": "XOR / Bit Manipulation"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Monotonic Stack"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Maintain a candidate and vote count, canceling different values. The guaranteed majority survives the cancellations.",
    "exerciseId": "dsa-dominant-vote",
    "mentalTrigger": "Need a guaranteed strict majority using candidate/vote cancellation."
  },
  {
    "id": "pattern-best-contiguous",
    "type": "single",
    "prompt": "Daily deltas may be negative. Which one-pass pattern tracks the best contiguous sum by extending or restarting?",
    "options": [
      {
        "id": "a",
        "text": "Kadane’s Algorithm"
      },
      {
        "id": "b",
        "text": "Prefix Sum"
      },
      {
        "id": "c",
        "text": "Skip-Adjacent Loot / DP"
      },
      {
        "id": "d",
        "text": "Boyer-Moore"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "At each value, choose between extending the previous subarray and starting anew. Track the best sum; initialize from the first value for a nonempty array.",
    "exerciseId": "dsa-best-contiguous-gain",
    "mentalTrigger": "Need the best contiguous sum: extend or restart."
  },
  {
    "id": "pattern-task-order",
    "type": "single",
    "prompt": "Tasks have directed prerequisites. Which ordering places every prerequisite before its dependents, or detects a cycle?",
    "options": [
      {
        "id": "a",
        "text": "Topological Sort"
      },
      {
        "id": "b",
        "text": "Union Find / Disjoint Set"
      },
      {
        "id": "c",
        "text": "Graph BFS / Shortest Path"
      },
      {
        "id": "d",
        "text": "Heap / Priority Queue"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Repeatedly process nodes with no remaining prerequisites, or use DFS finishing order. A directed cycle prevents a valid ordering.",
    "exerciseId": "dsa-task-dependency-order",
    "mentalTrigger": "Need tasks ordered so every prerequisite comes first."
  },
  {
    "id": "pattern-phrase-catalog",
    "type": "single",
    "prompt": "A continuous string must be covered by concatenating catalog words. Which string DP tracks which prefixes can be assembled?",
    "options": [
      {
        "id": "a",
        "text": "Phrase Assembly / String DP"
      },
      {
        "id": "b",
        "text": "Backtracking"
      },
      {
        "id": "c",
        "text": "Boyer-Moore"
      },
      {
        "id": "d",
        "text": "Monotonic Stack"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Track which string prefixes can be segmented. A prefix is valid when an earlier valid prefix is followed by a dictionary word.",
    "exerciseId": "dsa-phrase-from-catalog",
    "mentalTrigger": "Need to track which string prefixes can be split into dictionary words."
  },
  {
    "id": "pattern-flip-message",
    "type": "single",
    "exerciseId": "dsa-flip-message",
    "prompt": "A message string must be returned with characters in reverse order. Which linear scan fits?",
    "options": [
      {
        "id": "a",
        "text": "String Reversal"
      },
      {
        "id": "b",
        "text": "Binary Search"
      },
      {
        "id": "c",
        "text": "Prefix Sum"
      },
      {
        "id": "d",
        "text": "Map"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "String Reversal changes character order from last to first. JavaScript strings are immutable, so the exercise returns a new string.",
    "mentalTrigger": "You need to emit the characters of a string from last to first. Which operation fits?"
  },
  {
    "id": "pattern-label-count",
    "type": "single",
    "exerciseId": "dsa-label-count",
    "prompt": "Numbers 1..n are labeled by divisibility rules (Fizz/Buzz). Which technique classifies each integer?",
    "options": [
      {
        "id": "a",
        "text": "Modulo / Divisibility"
      },
      {
        "id": "b",
        "text": "Binary Search"
      },
      {
        "id": "c",
        "text": "Map"
      },
      {
        "id": "d",
        "text": "Prefix Sum"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Modulo tests divisibility: x % d === 0. Check the combined 3-and-5 case before either individual case.",
    "mentalTrigger": "You must classify integers by whether division leaves a zero remainder. Which technique fits?"
  },
  {
    "id": "pattern-letter-inventory",
    "type": "single",
    "exerciseId": "dsa-same-letter-inventory",
    "prompt": "Two words are rearrangements only if letter multiplicities match. Which structure tracks frequencies?",
    "options": [
      {
        "id": "a",
        "text": "Map"
      },
      {
        "id": "b",
        "text": "Set"
      },
      {
        "id": "c",
        "text": "Stack"
      },
      {
        "id": "d",
        "text": "Trie / Prefix Tree"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "A Map associates each character with its frequency. A Set only tracks membership and cannot distinguish different counts of the same letters.",
    "mentalTrigger": "Two strings contain the same distinct letters, but you also need their multiplicities to match. Which structure stores those counts?"
  },
  {
    "id": "pattern-mirrored-phrase",
    "type": "single",
    "exerciseId": "dsa-mirrored-phrase",
    "prompt": "A phrase must read the same forward and backward after ignoring case and non-alphanumerics. Which inward two-pointer scan fits?",
    "options": [
      {
        "id": "a",
        "text": "Two Pointers"
      },
      {
        "id": "b",
        "text": "Stack"
      },
      {
        "id": "c",
        "text": "Map"
      },
      {
        "id": "d",
        "text": "Binary Search"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Two Pointers compares mirrored characters while advancing past punctuation. Normalize case during comparison rather than allocating a reversed string.",
    "mentalTrigger": "You compare the leftmost and rightmost meaningful characters, skipping punctuation and moving inward. Which technique fits?"
  },
  {
    "id": "pattern-sequence-term",
    "type": "single",
    "exerciseId": "dsa-sequence-term",
    "prompt": "Each term is the sum of the previous two. Which rolling-state pattern computes term n without exponential recursion?",
    "options": [
      {
        "id": "a",
        "text": "Dynamic Programming / 1D DP"
      },
      {
        "id": "b",
        "text": "Running State / Greedy"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Prefix Sum"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Dynamic Programming / 1D DP reuses smaller Fibonacci answers. Only the last two states are needed, allowing O(1) auxiliary space.",
    "mentalTrigger": "Each sequence value is the sum of the previous two, and naive recursion repeatedly solves identical states. Which general pattern avoids that repetition?"
  },
  {
    "id": "pattern-digit-mirror",
    "type": "single",
    "exerciseId": "dsa-digit-mirror",
    "prompt": "An integer is a digit mirror if reversing its digits yields the same value. Which half-digit reversal technique fits?",
    "options": [
      {
        "id": "a",
        "text": "Digit Reversal / Half Reversal"
      },
      {
        "id": "b",
        "text": "Two Pointers"
      },
      {
        "id": "c",
        "text": "Map"
      },
      {
        "id": "d",
        "text": "XOR / Bit Manipulation"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Digit Reversal / Half Reversal extracts digits with modulo and division. Reverse half the number; ignore the middle digit for odd lengths. Negative values are not palindromes.",
    "mentalTrigger": "You repeatedly take x % 10 and shorten x with integer division, building the reversed lower half of its digits. Which technique is this?"
  },
  {
    "id": "pattern-absent-slot",
    "type": "single",
    "exerciseId": "dsa-absent-slot",
    "prompt": "Exactly one value is missing from 0..n. Which technique compares the expected arithmetic total to the actual sum?",
    "options": [
      {
        "id": "a",
        "text": "Arithmetic Sum / Absent Slot"
      },
      {
        "id": "b",
        "text": "Boyer-Moore"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Kadane’s Algorithm"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Arithmetic Sum / Absent Slot uses expected minus actual total. The distinct-values and exactly-one-missing assumptions matter. XOR is another valid approach, but this question specifies sums.",
    "mentalTrigger": "Exactly one value is missing from a complete consecutive integer range. You compare the range’s expected total with its actual total. Which technique fits?"
  },
  {
    "id": "pattern-slide-zeros",
    "type": "single",
    "exerciseId": "dsa-slide-zeros-back",
    "prompt": "Zeros must move to the end of the same array while preserving non-zero order in O(1) extra space. Which read/write index technique fits?",
    "options": [
      {
        "id": "a",
        "text": "Two Pointers"
      },
      {
        "id": "b",
        "text": "Prefix Sum"
      },
      {
        "id": "c",
        "text": "Stack"
      },
      {
        "id": "d",
        "text": "Binary Search"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Two Pointers uses read and write indices in the original array. Copy non-zero values forward, then fill the leftover slots with zeroes. Do not push extra elements or reassign nums to a new array.",
    "mentalTrigger": "You scan with a read index and copy each non-zero value into the next write slot of the same array, then overwrite the remaining slots with zeroes. Which technique fits?"
  },
  {
    "id": "pattern-neighbor-products",
    "type": "single",
    "exerciseId": "dsa-neighbor-product-map",
    "prompt": "Each output index needs the product of every other entry without division. Which prefix/suffix product pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "Prefix / Suffix Products"
      },
      {
        "id": "b",
        "text": "Prefix Sum"
      },
      {
        "id": "c",
        "text": "Map"
      },
      {
        "id": "d",
        "text": "Sliding Window"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Prefix / Suffix Products combines the product on either side of each index. It handles zero values without division and uses the output array plus running products.",
    "mentalTrigger": "Each output needs the product before its index multiplied by the product after it. Which technique avoids dividing by the current value?"
  },
  {
    "id": "pattern-unique-window",
    "type": "single",
    "exerciseId": "dsa-longest-unique-window",
    "prompt": "Find the longest contiguous slice with all unique characters. Which sliding window expands right and advances left on repeats?",
    "options": [
      {
        "id": "a",
        "text": "Sliding Window"
      },
      {
        "id": "b",
        "text": "Binary Search"
      },
      {
        "id": "c",
        "text": "Prefix Sum"
      },
      {
        "id": "d",
        "text": "Stack"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Sliding Window maintains a contiguous substring. A Map can track last-seen indices, but the overall pattern is expanding and shrinking the window without moving its left boundary backward.",
    "mentalTrigger": "You grow a substring until its uniqueness rule fails, then move the left boundary past the conflicting occurrence. Which range-management pattern fits?"
  },
  {
    "id": "pattern-basin-capacity",
    "type": "single",
    "exerciseId": "dsa-basin-capacity",
    "prompt": "Unit-width elevation bars trap rainwater between higher walls. Which two-pointer shorter-boundary scan fits?",
    "options": [
      {
        "id": "a",
        "text": "Two Pointers"
      },
      {
        "id": "b",
        "text": "Prefix Sum"
      },
      {
        "id": "c",
        "text": "Binary Search"
      },
      {
        "id": "d",
        "text": "Map"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Two Pointers maintains left and right boundaries with running maxima. The opposite boundary supplies enough containment to safely process the shorter side. Other approaches exist; these questions specify the inward scan.",
    "mentalTrigger": "You scan inward from both ends of an elevation array and use the shorter boundary’s running maximum to count trapped water. Which technique fits?"
  },
  {
    "id": "pattern-floor-stack",
    "type": "single",
    "exerciseId": "dsa-floor-tracking-stack",
    "prompt": "A stack must support push, pop, top, and current minimum in O(1). Which auxiliary running-minimum design fits?",
    "options": [
      {
        "id": "a",
        "text": "Floor Stack / Running-Minimum Stack"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Heap / Priority Queue"
      },
      {
        "id": "d",
        "text": "Monotonic Stack"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Floor Stack / Running-Minimum Stack stores a running minimum for each depth. Popping restores the preceding minimum, including duplicate minima. A monotonic stack typically discards candidates and serves a different purpose.",
    "mentalTrigger": "After popping the smallest stack value, you need to recover the previous minimum immediately. Which structure remembers a minimum at every depth?"
  },
  {
    "id": "pattern-dual-stack-fifo",
    "type": "single",
    "exerciseId": "dsa-fifo-from-two-stacks",
    "prompt": "FIFO behavior must be built from stack-only push/pop. Which dual-stack pour design fits?",
    "options": [
      {
        "id": "a",
        "text": "FIFO From Two Stacks"
      },
      {
        "id": "b",
        "text": "Stack"
      },
      {
        "id": "c",
        "text": "Heap / Priority Queue"
      },
      {
        "id": "d",
        "text": "Monotonic Stack"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "FIFO From Two Stacks reverses incoming values into an output stack only when that stack is empty. This preserves FIFO order and gives amortized O(1) operations.",
    "mentalTrigger": "You need oldest-first behavior using only last-in, first-out containers. Which design reverses incoming items into a second stack?"
  },
  {
    "id": "pattern-simple-key-store",
    "type": "single",
    "exerciseId": "dsa-simple-key-store",
    "prompt": "You need put, get, and remove for key/value pairs without using a built-in Map. Which abstract structure are you implementing?",
    "options": [
      {
        "id": "a",
        "text": "Map"
      },
      {
        "id": "b",
        "text": "Set"
      },
      {
        "id": "c",
        "text": "Queue"
      },
      {
        "id": "d",
        "text": "Trie / Prefix Tree"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Map represents key-to-value associations. The Simple Key Store exercise implements put/get/remove semantics; a Set has no associated values. Follow the exercise’s specified missing-key return value.",
    "mentalTrigger": "You need key-based insertion, replacement, lookup, and deletion of associated values. Which abstract structure fits?"
  },
  {
    "id": "pattern-bounded-recent",
    "type": "single",
    "exerciseId": "dsa-bounded-recent-cache",
    "prompt": "A fixed-capacity cache must evict the least recently used entry; gets and puts refresh recency. Which policy fits?",
    "options": [
      {
        "id": "a",
        "text": "Bounded Recent Cache / Recency Tracking"
      },
      {
        "id": "b",
        "text": "Queue"
      },
      {
        "id": "c",
        "text": "Heap / Priority Queue"
      },
      {
        "id": "d",
        "text": "Trie / Prefix Tree"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Bounded Recent Cache / Recency Tracking updates recency on successful get and put. An insertion-ordered Map can delete and reinsert a key to refresh it; a Map plus a doubly linked list is another design.",
    "mentalTrigger": "Cache eviction must follow last access time rather than insertion age, and reading a key refreshes its position. Which pattern fits?"
  }
];
