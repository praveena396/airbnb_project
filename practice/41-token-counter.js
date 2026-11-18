/**
 * Topic: AI Engineering basics (context window budgeting)
 *
 * Real LLMs charge/limit by TOKENS, not characters or words — and a
 * token is roughly (but not exactly) 4 characters of English text, or
 * about 3/4 of a word. You don't need a real tokenizer (like GPT's
 * actual BPE encoder) for this exercise — just a reasonable
 * approximation, which is often good enough for budgeting decisions
 * in real applications (e.g. "will this prompt fit in the context
 * window?").
 *
 * Implement approximateTokenCount(text):
 *   - A simple, defensible approximation: split `text` into words
 *     (whitespace-separated), and estimate roughly 1.3 tokens per
 *     word (since many words split into sub-word tokens, and
 *     punctuation often counts as its own token).
 *   - Return a whole number (round, don't leave fractional tokens).
 *   - Empty/whitespace-only text -> 0.
 *
 * This is intentionally approximate — the test below checks it's in
 * a REASONABLE range, not an exact byte-for-byte match with a real
 * tokenizer.
 */

function approximateTokenCount(text) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { approximateTokenCount };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  check("empty string -> 0 tokens", approximateTokenCount("") === 0);
  check("whitespace only -> 0 tokens", approximateTokenCount("   ") === 0);

  const shortCount = approximateTokenCount("Hello world");
  console.log("'Hello world' ->", shortCount, "tokens");
  check("short text gives a small positive count", shortCount > 0 && shortCount < 10);

  const longText = "Beach Villa in Goa has three bedrooms, a private pool, and ocean views from every room.";
  const longCount = approximateTokenCount(longText);
  console.log(`"${longText}" ->`, longCount, "tokens");
  check("longer text gives a proportionally larger count", longCount > shortCount * 3);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
