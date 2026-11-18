/**
 * Topic: AI Engineering basics (prompt templating)
 *
 * Implement renderPrompt(template, vars):
 *   - `template` is a string containing placeholders like {{name}}.
 *   - `vars` is an object of values to substitute in.
 *   - Replace every {{key}} in the template with vars[key].
 *   - If the template references a key that is MISSING from vars,
 *     throw an Error like `Missing variable: key`.
 *   - Whitespace inside the braces should be tolerated: {{ name }} and
 *     {{name}} should both work.
 *
 * This is the actual mechanism behind most "prompt template" tooling
 * you'd see in LLM frameworks — simple string substitution with
 * validation that nothing was forgotten.
 */

function renderPrompt(template, vars) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { renderPrompt };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, actual, expected) => {
    const pass = actual === expected;
    checks.push(pass);
    console.log(`${label}: got "${actual}", expected "${expected}" -> ${pass ? "PASS" : "FAIL"}`);
  };

  check(
    "basic substitution",
    renderPrompt("Hello {{name}}, you booked {{home}}.", { name: "Praveena", home: "Beach Villa" }),
    "Hello Praveena, you booked Beach Villa."
  );

  check(
    "tolerates whitespace in braces",
    renderPrompt("Hi {{ name }}!", { name: "Sam" }),
    "Hi Sam!"
  );

  try {
    renderPrompt("Hello {{name}}", {});
    checks.push(false);
    console.log("missing variable should throw -> FAIL");
  } catch (err) {
    const pass = err.message.includes("name");
    checks.push(pass);
    console.log(`missing variable throws with key name -> ${pass ? "PASS" : "FAIL"}`);
  }

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
