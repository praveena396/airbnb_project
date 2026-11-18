/**
 * Topic: AI Engineering basics (what a vector DB does, from scratch)
 *
 * Implement two functions:
 *
 * cosineSimilarity(a, b):
 *   - a and b are equal-length arrays of numbers (vectors).
 *   - Return their cosine similarity: (a . b) / (|a| * |b|)
 *     where "." is the dot product and |x| is the vector's magnitude
 *     (Euclidean norm). Result is between -1 and 1; 1 means identical
 *     direction (most similar).
 *
 * findTopK(queryVector, items, k):
 *   - `items` is an array of { id, vector } objects.
 *   - Return the top `k` items whose `vector` has the HIGHEST cosine
 *     similarity to `queryVector`, sorted descending by similarity.
 *   - Return format: [{ id, score }], score = cosine similarity.
 *
 * This brute-force "compare query to every stored vector" IS what a
 * vector database does internally (real ones just add indexing like
 * HNSW for speed at scale — the core math is exactly this).
 */

function cosineSimilarity(a, b) {
  // TODO: implement
  throw new Error("not implemented");
}

function findTopK(queryVector, items, k) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { cosineSimilarity, findTopK };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  check("identical vectors -> similarity ~1", Math.abs(cosineSimilarity([1, 0], [1, 0]) - 1) < 1e-9);
  check("orthogonal vectors -> similarity ~0", Math.abs(cosineSimilarity([1, 0], [0, 1]) - 0) < 1e-9);
  check("opposite vectors -> similarity ~-1", Math.abs(cosineSimilarity([1, 0], [-1, 0]) - -1) < 1e-9);

  const items = [
    { id: "home-beach", vector: [1, 0] },
    { id: "home-mountain", vector: [0, 1] },
    { id: "home-beach-2", vector: [0.9, 0.1] },
  ];
  const results = findTopK([1, 0], items, 2);
  console.log(results);

  check("top-2 most similar to [1,0] are the two beach homes",
    results[0].id === "home-beach" && results[1].id === "home-beach-2");
  check("results sorted descending by score", results[0].score >= results[1].score);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
