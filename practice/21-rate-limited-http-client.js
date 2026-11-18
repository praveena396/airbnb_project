/**
 * Topic: Combines rate limiting (13) + exponential backoff retry (17)
 *
 * Implement createClient({ maxConcurrent, retries, baseDelayMs }):
 *   - Returns an object: { request(asyncFn) }
 *   - request(asyncFn) -> returns a Promise resolving with asyncFn()'s
 *     result (or rejecting with the last error).
 *
 * Behavior, combining what you've already built:
 *   - At most `maxConcurrent` requests run AT THE SAME TIME (like 16's
 *     JobQueue / 10's RateLimiter) — extra calls queue until a slot
 *     frees up.
 *   - Each individual request, if it fails, is retried with exponential
 *     backoff (like 17) up to `retries` times BEFORE giving up and
 *     freeing its slot for the next queued request.
 *
 * This models a realistic HTTP client wrapper for calling a flaky,
 * rate-sensitive third-party API (e.g. a geocoding/maps service).
 */

function createClient({ maxConcurrent, retries, baseDelayMs }) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { createClient };

// ---- quick manual test runner ----
if (require.main === module) {
  const client = createClient({ maxConcurrent: 2, retries: 3, baseDelayMs: 20 });

  let activeCount = 0;
  let maxActiveSeen = 0;
  const attemptsById = {};

  const makeFlakyTask = (id, failTimes) => async () => {
    activeCount++;
    maxActiveSeen = Math.max(maxActiveSeen, activeCount);
    attemptsById[id] = (attemptsById[id] || 0) + 1;
    await new Promise((r) => setTimeout(r, 30));
    activeCount--;
    if (attemptsById[id] <= failTimes) throw new Error(`fail #${attemptsById[id]} for ${id}`);
    return id;
  };

  Promise.all([
    client.request(makeFlakyTask("A", 0)), // succeeds immediately
    client.request(makeFlakyTask("B", 2)), // fails twice, succeeds on 3rd try
    client.request(makeFlakyTask("C", 0)),
    client.request(makeFlakyTask("D", 0)),
  ]).then((results) => {
    console.log("Results:", results);
    console.log("Max concurrent:", maxActiveSeen);
    console.log("Attempts per task:", attemptsById);

    const pass =
      JSON.stringify(results) === JSON.stringify(["A", "B", "C", "D"]) &&
      maxActiveSeen <= 2 &&
      attemptsById["B"] === 3;
    console.log(pass ? "PASS" : "FAIL");
  }).catch((err) => console.log("FAIL - threw:", err));
}
