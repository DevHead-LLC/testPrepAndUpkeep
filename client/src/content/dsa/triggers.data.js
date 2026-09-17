// Local four-choice questions. Independently authored trigger variants
// grouped by coding exercise. Keep exerciseId aligned with the coding bank.
export const triggerQuestions = [
  {
    "id": "trigger-matching-pair-1",
    "type": "single",
    "prompt": "You need to count how often each distinct event name occurs. Which structure associates each name with its count?",
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
    "explanation": "Map stores information associated with each key: a frequency, last-seen index, or group of records. Membership alone is not enough.",
    "exerciseId": "dsa-matching-pair"
  },
  {
    "id": "trigger-matching-pair-2",
    "type": "single",
    "prompt": "For each user ID, you need to retrieve the most recent position where it appeared. Which structure stores that association?",
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
    "explanation": "Map stores information associated with each key: a frequency, last-seen index, or group of records. Membership alone is not enough.",
    "exerciseId": "dsa-matching-pair"
  },
  {
    "id": "trigger-matching-pair-3",
    "type": "single",
    "prompt": "You need to group records by category and retrieve the records belonging to a category by its key. Which structure fits?",
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
    "explanation": "Map stores information associated with each key: a frequency, last-seen index, or group of records. Membership alone is not enough.",
    "exerciseId": "dsa-matching-pair"
  },
  {
    "id": "trigger-repeated-value-1",
    "type": "single",
    "prompt": "You only need a yes/no answer about whether an ID has appeared before; no count or other data is needed. Which dedicated membership structure fits?",
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
    "explanation": "Set represents unique values and membership. Choose it when the question is whether a value exists, rather than what information belongs to it.",
    "exerciseId": "dsa-any-repeated-value"
  },
  {
    "id": "trigger-repeated-value-2",
    "type": "single",
    "prompt": "You need a collection of unique tags with automatic duplicate elimination. Which structure directly represents this?",
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
    "explanation": "Set represents unique values and membership. Choose it when the question is whether a value exists, rather than what information belongs to it.",
    "exerciseId": "dsa-any-repeated-value"
  },
  {
    "id": "trigger-repeated-value-3",
    "type": "single",
    "prompt": "You need to check whether a blocked ID belongs to a collection, with no value associated with the ID. Which dedicated membership structure fits?",
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
    "explanation": "Set represents unique values and membership. Choose it when the question is whether a value exists, rather than what information belongs to it.",
    "exerciseId": "dsa-any-repeated-value"
  },
  {
    "id": "trigger-balanced-brackets-1",
    "type": "single",
    "prompt": "An editor must undo the most recently completed action first. Which structure directly supports this removal order?",
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
    "explanation": "Stack removes the most recently added item first, matching undo operations and nested structures.",
    "exerciseId": "dsa-balanced-brackets"
  },
  {
    "id": "trigger-balanced-brackets-2",
    "type": "single",
    "prompt": "Nested opening markers must be matched against closing markers in reverse opening order. Which structure holds the unmatched openings?",
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
    "explanation": "Stack removes the most recently added item first, matching undo operations and nested structures.",
    "exerciseId": "dsa-balanced-brackets"
  },
  {
    "id": "trigger-balanced-brackets-3",
    "type": "single",
    "prompt": "A workflow must finish the newest pending item before returning to older pending items. Which structure models this last-in, first-out order?",
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
    "explanation": "Stack removes the most recently added item first, matching undo operations and nested structures.",
    "exerciseId": "dsa-balanced-brackets"
  },
  {
    "id": "trigger-fifo-ops-1",
    "type": "single",
    "prompt": "Support requests have equal priority and must be handled in arrival order. Which simple structure holds pending requests?",
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
    "explanation": "Queue provides FIFO order. Here the question asks for the container, not the complete traversal algorithm; use the familiar simple queue representation.",
    "exerciseId": "dsa-fifo-ops"
  },
  {
    "id": "trigger-fifo-ops-2",
    "type": "single",
    "prompt": "New items join at the back, and the oldest waiting item leaves from the front. Which structure fits?",
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
    "explanation": "Queue provides FIFO order. Here the question asks for the container, not the complete traversal algorithm; use the familiar simple queue representation.",
    "exerciseId": "dsa-fifo-ops"
  },
  {
    "id": "trigger-fifo-ops-3",
    "type": "single",
    "prompt": "A breadth-first traversal needs a container for discovered nodes so the earliest discovered pending node is processed first. Which container supplies this order?",
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
    "explanation": "Queue provides FIFO order. Here the question asks for the container, not the complete traversal algorithm; use the familiar simple queue representation.",
    "exerciseId": "dsa-fifo-ops"
  },
  {
    "id": "trigger-single-trade-1",
    "type": "single",
    "prompt": "While scanning measurements, you need the largest increase from an earlier measurement to a later one. Keeping the lowest earlier measurement is sufficient. Which approach fits?",
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
    "explanation": "Running State / Greedy retains the best earlier candidate and updates the answer as values arrive, without enumerating all pairs.",
    "exerciseId": "dsa-single-trade-peak"
  },
  {
    "id": "trigger-single-trade-2",
    "type": "single",
    "prompt": "Every new quote is compared with the cheapest earlier quote, and only the best difference and cheapest quote need to survive. Which approach fits?",
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
    "explanation": "Running State / Greedy retains the best earlier candidate and updates the answer as values arrive, without enumerating all pairs.",
    "exerciseId": "dsa-single-trade-peak"
  },
  {
    "id": "trigger-single-trade-3",
    "type": "single",
    "prompt": "You can compute the best later-minus-earlier difference in one pass by carrying a minimum-so-far and a best-so-far. Which approach describes this?",
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
    "explanation": "Running State / Greedy retains the best earlier candidate and updates the answer as values arrive, without enumerating all pairs.",
    "exerciseId": "dsa-single-trade-peak"
  },
  {
    "id": "trigger-sorted-pair-1",
    "type": "single",
    "prompt": "To find a target pair sum in ascending data, you compare the two ends and move one end inward based on whether the sum is too small or too large. Which approach fits?",
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
    "explanation": "Two Pointers coordinates two positions: opposite ends for pair searches or mirrored comparisons, and read/write positions for in-place compaction.",
    "exerciseId": "dsa-pair-from-sorted-ledger"
  },
  {
    "id": "trigger-sorted-pair-2",
    "type": "single",
    "prompt": "You need to check whether a string reads the same forward and backward by comparing mirrored characters and moving inward. Which approach fits?",
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
    "explanation": "Two Pointers coordinates two positions: opposite ends for pair searches or mirrored comparisons, and read/write positions for in-place compaction.",
    "exerciseId": "dsa-pair-from-sorted-ledger"
  },
  {
    "id": "trigger-sorted-pair-3",
    "type": "single",
    "prompt": "In a sorted array, you need to compact duplicates in place using one index to read values and another to write unique values. Which approach fits?",
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
    "explanation": "Two Pointers coordinates two positions: opposite ends for pair searches or mirrored comparisons, and read/write positions for in-place compaction.",
    "exerciseId": "dsa-pair-from-sorted-ledger"
  },
  {
    "id": "trigger-shortest-stretch-1",
    "type": "single",
    "prompt": "Positive integers form a list and you need the shortest contiguous stretch whose sum meets a threshold, growing and shrinking one window. Which range-management pattern fits?",
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
    "explanation": "Sliding Window maintains a contiguous range and updates its state as edges move. The stated conditions allow efficient incremental updates.",
    "exerciseId": "dsa-shortest-qualifying-stretch"
  },
  {
    "id": "trigger-shortest-stretch-2",
    "type": "single",
    "prompt": "You need the shortest contiguous stretch of positive values whose sum meets a threshold, updating the running total as the window grows and shrinks. Which approach fits?",
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
    "explanation": "Sliding Window maintains a contiguous range and updates its state as edges move. The stated conditions allow efficient incremental updates.",
    "exerciseId": "dsa-shortest-qualifying-stretch"
  },
  {
    "id": "trigger-shortest-stretch-3",
    "type": "single",
    "prompt": "For positive values, you grow a contiguous range until its sum meets a threshold, then shrink it while it remains valid. Which approach finds the shortest such range?",
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
    "explanation": "Sliding Window maintains a contiguous range and updates its state as edges move. The stated conditions allow efficient incremental updates.",
    "exerciseId": "dsa-shortest-qualifying-stretch"
  },
  {
    "id": "trigger-ordered-locate-1",
    "type": "single",
    "prompt": "A sorted list needs an insertion position for a new value. You repeatedly discard half the remaining candidate positions. Which technique fits?",
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
    "explanation": "Binary Search exploits sorted data or a monotone predicate to discard half the search space, including searches for boundaries or insertion positions.",
    "exerciseId": "dsa-locate-in-ordered-list"
  },
  {
    "id": "trigger-ordered-locate-2",
    "type": "single",
    "prompt": "A sequence of test results is false up to a boundary and true thereafter. You need the first true position using logarithmically many checks. Which technique fits?",
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
    "explanation": "Binary Search exploits sorted data or a monotone predicate to discard half the search space, including searches for boundaries or insertion positions.",
    "exerciseId": "dsa-locate-in-ordered-list"
  },
  {
    "id": "trigger-ordered-locate-3",
    "type": "single",
    "prompt": "You need to locate the first value at least a threshold in ascending data by comparing a midpoint and narrowing the candidate interval. Which technique fits?",
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
    "explanation": "Binary Search exploits sorted data or a monotone predicate to discard half the search space, including searches for boundaries or insertion positions.",
    "exerciseId": "dsa-locate-in-ordered-list"
  },
  {
    "id": "trigger-range-totals-1",
    "type": "single",
    "prompt": "An unchanged array will receive thousands of arbitrary inclusive range-total queries. Which preprocessing lets each query use a difference of two stored totals?",
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
    "explanation": "Prefix Sum stores cumulative totals. Subtracting the total before the left endpoint from the total through the right endpoint gives a range sum.",
    "exerciseId": "dsa-range-total-queries"
  },
  {
    "id": "trigger-range-totals-2",
    "type": "single",
    "prompt": "You repeatedly need totals between two indices, and you can preprocess cumulative totals once. Which technique avoids resumming the same entries?",
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
    "explanation": "Prefix Sum stores cumulative totals. Subtracting the total before the left endpoint from the total through the right endpoint gives a range sum.",
    "exerciseId": "dsa-range-total-queries"
  },
  {
    "id": "trigger-range-totals-3",
    "type": "single",
    "prompt": "A report asks for many date-range totals over fixed daily values. Which technique answers each range in O(1) after O(n) preprocessing?",
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
    "explanation": "Prefix Sum stores cumulative totals. Subtracting the total before the left endpoint from the total through the right endpoint gives a range sum.",
    "exerciseId": "dsa-range-total-queries"
  },
  {
    "id": "trigger-collapse-overlaps-1",
    "type": "single",
    "prompt": "You need the union of reservation ranges, combining overlaps after ordering ranges by their start. Which pattern fits?",
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
    "explanation": "Collapse Overlaps / Sort + Sweep sorts ranges and extends the active range until a gap requires a new one. Endpoint-touching behavior follows the stated rule.",
    "exerciseId": "dsa-collapse-overlaps"
  },
  {
    "id": "trigger-collapse-overlaps-2",
    "type": "single",
    "prompt": "A list of coverage ranges must become disjoint ranges. You scan in start order and extend the active end when a range overlaps. Which pattern fits?",
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
    "explanation": "Collapse Overlaps / Sort + Sweep sorts ranges and extends the active range until a gap requires a new one. Endpoint-touching behavior follows the stated rule.",
    "exerciseId": "dsa-collapse-overlaps"
  },
  {
    "id": "trigger-collapse-overlaps-3",
    "type": "single",
    "prompt": "Maintenance windows that overlap or share an endpoint should become one window. Which approach sorts starts and carries a current combined range?",
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
    "explanation": "Collapse Overlaps / Sort + Sweep sorts ranges and extends the active range until a gap requires a new one. Endpoint-touching behavior follows the stated rule.",
    "exerciseId": "dsa-collapse-overlaps"
  },
  {
    "id": "trigger-loop-in-chain-1",
    "type": "single",
    "prompt": "You need the middle node of a singly linked list in one pass with constant extra storage. One reference advances twice as quickly as the other. Which technique fits?",
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
    "explanation": "Fast & Slow Pointers moves references at different speeds to find a middle or detect a cycle using O(1) auxiliary space.",
    "exerciseId": "dsa-loop-in-chain"
  },
  {
    "id": "trigger-loop-in-chain-2",
    "type": "single",
    "prompt": "You cannot mark or store visited list nodes. Which technique detects a cycle by checking whether two references moving at different speeds meet?",
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
    "explanation": "Fast & Slow Pointers moves references at different speeds to find a middle or detect a cycle using O(1) auxiliary space.",
    "exerciseId": "dsa-loop-in-chain"
  },
  {
    "id": "trigger-loop-in-chain-3",
    "type": "single",
    "prompt": "Two references start at a list head. When the faster one reaches the end, the slower one is at the middle. Which technique is being used?",
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
    "explanation": "Fast & Slow Pointers moves references at different speeds to find a middle or detect a cycle using O(1) auxiliary space.",
    "exerciseId": "dsa-loop-in-chain"
  },
  {
    "id": "trigger-flip-chain-1",
    "type": "single",
    "prompt": "A node chain must point backward using the existing nodes and constant extra storage. You save the next node before redirecting the current link. Which pattern fits?",
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
    "explanation": "Flip Chain / In-Place Reverse rewires links in place. Saving the next reference before overwriting a link preserves access to the unprocessed chain.",
    "exerciseId": "dsa-flip-chain"
  },
  {
    "id": "trigger-flip-chain-2",
    "type": "single",
    "prompt": "You carry previous, current, and next references while changing every next link to its predecessor. Which operation does this implement?",
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
    "explanation": "Flip Chain / In-Place Reverse rewires links in place. Saving the next reference before overwriting a link preserves access to the unprocessed chain.",
    "exerciseId": "dsa-flip-chain"
  },
  {
    "id": "trigger-flip-chain-3",
    "type": "single",
    "prompt": "You must make a singly linked list’s tail its new head without copying nodes or allocating a second list. Which pattern fits?",
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
    "explanation": "Flip Chain / In-Place Reverse rewires links in place. Saving the next reference before overwriting a link preserves access to the unprocessed chain.",
    "exerciseId": "dsa-flip-chain"
  },
  {
    "id": "trigger-node-left-right-1",
    "type": "single",
    "prompt": "A binary tree report must emit each parent before its left subtree and then its right subtree. Which traversal fits?",
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
    "explanation": "Tree DFS / Preorder visits node, left, right. Preorder specifies when a node is processed, while depth-first traversal completes a branch before returning.",
    "exerciseId": "dsa-node-left-right-walk"
  },
  {
    "id": "trigger-node-left-right-2",
    "type": "single",
    "prompt": "You recursively process the current binary-tree node before visiting either child, always handling the left branch first. Which traversal is this?",
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
    "explanation": "Tree DFS / Preorder visits node, left, right. Preorder specifies when a node is processed, while depth-first traversal completes a branch before returning.",
    "exerciseId": "dsa-node-left-right-walk"
  },
  {
    "id": "trigger-node-left-right-3",
    "type": "single",
    "prompt": "A tree serializer writes a node first, then serializes the complete left branch, then the right branch, including null markers. Which traversal order fits?",
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
    "explanation": "Tree DFS / Preorder visits node, left, right. Preorder specifies when a node is processed, while depth-first traversal completes a branch before returning.",
    "exerciseId": "dsa-node-left-right-walk"
  },
  {
    "id": "trigger-level-by-level-1",
    "type": "single",
    "prompt": "You need one output list for each depth of a binary tree. Which traversal groups the root, then its children, then its grandchildren?",
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
    "explanation": "BFS / Level Order groups tree nodes by depth. A queue holds the frontier, and processing a level’s initial queue length separates consecutive levels.",
    "exerciseId": "dsa-level-by-level-walk"
  },
  {
    "id": "trigger-level-by-level-2",
    "type": "single",
    "prompt": "An organization tree must be displayed in rows by distance from the root, without mixing depths. Which traversal fits?",
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
    "explanation": "BFS / Level Order groups tree nodes by depth. A queue holds the frontier, and processing a level’s initial queue length separates consecutive levels.",
    "exerciseId": "dsa-level-by-level-walk"
  },
  {
    "id": "trigger-level-by-level-3",
    "type": "single",
    "prompt": "In a binary tree, you process exactly the current queue length into one output group, then move on to the children. Which traversal pattern is this?",
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
    "explanation": "BFS / Level Order groups tree nodes by depth. A queue holds the frontier, and processing a level’s initial queue length separates consecutive levels.",
    "exerciseId": "dsa-level-by-level-walk"
  },
  {
    "id": "trigger-deep-graph-1",
    "type": "single",
    "prompt": "In an adjacency-list graph, you follow one unvisited neighbor chain until it ends, then return to explore alternatives. Which traversal fits?",
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
    "explanation": "Graph DFS explores a path deeply before backing up. A visited collection prevents repeated work and infinite traversal around graph cycles.",
    "exerciseId": "dsa-deep-graph-walk"
  },
  {
    "id": "trigger-deep-graph-2",
    "type": "single",
    "prompt": "You need to explore all reachable graph nodes with an explicit stack, marking visited nodes to avoid cycles. Which traversal does this implement?",
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
    "explanation": "Graph DFS explores a path deeply before backing up. A visited collection prevents repeated work and infinite traversal around graph cycles.",
    "exerciseId": "dsa-deep-graph-walk"
  },
  {
    "id": "trigger-deep-graph-3",
    "type": "single",
    "prompt": "A graph walk recursively explores each unvisited neighbor fully before returning to the current node. Which traversal is this?",
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
    "explanation": "Graph DFS explores a path deeply before backing up. A visited collection prevents repeated work and infinite traversal around graph cycles.",
    "exerciseId": "dsa-deep-graph-walk"
  },
  {
    "id": "trigger-landmass-1",
    "type": "single",
    "prompt": "A bitmap contains separate patches of land connected only up, down, left, or right. Which pattern counts patches by flood-filling each unvisited patch?",
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
    "explanation": "Grid DFS / Connected Components explores adjacent cells to mark an entire region. Starting a fresh traversal for each unvisited region counts components.",
    "exerciseId": "dsa-landmass-count"
  },
  {
    "id": "trigger-landmass-2",
    "type": "single",
    "prompt": "You need to recolor all cells connected to a starting cell by matching color, following four-direction neighbors recursively. Which grid traversal pattern fits?",
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
    "explanation": "Grid DFS / Connected Components explores adjacent cells to mark an entire region. Starting a fresh traversal for each unvisited region counts components.",
    "exerciseId": "dsa-landmass-count"
  },
  {
    "id": "trigger-landmass-3",
    "type": "single",
    "prompt": "You scan a matrix and start a depth-first flood fill each time you find unvisited land, incrementing a region counter once per fill. Which pattern is this?",
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
    "explanation": "Grid DFS / Connected Components explores adjacent cells to mark an entire region. Starting a fresh traversal for each unvisited region counts components.",
    "exerciseId": "dsa-landmass-count"
  },
  {
    "id": "trigger-all-arrangements-1",
    "type": "single",
    "prompt": "You need every combination of K distinct choices. You append a choice, explore completions, then remove it. Which pattern fits?",
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
    "explanation": "Backtracking explores a choice tree while restoring state after each branch. Constraints can prune branches that cannot produce valid solutions.",
    "exerciseId": "dsa-all-arrangements"
  },
  {
    "id": "trigger-all-arrangements-2",
    "type": "single",
    "prompt": "You must generate all valid arrangements and abandon a partial arrangement as soon as it violates a constraint. Which search pattern tries and undoes choices?",
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
    "explanation": "Backtracking explores a choice tree while restoring state after each branch. Constraints can prune branches that cannot produce valid solutions.",
    "exerciseId": "dsa-all-arrangements"
  },
  {
    "id": "trigger-all-arrangements-3",
    "type": "single",
    "prompt": "A search needs choose → explore → undo so one mutable partial answer can be reused to enumerate every solution. Which pattern fits?",
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
    "explanation": "Backtracking explores a choice tree while restoring state after each branch. Constraints can prune branches that cannot produce valid solutions.",
    "exerciseId": "dsa-all-arrangements"
  },
  {
    "id": "trigger-k-biggest-1",
    "type": "single",
    "prompt": "Jobs arrive with different urgency scores, and you repeatedly need to remove the most urgent pending job. Which structure fits?",
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
    "explanation": "Heap / Priority Queue maintains access to an extreme-priority item. A size-K min-heap retains the largest K candidates by evicting the smallest retained value.",
    "exerciseId": "dsa-k-biggest-values"
  },
  {
    "id": "trigger-k-biggest-2",
    "type": "single",
    "prompt": "A stream is too large to retain in full. You need only its K largest values, replacing the smallest retained candidate when a better one arrives. Which structure fits?",
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
    "explanation": "Heap / Priority Queue maintains access to an extreme-priority item. A size-K min-heap retains the largest K candidates by evicting the smallest retained value.",
    "exerciseId": "dsa-k-biggest-values"
  },
  {
    "id": "trigger-k-biggest-3",
    "type": "single",
    "prompt": "You need repeated access to the current smallest candidate while candidates are inserted dynamically. Which structure supports this efficiently?",
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
    "explanation": "Heap / Priority Queue maintains access to an extreme-priority item. A size-K min-heap retains the largest K candidates by evicting the smallest retained value.",
    "exerciseId": "dsa-k-biggest-values"
  },
  {
    "id": "trigger-days-until-warmer-1",
    "type": "single",
    "prompt": "For each array entry, you need the first larger entry to its right, resolving earlier pending entries as larger values arrive. Which specialized pattern fits?",
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
    "explanation": "Monotonic Stack maintains candidates in sorted value order. Popped candidates are resolved or ruled out, enabling many nearest-greater/smaller problems to run in linear time.",
    "exerciseId": "dsa-days-until-warmer"
  },
  {
    "id": "trigger-days-until-warmer-2",
    "type": "single",
    "prompt": "You keep unresolved indices in decreasing value order and pop them when the current value is greater. Which pattern is this?",
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
    "explanation": "Monotonic Stack maintains candidates in sorted value order. Popped candidates are resolved or ruled out, enabling many nearest-greater/smaller problems to run in linear time.",
    "exerciseId": "dsa-days-until-warmer"
  },
  {
    "id": "trigger-days-until-warmer-3",
    "type": "single",
    "prompt": "You need the nearest smaller value to the left of each entry, discarding larger or equal candidates from the top as you scan. Which specialized pattern fits?",
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
    "explanation": "Monotonic Stack maintains candidates in sorted value order. Popped candidates are resolved or ruled out, enabling many nearest-greater/smaller problems to run in linear time.",
    "exerciseId": "dsa-days-until-warmer"
  },
  {
    "id": "trigger-step-combinations-1",
    "type": "single",
    "prompt": "A sequence of counts satisfies ways[i] = ways[i - 1] + ways[i - 2]. Which general pattern reuses the two earlier answers?",
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
    "explanation": "Dynamic Programming / 1D DP reuses answers to overlapping subproblems indexed by a single position. If only two previous states are needed, storage can be rolled forward.",
    "exerciseId": "dsa-step-combinations"
  },
  {
    "id": "trigger-step-combinations-2",
    "type": "single",
    "prompt": "A counting problem repeatedly recomputes the same smaller states. Which general approach stores those one-dimensional states and builds larger answers from them?",
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
    "explanation": "Dynamic Programming / 1D DP reuses answers to overlapping subproblems indexed by a single position. If only two previous states are needed, storage can be rolled forward.",
    "exerciseId": "dsa-step-combinations"
  },
  {
    "id": "trigger-step-combinations-3",
    "type": "single",
    "prompt": "You count routes to position i using counts for positions i - 1 and i - 2, building from base cases instead of expanding repeated recursive calls. Which general pattern fits?",
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
    "explanation": "Dynamic Programming / 1D DP reuses answers to overlapping subproblems indexed by a single position. If only two previous states are needed, storage can be rolled forward.",
    "exerciseId": "dsa-step-combinations"
  },
  {
    "id": "trigger-skip-adjacent-1",
    "type": "single",
    "prompt": "You want the highest total reward from a row of choices, but selecting a position forbids selecting either neighbor. Which specific DP pattern fits?",
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
    "explanation": "Skip-Adjacent Loot / DP is the take-or-skip DP for non-adjacent selections. Taking the current value uses the best result two positions back; skipping uses the result one position back.",
    "exerciseId": "dsa-skip-adjacent-loot"
  },
  {
    "id": "trigger-skip-adjacent-2",
    "type": "single",
    "prompt": "Your recurrence is best[i] = max(best[i - 1], value[i] + best[i - 2]). Which specific problem pattern does it describe?",
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
    "explanation": "Skip-Adjacent Loot / DP is the take-or-skip DP for non-adjacent selections. Taking the current value uses the best result two positions back; skipping uses the result one position back.",
    "exerciseId": "dsa-skip-adjacent-loot"
  },
  {
    "id": "trigger-skip-adjacent-3",
    "type": "single",
    "prompt": "You can skip an item or take it plus the best solution ending at least two positions earlier. You maximize value under a no-adjacent-selections rule. Which specific pattern fits?",
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
    "explanation": "Skip-Adjacent Loot / DP is the take-or-skip DP for non-adjacent selections. Taking the current value uses the best result two positions back; skipping uses the result one position back.",
    "exerciseId": "dsa-skip-adjacent-loot"
  },
  {
    "id": "trigger-fewest-tokens-1",
    "type": "single",
    "prompt": "You have unlimited pieces of several positive integer lengths and need an exact target length using as few pieces as possible. Which specific DP pattern fits?",
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
    "explanation": "Fewest Tokens / Unbounded DP minimizes item count for an exact amount using unlimited positive denominations. It compares smaller-amount solutions rather than assuming the largest choice is always best.",
    "exerciseId": "dsa-fewest-tokens"
  },
  {
    "id": "trigger-fewest-tokens-2",
    "type": "single",
    "prompt": "For each amount, you try every denomination and add one to the best result for amount minus denomination. Which specific pattern is this?",
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
    "explanation": "Fewest Tokens / Unbounded DP minimizes item count for an exact amount using unlimited positive denominations. It compares smaller-amount solutions rather than assuming the largest choice is always best.",
    "exerciseId": "dsa-fewest-tokens"
  },
  {
    "id": "trigger-fewest-tokens-3",
    "type": "single",
    "prompt": "Choosing the largest denomination first can fail. You need an exact total with the minimum number of reusable denominations, or report that it is impossible. Which pattern fits?",
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
    "explanation": "Fewest Tokens / Unbounded DP minimizes item count for an exact amount using unlimited positive denominations. It compares smaller-amount solutions rather than assuming the largest choice is always best.",
    "exerciseId": "dsa-fewest-tokens"
  },
  {
    "id": "trigger-prefix-lexicon-1",
    "type": "single",
    "prompt": "A word collection needs repeated startsWith checks by walking characters through shared paths. Which structure fits?",
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
    "explanation": "Trie / Prefix Tree stores character paths shared by common prefixes. Terminal markers distinguish complete words; finding a prefix locates the subtree for autocomplete.",
    "exerciseId": "dsa-prefix-lexicon"
  },
  {
    "id": "trigger-prefix-lexicon-2",
    "type": "single",
    "prompt": "An autocomplete index shares storage for common leading characters and must quickly locate all words under a typed prefix. Which structure fits?",
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
    "explanation": "Trie / Prefix Tree stores character paths shared by common prefixes. Terminal markers distinguish complete words; finding a prefix locates the subtree for autocomplete.",
    "exerciseId": "dsa-prefix-lexicon"
  },
  {
    "id": "trigger-prefix-lexicon-3",
    "type": "single",
    "prompt": "You need to distinguish a full stored word from a prefix that merely leads to longer words using terminal markers on character paths. Which structure fits?",
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
    "explanation": "Trie / Prefix Tree stores character paths shared by common prefixes. Terminal markers distinguish complete words; finding a prefix locates the subtree for autocomplete.",
    "exerciseId": "dsa-prefix-lexicon"
  },
  {
    "id": "trigger-disjoint-groups-1",
    "type": "single",
    "prompt": "Connections are added over time, and you repeatedly ask whether two nodes belong to the same merged group. Which structure fits?",
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
    "explanation": "Union Find / Disjoint Set maintains component representatives under repeated merges. Comparing roots answers membership queries, and a union of distinct roots reduces the component count.",
    "exerciseId": "dsa-disjoint-groups"
  },
  {
    "id": "trigger-disjoint-groups-2",
    "type": "single",
    "prompt": "Your operations merge two components and look up the representative of a node’s component. Which structure is designed for these operations?",
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
    "explanation": "Union Find / Disjoint Set maintains component representatives under repeated merges. Comparing roots answers membership queries, and a union of distinct roots reduces the component count.",
    "exerciseId": "dsa-disjoint-groups"
  },
  {
    "id": "trigger-disjoint-groups-3",
    "type": "single",
    "prompt": "You begin with isolated nodes and decrement a component counter only when a new connection joins two different groups. Which structure efficiently tracks the groups?",
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
    "explanation": "Union Find / Disjoint Set maintains component representatives under repeated merges. Comparing roots answers membership queries, and a union of distinct roots reduces the component count.",
    "exerciseId": "dsa-disjoint-groups"
  },
  {
    "id": "trigger-lone-survivor-1",
    "type": "single",
    "prompt": "In a collection of 32-bit integers, equal values occur in pairs except for one leftover. Which constant-space operation cancels the pairs?",
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
    "explanation": "XOR / Bit Manipulation cancels equal pairs: x XOR x = 0 and x XOR 0 = x. The pair-frequency assumption is essential; JavaScript bitwise XOR works on 32-bit integers.",
    "exerciseId": "dsa-lone-survivor"
  },
  {
    "id": "trigger-lone-survivor-2",
    "type": "single",
    "prompt": "You need to combine 32-bit integers so x combined with x disappears and zero leaves a value unchanged. Which technique isolates a single unpaired value?",
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
    "explanation": "XOR / Bit Manipulation cancels equal pairs: x XOR x = 0 and x XOR 0 = x. The pair-frequency assumption is essential; JavaScript bitwise XOR works on 32-bit integers.",
    "exerciseId": "dsa-lone-survivor"
  },
  {
    "id": "trigger-lone-survivor-3",
    "type": "single",
    "prompt": "All 32-bit integer IDs occur exactly twice except one. You must find the leftover without sorting or storing frequencies. Which technique fits?",
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
    "explanation": "XOR / Bit Manipulation cancels equal pairs: x XOR x = 0 and x XOR 0 = x. The pair-frequency assumption is essential; JavaScript bitwise XOR works on 32-bit integers.",
    "exerciseId": "dsa-lone-survivor"
  },
  {
    "id": "trigger-fewest-hops-1",
    "type": "single",
    "prompt": "Every graph edge has equal cost. You need the fewest hops from a source to a destination. Which complete graph algorithm fits?",
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
    "explanation": "Graph BFS / Shortest Path explores unweighted graphs in nondecreasing distance. First discovery gives the minimum edge count; general weighted edges need a different approach.",
    "exerciseId": "dsa-unweighted-shortest-hops"
  },
  {
    "id": "trigger-fewest-hops-2",
    "type": "single",
    "prompt": "You explore a graph in distance layers from a start node and return the target’s distance on first discovery. Which shortest-path pattern is this?",
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
    "explanation": "Graph BFS / Shortest Path explores unweighted graphs in nondecreasing distance. First discovery gives the minimum edge count; general weighted edges need a different approach.",
    "exerciseId": "dsa-unweighted-shortest-hops"
  },
  {
    "id": "trigger-fewest-hops-3",
    "type": "single",
    "prompt": "You need the minimum number of moves in a state graph where every move costs one. Which algorithm uses a queue and visited states to find that distance?",
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
    "explanation": "Graph BFS / Shortest Path explores unweighted graphs in nondecreasing distance. First discovery gives the minimum edge count; general weighted edges need a different approach.",
    "exerciseId": "dsa-unweighted-shortest-hops"
  },
  {
    "id": "trigger-clockwise-unwind-1",
    "type": "single",
    "prompt": "A matrix must be read clockwise along its outer perimeter, then along each remaining inner perimeter. Which pattern fits?",
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
    "explanation": "Clockwise Unwind / Boundary Pointers maintains four bounds around unvisited cells. Checking the remaining bounds prevents duplicates when only one row or column remains.",
    "exerciseId": "dsa-clockwise-unwind"
  },
  {
    "id": "trigger-clockwise-unwind-2",
    "type": "single",
    "prompt": "You track top, bottom, left, and right limits, shrinking them after consuming rows or columns. Which matrix traversal pattern is this?",
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
    "explanation": "Clockwise Unwind / Boundary Pointers maintains four bounds around unvisited cells. Checking the remaining bounds prevents duplicates when only one row or column remains.",
    "exerciseId": "dsa-clockwise-unwind"
  },
  {
    "id": "trigger-clockwise-unwind-3",
    "type": "single",
    "prompt": "You peel a rectangular matrix inward one boundary at a time while guarding against rereading a final single row or column. Which pattern fits?",
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
    "explanation": "Clockwise Unwind / Boundary Pointers maintains four bounds around unvisited cells. Checking the remaining bounds prevents duplicates when only one row or column remains.",
    "exerciseId": "dsa-clockwise-unwind"
  },
  {
    "id": "trigger-reach-final-1",
    "type": "single",
    "prompt": "At each reachable position, you extend a farthest-reachable boundary using that position’s maximum forward step. Which specific reachability pattern fits?",
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
    "explanation": "Reach Final Index / Greedy keeps the farthest reachable index. An index beyond that boundary cannot be reached, while any reachable index can extend the boundary.",
    "exerciseId": "dsa-reach-final-index"
  },
  {
    "id": "trigger-reach-final-2",
    "type": "single",
    "prompt": "You only need to know whether the last index can be reached when each nonnegative entry is a maximum jump length. Tracking best reach is enough. Which pattern fits?",
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
    "explanation": "Reach Final Index / Greedy keeps the farthest reachable index. An index beyond that boundary cannot be reached, while any reachable index can extend the boundary.",
    "exerciseId": "dsa-reach-final-index"
  },
  {
    "id": "trigger-reach-final-3",
    "type": "single",
    "prompt": "During a forward scan of maximum jump lengths, you fail when the current index exceeds every earlier reachable boundary. Which specific pattern is this?",
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
    "explanation": "Reach Final Index / Greedy keeps the farthest reachable index. An index beyond that boundary cannot be reached, while any reachable index can extend the boundary.",
    "exerciseId": "dsa-reach-final-index"
  },
  {
    "id": "trigger-dominant-vote-1",
    "type": "single",
    "prompt": "One value is guaranteed to occupy more than half the array. Which constant-space voting technique finds it by canceling different values?",
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
    "explanation": "Boyer-Moore cancels votes for different values so a guaranteed strict majority survives. Without that guarantee, a second pass is needed to verify the candidate.",
    "exerciseId": "dsa-dominant-vote"
  },
  {
    "id": "trigger-dominant-vote-2",
    "type": "single",
    "prompt": "You maintain a candidate and count, incrementing for matches and decrementing for other values, replacing the candidate when the count is zero. Which majority algorithm is this?",
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
    "explanation": "Boyer-Moore cancels votes for different values so a guaranteed strict majority survives. Without that guarantee, a second pass is needed to verify the candidate.",
    "exerciseId": "dsa-dominant-vote"
  },
  {
    "id": "trigger-dominant-vote-3",
    "type": "single",
    "prompt": "A strict majority is guaranteed, and you need its value in one scan without a frequency table. Which candidate-cancellation algorithm fits?",
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
    "explanation": "Boyer-Moore cancels votes for different values so a guaranteed strict majority survives. Without that guarantee, a second pass is needed to verify the candidate.",
    "exerciseId": "dsa-dominant-vote"
  },
  {
    "id": "trigger-best-contiguous-1",
    "type": "single",
    "prompt": "For a nonempty signed array, the best sum ending here either extends the previous segment or starts at the current value. Which algorithm finds the best contiguous sum?",
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
    "explanation": "Kadane’s Algorithm tracks the best nonempty subarray ending at each position and the best overall. Initializing from the first value handles all-negative inputs.",
    "exerciseId": "dsa-best-contiguous-gain"
  },
  {
    "id": "trigger-best-contiguous-2",
    "type": "single",
    "prompt": "You want the highest-sum consecutive stretch and restart the running segment whenever carrying the previous total would hurt. Which algorithm fits?",
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
    "explanation": "Kadane’s Algorithm tracks the best nonempty subarray ending at each position and the best overall. Initializing from the first value handles all-negative inputs.",
    "exerciseId": "dsa-best-contiguous-gain"
  },
  {
    "id": "trigger-best-contiguous-3",
    "type": "single",
    "prompt": "You update endingHere = max(value, endingHere + value), then update a global maximum. Which algorithm does this implement?",
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
    "explanation": "Kadane’s Algorithm tracks the best nonempty subarray ending at each position and the best overall. Initializing from the first value handles all-negative inputs.",
    "exerciseId": "dsa-best-contiguous-gain"
  },
  {
    "id": "trigger-task-order-1",
    "type": "single",
    "prompt": "Build steps form a directed dependency graph. You need an order that places every prerequisite before its dependent. Which pattern fits?",
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
    "explanation": "Topological Sort orders a directed acyclic graph. Kahn’s algorithm processes zero-indegree nodes; processing fewer than all nodes indicates a dependency cycle.",
    "exerciseId": "dsa-task-dependency-order"
  },
  {
    "id": "trigger-task-order-2",
    "type": "single",
    "prompt": "You repeatedly remove tasks with zero remaining prerequisites and reduce the prerequisite counts of their dependents. Which ordering algorithm is this?",
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
    "explanation": "Topological Sort orders a directed acyclic graph. Kahn’s algorithm processes zero-indegree nodes; processing fewer than all nodes indicates a dependency cycle.",
    "exerciseId": "dsa-task-dependency-order"
  },
  {
    "id": "trigger-task-order-3",
    "type": "single",
    "prompt": "You try to schedule every task by prerequisites, but some remain and none has zero unmet prerequisites. Which pattern both orders acyclic dependencies and detects this cycle?",
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
    "explanation": "Topological Sort orders a directed acyclic graph. Kahn’s algorithm processes zero-indegree nodes; processing fewer than all nodes indicates a dependency cycle.",
    "exerciseId": "dsa-task-dependency-order"
  },
  {
    "id": "trigger-phrase-catalog-1",
    "type": "single",
    "prompt": "A string has no spaces. You need to determine whether dictionary entries can cover it completely in order, allowing words to be reused. Which specific DP pattern fits?",
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
    "explanation": "Phrase Assembly / String DP tracks segmentable prefixes. A position is reachable if some earlier reachable position leaves a dictionary word between them; a greedy longest-word choice can fail.",
    "exerciseId": "dsa-phrase-from-catalog"
  },
  {
    "id": "trigger-phrase-catalog-2",
    "type": "single",
    "prompt": "You mark a string position reachable when an earlier reachable position is followed by a substring in the dictionary. Which specific pattern is this?",
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
    "explanation": "Phrase Assembly / String DP tracks segmentable prefixes. A position is reachable if some earlier reachable position leaves a dictionary word between them; a greedy longest-word choice can fail.",
    "exerciseId": "dsa-phrase-from-catalog"
  },
  {
    "id": "trigger-phrase-catalog-3",
    "type": "single",
    "prompt": "Choosing the longest matching word first can block a later split. You need to remember every prefix that can be fully segmented into dictionary words. Which pattern fits?",
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
    "explanation": "Phrase Assembly / String DP tracks segmentable prefixes. A position is reachable if some earlier reachable position leaves a dictionary word between them; a greedy longest-word choice can fail.",
    "exerciseId": "dsa-phrase-from-catalog"
  },
  {
    "id": "trigger-flip-message-1",
    "type": "single",
    "exerciseId": "dsa-flip-message",
    "prompt": "You need to emit the characters of a string from last to first. Which operation fits?",
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
    "explanation": "String Reversal changes character order from last to first. JavaScript strings are immutable, so the exercise returns a new string."
  },
  {
    "id": "trigger-flip-message-2",
    "type": "single",
    "exerciseId": "dsa-flip-message",
    "prompt": "A text transformation keeps every character but reverses their sequence. Which operation is needed?",
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
    "explanation": "String Reversal changes character order from last to first. JavaScript strings are immutable, so the exercise returns a new string."
  },
  {
    "id": "trigger-flip-message-3",
    "type": "single",
    "exerciseId": "dsa-flip-message",
    "prompt": "You scan a string backward and append each character to a new result. Which operation does this implement?",
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
    "explanation": "String Reversal changes character order from last to first. JavaScript strings are immutable, so the exercise returns a new string."
  },
  {
    "id": "trigger-label-count-1",
    "type": "single",
    "exerciseId": "dsa-label-count",
    "prompt": "You must classify integers by whether division leaves a zero remainder. Which technique fits?",
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
    "explanation": "Modulo tests divisibility: x % d === 0. Check the combined 3-and-5 case before either individual case."
  },
  {
    "id": "trigger-label-count-2",
    "type": "single",
    "exerciseId": "dsa-label-count",
    "prompt": "A sequence substitutes labels for multiples of 3 and 5, checking the combined case first. Which technique supplies the test?",
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
    "explanation": "Modulo tests divisibility: x % d === 0. Check the combined 3-and-5 case before either individual case."
  },
  {
    "id": "trigger-label-count-3",
    "type": "single",
    "exerciseId": "dsa-label-count",
    "prompt": "You need to detect every third or fifth number without storing a lookup table. Which arithmetic technique fits?",
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
    "explanation": "Modulo tests divisibility: x % d === 0. Check the combined 3-and-5 case before either individual case."
  },
  {
    "id": "trigger-letter-inventory-1",
    "type": "single",
    "exerciseId": "dsa-same-letter-inventory",
    "prompt": "Two strings contain the same distinct letters, but you also need their multiplicities to match. Which structure stores those counts?",
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
    "explanation": "A Map associates each character with its frequency. A Set only tracks membership and cannot distinguish different counts of the same letters."
  },
  {
    "id": "trigger-letter-inventory-2",
    "type": "single",
    "exerciseId": "dsa-same-letter-inventory",
    "prompt": "You increment a count for each character of one string and decrement it for each character of another. Which structure associates characters with counts?",
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
    "explanation": "A Map associates each character with its frequency. A Set only tracks membership and cannot distinguish different counts of the same letters."
  },
  {
    "id": "trigger-letter-inventory-3",
    "type": "single",
    "exerciseId": "dsa-same-letter-inventory",
    "prompt": "You need to distinguish aab from abb even though both use only a and b. Which structure captures the required frequency information?",
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
    "explanation": "A Map associates each character with its frequency. A Set only tracks membership and cannot distinguish different counts of the same letters."
  },
  {
    "id": "trigger-mirrored-phrase-1",
    "type": "single",
    "exerciseId": "dsa-mirrored-phrase",
    "prompt": "You compare the leftmost and rightmost meaningful characters, skipping punctuation and moving inward. Which technique fits?",
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
    "explanation": "Two Pointers compares mirrored characters while advancing past punctuation. Normalize case during comparison rather than allocating a reversed string."
  },
  {
    "id": "trigger-mirrored-phrase-2",
    "type": "single",
    "exerciseId": "dsa-mirrored-phrase",
    "prompt": "A case-insensitive palindrome check must avoid allocating a reversed copy. Which technique compares mirrored positions?",
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
    "explanation": "Two Pointers compares mirrored characters while advancing past punctuation. Normalize case during comparison rather than allocating a reversed string."
  },
  {
    "id": "trigger-mirrored-phrase-3",
    "type": "single",
    "exerciseId": "dsa-mirrored-phrase",
    "prompt": "You need two indices that approach each other while skipping characters that do not count toward the palindrome. Which pattern fits?",
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
    "explanation": "Two Pointers compares mirrored characters while advancing past punctuation. Normalize case during comparison rather than allocating a reversed string."
  },
  {
    "id": "trigger-sequence-term-1",
    "type": "single",
    "exerciseId": "dsa-sequence-term",
    "prompt": "Each sequence value is the sum of the previous two, and naive recursion repeatedly solves identical states. Which general pattern avoids that repetition?",
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
    "explanation": "Dynamic Programming / 1D DP reuses smaller Fibonacci answers. Only the last two states are needed, allowing O(1) auxiliary space."
  },
  {
    "id": "trigger-sequence-term-2",
    "type": "single",
    "exerciseId": "dsa-sequence-term",
    "prompt": "You build a sequence from base cases using two rolling previous answers. Which general pattern fits this recurrence?",
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
    "explanation": "Dynamic Programming / 1D DP reuses smaller Fibonacci answers. Only the last two states are needed, allowing O(1) auxiliary space."
  },
  {
    "id": "trigger-sequence-term-3",
    "type": "single",
    "exerciseId": "dsa-sequence-term",
    "prompt": "To compute the nth Fibonacci value, you retain solved smaller states instead of expanding the same recursive calls again. Which approach fits?",
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
    "explanation": "Dynamic Programming / 1D DP reuses smaller Fibonacci answers. Only the last two states are needed, allowing O(1) auxiliary space."
  },
  {
    "id": "trigger-digit-mirror-1",
    "type": "single",
    "exerciseId": "dsa-digit-mirror",
    "prompt": "You repeatedly take x % 10 and shorten x with integer division, building the reversed lower half of its digits. Which technique is this?",
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
    "explanation": "Digit Reversal / Half Reversal extracts digits with modulo and division. Reverse half the number; ignore the middle digit for odd lengths. Negative values are not palindromes."
  },
  {
    "id": "trigger-digit-mirror-2",
    "type": "single",
    "exerciseId": "dsa-digit-mirror",
    "prompt": "A numeric palindrome check compares an unreversed half with a reversed half, dropping the middle digit for odd lengths. Which technique fits?",
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
    "explanation": "Digit Reversal / Half Reversal extracts digits with modulo and division. Reverse half the number; ignore the middle digit for odd lengths. Negative values are not palindromes."
  },
  {
    "id": "trigger-digit-mirror-3",
    "type": "single",
    "exerciseId": "dsa-digit-mirror",
    "prompt": "You need a constant-space numeric palindrome check using arithmetic rather than string indices. Which technique reverses just enough digits to compare halves?",
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
    "explanation": "Digit Reversal / Half Reversal extracts digits with modulo and division. Reverse half the number; ignore the middle digit for odd lengths. Negative values are not palindromes."
  },
  {
    "id": "trigger-absent-slot-1",
    "type": "single",
    "exerciseId": "dsa-absent-slot",
    "prompt": "Exactly one value is missing from a complete consecutive integer range. You compare the range’s expected total with its actual total. Which technique fits?",
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
    "explanation": "Arithmetic Sum / Absent Slot uses expected minus actual total. The distinct-values and exactly-one-missing assumptions matter. XOR is another valid approach, but this question specifies sums."
  },
  {
    "id": "trigger-absent-slot-2",
    "type": "single",
    "exerciseId": "dsa-absent-slot",
    "prompt": "The input has distinct values from 0 through n, and a closed-form sum lets you recover the omitted value in one pass. Which technique is this?",
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
    "explanation": "Arithmetic Sum / Absent Slot uses expected minus actual total. The distinct-values and exactly-one-missing assumptions matter. XOR is another valid approach, but this question specifies sums."
  },
  {
    "id": "trigger-absent-slot-3",
    "type": "single",
    "exerciseId": "dsa-absent-slot",
    "prompt": "You use Gauss’s formula for a complete range and subtract the sum of the values present. Which missing-value technique fits?",
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
    "explanation": "Arithmetic Sum / Absent Slot uses expected minus actual total. The distinct-values and exactly-one-missing assumptions matter. XOR is another valid approach, but this question specifies sums."
  },
  {
    "id": "trigger-slide-zeros-1",
    "type": "single",
    "exerciseId": "dsa-slide-zeros-back",
    "prompt": "You scan with a read index and copy each non-zero value into the next write slot of the same array, then overwrite the remaining slots with zeroes. Which technique fits?",
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
    "explanation": "Two Pointers uses read and write indices in the original array. Copy non-zero values forward, then fill the leftover slots with zeroes. Do not push extra elements or reassign nums to a new array."
  },
  {
    "id": "trigger-slide-zeros-2",
    "type": "single",
    "exerciseId": "dsa-slide-zeros-back",
    "prompt": "You must compact non-zero values stably without a second array. A write position never advances ahead of the scan position. Which pattern fits?",
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
    "explanation": "Two Pointers uses read and write indices in the original array. Copy non-zero values forward, then fill the leftover slots with zeroes. Do not push extra elements or reassign nums to a new array."
  },
  {
    "id": "trigger-slide-zeros-3",
    "type": "single",
    "exerciseId": "dsa-slide-zeros-back",
    "prompt": "Returning a new array is not enough: the original array must change, keep its length, and preserve non-zero order. Which read/write-index pattern fits?",
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
    "explanation": "Two Pointers uses read and write indices in the original array. Copy non-zero values forward, then fill the leftover slots with zeroes. Do not push extra elements or reassign nums to a new array."
  },
  {
    "id": "trigger-neighbor-products-1",
    "type": "single",
    "exerciseId": "dsa-neighbor-product-map",
    "prompt": "Each output needs the product before its index multiplied by the product after it. Which technique avoids dividing by the current value?",
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
    "explanation": "Prefix / Suffix Products combines the product on either side of each index. It handles zero values without division and uses the output array plus running products."
  },
  {
    "id": "trigger-neighbor-products-2",
    "type": "single",
    "exerciseId": "dsa-neighbor-product-map",
    "prompt": "Zeros make dividing a grand total unsuitable. You accumulate products from both ends to compute the product excluding each index. Which technique fits?",
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
    "explanation": "Prefix / Suffix Products combines the product on either side of each index. It handles zero values without division and uses the output array plus running products."
  },
  {
    "id": "trigger-neighbor-products-3",
    "type": "single",
    "exerciseId": "dsa-neighbor-product-map",
    "prompt": "A forward pass stores products to each index’s left; a backward pass multiplies in products to its right. Which technique is this?",
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
    "explanation": "Prefix / Suffix Products combines the product on either side of each index. It handles zero values without division and uses the output array plus running products."
  },
  {
    "id": "trigger-unique-window-1",
    "type": "single",
    "exerciseId": "dsa-longest-unique-window",
    "prompt": "You grow a substring until its uniqueness rule fails, then move the left boundary past the conflicting occurrence. Which range-management pattern fits?",
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
    "explanation": "Sliding Window maintains a contiguous substring. A Map can track last-seen indices, but the overall pattern is expanding and shrinking the window without moving its left boundary backward."
  },
  {
    "id": "trigger-unique-window-2",
    "type": "single",
    "exerciseId": "dsa-longest-unique-window",
    "prompt": "A last-seen-character map helps you adjust a contiguous substring’s left edge while advancing its right edge. What is the overall range-management pattern?",
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
    "explanation": "Sliding Window maintains a contiguous substring. A Map can track last-seen indices, but the overall pattern is expanding and shrinking the window without moving its left boundary backward."
  },
  {
    "id": "trigger-unique-window-3",
    "type": "single",
    "exerciseId": "dsa-longest-unique-window",
    "prompt": "You need the longest valid contiguous character range and update its state as characters enter and leave. Which pattern fits?",
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
    "explanation": "Sliding Window maintains a contiguous substring. A Map can track last-seen indices, but the overall pattern is expanding and shrinking the window without moving its left boundary backward."
  },
  {
    "id": "trigger-basin-capacity-1",
    "type": "single",
    "exerciseId": "dsa-basin-capacity",
    "prompt": "You scan inward from both ends of an elevation array and use the shorter boundary’s running maximum to count trapped water. Which technique fits?",
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
    "explanation": "Two Pointers maintains left and right boundaries with running maxima. The opposite boundary supplies enough containment to safely process the shorter side. Other approaches exist; these questions specify the inward scan."
  },
  {
    "id": "trigger-basin-capacity-2",
    "type": "single",
    "exerciseId": "dsa-basin-capacity",
    "prompt": "A water-trapping solution needs O(1) auxiliary space and keeps leftMax and rightMax while two indices converge. Which technique is this?",
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
    "explanation": "Two Pointers maintains left and right boundaries with running maxima. The opposite boundary supplies enough containment to safely process the shorter side. Other approaches exist; these questions specify the inward scan."
  },
  {
    "id": "trigger-basin-capacity-3",
    "type": "single",
    "exerciseId": "dsa-basin-capacity",
    "prompt": "For unit-width bars, you advance the side whose current boundary is shorter, adding its running maximum minus its height. Which technique fits?",
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
    "explanation": "Two Pointers maintains left and right boundaries with running maxima. The opposite boundary supplies enough containment to safely process the shorter side. Other approaches exist; these questions specify the inward scan."
  },
  {
    "id": "trigger-floor-stack-1",
    "type": "single",
    "exerciseId": "dsa-floor-tracking-stack",
    "prompt": "After popping the smallest stack value, you need to recover the previous minimum immediately. Which structure remembers a minimum at every depth?",
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
    "explanation": "Floor Stack / Running-Minimum Stack stores a running minimum for each depth. Popping restores the preceding minimum, including duplicate minima. A monotonic stack typically discards candidates and serves a different purpose."
  },
  {
    "id": "trigger-floor-stack-2",
    "type": "single",
    "exerciseId": "dsa-floor-tracking-stack",
    "prompt": "You must preserve all stack entries, including duplicate minima, while retrieving the minimum in constant time. Which specialized stack approach fits?",
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
    "explanation": "Floor Stack / Running-Minimum Stack stores a running minimum for each depth. Popping restores the preceding minimum, including duplicate minima. A monotonic stack typically discards candidates and serves a different purpose."
  },
  {
    "id": "trigger-floor-stack-3",
    "type": "single",
    "exerciseId": "dsa-floor-tracking-stack",
    "prompt": "Each push stores both a value and the minimum so far, and each pop removes both. Which design pattern is this?",
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
    "explanation": "Floor Stack / Running-Minimum Stack stores a running minimum for each depth. Popping restores the preceding minimum, including duplicate minima. A monotonic stack typically discards candidates and serves a different purpose."
  },
  {
    "id": "trigger-dual-stack-fifo-1",
    "type": "single",
    "exerciseId": "dsa-fifo-from-two-stacks",
    "prompt": "You need oldest-first behavior using only last-in, first-out containers. Which design reverses incoming items into a second stack?",
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
    "explanation": "FIFO From Two Stacks reverses incoming values into an output stack only when that stack is empty. This preserves FIFO order and gives amortized O(1) operations."
  },
  {
    "id": "trigger-dual-stack-fifo-2",
    "type": "single",
    "exerciseId": "dsa-fifo-from-two-stacks",
    "prompt": "New queue items go into an input stack, while dequeue reads an output stack refilled only when empty. Which technique fits?",
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
    "explanation": "FIFO From Two Stacks reverses incoming values into an output stack only when that stack is empty. This preserves FIFO order and gives amortized O(1) operations."
  },
  {
    "id": "trigger-dual-stack-fifo-3",
    "type": "single",
    "exerciseId": "dsa-fifo-from-two-stacks",
    "prompt": "Each queued value transfers at most once between two stacks, giving amortized constant-time queue operations. Which design is this?",
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
    "explanation": "FIFO From Two Stacks reverses incoming values into an output stack only when that stack is empty. This preserves FIFO order and gives amortized O(1) operations."
  },
  {
    "id": "trigger-simple-key-store-1",
    "type": "single",
    "exerciseId": "dsa-simple-key-store",
    "prompt": "You need key-based insertion, replacement, lookup, and deletion of associated values. Which abstract structure fits?",
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
    "explanation": "Map represents key-to-value associations. The Simple Key Store exercise implements put/get/remove semantics; a Set has no associated values. Follow the exercise’s specified missing-key return value."
  },
  {
    "id": "trigger-simple-key-store-2",
    "type": "single",
    "exerciseId": "dsa-simple-key-store",
    "prompt": "An API must distinguish a missing key from a stored key whose value is zero. Which structure stores key-to-value associations?",
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
    "explanation": "Map represents key-to-value associations. The Simple Key Store exercise implements put/get/remove semantics; a Set has no associated values. Follow the exercise’s specified missing-key return value."
  },
  {
    "id": "trigger-simple-key-store-3",
    "type": "single",
    "exerciseId": "dsa-simple-key-store",
    "prompt": "Calling put again with the same key replaces its associated value rather than adding a duplicate entry. Which abstract structure has this behavior?",
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
    "explanation": "Map represents key-to-value associations. The Simple Key Store exercise implements put/get/remove semantics; a Set has no associated values. Follow the exercise’s specified missing-key return value."
  },
  {
    "id": "trigger-bounded-recent-1",
    "type": "single",
    "exerciseId": "dsa-bounded-recent-cache",
    "prompt": "Cache eviction must follow last access time rather than insertion age, and reading a key refreshes its position. Which pattern fits?",
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
    "explanation": "Bounded Recent Cache / Recency Tracking updates recency on successful get and put. An insertion-ordered Map can delete and reinsert a key to refresh it; a Map plus a doubly linked list is another design."
  },
  {
    "id": "trigger-bounded-recent-2",
    "type": "single",
    "exerciseId": "dsa-bounded-recent-cache",
    "prompt": "A key-value cache needs fast lookup plus an order that changes whenever a key is used, evicting the oldest unused entry at capacity. Which design fits?",
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
    "explanation": "Bounded Recent Cache / Recency Tracking updates recency on successful get and put. An insertion-ordered Map can delete and reinsert a key to refresh it; a Map plus a doubly linked list is another design."
  },
  {
    "id": "trigger-bounded-recent-3",
    "type": "single",
    "exerciseId": "dsa-bounded-recent-cache",
    "prompt": "Repeated get operations protect an entry from eviction even if it was inserted first. Which cache policy tracks that behavior?",
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
    "explanation": "Bounded Recent Cache / Recency Tracking updates recency on successful get and put. An insertion-ordered Map can delete and reinsert a key to refresh it; a Map plus a doubly linked list is another design."
  }
];
