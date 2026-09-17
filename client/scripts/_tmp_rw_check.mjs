import { problems } from "../src/content/realworld/problems.js";

function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === "object") {
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

const fns = {
  mergeIntervals(intervals) {
    const s = [...intervals].sort((a, b) => a[0] - b[0]);
    const out = [];
    for (const [a, b] of s) {
      if (out.length && a <= out[out.length - 1][1]) out[out.length - 1][1] = Math.max(out[out.length - 1][1], b);
      else out.push([a, b]);
    }
    return out;
  },
  canAttendMeetings(intervals) {
    const s = [...intervals].sort((a, b) => a[0] - b[0]);
    for (let i = 1; i < s.length; i++) if (s[i][0] < s[i - 1][1]) return false;
    return true;
  },
  parseQueryString(qs) {
    const o = {};
    if (!qs) return o;
    for (const pair of qs.split("&")) { const [k, v] = pair.split("="); o[k] = v; }
    return o;
  },
  parseCsvRow(line) { return line.split(","); },
  paginate(items, size, page) { const start = (page - 1) * size; return items.slice(start, start + size); },
  totalsByCategory(records) { const o = {}; for (const r of records) o[r.category] = (o[r.category] || 0) + r.amount; return o; },
  dedupe(arr) { const seen = new Set(); const out = []; for (const x of arr) if (!seen.has(x)) { seen.add(x); out.push(x); } return out; },
  summarizeRanges(nums) {
    const out = []; let i = 0;
    while (i < nums.length) { let j = i; while (j + 1 < nums.length && nums[j + 1] === nums[j] + 1) j++; out.push(i === j ? `${nums[i]}` : `${nums[i]}->${nums[j]}`); i = j + 1; }
    return out;
  },
  isValidIPv4(s) {
    const parts = s.split("."); if (parts.length !== 4) return false;
    return parts.every((p) => /^\d+$/.test(p) && (p === "0" || p[0] !== "0") && +p >= 0 && +p <= 255);
  },
  backoffDelays(retries, base) { const out = []; for (let i = 0; i < retries; i++) out.push(base * 2 ** i); return out; },
};

const classes = {
  RateLimiter: class { constructor(l){this.l=l;this.c=0;} allow(){ if(this.c<this.l){this.c++;return true;} return false;} reset(){this.c=0;} },
  Cart: class { constructor(){this.items=[];} addItem(n,p,q){this.items.push([n,p,q]);} removeItem(n){this.items=this.items.filter(i=>i[0]!==n);} total(){return this.items.reduce((s,[,p,q])=>s+p*q,0);} },
  Leaderboard: class { constructor(){this.m=new Map();} addScore(id,s){this.m.set(id,(this.m.get(id)||0)+s);} top(K){return [...this.m.values()].sort((a,b)=>b-a).slice(0,K).reduce((a,b)=>a+b,0);} reset(id){this.m.set(id,0);} },
};

let allPass = true;
for (const p of problems) {
  for (let ti = 0; ti < p.tests.length; ti++) {
    const t = p.tests[ti];
    let got;
    try {
      if (p.kind === "design") {
        const Ctor = classes[p.className]; let inst = null; const out = [];
        for (let k = 0; k < t.ops.length; k++) { const a = t.args[k] ?? []; if (k === 0) { inst = new Ctor(...a); out.push(null); } else { const r = inst[t.ops[k]](...a); out.push(r === undefined ? null : r); } }
        got = out;
      } else {
        got = fns[p.fnName](...t.input);
      }
    } catch (e) { got = `ERROR ${e.message}`; }
    const exp = p.kind === "design" ? t.expected : t.expected;
    if (!deepEqual(got, exp)) { allPass = false; console.log(`FAIL ${p.id} test ${ti}: got ${JSON.stringify(got)} expected ${JSON.stringify(exp)}`); }
  }
}
console.log(allPass ? "All real-world problems verified ✅" : "Some FAILED ❌");
