// JSON-friendly examples become real node structures before calling user code.
export function prepareInput(input, inputKind) {
  const args = structuredClone(Array.isArray(input) ? input : [input]);
  if (inputKind === "linked-list" || inputKind === "linked-list-cycle") {
    const nodes = args[0].map((val) => ({ val, next: null }));
    for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i + 1];
    if (inputKind === "linked-list-cycle" && nodes.length && args[1] >= 0) {
      nodes.at(-1).next = nodes[args[1]];
    }
    return { args: [nodes[0] ?? null], nodes };
  }
  if (inputKind === "binary-tree") {
    const values = args[0];
    if (!values.length || values[0] === null) return { args: [null] };
    const root = { val: values[0], left: null, right: null };
    const queue = [root];
    let index = 1;
    for (let head = 0; head < queue.length && index < values.length; head++) {
      for (const side of ["left", "right"]) {
        if (index >= values.length) break;
        const value = values[index++];
        if (value !== null) {
          const child = { val: value, left: null, right: null };
          queue[head][side] = child;
          queue.push(child);
        }
      }
    }
    return { args: [root] };
  }
  return { args };
}

export function inspectReversedList(head, nodes, values) {
  // Check identity and values, not just a copied array or a newly allocated list.
  const output = [];
  let node = head;
  for (let i = nodes.length - 1; i >= 0; i--) {
    if (node !== nodes[i] || node.val !== values[i]) {
      return { pass: false, output: "Return the original nodes in reverse order without changing their values." };
    }
    output.push(node.val);
    node = node.next;
  }
  return {
    pass: node === null,
    output: node === null ? output : "The reversed list must end in null (check for a cycle).",
  };
}
