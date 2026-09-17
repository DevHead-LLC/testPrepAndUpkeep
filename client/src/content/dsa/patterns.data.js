// Local four-choice questions. Keep ids and exerciseId stable; group variants by exercise.
export const patternQuestions = [
  {
    "id": "pattern-two-sum",
    "type": "single",
    "prompt": "Given an unsorted array, return the indices of two numbers that add up to a target.",
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
    "exerciseId": "dsa-two-sum",
    "mentalTrigger": "Need a value’s matching complement and its original index."
  },
  {
    "id": "pattern-duplicates",
    "type": "single",
    "prompt": "Given an array, determine whether any value appears more than once.",
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
    "exerciseId": "dsa-contains-duplicate",
    "mentalTrigger": "Need membership only: have I seen this value before?"
  },
  {
    "id": "pattern-brackets",
    "type": "single",
    "prompt": "Given a string of brackets, determine whether the brackets are valid and closed in the correct order.",
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
    "exerciseId": "dsa-valid-parentheses",
    "mentalTrigger": "Need to match the most recent unmatched opening bracket."
  },
  {
    "id": "pattern-fifo",
    "type": "single",
    "prompt": "Process items in FIFO order, where the oldest item is processed first.",
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
    "exerciseId": "dsa-queue-processing",
    "mentalTrigger": "Need the oldest waiting item first: FIFO."
  },
  {
    "id": "pattern-stock-profit",
    "type": "single",
    "prompt": "Given stock prices, return the maximum profit from buying once and selling once later.",
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
    "exerciseId": "dsa-max-profit",
    "mentalTrigger": "Need the best earlier price and best profit while scanning once."
  },
  {
    "id": "pattern-sorted-two-sum",
    "type": "single",
    "prompt": "Given a sorted array, find two numbers that add up to a target.",
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
    "exerciseId": "dsa-two-sum-ii",
    "mentalTrigger": "Need a pair sum in sorted data: work inward from both ends."
  },
  {
    "id": "pattern-min-window",
    "type": "single",
    "prompt": "Given an array of positive integers, find the minimum length contiguous subarray whose sum is at least the target.",
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
    "exerciseId": "dsa-min-subarray-length",
    "mentalTrigger": "Need a growing/shrinking positive-sum range that meets a threshold."
  },
  {
    "id": "pattern-binary-search",
    "type": "single",
    "prompt": "Given a sorted array and target, return the target index or -1.",
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
    "exerciseId": "dsa-binary-search",
    "mentalTrigger": "Need to halve a sorted search range."
  },
  {
    "id": "pattern-prefix-sum",
    "type": "single",
    "prompt": "Build prefix sums so multiple left-to-right range sum queries can be answered quickly.",
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
    "exerciseId": "dsa-range-sums",
    "mentalTrigger": "Need repeated range totals from cumulative sums."
  },
  {
    "id": "pattern-merge-intervals",
    "type": "single",
    "prompt": "Given overlapping intervals, merge all overlapping intervals.",
    "options": [
      {
        "id": "a",
        "text": "Merge Intervals / Sort + Sweep"
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
    "exerciseId": "dsa-merge-intervals",
    "mentalTrigger": "Need to combine overlapping ranges after ordering their starts."
  },
  {
    "id": "pattern-linked-list-cycle",
    "type": "single",
    "prompt": "Given a linked list, determine whether it contains a cycle using O(1) extra space.",
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
        "text": "Reverse Linked List"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Move one pointer one node per step and another two. They meet inside a cycle; reaching the end means no cycle.",
    "exerciseId": "dsa-linked-list-cycle",
    "mentalTrigger": "Need constant-space linked-list cycle detection using different pointer speeds."
  },
  {
    "id": "pattern-reverse-list",
    "type": "single",
    "prompt": "Reverse a singly linked list in place.",
    "options": [
      {
        "id": "a",
        "text": "Reverse Linked List"
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
    "exerciseId": "dsa-reverse-linked-list",
    "mentalTrigger": "Need to rewire the original next links with previous/current/next references."
  },
  {
    "id": "pattern-preorder",
    "type": "single",
    "prompt": "Traverse a binary tree in preorder: node, left, right.",
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
    "exerciseId": "dsa-tree-preorder",
    "mentalTrigger": "Need node, then left branch, then right branch."
  },
  {
    "id": "pattern-level-order",
    "type": "single",
    "prompt": "Return the nodes of a binary tree level by level.",
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
    "exerciseId": "dsa-tree-level-order",
    "mentalTrigger": "Need tree values grouped by depth."
  },
  {
    "id": "pattern-graph-dfs",
    "type": "single",
    "prompt": "Given a graph, visit every reachable node by exploring one path deeply before backing up.",
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
    "exerciseId": "dsa-graph-dfs",
    "mentalTrigger": "Need to explore one graph path deeply before backing up."
  },
  {
    "id": "pattern-islands",
    "type": "single",
    "prompt": "Given a grid of 1s and 0s, count the number of connected islands.",
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
        "text": "Spiral Matrix / Boundary Pointers"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Start a flood fill at each unvisited land cell and mark its connected land. Each new flood fill counts one island.",
    "exerciseId": "dsa-num-islands",
    "mentalTrigger": "Need to flood-fill and count connected land regions."
  },
  {
    "id": "pattern-permutations",
    "type": "single",
    "prompt": "Given a list of distinct numbers, return all possible permutations.",
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
        "text": "Jump Game / Greedy"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "Choose an unused number, explore that choice, then undo it so other permutations can be generated.",
    "exerciseId": "dsa-permutations",
    "mentalTrigger": "Need every arrangement: choose, explore, undo."
  },
  {
    "id": "pattern-top-k",
    "type": "single",
    "prompt": "Given an array, return the K largest values without sorting the entire array.",
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
    "exerciseId": "dsa-top-k-largest",
    "mentalTrigger": "Need to retain the best K candidates using repeated minimum access."
  },
  {
    "id": "pattern-temperatures",
    "type": "single",
    "prompt": "For each temperature, return how many days until a warmer temperature appears.",
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
    "explanation": "Keep unresolved indices in decreasing temperature order. A warmer day resolves indices popped from the stack.",
    "exerciseId": "dsa-daily-temperatures",
    "mentalTrigger": "Need to resolve pending days when a strictly warmer value arrives."
  },
  {
    "id": "pattern-stairs",
    "type": "single",
    "prompt": "Given n stairs, count how many ways you can reach the top taking 1 or 2 steps.",
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
    "exerciseId": "dsa-climbing-stairs",
    "mentalTrigger": "Need a count built from the previous two smaller counts."
  },
  {
    "id": "pattern-house-robber",
    "type": "single",
    "prompt": "Given money in houses, return the maximum amount without robbing adjacent houses.",
    "options": [
      {
        "id": "a",
        "text": "House Robber"
      },
      {
        "id": "b",
        "text": "Coin Change"
      },
      {
        "id": "c",
        "text": "Jump Game / Greedy"
      },
      {
        "id": "d",
        "text": "Kadane’s Algorithm"
      }
    ],
    "correct": [
      "a"
    ],
    "explanation": "At each house, compare skipping it with taking its money plus the best total ending at least two houses earlier.",
    "exerciseId": "dsa-house-robber",
    "mentalTrigger": "Need maximum value from non-adjacent selections: take or skip."
  },
  {
    "id": "pattern-coin-change",
    "type": "single",
    "prompt": "Given coin denominations and an amount, return the fewest coins needed to make the amount.",
    "options": [
      {
        "id": "a",
        "text": "Coin Change"
      },
      {
        "id": "b",
        "text": "Running State / Greedy"
      },
      {
        "id": "c",
        "text": "House Robber"
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
    "exerciseId": "dsa-coin-change",
    "mentalTrigger": "Need the fewest reusable denominations for an exact amount."
  },
  {
    "id": "pattern-trie",
    "type": "single",
    "prompt": "Implement insert, full-word search, and prefix search for a collection of words.",
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
    "exerciseId": "dsa-trie",
    "mentalTrigger": "Need shared character paths for word and prefix lookup."
  },
  {
    "id": "pattern-union-find",
    "type": "single",
    "prompt": "Given nodes and connections, repeatedly union groups and determine connected components / group membership.",
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
    "exerciseId": "dsa-union-find",
    "mentalTrigger": "Need repeated group merges and connectivity checks."
  },
  {
    "id": "pattern-single-number",
    "type": "single",
    "prompt": "Every number appears twice except one. Return the single number using O(1) extra space.",
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
    "exerciseId": "dsa-single-number",
    "mentalTrigger": "Need equal integer pairs to cancel, leaving one unmatched value."
  },
  {
    "id": "pattern-shortest-path",
    "type": "single",
    "prompt": "Given an unweighted graph, return the shortest number of edges from start to target.",
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
    "exerciseId": "dsa-graph-shortest-path",
    "mentalTrigger": "Need the fewest edges in an unweighted graph."
  },
  {
    "id": "pattern-spiral",
    "type": "single",
    "prompt": "Return all values of a matrix in spiral order.",
    "options": [
      {
        "id": "a",
        "text": "Spiral Matrix / Boundary Pointers"
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
    "exerciseId": "dsa-spiral-matrix",
    "mentalTrigger": "Need to peel matrix boundaries inward in clockwise order."
  },
  {
    "id": "pattern-jump-game",
    "type": "single",
    "prompt": "Each array value is the maximum jump distance. Determine whether the final index is reachable.",
    "options": [
      {
        "id": "a",
        "text": "Jump Game / Greedy"
      },
      {
        "id": "b",
        "text": "House Robber"
      },
      {
        "id": "c",
        "text": "Coin Change"
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
    "exerciseId": "dsa-jump-game",
    "mentalTrigger": "Need the farthest reachable index so far."
  },
  {
    "id": "pattern-majority",
    "type": "single",
    "prompt": "Given an array where one value appears more than n / 2 times, return the majority element.",
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
    "exerciseId": "dsa-majority-element",
    "mentalTrigger": "Need a guaranteed strict majority using candidate/vote cancellation."
  },
  {
    "id": "pattern-max-subarray",
    "type": "single",
    "prompt": "Return the maximum sum of a contiguous subarray.",
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
        "text": "House Robber"
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
    "exerciseId": "dsa-max-subarray",
    "mentalTrigger": "Need the best contiguous sum: extend or restart."
  },
  {
    "id": "pattern-topological-sort",
    "type": "single",
    "prompt": "Given courses/tasks and prerequisites, return a valid order in which they can be completed.",
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
    "exerciseId": "dsa-course-order",
    "mentalTrigger": "Need tasks ordered so every prerequisite comes first."
  },
  {
    "id": "pattern-word-break",
    "type": "single",
    "prompt": "Given a string and dictionary, determine whether the string can be split into valid dictionary words.",
    "options": [
      {
        "id": "a",
        "text": "Word Break / String DP"
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
    "exerciseId": "dsa-word-break",
    "mentalTrigger": "Need to track which string prefixes can be split into dictionary words."
  },
  {
    "id": "pattern-reverse-string",
    "type": "single",
    "exerciseId": "dsa-reverse-string",
    "prompt": "Given a string, return a new string with its characters in the opposite order.",
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
    "id": "pattern-fizzbuzz",
    "type": "single",
    "exerciseId": "dsa-fizzbuzz",
    "prompt": "Generate strings for 1 through n, replacing multiples of 3 with Fizz, multiples of 5 with Buzz, and multiples of both with FizzBuzz. Which technique identifies the replacement cases?",
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
    "id": "pattern-valid-anagram",
    "type": "single",
    "exerciseId": "dsa-valid-anagram",
    "prompt": "Given two strings, determine whether they contain exactly the same characters with the same counts. Which structure tracks the frequencies needed?",
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
    "id": "pattern-valid-palindrome",
    "type": "single",
    "exerciseId": "dsa-valid-palindrome",
    "prompt": "Check whether a string reads the same forward and backward, ignoring case and non-alphanumeric characters. Which technique compares inward from both ends with constant extra space?",
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
    "id": "pattern-fibonacci",
    "type": "single",
    "exerciseId": "dsa-fibonacci",
    "prompt": "Compute fib(n), with fib(0) = 0 and fib(1) = 1, by reusing the two previous Fibonacci values. Which general pattern fits?",
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
    "id": "pattern-palindrome-number",
    "type": "single",
    "exerciseId": "dsa-palindrome-number",
    "prompt": "Check whether an integer is a palindrome without converting it to a string, using digit extraction and reversing only its lower half. Which technique fits?",
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
    "id": "pattern-missing-number",
    "type": "single",
    "exerciseId": "dsa-missing-number",
    "prompt": "An array contains n distinct integers from 0 through n with one missing. Which technique subtracts the actual total from n * (n + 1) / 2?",
    "options": [
      {
        "id": "a",
        "text": "Arithmetic Sum / Missing Number"
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
    "explanation": "Arithmetic Sum / Missing Number uses expected minus actual total. The distinct-values and exactly-one-missing assumptions matter. XOR is another valid approach, but this question specifies sums.",
    "mentalTrigger": "Exactly one value is missing from a complete consecutive integer range. You compare the range’s expected total with its actual total. Which technique fits?"
  },
  {
    "id": "pattern-move-zeroes",
    "type": "single",
    "exerciseId": "dsa-move-zeroes",
    "prompt": "Move all zeroes to the end of the original array in place, preserving the order of non-zero values and using O(1) extra space. Which technique uses separate read and write indices?",
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
    "id": "pattern-product-except-self",
    "type": "single",
    "exerciseId": "dsa-product-except-self",
    "prompt": "For each array index, return the product of every other element, without division. Which technique combines products from the left and right?",
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
    "id": "pattern-longest-substring",
    "type": "single",
    "exerciseId": "dsa-longest-substring",
    "prompt": "Find the longest contiguous substring with no repeated characters. Which range-management pattern expands right and moves left when a repeat enters?",
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
    "id": "pattern-trapping-rain-water",
    "type": "single",
    "exerciseId": "dsa-trapping-rain-water",
    "prompt": "Given unit-width elevation bars, compute trapped rainwater using left/right indices and running left/right maximum heights, processing the shorter boundary first. Which technique fits?",
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
    "id": "pattern-min-stack",
    "type": "single",
    "exerciseId": "dsa-min-stack",
    "prompt": "Design a stack with push, pop, top, and getMin in O(1) time per operation. Which approach keeps a synchronized minimum for each stack depth?",
    "options": [
      {
        "id": "a",
        "text": "Min Stack / Auxiliary Min Stack"
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
    "explanation": "Min Stack / Auxiliary Min Stack stores a running minimum for each depth. Popping restores the preceding minimum, including duplicate minima. A monotonic stack typically discards candidates and serves a different purpose.",
    "mentalTrigger": "After popping the smallest stack value, you need to recover the previous minimum immediately. Which structure remembers a minimum at every depth?"
  },
  {
    "id": "pattern-my-queue",
    "type": "single",
    "exerciseId": "dsa-my-queue",
    "prompt": "Implement FIFO queue operations when only stack-style push and pop operations are available. Which design pours incoming values into an outgoing stack?",
    "options": [
      {
        "id": "a",
        "text": "Queue Using Two Stacks"
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
    "explanation": "Queue Using Two Stacks reverses incoming values into an output stack only when that stack is empty. This preserves FIFO order and gives amortized O(1) operations.",
    "mentalTrigger": "You need oldest-first behavior using only last-in, first-out containers. Which design reverses incoming items into a second stack?"
  },
  {
    "id": "pattern-my-hashmap",
    "type": "single",
    "exerciseId": "dsa-my-hashmap",
    "prompt": "Design a structure with put(key, value), get(key), and remove(key), retaining a value associated with each key. Which abstract data structure are you implementing?",
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
    "explanation": "Map represents key-to-value associations. The Design HashMap exercise implements put/get/remove semantics; a Set has no associated values. Follow the exercise’s specified missing-key return value.",
    "mentalTrigger": "You need key-based insertion, replacement, lookup, and deletion of associated values. Which abstract structure fits?"
  },
  {
    "id": "pattern-lru-cache",
    "type": "single",
    "exerciseId": "dsa-lru-cache",
    "prompt": "Design a fixed-capacity cache where successful reads and writes make an entry most recent, and overflow evicts the least recently used key. Which policy and pattern fits?",
    "options": [
      {
        "id": "a",
        "text": "LRU Cache / Recency Tracking"
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
    "explanation": "LRU Cache / Recency Tracking updates recency on successful get and put. An insertion-ordered Map can delete and reinsert a key to refresh it; a Map plus a doubly linked list is another design.",
    "mentalTrigger": "Cache eviction must follow last access time rather than insertion age, and reading a key refreshes its position. Which pattern fits?"
  }
];
