/**
 * Topic: System Design (rate limiting, LEAKY BUCKET style)
 *
 * This is a different algorithm from 10-rate-limiter.js (token bucket).
 * Leaky bucket: requests are queued and processed at a FIXED, steady
 * rate, no matter how bursty the incoming requests are.
 *
 * Implement a LeakyBucket class:
 *   new LeakyBucket(processIntervalMs)
 *   bucket.enqueue(fn) -> returns a Promise that resolves with fn()'s
 *     result. fn is an async function.
 *
 * Behavior:
 *   - Calls to enqueue() are queued in FIFO order.
 *   - Exactly one queued fn is processed every `processIntervalMs`,
 *     regardless of how many enqueue() calls happened at once.
 *
 * Contrast with token bucket (10): token bucket allows BURSTS up to
 * the token count, then throttles. Leaky bucket NEVER bursts — it
 * always drains at a fixed steady rate.
 */

class LeakyBucket {
  constructor(processIntervalMs) {
    // TODO: implement
    throw new Error("not implemented");
  }

  enqueue(fn) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { LeakyBucket };

// ---- quick manual test runner ----
if (require.main === module) {
  const bucket = new LeakyBucket(100); // process 1 item every 100ms

  const log = [];
  const makeTask = (id) => async () => {
    log.push(`processed ${id} @${Date.now()}`);
    return id;
  };

  const start = Date.now();

  Promise.all([
    bucket.enqueue(makeTask(1)),
    bucket.enqueue(makeTask(2)),
    bucket.enqueue(makeTask(3)),
  ]).then((results) => {
    console.log("Results:", results);
    console.log("Log:\n" + log.join("\n"));
    console.log(JSON.stringify(results) === JSON.stringify([1, 2, 3]) ? "PASS (order)" : "FAIL (order)");
    // All 3 submitted instantly, but should be spaced ~100ms apart.
    const elapsed = Date.now() - start;
    console.log(elapsed >= 180 ? "PASS (steady rate, took >=180ms)" : "FAIL (ran too fast, not rate-limited)");
  });
}
