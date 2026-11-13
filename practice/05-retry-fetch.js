/**
 * Topic: Async/Await + Promises
 *
 * Implement retryFetch(asyncFn, retries, delayMs).
 * - Calls asyncFn().
 * - If it throws/rejects, wait delayMs then try again, up to `retries` times.
 * - Resolves with the first successful result.
 * - Rejects with the last error once all retries are exhausted.
 *
 * Simulates retrying a flaky booking/listing API call.
 */

function retryFetch(asyncFn, retries, delayMs) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { retryFetch };

// ---- quick manual test runner ----
if (require.main === module) {
  let attempt = 0;

  // Fails the first 2 times, succeeds on the 3rd attempt.
  const flakyApiCall = () => {
    attempt++;
    console.log(`Attempt #${attempt}`);
    if (attempt < 3) {
      return Promise.reject(new Error(`Simulated failure on attempt ${attempt}`));
    }
    return Promise.resolve("Booking confirmed!");
  };

  (async () => {
    try {
      const result = await retryFetch(flakyApiCall, 5, 100);
      console.log("Result:", result);
      console.log(result === "Booking confirmed!" && attempt === 3 ? "PASS" : "FAIL");
    } catch (err) {
      console.log("FAIL - threw:", err.message);
    }
  })();
}
