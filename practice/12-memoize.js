/**
 * Topic: Closures + Caching
 *
 * Implement memoize(fn, ttlMs):
 *   - Returns a new function with the same signature as fn.
 *   - Caches the result of fn(...args), keyed by the arguments.
 *   - If called again with the SAME arguments before ttlMs has passed,
 *     return the cached result WITHOUT calling fn again.
 *   - If ttlMs has passed, call fn again and refresh the cache.
 *
 * Simulates caching an expensive computation or a slow DB/API call
 * keyed by its input parameters.
 */

function memoize(fn, ttlMs) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { memoize };

// ---- quick manual test runner ----
if (require.main === module) {
  let callCount = 0;
  const slowSquare = (n) => {
    callCount++;
    return n * n;
  };

  const memoSquare = memoize(slowSquare, 100);

  (async () => {
    const checks = [];
    const check = (label, cond) => {
      checks.push(cond);
      console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
    };

    check("first call returns 25", memoSquare(5) === 25);
    check("real fn called once so far", callCount === 1);

    memoSquare(5);
    memoSquare(5);
    check("same args again -> still only 1 real call", callCount === 1);

    check("different args -> real fn called again", memoSquare(6) === 36 && callCount === 2);

    await new Promise((r) => setTimeout(r, 150)); // let TTL expire
    memoSquare(5);
    check("after TTL expires, same args -> real fn called again", callCount === 3);

    console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  })();
}
