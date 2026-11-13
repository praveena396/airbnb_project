# Practice: JS Interview Questions (Promises / Callbacks focus)

10 SDE1-level FAANG-style questions. Each file has:
- A starter function signature that throws `not implemented`
- A `require.main === module` block at the bottom with quick manual tests
  (prints `PASS`/`FAIL`) — no test framework needed.

## How to work through them

1. Open a file, e.g. `01-debounce.js`.
2. Replace the `throw new Error("not implemented")` with your implementation.
3. Run it directly:
   ```
   node practice/01-debounce.js
   ```
4. Or run all of them at once:
   ```
   node practice/run-all.js
   ```

## Questions

| # | File | Topic |
|---|------|-------|
| 1 | `01-debounce.js` | Closures / Async JS |
| 2 | `02-throttle.js` | Closures / Async JS |
| 3 | `03-promise-all.js` | Promises |
| 4 | `04-promise-race-any.js` | Promises |
| 5 | `05-retry-fetch.js` | Async/Await + Promises |
| 6 | `06-promisify.js` | Callbacks -> Promises |
| 7 | `07-event-emitter.js` | Callbacks / Design Pattern |
| 8 | `08-two-sum.js` | Arrays / Hash Map |
| 9 | `09-deep-flatten-clone.js` | Recursion |
| 10 | `10-rate-limiter.js` | Async + Lightweight System Design |

This folder is standalone (no dependency on the Express app) and uses plain
CommonJS (`require`/`module.exports`) to match the rest of this repo.
