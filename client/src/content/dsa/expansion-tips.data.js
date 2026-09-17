// Progressive hints and runnable reference solutions for expansion.data.js.
export const expansionTips = {
  "dsa-queue-processing": {
    "steps": [
      "Keep an array for pending values and another for results.",
      "enqueue appends with push; dequeue reads the oldest pending value.",
      "Check length before using shift or reading index 0; empty operations return null.",
      "Append the specified result after every operation, including null for enqueue.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function processQueue(operations) {\n  const queue = [], results = [];\n  for (const [op, value] of operations) {\n    if (op === \"enqueue\") { queue.push(value); results.push(null); }\n    else if (op === \"dequeue\") results.push(queue.length ? queue.shift() : null);\n    else if (op === \"peek\") results.push(queue.length ? queue[0] : null);\n    else results.push(queue.length === 0);\n  }\n  return results;\n}\n",
    "time": "O(m²) worst case with array shift; a front index gives O(m) total for m operations",
    "space": "O(m) for the queue and results"
  },
  "dsa-min-subarray-length": {
    "steps": [
      "Start left = 0, sum = 0, and best = Infinity.",
      "Move right across the array, adding each new value to sum.",
      "While sum is at least target, record the window length, subtract nums[left], and move left.",
      "Return 0 if best was never updated. Positive values make shrinking safe.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function minSubArrayLen(target, nums) {\n  let left = 0, sum = 0, best = Infinity;\n  for (let right = 0; right < nums.length; right++) {\n    sum += nums[right];\n    while (sum >= target) {\n      best = Math.min(best, right - left + 1);\n      sum -= nums[left++];\n    }\n  }\n  return best === Infinity ? 0 : best;\n}\n",
    "time": "O(n) — each endpoint advances at most n times",
    "space": "O(1) auxiliary space"
  },
  "dsa-range-sums": {
    "steps": [
      "Allocate prefix with nums.length + 1 entries and prefix[0] = 0.",
      "Set prefix[i + 1] = prefix[i] + nums[i].",
      "For inclusive [left, right], subtract prefix[left] from prefix[right + 1].",
      "Map queries to their sums without changing their order.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function rangeSums(nums, queries) {\n  const prefix = [0];\n  for (const value of nums) prefix.push(prefix[prefix.length - 1] + value);\n  return queries.map(([left, right]) => prefix[right + 1] - prefix[left]);\n}\n",
    "time": "O(n + q) — preprocessing plus q constant-time queries",
    "space": "O(n + q) including returned query results"
  },
  "dsa-merge-intervals": {
    "steps": [
      "Sort intervals by start, not by end.",
      "Keep a result array with the currently active interval at its end.",
      "If the next start is <= the active end, extend the end with Math.max.",
      "Otherwise append a new interval. Copy pairs if you want to leave the input unchanged.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function mergeIntervals(intervals) {\n  const sorted = intervals.map(pair => [...pair]).sort((a, b) => a[0] - b[0]);\n  const result = [];\n  for (const [start, end] of sorted) {\n    const last = result[result.length - 1];\n    if (last && start <= last[1]) last[1] = Math.max(last[1], end);\n    else result.push([start, end]);\n  }\n  return result;\n}\n",
    "time": "O(n log n) — sorting dominates the sweep",
    "space": "O(n) — copied intervals and output"
  },
  "dsa-linked-list-cycle": {
    "steps": [
      "Use slow and fast references, both initially head.",
      "Continue only while fast and fast.next exist.",
      "Move slow once and fast twice, then compare the references themselves.",
      "Meeting means a cycle; reaching null means there is no cycle. Equal values alone do not imply a cycle.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\n",
    "time": "O(n) — linear traversal before termination or meeting",
    "space": "O(1) — two references"
  },
  "dsa-reverse-linked-list": {
    "steps": [
      "Start previous = null and current = head.",
      "Save current.next before you overwrite it.",
      "Set current.next = previous, then advance previous and current.",
      "When current is null, previous is the new head. Do not modify val or create replacement nodes.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function reverseList(head) {\n  let previous = null, current = head;\n  while (current) {\n    const next = current.next;\n    current.next = previous;\n    previous = current;\n    current = next;\n  }\n  return previous;\n}\n",
    "time": "O(n) — one pass through nodes",
    "space": "O(1) — three references"
  },
  "dsa-tree-preorder": {
    "steps": [
      "Use a result array and a recursive visit(node) helper.",
      "Return immediately for null.",
      "Append node.val before visiting node.left and node.right.",
      "Return the accumulated array after visiting root.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function preorderTraversal(root) {\n  const result = [];\n  function visit(node) {\n    if (!node) return;\n    result.push(node.val);\n    visit(node.left);\n    visit(node.right);\n  }\n  visit(root);\n  return result;\n}\n",
    "time": "O(n) — each node visited once",
    "space": "O(h) recursion plus O(n) output, where h is tree height"
  },
  "dsa-tree-level-order": {
    "steps": [
      "Start a queue containing root; handle null root first.",
      "At the start of a level, capture the number of currently queued nodes.",
      "Process just that many nodes into one group, enqueueing each non-null left and right child.",
      "Append the group and repeat. An array with a front index avoids repeated shift costs.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function levelOrder(root) {\n  if (!root) return [];\n  const queue = [root], result = [];\n  let head = 0;\n  while (head < queue.length) {\n    const end = queue.length, level = [];\n    while (head < end) {\n      const node = queue[head++];\n      level.push(node.val);\n      if (node.left) queue.push(node.left);\n      if (node.right) queue.push(node.right);\n    }\n    result.push(level);\n  }\n  return result;\n}\n",
    "time": "O(n) — each node queued and visited once",
    "space": "O(n) — queue retains processed references, plus output"
  },
  "dsa-graph-dfs": {
    "steps": [
      "Use a visited Set and an output array.",
      "On first reaching a node, mark it and append its ID.",
      "Recursively visit each neighbor in the listed order, skipping visited nodes.",
      "Start only from start. If using a stack, preserve the recursive discovery order carefully.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function dfsTraversal(graph, start) {\n  if (!graph.length) return [];\n  const visited = new Set(), result = [];\n  function visit(node) {\n    if (visited.has(node)) return;\n    visited.add(node);\n    result.push(node);\n    for (const neighbor of graph[node]) visit(neighbor);\n  }\n  visit(start);\n  return result;\n}\n",
    "time": "O(V + E) over the reachable portion of the graph",
    "space": "O(V) — visited set, recursion stack, and output"
  },
  "dsa-permutations": {
    "steps": [
      "Maintain a path, a used array, and a result array.",
      "For each unused index, mark it used and append its value to path.",
      "Recurse; afterward pop the value and unmark the index.",
      "When path has nums.length values, append a copy of path, not the same mutable array.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function permute(nums) {\n  const result = [], path = [], used = Array(nums.length).fill(false);\n  function search() {\n    if (path.length === nums.length) { result.push([...path]); return; }\n    for (let i = 0; i < nums.length; i++) {\n      if (used[i]) continue;\n      used[i] = true;\n      path.push(nums[i]);\n      search();\n      path.pop();\n      used[i] = false;\n    }\n  }\n  search();\n  return result;\n}\n",
    "time": "O(n × n!) — copying every permutation",
    "space": "O(n) auxiliary space, plus O(n × n!) output"
  },
  "dsa-top-k-largest": {
    "steps": [
      "Use a min-heap, whose root is the smallest retained candidate.",
      "Until the heap reaches k values, append and bubble each new value upward.",
      "Once full, ignore values no larger than the root. Replace the root with a larger value and sift it down.",
      "Return the heap values. Keep duplicates and handle k = 0 before accessing the root.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function topKLargest(nums, k) {\n  if (k === 0) return [];\n  const heap = [];\n  function swap(a, b) { [heap[a], heap[b]] = [heap[b], heap[a]]; }\n  for (const value of nums) {\n    if (heap.length < k) {\n      heap.push(value);\n      let i = heap.length - 1;\n      while (i > 0) {\n        const parent = Math.floor((i - 1) / 2);\n        if (heap[parent] <= heap[i]) break;\n        swap(parent, i);\n        i = parent;\n      }\n    } else if (value > heap[0]) {\n      heap[0] = value;\n      let i = 0;\n      while (2 * i + 1 < heap.length) {\n        let child = 2 * i + 1;\n        if (child + 1 < heap.length && heap[child + 1] < heap[child]) child++;\n        if (heap[i] <= heap[child]) break;\n        swap(i, child);\n        i = child;\n      }\n    }\n  }\n  return heap;\n}\n",
    "time": "O(n log(k + 1)) for k > 0; O(1) for k = 0",
    "space": "O(k) — the retained heap is the output"
  },
  "dsa-daily-temperatures": {
    "steps": [
      "Initialize answers with zeros and keep a stack of unresolved day indices.",
      "For each day, pop while its temperature is strictly greater than the temperature at the top index.",
      "Each popped day is resolved by the current day: answer[previous] = current - previous.",
      "Push the current index. Unresolved days keep their zero answers.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function dailyTemperatures(temperatures) {\n  const answer = Array(temperatures.length).fill(0), stack = [];\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const previous = stack.pop();\n      answer[previous] = i - previous;\n    }\n    stack.push(i);\n  }\n  return answer;\n}\n",
    "time": "O(n) — each index is pushed and popped at most once",
    "space": "O(n) — stack and output"
  },
  "dsa-union-find": {
    "steps": [
      "Initialize parent[i] = i, size[i] = 1, and a group counter equal to n.",
      "find follows parents to a root; compress the path so later queries are faster.",
      "union finds both roots. If equal, return false without changing the counter.",
      "Attach the smaller tree to the larger, update its size, and decrement the counter.",
      "connected compares roots, and count returns the counter.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "class DisjointSet {\n  constructor(n) {\n    this.parent = Array.from({ length: n }, (_, i) => i);\n    this.size = Array(n).fill(1);\n    this.groups = n;\n  }\n  find(x) {\n    while (x !== this.parent[x]) {\n      this.parent[x] = this.parent[this.parent[x]];\n      x = this.parent[x];\n    }\n    return x;\n  }\n  union(a, b) {\n    let rootA = this.find(a), rootB = this.find(b);\n    if (rootA === rootB) return false;\n    if (this.size[rootA] < this.size[rootB]) [rootA, rootB] = [rootB, rootA];\n    this.parent[rootB] = rootA;\n    this.size[rootA] += this.size[rootB];\n    this.groups--;\n    return true;\n  }\n  connected(a, b) { return this.find(a) === this.find(b); }\n  count() { return this.groups; }\n}\n",
    "time": "O(n) initialization; amortized O(α(n)) per union/connected; O(1) count",
    "space": "O(n) — parent and size arrays"
  },
  "dsa-graph-shortest-path": {
    "steps": [
      "Use BFS with a queue and distance array initialized to -1.",
      "Set the start distance to 0 and enqueue it.",
      "On first discovering a neighbor, assign distance[current] + 1 and enqueue it.",
      "Mark on enqueue to avoid repeated discovery. Return the target distance, which stays -1 if unreachable.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function shortestPath(graph, start, target) {\n  const distance = Array(graph.length).fill(-1), queue = [start];\n  distance[start] = 0;\n  for (let head = 0; head < queue.length; head++) {\n    const node = queue[head];\n    if (node === target) return distance[node];\n    for (const neighbor of graph[node]) {\n      if (distance[neighbor] !== -1) continue;\n      distance[neighbor] = distance[node] + 1;\n      queue.push(neighbor);\n    }\n  }\n  return -1;\n}\n",
    "time": "O(V + E) — each reachable node and edge processed at most once",
    "space": "O(V) — distances and queue"
  },
  "dsa-spiral-matrix": {
    "steps": [
      "Track top, bottom, left, and right bounds.",
      "Read the top row left to right, then increment top; read the right column downward, then decrement right.",
      "If rows remain, read the bottom row backward and decrement bottom.",
      "If columns remain, read the left column upward and increment left. These guards avoid duplicates for a final row or column.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function spiralOrder(matrix) {\n  if (!matrix.length || !matrix[0].length) return [];\n  const result = [];\n  let top = 0, bottom = matrix.length - 1, left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let c = left; c <= right; c++) result.push(matrix[top][c]);\n    top++;\n    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);\n    right--;\n    if (top <= bottom) {\n      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);\n      left++;\n    }\n  }\n  return result;\n}\n",
    "time": "O(rows × columns) — every cell visited once",
    "space": "O(1) auxiliary space plus O(rows × columns) output"
  },
  "dsa-jump-game": {
    "steps": [
      "Keep farthest = 0, the greatest index reachable so far.",
      "If the current index exceeds farthest, you are stuck and must return false.",
      "Otherwise extend farthest with Math.max(farthest, i + nums[i]).",
      "Return true when farthest reaches the final index. A maximum jump is a choice limit, not a required jump.",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function canJump(nums) {\n  let farthest = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > farthest) return false;\n    farthest = Math.max(farthest, i + nums[i]);\n    if (farthest >= nums.length - 1) return true;\n  }\n  return false;\n}\n",
    "time": "O(n) — one forward scan",
    "space": "O(1) — farthest reachable position"
  },
  "dsa-course-order": {
    "steps": [
      "Build edges from prerequisite to course and count incoming edges for each course.",
      "Enqueue every course whose incoming count is zero.",
      "Remove queued courses into the result, reducing incoming counts of their dependents and enqueueing those that reach zero.",
      "If the result contains fewer than numCourses entries, a cycle prevented completion: return [].",
      "Stuck? Reveal the reference solution below."
    ],
    "solution": "function findOrder(numCourses, prerequisites) {\n  const graph = Array.from({ length: numCourses }, () => []);\n  const indegree = Array(numCourses).fill(0);\n  for (const [course, prerequisite] of prerequisites) {\n    graph[prerequisite].push(course);\n    indegree[course]++;\n  }\n  const queue = [], result = [];\n  for (let i = 0; i < numCourses; i++) if (indegree[i] === 0) queue.push(i);\n  for (let head = 0; head < queue.length; head++) {\n    const course = queue[head];\n    result.push(course);\n    for (const next of graph[course]) {\n      indegree[next]--;\n      if (indegree[next] === 0) queue.push(next);\n    }\n  }\n  return result.length === numCourses ? result : [];\n}\n",
    "time": "O(V + E) — courses plus prerequisite pairs",
    "space": "O(V + E) — adjacency list, incoming counts, queue, and output"
  }
};
