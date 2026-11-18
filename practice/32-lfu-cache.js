/**
 * Topic: Data Structures (contrast with 11-lru-cache.js)
 *
 * Implement an LFUCache class:
 *   new LFUCache(capacity)
 *   cache.get(key)   -> returns the value, or -1 if not found.
 *                       A successful get() increments that key's usage count.
 *   cache.put(key, value) -> inserts/updates the key, increments its usage
 *                       count. If inserting a NEW key exceeds capacity,
 *                       evict the LEAST FREQUENTLY used key (lowest count).
 *                       If there's a tie in frequency, evict the LEAST
 *                       RECENTLY used among those tied keys.
 *
 * Contrast with LRU (11): LRU evicts by RECENCY (when it was last touched).
 * LFU evicts by FREQUENCY (how many TIMES it's been touched, total).
 * A key accessed 100 times long ago can outlive a key accessed once
 * recently, under LFU — the opposite of LRU's behavior.
 */

class LFUCache {
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

module.exports = { LFUCache };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, actual, expected) => {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    checks.push(pass);
    console.log(`${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)} -> ${pass ? "PASS" : "FAIL"}`);
  };

  const cache = new LFUCache(2);
  cache.put(1, "a"); // freq(1)=1
  cache.put(2, "b"); // freq(2)=1
  cache.get(1);      // freq(1)=2
  cache.get(1);      // freq(1)=3

  cache.put(3, "c"); // capacity 2, evict LOWEST freq -> key 2 (freq=1), not key 1 (freq=3)
  check("get(2) evicted (lowest frequency)", cache.get(2), -1);
  check("get(1) survives (highest frequency)", cache.get(1), "a");
  check("get(3) present", cache.get(3), "c");

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
