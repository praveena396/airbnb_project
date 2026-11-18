/**
 * Topic: Async/Await + Promises (extends 05-retry-fetch.js)
 *
 * Implement retryWithBackoff(asyncFn, retries, baseDelayMs):
 *   - Same overall behavior as retryFetch (05): call asyncFn(), retry on
 *     failure up to `retries` times, resolve on first success, reject
 *     with the last error once retries are exhausted.
 *   - DIFFERENCE: the wait between attempts is NOT constant. It doubles
 *     each time: baseDelayMs, then baseDelayMs*2, then baseDelayMs*4, ...
 *     This is "exponential backoff" — common for real API retry logic,
 *     so you don't hammer a struggling service at a constant rate.
 */

function retryWithBackoff(asyncFn, retries, baseDelayMs) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { retryWithBackoff };

// ---- quick manual test runner ----
if (require.main === module) {
  let attempt = 0;
  const timestamps = [];

  const flakyApiCall = () => {
    attempt++;
    timestamps.push(Date.now());
    if (attempt < 4) {
      return Promise.reject(new Error(`Simulated failure on attempt ${attempt}`));
    }
    return Promise.resolve("Booking confirmed!");
  };

  (async () => {
    const start = Date.now();
    try {
      const result = await retryWithBackoff(flakyApiCall, 5, 50);
      console.log("Result:", result, "| total attempts:", attempt);

      // gaps should roughly be: ~50ms, ~100ms, ~200ms (doubling each time)
      const gaps = timestamps.slice(1).map((t, i) => t - timestamps[i]);
      console.log("Gaps between attempts (ms):", gaps);

      const pass =
        result === "Booking confirmed!" &&
        attempt === 4 &&
        gaps[1] > gaps[0] && // each gap bigger than the last
        gaps[2] > gaps[1];
      console.log(pass ? "PASS" : "FAIL");
    } catch (err) {
      console.log("FAIL - threw:", err.message);
    }
  })();
}
