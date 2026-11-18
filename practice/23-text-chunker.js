/**
 * Topic: AI Engineering basics (RAG — step 1: chunking)
 *
 * Implement chunkText(text, maxChunkSize, overlapSize):
 *   - Split `text` into chunks of AT MOST `maxChunkSize` characters.
 *   - Consecutive chunks should OVERLAP by `overlapSize` characters —
 *     i.e. the last `overlapSize` characters of chunk N are repeated
 *     as the first characters of chunk N+1.
 *   - Return an array of chunk strings, in order.
 *   - Overlap exists so that a sentence/idea split across a chunk
 *     boundary isn't lost entirely from BOTH chunks' context — this is
 *     literally the first step of every real RAG pipeline, before text
 *     gets embedded and stored in a vector database.
 *
 * Example: chunkText("ABCDEFGHIJ", 4, 1)
 *   -> ["ABCD", "DEFG", "GHIJ"]  (each chunk after the first starts
 *      with the last `overlapSize` chars of the previous chunk)
 */

function chunkText(text, maxChunkSize, overlapSize) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { chunkText };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, actual, expected) => {
    const pass = JSON.stringify(actual) === JSON.stringify(expected);
    checks.push(pass);
    console.log(`${label}: got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)} -> ${pass ? "PASS" : "FAIL"}`);
  };

  check("simple overlap case", chunkText("ABCDEFGHIJ", 4, 1), ["ABCD", "DEFG", "GHIJ"]);
  check("no overlap", chunkText("ABCDEFGH", 4, 0), ["ABCD", "EFGH"]);
  check("text shorter than chunk size", chunkText("AB", 10, 2), ["AB"]);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
