/**
 * Topic: Data Structures (classic FAANG/SDE1 round question)
 *
 * Implement an LRUCache class:
 *   new LRUCache(capacity)
 *   cache.get(key)   -> returns the value, or -1 if not found.
 *                       Accessing a key counts as "recently used".
 *   cache.put(key, value) -> inserts/updates the key.
 *                       If inserting a NEW key would exceed capacity,
 *                       evict the LEAST recently used key first.
 *
 * Both get() and put() must run in O(1) time.
 *
 * Simulates an in-memory cache layer in front of a slow resource
 * (e.g. a DB lookup or a repeated API call) with a fixed memory budget.
 */

class LRUCache {
  constructor(capacity) {
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

module.exports = { LRUCache };

// ---- quick manual test runner ----
if (require.main === module) {
  const cache = new LRUCache(2);

  const checks = [];
  const check = (label, actual, expected) => {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    checks.push(pass);
    console.log(`${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)} -> ${pass ? "PASS" : "FAIL"}`);
  };

  cache.put(1, "a");
  cache.put(2, "b");
  check("get(1) after put(1,a), put(2,b)", cache.get(1), "a"); // 1 is now most-recently-used

  cache.put(3, "c"); // capacity is 2, so this evicts the LEAST recently used key.
                      // 1 was just accessed, so 2 should be evicted, not 1.
  check("get(2) after put(3,c) should be evicted", cache.get(2), -1);

  check("get(1) should still be present", cache.get(1), "a");
  check("get(3) should be present", cache.get(3), "c");

  cache.put(4, "d"); // capacity 2, currently holds 1 and 3. 1 was accessed more
                      // recently than 3 (via the get(1) check above), so 3 should be evicted.
  check("get(3) should now be evicted", cache.get(3), -1);
  check("get(1) should still be present", cache.get(1), "a");
  check("get(4) should be present", cache.get(4), "d");

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
