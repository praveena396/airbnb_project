/**
 * Topic: Closures / Asynchronous JS
 *
 * Implement throttle(fn, limit).
 * The returned function should invoke `fn` at most once every `limit` ms,
 * no matter how many times it's called in that window. Extra calls during
 * the "cooldown" window are ignored (leading-edge throttle).
 *
 * Example: limiting a scroll handler that recalculates layout.
 */

function throttle(fn, limit) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { throttle };

// ---- quick manual test runner ----
if (require.main === module) {
  let calls = 0;
  const onScroll = () => {
    calls++;
    console.log(`onScroll fired (call #${calls})`);
  };

  const throttledScroll = throttle(onScroll, 200);

  console.log("Simulating scroll events every 50ms for 1s...");
  const interval = setInterval(throttledScroll, 50);

  setTimeout(() => {
    clearInterval(interval);
    console.log(`Total calls: ${calls} (expected roughly 5 for a 1s window / 200ms limit)`);
    console.log(calls >= 4 && calls <= 6 ? "PASS" : "FAIL");
  }, 1000);
}
