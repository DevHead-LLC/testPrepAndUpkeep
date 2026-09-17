import { problems } from "../src/content/dsa/problems.js";

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

const refs = {
  MinStack: class { constructor(){this.s=[];this.m=[];} push(v){this.s.push(v);this.m.push(this.m.length?Math.min(v,this.m[this.m.length-1]):v);} pop(){this.s.pop();this.m.pop();} top(){return this.s[this.s.length-1];} getMin(){return this.m[this.m.length-1];} },
  MyQueue: class { constructor(){this.a=[];} push(x){this.a.push(x);} pop(){return this.a.shift();} peek(){return this.a[0];} empty(){return this.a.length===0;} },
  MyHashMap: class { constructor(){this.m=new Map();} put(k,v){this.m.set(k,v);} get(k){return this.m.has(k)?this.m.get(k):-1;} remove(k){this.m.delete(k);} },
  Trie: class { constructor(){this.r={};} insert(w){let n=this.r;for(const c of w){n=n[c]??(n[c]={});}n.end=true;} search(w){let n=this.r;for(const c of w){if(!n[c])return false;n=n[c];}return !!n.end;} startsWith(p){let n=this.r;for(const c of p){if(!n[c])return false;n=n[c];}return true;} },
  LRUCache: class { constructor(c){this.c=c;this.m=new Map();} get(k){if(!this.m.has(k))return -1;const v=this.m.get(k);this.m.delete(k);this.m.set(k,v);return v;} put(k,v){if(this.m.has(k))this.m.delete(k);this.m.set(k,v);if(this.m.size>this.c)this.m.delete(this.m.keys().next().value);} },
};

let allPass = true;
for (const p of problems.filter((p) => p.kind === "design")) {
  const Ctor = refs[p.className];
  for (let ti = 0; ti < p.tests.length; ti++) {
    const t = p.tests[ti];
    let inst = null; const out = [];
    for (let k = 0; k < t.ops.length; k++) {
      const a = t.args[k] ?? [];
      if (k === 0) { inst = new Ctor(...a); out.push(null); }
      else { const r = inst[t.ops[k]](...a); out.push(r === undefined ? null : r); }
    }
    const ok = deepEqual(out, t.expected);
    if (!ok) { allPass = false; console.log(`FAIL ${p.className} test ${ti}: got ${JSON.stringify(out)} expected ${JSON.stringify(t.expected)}`); }
  }
}
console.log(allPass ? "All design problems verified ✅" : "Some design problems FAILED ❌");
