/**
 * Topic: Async + Lightweight System Design
 *
 * Implement a RateLimiter class (token bucket style):
 *   new RateLimiter(maxTokens, refillIntervalMs)
 *   limiter.schedule(fn) -> returns a Promise that resolves with fn()'s
 *     result once a token is available. fn is an async function.
 *
 * Behavior:
 *   - Start with `maxTokens` tokens available.
 *   - Each call to schedule() consumes one token if available and runs
 *     immediately; otherwise it queues until a token frees up.
 *   - Every `refillIntervalMs`, refill up to `maxTokens` tokens (simplest
 *     version: refill exactly 1 token per interval, up to the max).
 *
 * Simulates limiting concurrent/rate of calls to a third-party API
 * (e.g. a maps/geocoding API used for listings).
 */

class RateLimiter {
  constructor(maxTokens, refillIntervalMs) {
    // TODO: implement
    throw new Error("not implemented");
  }

  schedule(fn) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { RateLimiter };

// ---- quick manual test runner ----
if (require.main === module) {
  const limiter = new RateLimiter(2, 200); // 2 tokens, refill 1 every 200ms

  const log = [];
  const makeTask = (id) => async () => {
    log.push(`start ${id} @${Date.now()}`);
    return id;
  };

  const start = Date.now();

  Promise.all([
    limiter.schedule(makeTask(1)),
    limiter.schedule(makeTask(2)),
    limiter.schedule(makeTask(3)),
    limiter.schedule(makeTask(4)),
  ]).then((results) => {
    console.log("Results:", results);
    console.log("Log:\n" + log.join("\n"));
    console.log(JSON.stringify(results) === JSON.stringify([1, 2, 3, 4]) ? "PASS" : "FAIL");
  });
}
