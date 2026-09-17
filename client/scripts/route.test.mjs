import test from "node:test";
import assert from "node:assert/strict";
import { parseHash, problemHref, trackHref } from "../src/engine/route.js";

test("parseHash reads track and optional problem id", () => {
  assert.deepEqual(parseHash(""), { track: null, problemId: null });
  assert.deepEqual(parseHash("#dsa"), { track: "dsa", problemId: null });
  assert.deepEqual(parseHash("#dsa/dsa-matching-pair"), {
    track: "dsa",
    problemId: "dsa-matching-pair",
  });
  assert.deepEqual(parseHash("#realworld/rw-rt-slugify"), {
    track: "realworld",
    problemId: "rw-rt-slugify",
  });
});

test("href helpers round-trip through parseHash", () => {
  assert.equal(trackHref("dsa"), "#dsa");
  assert.equal(problemHref("dsa", "dsa-matching-pair"), "#dsa/dsa-matching-pair");
  assert.deepEqual(parseHash(problemHref("realworld", "rw-rt-slugify")), {
    track: "realworld",
    problemId: "rw-rt-slugify",
  });
});
