// Additional coding exercises covering the 32 pattern-recognition answers.
// Visible tests also supply the in-app example inputs and expected outputs.
export const expansionProblems = [
  {
    "id": "dsa-queue-processing",
    "topic": "Queues",
    "title": "Process a FIFO Queue",
    "difficulty": "easy",
    "fnName": "processQueue",
    "prompt": "Given operations such as [\"enqueue\", value], [\"dequeue\"], [\"peek\"], and [\"empty\"], process a simple FIFO queue and return one result per operation. enqueue returns null; dequeue removes and returns the oldest value, or null if empty; peek returns that value without removing it, or null if empty; empty returns a boolean. Values are integers. Use the familiar array queue (push/shift), or an array with a front index. You do not need to design a queue class or use two stacks.",
    "starter": "function processQueue(operations) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              "enqueue",
              4
            ],
            [
              "enqueue",
              7
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
          4,
          4,
          false,
          7,
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
              -2
            ],
            [
              "dequeue"
            ],
            [
              "enqueue",
              9
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
          -2,
          9
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              "enqueue",
              3
            ],
            [
              "enqueue",
              3
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
          3,
          3,
          null
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-min-subarray-length",
    "topic": "Sliding Window",
    "title": "Minimum Size Subarray Sum",
    "difficulty": "medium",
    "fnName": "minSubArrayLen",
    "prompt": "Given a positive integer target and an array nums of positive integers, return the minimum length of a contiguous subarray whose sum is at least target. Return 0 if no such subarray exists, including an empty input. Aim for O(n) time using a growing and shrinking window.",
    "starter": "function minSubArrayLen(target, nums) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          7,
          [
            2,
            3,
            1,
            2,
            4,
            3
          ]
        ],
        "expected": 2
      },
      {
        "input": [
          4,
          [
            1,
            4,
            4
          ]
        ],
        "expected": 1
      },
      {
        "input": [
          11,
          [
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1
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
          6,
          [
            1,
            2,
            3
          ]
        ],
        "expected": 3,
        "hidden": true
      },
      {
        "input": [
          15,
          [
            5,
            1,
            3,
            5,
            10,
            7,
            4,
            9,
            2,
            8
          ]
        ],
        "expected": 2,
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-range-sums",
    "topic": "Prefix Sum",
    "title": "Range Sum Queries",
    "difficulty": "easy",
    "fnName": "rangeSums",
    "prompt": "Given an integer array nums and queries [left, right] with valid zero-based inclusive endpoints, return the sum for each query in order. The array does not change. Preprocess once with prefix sums so each query takes O(1). queries may be empty; an empty nums has no queries.",
    "starter": "function rangeSums(nums, queries) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            2,
            -1,
            3,
            5
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
              2,
              2
            ]
          ]
        ],
        "expected": [
          4,
          7,
          3
        ]
      },
      {
        "input": [
          [
            5
          ],
          [
            [
              0,
              0
            ]
          ]
        ],
        "expected": [
          5
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
            -3,
            -2,
            -1
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
          -6,
          -2,
          -3
        ],
        "hidden": true
      },
      {
        "input": [
          [
            0,
            4,
            0,
            4
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
          8,
          8,
          8
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-merge-intervals",
    "topic": "Intervals",
    "title": "Merge Overlapping Intervals",
    "difficulty": "medium",
    "fnName": "mergeIntervals",
    "prompt": "Given intervals [start, end] with start <= end, merge all overlapping intervals and return the merged intervals sorted by start. Intervals sharing an endpoint also merge: [1,3] and [3,5] become [1,5]. Return [] for no intervals.",
    "starter": "function mergeIntervals(intervals) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              1,
              3
            ],
            [
              2,
              6
            ],
            [
              8,
              10
            ],
            [
              15,
              18
            ]
          ]
        ],
        "expected": [
          [
            1,
            6
          ],
          [
            8,
            10
          ],
          [
            15,
            18
          ]
        ]
      },
      {
        "input": [
          [
            [
              1,
              4
            ],
            [
              4,
              5
            ]
          ]
        ],
        "expected": [
          [
            1,
            5
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
              5,
              7
            ],
            [
              1,
              10
            ],
            [
              2,
              3
            ]
          ]
        ],
        "expected": [
          [
            1,
            10
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              1,
              1
            ],
            [
              1,
              1
            ],
            [
              2,
              2
            ]
          ]
        ],
        "expected": [
          [
            1,
            1
          ],
          [
            2,
            2
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              -3,
              -1
            ],
            [
              -2,
              2
            ],
            [
              5,
              6
            ]
          ]
        ],
        "expected": [
          [
            -3,
            2
          ],
          [
            5,
            6
          ]
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-linked-list-cycle",
    "topic": "Linked Lists",
    "title": "Linked List Cycle",
    "difficulty": "easy",
    "fnName": "hasCycle",
    "prompt": "Given head of a singly linked list, return true if following next references eventually revisits a node; otherwise return false. Each node is { val, next }, and an empty head is null. Aim for O(n) time and O(1) extra space without changing the list. Examples show values and a zero-based tail-connection index: -1 means no cycle. The runner builds the actual linked nodes and passes only head, not the values array or connection index.",
    "starter": "function hasCycle(head) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            3,
            2,
            0,
            -4
          ],
          1
        ],
        "expected": true
      },
      {
        "input": [
          [
            1,
            2
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
            1,
            1,
            1
          ],
          -1
        ],
        "expected": false,
        "hidden": true
      },
      {
        "input": [
          [
            9,
            8,
            7,
            6
          ],
          0
        ],
        "expected": true,
        "hidden": true
      },
      {
        "input": [
          [
            1
          ],
          -1
        ],
        "expected": false,
        "hidden": true
      }
    ],
    "inputKind": "linked-list-cycle"
  },
  {
    "id": "dsa-reverse-linked-list",
    "topic": "Linked Lists",
    "title": "Reverse Linked List",
    "difficulty": "easy",
    "fnName": "reverseList",
    "prompt": "Given head of an acyclic singly linked list of { val, next } nodes, reverse its links in place and return the new head. Empty head is null. Reuse the original nodes and preserve their values; do not return an array or a newly allocated list. Examples show list values before and after reversal. The runner creates the nodes for you and verifies that the returned list uses the same nodes in reverse order.",
    "starter": "function reverseList(head) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ]
        ],
        "expected": [
          5,
          4,
          3,
          2,
          1
        ]
      },
      {
        "input": [
          [
            1,
            2
          ]
        ],
        "expected": [
          2,
          1
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
            7
          ]
        ],
        "expected": [
          7
        ],
        "hidden": true
      },
      {
        "input": [
          [
            2,
            2,
            3
          ]
        ],
        "expected": [
          3,
          2,
          2
        ],
        "hidden": true
      },
      {
        "input": [
          [
            -1,
            0,
            4
          ]
        ],
        "expected": [
          4,
          0,
          -1
        ],
        "hidden": true
      }
    ],
    "inputKind": "linked-list"
  },
  {
    "id": "dsa-tree-preorder",
    "topic": "Trees",
    "title": "Binary Tree Preorder Traversal",
    "difficulty": "easy",
    "fnName": "preorderTraversal",
    "prompt": "Return a binary tree’s values in preorder: visit the node, its entire left subtree, then its entire right subtree. Return [] for an empty tree. The runner passes a root node { val, left, right }, or null, built from the level-order array shown in examples. null marks a missing child; children are read left then right for each non-null parent. Your function receives root, not the array.",
    "starter": "function preorderTraversal(root) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            1,
            null,
            2,
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ]
      },
      {
        "input": [
          [
            1,
            2,
            3,
            4,
            5
          ]
        ],
        "expected": [
          1,
          2,
          4,
          5,
          3
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
            1,
            2,
            null,
            3
          ]
        ],
        "expected": [
          1,
          2,
          3
        ],
        "hidden": true
      },
      {
        "input": [
          [
            2,
            2,
            2
          ]
        ],
        "expected": [
          2,
          2,
          2
        ],
        "hidden": true
      }
    ],
    "inputKind": "binary-tree"
  },
  {
    "id": "dsa-tree-level-order",
    "topic": "Trees",
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "medium",
    "fnName": "levelOrder",
    "prompt": "Return a binary tree’s values grouped by depth, from the root down, left to right within each level. Return [] for an empty tree. The runner passes a root node { val, left, right }, or null, built from the level-order array shown in examples. null marks a missing child; children are read left then right for each non-null parent. Your function receives root, not the array.",
    "starter": "function levelOrder(root) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            3,
            9,
            20,
            null,
            null,
            15,
            7
          ]
        ],
        "expected": [
          [
            3
          ],
          [
            9,
            20
          ],
          [
            15,
            7
          ]
        ]
      },
      {
        "input": [
          [
            1
          ]
        ],
        "expected": [
          [
            1
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
            1,
            null,
            2,
            3
          ]
        ],
        "expected": [
          [
            1
          ],
          [
            2
          ],
          [
            3
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
            4,
            null,
            null,
            5
          ]
        ],
        "expected": [
          [
            1
          ],
          [
            2,
            3
          ],
          [
            4,
            5
          ]
        ],
        "hidden": true
      }
    ],
    "inputKind": "binary-tree"
  },
  {
    "id": "dsa-graph-dfs",
    "topic": "Graphs",
    "title": "Depth-First Graph Traversal",
    "difficulty": "medium",
    "fnName": "dfsTraversal",
    "prompt": "graph is an adjacency list: graph[u] lists outgoing neighbors of node u; node IDs are 0 through graph.length - 1. Starting at start, return nodes in depth-first discovery order, exploring neighbors in exactly their listed order. Visit each reachable node only once, even with cycles or duplicate edges. Return [] for an empty graph; otherwise start is valid. Disconnected nodes are not included.",
    "starter": "function dfsTraversal(graph, start) {\n  // Write your solution here.\n}\n",
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
              1
            ],
            [
              2
            ],
            [
              0
            ]
          ],
          0
        ],
        "expected": [
          0,
          1,
          2
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
    "id": "dsa-permutations",
    "topic": "Backtracking",
    "title": "All Permutations",
    "difficulty": "medium",
    "fnName": "permute",
    "prompt": "Given an array nums of distinct integers, return every permutation exactly once. The permutations may appear in any order; the grader accepts all valid orderings of the outer array. Preserve the order of values inside each permutation. For [], return [[]], representing the one empty arrangement. Inputs contain at most 7 values.",
    "starter": "function permute(nums) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            1,
            2,
            3
          ]
        ],
        "expected": [
          [
            1,
            2,
            3
          ],
          [
            1,
            3,
            2
          ],
          [
            2,
            1,
            3
          ],
          [
            2,
            3,
            1
          ],
          [
            3,
            1,
            2
          ],
          [
            3,
            2,
            1
          ]
        ]
      },
      {
        "input": [
          [
            0,
            1
          ]
        ],
        "expected": [
          [
            0,
            1
          ],
          [
            1,
            0
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
            5
          ]
        ],
        "expected": [
          [
            5
          ]
        ],
        "hidden": true
      },
      {
        "input": [
          [
            -1,
            0,
            2
          ]
        ],
        "expected": [
          [
            -1,
            0,
            2
          ],
          [
            -1,
            2,
            0
          ],
          [
            0,
            -1,
            2
          ],
          [
            0,
            2,
            -1
          ],
          [
            2,
            -1,
            0
          ],
          [
            2,
            0,
            -1
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
    ],
    "outputKind": "unordered"
  },
  {
    "id": "dsa-top-k-largest",
    "topic": "Heaps",
    "title": "K Largest Values",
    "difficulty": "medium",
    "fnName": "topKLargest",
    "prompt": "Given an integer array nums and k with 0 <= k <= nums.length, return its k largest values in any order, retaining duplicates. Return [] when k is 0. Aim to keep a min-heap of at most k values rather than sorting the entire array. Example output is one valid ordering; the grader accepts any ordering with the correct values and multiplicities.",
    "starter": "function topKLargest(nums, k) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            3,
            2,
            1,
            5,
            6,
            4
          ],
          2
        ],
        "expected": [
          5,
          6
        ]
      },
      {
        "input": [
          [
            3,
            2,
            3,
            1,
            2,
            4,
            5,
            5,
            6
          ],
          4
        ],
        "expected": [
          4,
          5,
          5,
          6
        ]
      },
      {
        "input": [
          [
            1,
            2
          ],
          0
        ],
        "expected": []
      },
      {
        "input": [
          [
            -5,
            -1,
            -3
          ],
          2
        ],
        "expected": [
          -3,
          -1
        ],
        "hidden": true
      },
      {
        "input": [
          [
            2,
            2,
            2
          ],
          2
        ],
        "expected": [
          2,
          2
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
            4,
            1,
            3
          ],
          3
        ],
        "expected": [
          1,
          3,
          4
        ],
        "hidden": true
      }
    ],
    "outputKind": "unordered"
  },
  {
    "id": "dsa-daily-temperatures",
    "topic": "Stacks",
    "title": "Daily Temperatures",
    "difficulty": "medium",
    "fnName": "dailyTemperatures",
    "prompt": "For each daily temperature, return how many days you must wait for a strictly warmer temperature. Return 0 when no later day is warmer. Equal temperatures do not count as warmer. Return [] for empty input. Aim for O(n) time with a monotonic stack of unresolved indices.",
    "starter": "function dailyTemperatures(temperatures) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            73,
            74,
            75,
            71,
            69,
            72,
            76,
            73
          ]
        ],
        "expected": [
          1,
          1,
          4,
          2,
          1,
          1,
          0,
          0
        ]
      },
      {
        "input": [
          [
            30,
            40,
            50,
            60
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
            60,
            50,
            40
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
            30,
            30,
            31
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
            42
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
            70,
            70,
            70
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
    "id": "dsa-union-find",
    "topic": "Graphs",
    "title": "Union Find / Disjoint Set",
    "difficulty": "medium",
    "kind": "design",
    "className": "DisjointSet",
    "prompt": "Implement DisjointSet(n) for nodes 0 through n - 1, initially in separate groups. union(a, b) joins their groups and returns true only if two different groups merged, otherwise false. connected(a, b) returns whether they share a group. count() returns the number of groups. n may be 0; all node arguments are valid. Aim for union by size/rank with path compression.",
    "starter": "class DisjointSet {\n  constructor(n) {\n  }\n  union(a, b) {\n  }\n  connected(a, b) {\n  }\n  count() {\n  }\n}\n",
    "tests": [
      {
        "ops": [
          "DisjointSet",
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
          "DisjointSet",
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
          "DisjointSet",
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
          "DisjointSet",
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
          "DisjointSet",
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
    "id": "dsa-graph-shortest-path",
    "topic": "Graphs",
    "title": "Shortest Path in an Unweighted Graph",
    "difficulty": "medium",
    "fnName": "shortestPath",
    "prompt": "graph is a nonempty adjacency list of outgoing edges with node IDs 0 through graph.length - 1. Each edge costs one. Return the minimum number of edges from start to target, 0 if start equals target, or -1 if unreachable. start and target are valid. Edges may form cycles; an edge is not automatically bidirectional.",
    "starter": "function shortestPath(graph, start, target) {\n  // Write your solution here.\n}\n",
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
    "id": "dsa-spiral-matrix",
    "topic": "Matrices",
    "title": "Spiral Matrix",
    "difficulty": "medium",
    "fnName": "spiralOrder",
    "prompt": "Given a rectangular matrix of integers, return all values in clockwise spiral order, starting at the top-left corner and moving right. Process the outer boundary then continue inward. Return [] for [] or a matrix with no columns. Every row has the same length.",
    "starter": "function spiralOrder(matrix) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            [
              1,
              2,
              3
            ],
            [
              4,
              5,
              6
            ],
            [
              7,
              8,
              9
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3,
          6,
          9,
          8,
          7,
          4,
          5
        ]
      },
      {
        "input": [
          [
            [
              1,
              2,
              3,
              4
            ],
            [
              5,
              6,
              7,
              8
            ],
            [
              9,
              10,
              11,
              12
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3,
          4,
          8,
          12,
          11,
          10,
          9,
          5,
          6,
          7
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
              1,
              2,
              3
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3
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
              2
            ],
            [
              3
            ]
          ]
        ],
        "expected": [
          1,
          2,
          3
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
              5
            ]
          ]
        ],
        "expected": [
          5
        ],
        "hidden": true
      },
      {
        "input": [
          [
            [
              1,
              2
            ],
            [
              3,
              4
            ]
          ]
        ],
        "expected": [
          1,
          2,
          4,
          3
        ],
        "hidden": true
      }
    ]
  },
  {
    "id": "dsa-jump-game",
    "topic": "Greedy",
    "title": "Jump Game",
    "difficulty": "medium",
    "fnName": "canJump",
    "prompt": "Given a nonempty array nums of nonnegative integers, start at index 0. nums[i] is the maximum number of positions you may jump forward from index i; you may choose a shorter jump. Return whether the final index is reachable. A single-element array is already at the final index.",
    "starter": "function canJump(nums) {\n  // Write your solution here.\n}\n",
    "tests": [
      {
        "input": [
          [
            2,
            3,
            1,
            1,
            4
          ]
        ],
        "expected": true
      },
      {
        "input": [
          [
            3,
            2,
            1,
            0,
            4
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
            1
          ]
        ],
        "expected": false,
        "hidden": true
      },
      {
        "input": [
          [
            2,
            5,
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
    "id": "dsa-course-order",
    "topic": "Graphs",
    "title": "Course / Task Order",
    "difficulty": "medium",
    "fnName": "findOrder",
    "prompt": "Courses are numbered 0 through numCourses - 1. Each pair [course, prerequisite] means prerequisite must be completed first. Return any valid order containing every course exactly once, or [] if a cycle makes completion impossible. Include courses with no dependencies. Duplicate prerequisite pairs may appear. For numCourses = 0, return []. The shown expected order is an example; any order satisfying every prerequisite passes.",
    "starter": "function findOrder(numCourses, prerequisites) {\n  // Write your solution here.\n}\n",
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
    ],
    "outputKind": "topological-order"
  }
];
