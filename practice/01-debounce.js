/**
 * Topic: Closures / Asynchronous JS
 *
 * Implement debounce(fn, delay).
 * The returned function should only invoke `fn` after `delay` ms have
 * passed since the LAST time the returned function was called.
 * Each new call resets the timer.
 *
 * Example: spin a "fortune wheel" -> show the reward only after the
 * wheel has been left spinning untouched for `delay` ms.
 */

function debounce(fn, delay) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { debounce };

// ---- quick manual test runner ----
if (require.main === module) {
  let calls = 0;
  const spinWheel = () => {
    calls++;
    console.log(`Reward revealed! (fn actually called ${calls} time(s))`);
  };

  const debouncedSpin = debounce(spinWheel, 300);

  console.log("Simulating rapid spins at 0ms, 100ms, 200ms...");
  debouncedSpin(); // t=0
  setTimeout(debouncedSpin, 100); // t=100 -> resets timer
  setTimeout(debouncedSpin, 200); // t=200 -> resets timer again

  setTimeout(() => {
    console.log("Expected: fn called exactly once, around t=500ms");
    console.log(calls === 1 ? "PASS" : "FAIL");
  }, 700);
}
