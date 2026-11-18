/**
 * Topic: AI Engineering (reliability patterns for agentic/structured
 * LLM output — a real production concern, since LLMs don't always
 * follow format instructions perfectly)
 *
 * Implement validateAndRetry(mockLLM, prompt, schema, maxRetries):
 *   - `mockLLM(prompt)` -> async, returns a RAW STRING (meant to be
 *     JSON, but might not be valid JSON, or might be valid JSON that
 *     doesn't match `schema`).
 *   - `schema` is a simple object like { name: "string", price: "number" }
 *     — describing required keys and their expected `typeof`.
 *   - Call mockLLM(prompt). Try to JSON.parse the result.
 *     - If parsing fails, OR any schema key is missing/wrong type:
 *       this is a validation failure.
 *     - On failure, retry by calling mockLLM again with a CORRECTED
 *       prompt (e.g. append a note like: `\n\nYour last response was
 *       invalid: <reason>. Respond with ONLY valid JSON matching the
 *       required shape.`), up to `maxRetries` times total.
 *   - On success (valid JSON matching schema), return the PARSED
 *     object.
 *   - If still invalid after all retries, throw an Error like
 *     "Failed to get valid output after N attempts".
 */

async function validateAndRetry(mockLLM, prompt, schema, maxRetries) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { validateAndRetry };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    const checks = [];
    const check = (label, cond) => {
      checks.push(cond);
      console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
    };

    let callCount = 0;
    // Simulates an LLM that returns garbage the first 2 times, then
    // finally returns valid JSON matching the schema on the 3rd try.
    const flakyLLM = async (prompt) => {
      callCount++;
      if (callCount === 1) return "Sure! Here's the home: name=Beach Villa, price=200"; // not JSON
      if (callCount === 2) return JSON.stringify({ name: "Beach Villa" }); // missing `price`
      return JSON.stringify({ name: "Beach Villa", price: 200 }); // valid
    };

    const schema = { name: "string", price: "number" };
    const result = await validateAndRetry(flakyLLM, "Describe a home as JSON.", schema, 5);
    console.log("Result:", result, "| total LLM calls:", callCount);

    check("eventually returns valid parsed object", result.name === "Beach Villa" && result.price === 200);
    check("took multiple attempts (retried on invalid output)", callCount === 3);

    // Now test the "never succeeds" path.
    callCount = 0;
    const alwaysBadLLM = async () => "not json at all";
    try {
      await validateAndRetry(alwaysBadLLM, "Describe a home as JSON.", schema, 3);
      checks.push(false);
      console.log("should have thrown after exhausting retries -> FAIL");
    } catch (err) {
      checks.push(err.message.includes("Failed"));
      console.log(`throws after exhausting retries: "${err.message}" -> ${err.message.includes("Failed") ? "PASS" : "FAIL"}`);
    }

    console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  })();
}
