/**
 * Topic: Data Structures + Caching (combines 11-lru-cache.js with TTL)
 *
 * Implement an LRUTTLCache class:
 *   new LRUTTLCache(capacity, ttlMs)
 *   cache.get(key)   -> returns the value, or -1 if not found OR expired.
 *                       A successful get() counts as "recently used".
 *   cache.put(key, value) -> inserts/updates the key, resets its TTL timer.
 *                       If inserting a NEW key exceeds capacity, evict the
 *                       LEAST recently used key (same as 11-lru-cache.js).
 *
 * The new part vs. 11: even if a key is the MOST recently used, it still
 * expires and becomes unavailable once `ttlMs` has passed since it was
 * last put/updated. Expiry and LRU eviction are two SEPARATE reasons a
 * key can disappear.
 */

class LRUTTLCache {
  constructor(capacity, ttlMs) {
    // TODO: implement
    throw new Error("not implemented");
  }

  get(key) {
    // TODO: implement
    throw new Error("not implemented");
  }

  put(key, value) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { LRUTTLCache };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    const checks = [];
    const check = (label, actual, expected) => {
      const pass = JSON.stringify(actual) === JSON.stringify(expected);
      checks.push(pass);
      console.log(`${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)} -> ${pass ? "PASS" : "FAIL"}`);
    };

    const cache = new LRUTTLCache(2, 100);

    cache.put(1, "a");
    check("get(1) right after put", cache.get(1), "a");

    await new Promise((r) => setTimeout(r, 150));
    check("get(1) after TTL expired", cache.get(1), -1);

    const cache2 = new LRUTTLCache(2, 1000); // long TTL, test LRU eviction still works
    cache2.put(1, "a");
    cache2.put(2, "b");
    cache2.get(1); // mark 1 as recently used
    cache2.put(3, "c"); // capacity 2 -> evict least recently used -> should evict 2, not 1
    check("get(2) evicted by LRU (not TTL)", cache2.get(2), -1);
    check("get(1) survives (was recently used)", cache2.get(1), "a");

    console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  })();
}
