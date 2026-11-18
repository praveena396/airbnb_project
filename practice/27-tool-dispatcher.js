/**
 * Topic: AI Engineering basics (function calling / tool use)
 *
 * Modern LLM APIs can return a "tool call" instead of plain text: the
 * model decides to call one of YOUR functions with some arguments, and
 * your code is responsible for actually running it and returning the
 * result. This is the dispatcher that sits between "the model asked for
 * tool X with these args" and "actually run tool X safely."
 *
 * Implement createDispatcher(tools):
 *   - `tools` is an object like:
 *       {
 *         getWeather: { handler: async ({ city }) => ..., required: ["city"] },
 *         bookHome:   { handler: async ({ homeId, nights }) => ..., required: ["homeId", "nights"] },
 *       }
 *   - Returns { dispatch(toolCall) }, where toolCall looks like:
 *       { name: "getWeather", arguments: { city: "Goa" } }
 *   - dispatch(toolCall):
 *     - If `name` isn't a known tool, throw an Error like
 *       `Unknown tool: xyz`.
 *     - If any key listed in that tool's `required` array is MISSING
 *       from `arguments`, throw an Error like
 *       `Missing required argument: city`.
 *     - Otherwise, call that tool's `handler(arguments)` and return
 *       (await) its result.
 */

function createDispatcher(tools) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { createDispatcher };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    const tools = {
      getWeather: {
        required: ["city"],
        handler: async ({ city }) => `Sunny in ${city}`,
      },
      bookHome: {
        required: ["homeId", "nights"],
        handler: async ({ homeId, nights }) => `Booked ${homeId} for ${nights} nights`,
      },
    };

    const dispatcher = createDispatcher(tools);
    const checks = [];
    const check = async (label, fn, expectThrow, expectedSubstring) => {
      try {
        const result = await fn();
        const pass = !expectThrow && result === expectedSubstring;
        checks.push(pass);
        console.log(`${label}: got "${result}" -> ${pass ? "PASS" : "FAIL"}`);
      } catch (err) {
        const pass = expectThrow && err.message.includes(expectedSubstring);
        checks.push(pass);
        console.log(`${label}: threw "${err.message}" -> ${pass ? "PASS" : "FAIL"}`);
      }
    };

    await check(
      "valid tool call",
      () => dispatcher.dispatch({ name: "getWeather", arguments: { city: "Goa" } }),
      false,
      "Sunny in Goa"
    );

    await check(
      "unknown tool",
      () => dispatcher.dispatch({ name: "cancelFlight", arguments: {} }),
      true,
      "Unknown tool"
    );

    await check(
      "missing required argument",
      () => dispatcher.dispatch({ name: "bookHome", arguments: { homeId: "h1" } }),
      true,
      "nights"
    );

    console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  })();
}
