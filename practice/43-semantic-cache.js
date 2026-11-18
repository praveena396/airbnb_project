/**
 * Topic: AI Engineering CAPSTONE-ish — combines 12 (caching) + 24 (vector
 * search) into something real LLM apps use to cut API costs/latency.
 *
 * Problem: a plain cache (12-memoize.js) only hits on an EXACT match.
 * But "What's the weather in Goa?" and "Tell me Goa's weather" mean
 * the same thing to an LLM — a plain string-keyed cache treats them
 * as totally different, missing an obvious reuse opportunity. A
 * SEMANTIC cache instead checks: "is there a cached query whose
 * MEANING (embedding) is close enough to this new query?" If so,
 * reuse its cached response instead of calling the LLM again.
 *
 * Implement a SemanticCache class:
 *   new SemanticCache(embedFn, similarityThreshold)
 *     - `embedFn(text)` -> async, returns a vector (array of numbers).
 *     - `similarityThreshold`: a cosine-similarity cutoff (e.g. 0.9) —
 *       only reuse a cached entry if it's AT LEAST this similar.
 *   cache.get(query) -> async. Embeds `query`, compares (cosine
 *     similarity) against every cached entry's stored embedding. If
 *     the BEST match's similarity >= similarityThreshold, return that
 *     entry's cached response. Otherwise return null (cache miss).
 *   cache.set(query, response) -> async. Embeds `query` and stores
 *     { query, embedding, response } for future get() calls.
 *
 * You can reuse your own cosineSimilarity from 24-vector-search.js.
 */

class SemanticCache {
  constructor(embedFn, similarityThreshold) {
    // TODO: implement
    throw new Error("not implemented");
  }

  async get(query) {
    // TODO: implement
    throw new Error("not implemented");
  }

  async set(query, response) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { SemanticCache };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    const checks = [];
    const check = (label, cond) => {
      checks.push(cond);
      console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
    };

    // Fake embedding: vector of word-overlap against a fixed vocabulary,
    // so paraphrases of the same topic land close together.
    const vocab = ["weather", "goa", "mountain", "manali", "price", "booking"];
    const embedFn = async (text) => {
      const lower = text.toLowerCase();
      return vocab.map((w) => (lower.includes(w) ? 1 : 0));
    };

    const cache = new SemanticCache(embedFn, 0.99); // require near-exact topic match

    await cache.set("What's the weather in Goa?", "Sunny, 30C");

    const hit = await cache.get("Tell me the weather for Goa"); // same topic words -> should hit
    check("semantically similar query hits the cache", hit === "Sunny, 30C");

    const miss = await cache.get("What's the booking price for Manali?"); // different topic -> miss
    check("unrelated query misses the cache", miss === null);

    console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  })();
}
