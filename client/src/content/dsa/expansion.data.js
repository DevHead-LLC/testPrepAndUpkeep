// Additional coding exercises covering the pattern-recognition answers.
// Original coding exercises inspired by common computer-science and
// technical-interview patterns. Titles, scenarios, prompts, and fixtures
// are independently authored.
// Visible tests also supply the in-app example inputs and expected outputs.
export const expansionProblems = [
  {
    "id": "dsa-fifo-ops",
    "topic": "Queues",
    "title": "Run FIFO Operations",
    "difficulty": "easy",
    "fnName": "runFifoOps",
    "prompt": "A ticket desk processes operation lists shaped like [\"enqueue\", value], [\"dequeue\"], [\"peek\"], and [\"empty\"]. Return one result per operation: enqueue → null; dequeue → oldest value or null if empty; peek → oldest value without removing it, or null if empty; empty → boolean. Values are integers. Use an array as a queue (push/shift or a front index). You do not need a class or two stacks.",
    "starter": "function runFifoOps(operations) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              "enqueue",
              11
            ],
            [
              "enqueue",
              5
            ],
            [
              "peek"
            ],
            [
              "dequeue"
            ],
            [
              "empty"
            ],
            [
              "dequeue"
            ],
            [
              "empty"
            ]
          ]
        ],
        "expected": [
          null,
          null,
          11,
          11,
          false,
          5,
          true
        ]
      },
      {
        "input": [
          [
            [
              "dequeue"
            ],
            [
              "peek"
            ],
            [
              "empty"
            ]
          ]
        ],
        "expected": [
          null,
          null,
          true
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      },
      {
        "input": [
          [
            [
              "enqueue",
              0
            ],
            [
              "enqueue",
              -4
            ],
            [
              "dequeue"
            ],
            [
              "enqueue",
              12
            ],
            [
              "dequeue"
            ],
            [
              "dequeue"
            ]
          ]
        ],
        "expected": [
          null,
          null,
          0,
          null,
          -4,
          12
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              "enqueue",
              8
            ],
            [
              "enqueue",
              8
            ],
            [
              "dequeue"
            ],
            [
              "dequeue"
            ],
            [
              "dequeue"
            ]
          ]
        ],
        "expected": [
          null,
          null,
          8,
          8,
          null
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-shortest-qualifying-stretch",
    "topic": "Sliding Window",
    "title": "Shortest Qualifying Stretch",
    "difficulty": "medium",
    "fnName": "shortestStretch",
    "prompt": "You are given a positive threshold and a list of positive integers. Return the length of the shortest contiguous stretch whose values sum to at least the threshold. Return 0 if none exists (including an empty list). Aim for O(n) with a growing/shrinking window.",
    "starter": "function shortestStretch(threshold, values) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          9,
          [
            3,
            1,
            4,
            2,
            5,
            1
          ]
        ],
        "expected": 3
      },
      {
        "input": [
          5,
          [
            2,
            5,
            5
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          20,
          [
            2,
            2,
            2,
            2
          ]
        ],
        "expected": 0
      },
      {
        "input": [
          1,
          []
        ],
        "expected": 0,
        "hidden": true
      },
      {
        "input": [
          8,
          [
            2,
            3,
            3
          ]
        ],
        "expected": 3,
        "hidden": true
      },
      {
        "input": [
          12,
          [
            4,
            2,
            1,
            6,
            3,
            8,
            2
          ]
        ],
        "expected": 3,
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-range-total-queries",
    "topic": "Arrays",
    "title": "Batch Range Totals",
    "difficulty": "easy",
    "fnName": "batchRangeTotals",
    "prompt": "Given an integer list and queries of the form [left, right] (zero-based, inclusive, always valid), return each range sum in order. The list never changes. Precompute prefix totals so each query is O(1). An empty list implies no queries.",
    "starter": "function batchRangeTotals(values, queries) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            4,
            -2,
            6,
            1
          ],
          [
            [
              0,
              2
            ],
            [
              1,
              3
            ],
            [
              3,
              3
            ]
          ]
        ],
        "expected": [
          8,
          5,
          1
        ]
      },
      {
        "input": [
          [
            9
          ],
          [
            [
              0,
              0
            ]
          ]
        ],
        "expected": [
          9
        ]
      },
      {
        "input": [
          [],
          []
        ],
        "expected": []
      },
      {
        "input": [
          [
            -4,
            -1,
            -2
          ],
          [
            [
              0,
              2
            ],
            [
              1,
              1
            ],
            [
              0,
              0
            ]
          ]
        ],
        "expected": [
          -7,
          -1,
          -4
        ],
        "hidden": true
      },
      {
        "input": [
          [
            0,
            5,
            0,
            5
          ],
          [
            [
              0,
              3
            ],
            [
              1,
              3
            ],
            [
              0,
              3
            ]
          ]
        ],
        "expected": [
          10,
          10,
          10
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-collapse-overlaps",
    "topic": "Intervals",
    "title": "Collapse Overlapping Spans",
    "difficulty": "medium",
    "fnName": "collapseOverlaps",
    "prompt": "Each span is [start, end] with start <= end. Merge every overlapping or touching span and return the result sorted by start. Touching endpoints merge: [2, 5] and [5, 8] become [2, 8]. Return [] when there are no spans.",
    "starter": "function collapseOverlaps(spans) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              2,
              5
            ],
            [
              4,
              8
            ],
            [
              10,
              12
            ],
            [
              11,
              14
            ]
          ]
        ],
        "expected": [
          [
            2,
            8
          ],
          [
            10,
            14
          ]
        ]
      },
      {
        "input": [
          [
            [
              3,
              6
            ],
            [
              6,
              9
            ]
          ]
        ],
        "expected": [
          [
            3,
            9
          ]
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      },
      {
        "input": [
          [
            [
              8,
              9
            ],
            [
              1,
              12
            ],
            [
              3,
              4
            ]
          ]
        ],
        "expected": [
          [
            1,
            12
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              2,
              2
            ],
            [
              2,
              2
            ],
            [
              5,
              5
            ]
          ]
        ],
        "expected": [
          [
            2,
            2
          ],
          [
            5,
            5
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              -5,
              -2
            ],
            [
              -3,
              1
            ],
            [
              4,
              6
            ]
          ]
        ],
        "expected": [
          [
            -5,
            1
          ],
          [
            4,
            6
          ]
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-loop-in-chain",
    "topic": "Linked Lists",
    "title": "Loop in a Chain",
    "difficulty": "easy",
    "fnName": "chainHasLoop",
    "inputKind": "linked-list-cycle",
    "prompt": "Given the head of a singly linked chain of { val, next } nodes, return true if following next eventually revisits a node; otherwise false. An empty head is null. Aim for O(n) time and O(1) extra space without mutating the chain. Examples show values plus a zero-based index where the tail reconnects (-1 means no loop). The runner builds the nodes and passes only head.",
    "starter": "function chainHasLoop(head) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            5,
            1,
            8,
            2
          ],
          1
        ],
        "expected": true
      },
      {
        "input": [
          [
            4,
            9
          ],
          -1
        ],
        "expected": false
      },
      {
        "input": [
          [],
          -1
        ],
        "expected": false
      },
      {
        "input": [
          [
            7
          ],
          0
        ],
        "expected": true,
        "hidden": true
      },
      {
        "input": [
          [
            2,
            2,
            2
          ],
          -1
        ],
        "expected": false,
        "hidden": true
      },
      {
        "input": [
          [
            4,
            3,
            2,
            1
          ],
          0
        ],
        "expected": true,
        "hidden": true
      },
      {
        "input": [
          [
            6
          ],
          -1
        ],
        "expected": false,
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-flip-chain",
    "topic": "Linked Lists",
    "title": "Flip a Chain",
    "difficulty": "easy",
    "fnName": "flipChain",
    "inputKind": "linked-list",
    "prompt": "Given the head of an acyclic singly linked chain of { val, next } nodes, reverse the links in place and return the new head. Empty head is null. Reuse the original nodes and keep their values; do not return an array or allocate a fresh chain. Examples show values before and after. The runner builds the nodes and checks that the same node objects appear in reverse order.",
    "starter": "function flipChain(head) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            8,
            3,
            1,
            6,
            2
          ]
        ],
        "expected": [
          2,
          6,
          1,
          3,
          8
        ]
      },
      {
        "input": [
          [
            4,
            9
          ]
        ],
        "expected": [
          9,
          4
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      },
      {
        "input": [
          [
            11
          ]
        ],
        "expected": [
          11
        ],
        "hidden": true
      },
      {
        "input": [
          [
            5,
            5,
            7
          ]
        ],
        "expected": [
          7,
          5,
          5
        ],
        "hidden": true
      },
      {
        "input": [
          [
            -2,
            0,
            3
          ]
        ],
        "expected": [
          3,
          0,
          -2
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-node-left-right-walk",
    "topic": "Trees",
    "title": "Node-Left-Right Walk",
    "difficulty": "easy",
    "fnName": "nodeLeftRightWalk",
    "inputKind": "binary-tree",
    "prompt": "Return node values in preorder: the node, then its full left subtree, then its full right subtree. Return [] for an empty tree. The runner passes root as { val, left, right } or null, built from the level-order array in the examples (null marks a missing child). Your function receives root, not the array.",
    "starter": "function nodeLeftRightWalk(root) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            4,
            null,
            7,
            2
          ]
        ],
        "expected": [
          4,
          7,
          2
        ]
      },
      {
        "input": [
          [
            5,
            1,
            9,
            3,
            6
          ]
        ],
        "expected": [
          5,
          1,
          3,
          6,
          9
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      },
      {
        "input": [
          [
            0
          ]
        ],
        "expected": [
          0
        ],
        "hidden": true
      },
      {
        "input": [
          [
            8,
            4,
            null,
            1
          ]
        ],
        "expected": [
          8,
          4,
          1
        ],
        "hidden": true
      },
      {
        "input": [
          [
            3,
            3,
            3
          ]
        ],
        "expected": [
          3,
          3,
          3
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-level-by-level-walk",
    "topic": "Trees",
    "title": "Level-by-Level Walk",
    "difficulty": "medium",
    "fnName": "levelByLevelWalk",
    "inputKind": "binary-tree",
    "prompt": "Return node values grouped by depth from the root downward, left to right within each level. Return [] for an empty tree. The runner passes root as { val, left, right } or null from the level-order example arrays. Your function receives root, not the array.",
    "starter": "function levelByLevelWalk(root) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            8,
            3,
            10,
            null,
            null,
            6,
            14
          ]
        ],
        "expected": [
          [
            8
          ],
          [
            3,
            10
          ],
          [
            6,
            14
          ]
        ]
      },
      {
        "input": [
          [
            2
          ]
        ],
        "expected": [
          [
            2
          ]
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      },
      {
        "input": [
          [
            4,
            null,
            5,
            9
          ]
        ],
        "expected": [
          [
            4
          ],
          [
            5
          ],
          [
            9
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            1,
            7,
            2,
            8,
            null,
            null,
            3
          ]
        ],
        "expected": [
          [
            1
          ],
          [
            7,
            2
          ],
          [
            8,
            3
          ]
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-deep-graph-walk",
    "topic": "Graphs",
    "title": "Deep Graph Walk",
    "difficulty": "medium",
    "fnName": "deepGraphWalk",
    "prompt": "graph is an adjacency list: graph[u] lists outgoing neighbors of node u (IDs 0..graph.length-1). Starting at start, return nodes in depth-first discovery order, exploring neighbors in listed order. Visit each reachable node once even with cycles or duplicate edges. Return [] for an empty graph; otherwise start is valid. Unreachable components are omitted.",
    "starter": "function deepGraphWalk(graph, start) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              1,
              2
            ],
            [
              3
            ],
            [
              3
            ],
            []
          ],
          0
        ],
        "expected": [
          0,
          1,
          3,
          2
        ]
      },
      {
        "input": [
          [
            [
              2
            ],
            [
              0
            ],
            [
              1
            ]
          ],
          0
        ],
        "expected": [
          0,
          2,
          1
        ]
      },
      {
        "input": [
          [],
          0
        ],
        "expected": []
      },
      {
        "input": [
          [
            [
              0,
              1,
              1
            ],
            [],
            [
              3
            ],
            []
          ],
          0
        ],
        "expected": [
          0,
          1
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              1
            ],
            [
              0
            ],
            []
          ],
          2
        ],
        "expected": [
          2
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              2,
              1
            ],
            [],
            [
              1
            ]
          ],
          0
        ],
        "expected": [
          0,
          2,
          1
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-all-arrangements",
    "topic": "Backtracking",
    "title": "All Distinct Arrangements",
    "difficulty": "medium",
    "fnName": "allArrangements",
    "outputKind": "unordered",
    "prompt": "Given a list of distinct integers, return every arrangement exactly once. Outer-list order may vary; the grader accepts any ordering of the arrangements. Keep value order inside each arrangement. For [], return [[]]. Inputs have at most 7 values.",
    "starter": "function allArrangements(values) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            4,
            1,
            9
          ]
        ],
        "expected": [
          [
            4,
            1,
            9
          ],
          [
            4,
            9,
            1
          ],
          [
            1,
            4,
            9
          ],
          [
            1,
            9,
            4
          ],
          [
            9,
            4,
            1
          ],
          [
            9,
            1,
            4
          ]
        ]
      },
      {
        "input": [
          [
            2,
            0
          ]
        ],
        "expected": [
          [
            2,
            0
          ],
          [
            0,
            2
          ]
        ]
      },
      {
        "input": [
          []
        ],
        "expected": [
          []
        ]
      },
      {
        "input": [
          [
            7
          ]
        ],
        "expected": [
          [
            7
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            -2,
            0,
            5
          ]
        ],
        "expected": [
          [
            -2,
            0,
            5
          ],
          [
            -2,
            5,
            0
          ],
          [
            0,
            -2,
            5
          ],
          [
            0,
            5,
            -2
          ],
          [
            5,
            -2,
            0
          ],
          [
            5,
            0,
            -2
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4
          ]
        ],
        "expected": [
          [
            1,
            2,
            3,
            4
          ],
          [
            1,
            2,
            4,
            3
          ],
          [
            1,
            3,
            2,
            4
          ],
          [
            1,
            3,
            4,
            2
          ],
          [
            1,
            4,
            2,
            3
          ],
          [
            1,
            4,
            3,
            2
          ],
          [
            2,
            1,
            3,
            4
          ],
          [
            2,
            1,
            4,
            3
          ],
          [
            2,
            3,
            1,
            4
          ],
          [
            2,
            3,
            4,
            1
          ],
          [
            2,
            4,
            1,
            3
          ],
          [
            2,
            4,
            3,
            1
          ],
          [
            3,
            1,
            2,
            4
          ],
          [
            3,
            1,
            4,
            2
          ],
          [
            3,
            2,
            1,
            4
          ],
          [
            3,
            2,
            4,
            1
          ],
          [
            3,
            4,
            1,
            2
          ],
          [
            3,
            4,
            2,
            1
          ],
          [
            4,
            1,
            2,
            3
          ],
          [
            4,
            1,
            3,
            2
          ],
          [
            4,
            2,
            1,
            3
          ],
          [
            4,
            2,
            3,
            1
          ],
          [
            4,
            3,
            1,
            2
          ],
          [
            4,
            3,
            2,
            1
          ]
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-k-biggest-values",
    "topic": "Heaps",
    "title": "K Biggest Values",
    "difficulty": "medium",
    "fnName": "kBiggestValues",
    "outputKind": "unordered",
    "prompt": "Given integers and k (0 <= k <= length), return the k biggest values in any order, keeping duplicates. Return [] when k is 0. Prefer a size-k min-heap over fully sorting. Example order is one valid answer; the grader accepts any correct multiset.",
    "starter": "function kBiggestValues(values, k) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            4,
            9,
            1,
            7,
            2,
            8
          ],
          3
        ],
        "expected": [
          9,
          8,
          7
        ]
      },
      {
        "input": [
          [
            2,
            2,
            5,
            1,
            5,
            3
          ],
          3
        ],
        "expected": [
          5,
          5,
          3
        ]
      },
      {
        "input": [
          [
            6,
            1
          ],
          0
        ],
        "expected": []
      },
      {
        "input": [
          [
            -8,
            -2,
            -5
          ],
          2
        ],
        "expected": [
          -2,
          -5
        ],
        "hidden": true
      },
      {
        "input": [
          [
            3,
            3,
            3
          ],
          2
        ],
        "expected": [
          3,
          3
        ],
        "hidden": true
      },
      {
        "input": [
          [],
          0
        ],
        "expected": [],
        "hidden": true
      },
      {
        "input": [
          [
            5,
            2,
            4
          ],
          3
        ],
        "expected": [
          5,
          4,
          2
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-days-until-warmer",
    "topic": "Stacks",
    "title": "Days Until Warmer",
    "difficulty": "medium",
    "fnName": "daysUntilWarmer",
    "prompt": "For each daily reading, return how many days until a strictly higher reading appears later. Use 0 when none exists. Equal readings do not count. Return [] for empty input. Aim for O(n) with a monotonic stack of unresolved indices.",
    "starter": "function daysUntilWarmer(readings) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            68,
            70,
            67,
            72,
            69
          ]
        ],
        "expected": [
          1,
          2,
          1,
          0,
          0
        ]
      },
      {
        "input": [
          [
            20,
            25,
            30,
            35
          ]
        ],
        "expected": [
          1,
          1,
          1,
          0
        ]
      },
      {
        "input": [
          [
            50,
            40,
            30
          ]
        ],
        "expected": [
          0,
          0,
          0
        ]
      },
      {
        "input": [
          [
            22,
            22,
            24
          ]
        ],
        "expected": [
          2,
          1,
          0
        ],
        "hidden": true
      },
      {
        "input": [
          []
        ],
        "expected": [],
        "hidden": true
      },
      {
        "input": [
          [
            55
          ]
        ],
        "expected": [
          0
        ],
        "hidden": true
      },
      {
        "input": [
          [
            80,
            80,
            80
          ]
        ],
        "expected": [
          0,
          0,
          0
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-disjoint-groups",
    "topic": "Union Find",
    "title": "Disjoint Groups",
    "difficulty": "medium",
    "kind": "design",
    "className": "GroupTracker",
    "prompt": "Implement GroupTracker(n) for nodes 0..n-1, each starting alone. union(a, b) merges groups and returns true only when two different groups joined. connected(a, b) reports shared membership. count() returns how many groups remain. n may be 0; node arguments are always valid. Prefer union by size/rank with path compression.",
    "starter": "class GroupTracker {\n  constructor(n) {\n\n  }\n  union(a, b) {\n\n  }\n  connected(a, b) {\n\n  }\n  count() {\n\n  }\n}\n",
    "tests": [
      {
        "ops": [
          "GroupTracker",
          "count",
          "union",
          "connected",
          "connected",
          "union",
          "count"
        ],
        "args": [
          [
            4
          ],
          [],
          [
            0,
            1
          ],
          [
            0,
            1
          ],
          [
            0,
            2
          ],
          [
            1,
            2
          ],
          []
        ],
        "expected": [
          null,
          4,
          true,
          true,
          false,
          true,
          2
        ]
      },
      {
        "ops": [
          "GroupTracker",
          "union",
          "union",
          "union",
          "connected",
          "count"
        ],
        "args": [
          [
            3
          ],
          [
            0,
            1
          ],
          [
            1,
            2
          ],
          [
            0,
            2
          ],
          [
            2,
            0
          ],
          []
        ],
        "expected": [
          null,
          true,
          true,
          false,
          true,
          1
        ]
      },
      {
        "ops": [
          "GroupTracker",
          "count"
        ],
        "args": [
          [
            0
          ],
          []
        ],
        "expected": [
          null,
          0
        ]
      },
      {
        "ops": [
          "GroupTracker",
          "union",
          "connected",
          "count"
        ],
        "args": [
          [
            1
          ],
          [
            0,
            0
          ],
          [
            0,
            0
          ],
          []
        ],
        "expected": [
          null,
          false,
          true,
          1
        ],
        "hidden": true
      },
      {
        "ops": [
          "GroupTracker",
          "union",
          "union",
          "union",
          "union",
          "count",
          "connected",
          "connected"
        ],
        "args": [
          [
            6
          ],
          [
            0,
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ],
          [
            1,
            3
          ],
          [],
          [
            0,
            3
          ],
          [
            0,
            4
          ]
        ],
        "expected": [
          null,
          true,
          true,
          true,
          true,
          2,
          true,
          false
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-unweighted-shortest-hops",
    "topic": "Graphs",
    "title": "Fewest Hops",
    "difficulty": "medium",
    "fnName": "fewestHops",
    "prompt": "graph is a nonempty adjacency list of directed edges (node IDs 0..length-1). Each edge costs one hop. Return the fewest hops from start to target, 0 if they are the same node, or -1 if unreachable. start and target are valid. Cycles are allowed; edges are not automatically bidirectional.",
    "starter": "function fewestHops(graph, start, target) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              1,
              2
            ],
            [
              3
            ],
            [
              3
            ],
            []
          ],
          0,
          3
        ],
        "expected": 2
      },
      {
        "input": [
          [
            [
              1
            ],
            [],
            []
          ],
          0,
          2
        ],
        "expected": -1
      },
      {
        "input": [
          [
            [
              1
            ],
            [
              0
            ]
          ],
          1,
          1
        ],
        "expected": 0
      },
      {
        "input": [
          [
            [
              1,
              3
            ],
            [
              2
            ],
            [
              4
            ],
            [
              4
            ],
            []
          ],
          0,
          4
        ],
        "expected": 2,
        "hidden": true
      },
      {
        "input": [
          [
            [
              0,
              1,
              1
            ],
            [
              0,
              2
            ],
            []
          ],
          0,
          2
        ],
        "expected": 2,
        "hidden": true
      },
      {
        "input": [
          [
            [
              1
            ],
            []
          ],
          1,
          0
        ],
        "expected": -1,
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-clockwise-unwind",
    "topic": "Matrices",
    "title": "Clockwise Unwind",
    "difficulty": "medium",
    "fnName": "clockwiseUnwind",
    "prompt": "Given a rectangular grid of integers, return every value in clockwise spiral order starting at the top-left and moving right, then inward. Return [] for [] or a grid with no columns. Every row has the same length.",
    "starter": "function clockwiseUnwind(grid) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              9,
              8,
              7
            ],
            [
              6,
              5,
              4
            ],
            [
              3,
              2,
              1
            ]
          ]
        ],
        "expected": [
          9,
          8,
          7,
          4,
          1,
          2,
          3,
          6,
          5
        ]
      },
      {
        "input": [
          [
            [
              2,
              4,
              6,
              8
            ],
            [
              1,
              3,
              5,
              7
            ],
            [
              0,
              9,
              11,
              13
            ]
          ]
        ],
        "expected": [
          2,
          4,
          6,
          8,
          7,
          13,
          11,
          9,
          0,
          1,
          3,
          5
        ]
      },
      {
        "input": [
          []
        ],
        "expected": []
      },
      {
        "input": [
          [
            [
              4,
              5,
              6
            ]
          ]
        ],
        "expected": [
          4,
          5,
          6
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              4
            ],
            [
              5
            ],
            [
              6
            ]
          ]
        ],
        "expected": [
          4,
          5,
          6
        ],
        "hidden": true
      },
      {
        "input": [
          [
            []
          ]
        ],
        "expected": [],
        "hidden": true
      },
      {
        "input": [
          [
            [
              8
            ]
          ]
        ],
        "expected": [
          8
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              1,
              3
            ],
            [
              5,
              7
            ]
          ]
        ],
        "expected": [
          1,
          3,
          7,
          5
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-reach-final-index",
    "topic": "Greedy",
    "title": "Reach the Final Index",
    "difficulty": "medium",
    "fnName": "canReachFinal",
    "prompt": "A nonempty list of nonnegative integers describes maximum forward jumps from each index (shorter jumps are allowed). Starting at index 0, return whether the last index is reachable. A one-element list is already there.",
    "starter": "function canReachFinal(jumps) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            3,
            1,
            0,
            2,
            0
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            2,
            1,
            0,
            0,
            3
          ]
        ],
        "expected": false
      },
      {
        "input": [
          [
            0
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            0,
            4
          ]
        ],
        "expected": false,
        "hidden": true
      },
      {
        "input": [
          [
            3,
            0,
            0
          ]
        ],
        "expected": true,
        "hidden": true
      },
      {
        "input": [
          [
            1,
            0,
            2
          ]
        ],
        "expected": false,
        "hidden": true
      },
      {
        "input": [
          [
            2,
            4,
            0,
            0
          ]
        ],
        "expected": true,
        "hidden": true
      },
      {
        "input": [
          [
            1,
            1,
            1,
            0
          ]
        ],
        "expected": true,
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-task-dependency-order",
    "topic": "Graphs",
    "title": "Task Dependency Order",
    "difficulty": "medium",
    "fnName": "taskOrder",
    "outputKind": "topological-order",
    "prompt": "Tasks are numbered 0..taskCount-1. Each pair [task, prerequisite] means the prerequisite must finish first. Return any order that includes every task once, or [] if a cycle makes that impossible. Include independent tasks. Duplicate pairs may appear. For taskCount = 0 return []. Any valid topological order passes.",
    "starter": "function taskOrder(taskCount, prerequisites) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          4,
          [
            [
              1,
              0
            ],
            [
              2,
              0
            ],
            [
              3,
              1
            ],
            [
              3,
              2
            ]
          ]
        ],
        "expected": [
          0,
          1,
          2,
          3
        ]
      },
      {
        "input": [
          2,
          [
            [
              0,
              1
            ],
            [
              1,
              0
            ]
          ]
        ],
        "expected": []
      },
      {
        "input": [
          3,
          []
        ],
        "expected": [
          0,
          1,
          2
        ]
      },
      {
        "input": [
          0,
          []
        ],
        "expected": [],
        "hidden": true
      },
      {
        "input": [
          1,
          [
            [
              0,
              0
            ]
          ]
        ],
        "expected": [],
        "hidden": true
      },
      {
        "input": [
          5,
          [
            [
              1,
              0
            ],
            [
              3,
              2
            ]
          ]
        ],
        "expected": [
          0,
          2,
          4,
          1,
          3
        ],
        "hidden": true
      },
      {
        "input": [
          2,
          [
            [
              1,
              0
            ],
            [
              1,
              0
            ]
          ]
        ],
        "expected": [
          0,
          1
        ],
        "hidden": true
      },
      {
        "input": [
          3,
          [
            [
              2,
              1
            ],
            [
              1,
              0
            ]
          ]
        ],
        "expected": [
          0,
          1,
          2
        ],
        "hidden": true
      }
    ]
  }
];
