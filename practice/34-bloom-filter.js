/**
 * Topic: Probabilistic Data Structures (classic FAANG dedup question)
 *
 * A Bloom filter answers "have I possibly seen this before?" using a
 * fixed amount of memory, no matter how many items you add — at the
 * cost of occasional FALSE POSITIVES (it may say "maybe seen" for
 * something never added), but NEVER false negatives (if it says "no",
 * that's guaranteed correct).
 *
 * Implement a BloomFilter class:
 *   new BloomFilter(size, hashCount)
 *     - `size`: length of the internal bit array (use a plain array
 *       of 0/1, e.g. new Array(size).fill(0)).
 *     - `hashCount`: how many different hash functions to simulate
 *       per item (more hashes = fewer false positives, up to a point).
 *   filter.add(item) -> hashes `item` `hashCount` different ways (e.g.
 *     by combining a simple string hash with a seed 0..hashCount-1),
 *     mod `size`, and sets each resulting bit to 1.
 *   filter.mightContain(item) -> hash `item` the same `hashCount` ways;
 *     return true ONLY IF all those bits are already 1. If even ONE
 *     of them is 0, return false (definitely never added).
 *
 * Real-world use: quickly check "have we already processed this
 * webhook/event ID?" without storing every ID ever seen in a DB.
 */

class BloomFilter {
  constructor(size, hashCount) {
    // TODO: implement
    throw new Error("not implemented");
  }

  add(item) {
    // TODO: implement
    throw new Error("not implemented");
  }

  mightContain(item) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { BloomFilter };

// ---- quick manual test runner ----
if (require.main === module) {
  const filter = new BloomFilter(100, 3);

  filter.add("home-123");
  filter.add("home-456");

  console.log("mightContain('home-123'):", filter.mightContain("home-123"));
  console.log("mightContain('home-456'):", filter.mightContain("home-456"));
  console.log("mightContain('home-999'):", filter.mightContain("home-999"));

  const pass =
    filter.mightContain("home-123") === true &&
    filter.mightContain("home-456") === true;
  // Note: mightContain("home-999") SHOULD normally be false, but a false
  // positive is technically allowed by the data structure's definition —
  // that's not a bug in your implementation, just how Bloom filters work.
  console.log(pass ? "PASS (added items correctly detected)" : "FAIL");
}
