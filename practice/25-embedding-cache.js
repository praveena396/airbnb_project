/**
 * Topic: AI Engineering + Caching (combines 12-memoize.js with embeddings)
 *
 * Implement an EmbeddingCache class:
 *   new EmbeddingCache(embedFn)
 *     - `embedFn` is an async function: embedFn(text) -> vector (array
 *       of numbers). In real life this would call an embeddings API
 *       (e.g. OpenAI/Cohere) — here it's just passed in, so you can
 *       mock it in tests. Assume it's SLOW and possibly costs money
 *       per call in real usage, so avoid calling it twice for the
 *       same text.
 *   cache.getEmbedding(text) -> async, returns the vector for `text`.
 *     - If `text` was already embedded before, return the CACHED
 *       vector WITHOUT calling embedFn again.
 *     - If two getEmbedding(text) calls for the SAME new text happen
 *       concurrently (before the first one finishes), only call
 *       embedFn ONCE — the second caller should wait for and reuse
 *       the same in-flight request, not trigger a duplicate call.
 *
 * This "dedupe concurrent in-flight requests for the same key" piece
 * is the realistic/tricky part — it's a common real bug in naive
 * caching code (a cache MISS on the same key fired twice very close
 * together, before the first result is stored, triggers 2 expensive
 * calls instead of 1).
 */

class EmbeddingCache {
  constructor(embedFn) {
    // TODO: implement
    throw new Error("not implemented");
  }

  async getEmbedding(text) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { EmbeddingCache };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    let callCount = 0;
    const mockEmbed = async (text) => {
      callCount++;
      await new Promise((r) => setTimeout(r, 30));
      return [text.length, text.charCodeAt(0)]; // fake deterministic "vector"
    };

    const cache = new EmbeddingCache(mockEmbed);

    const checks = [];
    const check = (label, cond) => {
      checks.push(cond);
      console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
    };

    // Two concurrent requests for the SAME new text -> should only call embedFn once.
    const [v1, v2] = await Promise.all([
      cache.getEmbedding("Beach Villa"),
      cache.getEmbedding("Beach Villa"),
    ]);
    check("both concurrent calls return the same vector", JSON.stringify(v1) === JSON.stringify(v2));
    check("embedFn called only once for concurrent duplicate requests", callCount === 1);

    // A later call for the same text should use the cache, not call embedFn again.
    await cache.getEmbedding("Beach Villa");
    check("cached call does not increase callCount", callCount === 1);

    // A different text should trigger a new real call.
    await cache.getEmbedding("Mountain Cabin");
    check("new text triggers a new embedFn call", callCount === 2);

    console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  })();
}
