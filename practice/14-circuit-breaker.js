/**
 * Topic: System Design (resilience pattern)
 *
 * Implement a CircuitBreaker class wrapping a flaky async function:
 *   new CircuitBreaker(asyncFn, { failureThreshold, cooldownMs })
 *   breaker.call(...args) -> calls asyncFn(...args) and returns its result,
 *     OR throws immediately without calling asyncFn, depending on state.
 *
 * States:
 *   - CLOSED (default): calls go through normally. Track consecutive
 *     failures. If failures reach `failureThreshold`, switch to OPEN.
 *   - OPEN: calls are rejected IMMEDIATELY (without calling asyncFn) with
 *     an error like "Circuit is open". After `cooldownMs`, switch to
 *     HALF_OPEN.
 *   - HALF_OPEN: allow exactly ONE real call through as a test.
 *     - If it succeeds: reset failure count, switch back to CLOSED.
 *     - If it fails: switch back to OPEN, restart the cooldown timer.
 *
 * Simulates protecting your app from repeatedly hammering a failing
 * downstream service (e.g. a flaky external booking/geocoding API).
 */

class CircuitBreaker {
  constructor(asyncFn, { failureThreshold, cooldownMs }) {
    // TODO: implement
    throw new Error("not implemented");
  }

  async call(...args) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { CircuitBreaker };

// ---- quick manual test runner ----
if (require.main === module) {
  let shouldFail = true;
  const flaky = async () => {
    if (shouldFail) throw new Error("downstream failure");
    return "ok";
  };

  const breaker = new CircuitBreaker(flaky, { failureThreshold: 2, cooldownMs: 150 });

  (async () => {
    const results = [];
    const tryCall = async (label) => {
      try {
        const r = await breaker.call();
        results.push(`${label}: success(${r})`);
      } catch (err) {
        results.push(`${label}: failed(${err.message})`);
      }
    };

    await tryCall("call1"); // real failure #1
    await tryCall("call2"); // real failure #2 -> threshold reached, circuit opens
    await tryCall("call3"); // should be rejected IMMEDIATELY, circuit is open, asyncFn not called

    await new Promise((r) => setTimeout(r, 200)); // wait for cooldown

    shouldFail = false; // downstream recovers
    await tryCall("call4"); // half-open test call -> should succeed -> circuit closes
    await tryCall("call5"); // circuit closed again -> should succeed normally

    console.log(results.join("\n"));

    const pass =
      results[0].includes("failed") &&
      results[1].includes("failed") &&
      results[2].includes("Circuit is open") &&
      results[3].includes("success") &&
      results[4].includes("success");
    console.log(pass ? "PASS" : "FAIL");
  })();
}
