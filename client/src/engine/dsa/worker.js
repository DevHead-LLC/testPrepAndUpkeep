// Keep evaluation inside the worker so the caller can terminate runaway code.
import { evaluateSolution } from "./evaluate.js";

self.onmessage = (e) => {
  self.postMessage(evaluateSolution(e.data));
};
