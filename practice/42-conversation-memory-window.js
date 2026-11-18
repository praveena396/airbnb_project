/**
 * Topic: AI Engineering (every real chatbot backend needs this)
 *
 * LLMs have a fixed context window (a token budget). A long-running
 * conversation eventually exceeds it. The fix: trim the OLDEST
 * messages first, keeping the most recent ones (plus any system
 * message, which usually must always stay).
 *
 * Implement trimToTokenBudget(messages, maxTokens, countTokensFn):
 *   - `messages` is an array of { role: "system" | "user" | "assistant",
 *     content: string }, in chronological order (oldest first).
 *   - `countTokensFn` is a function: countTokensFn(text) -> number
 *     (you can reuse your approximateTokenCount from 41, or a mock in
 *     tests).
 *   - ALWAYS keep the system message (if the first message has
 *     role: "system"), regardless of budget.
 *   - From the REMAINING messages, keep as many of the MOST RECENT
 *     ones as fit within `maxTokens` total (system message's tokens
 *     count against the budget too) — drop the oldest non-system
 *     messages first if needed.
 *   - Return the trimmed array, preserving original relative order
 *     (system message first if present, then the kept messages in
 *     their original chronological order).
 */

function trimToTokenBudget(messages, maxTokens, countTokensFn) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { trimToTokenBudget };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  // Mock: each message costs tokens = its content's length (simple, deterministic).
  const countTokensFn = (text) => text.length;

  const messages = [
    { role: "system", content: "You are a helpful booking assistant." }, // 36 tokens
    { role: "user", content: "Hi there" },        // 8 tokens
    { role: "assistant", content: "Hello! How can I help?" }, // 22 tokens
    { role: "user", content: "Any homes in Goa?" }, // 18 tokens
    { role: "assistant", content: "Yes, several beach villas." }, // 27 tokens
  ];

  // Budget of 70: system (36) must stay, leaving 34 for the rest.
  // Walking backwards from the most recent: +27 (=63), +18 (=81, EXCEEDS 34 remaining) -> stop.
  // So only the LAST assistant message fits alongside the system message.
  const trimmed = trimToTokenBudget(messages, 70, countTokensFn);
  console.log(trimmed);

  check("system message always kept, and kept first", trimmed[0].role === "system");
  check("oldest non-system messages dropped first", !trimmed.some((m) => m.content === "Hi there"));
  check("most recent message kept", trimmed.some((m) => m.content === "Yes, several beach villas."));
  check("total tokens stay within budget", trimmed.reduce((sum, m) => sum + countTokensFn(m.content), 0) <= 70);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
