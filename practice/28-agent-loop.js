/**
 * Topic: AI Engineering (agentic loop, like ReAct-style agents)
 *
 * This is the actual mechanism behind "agents": the LLM doesn't just
 * answer directly — it can ask to call a tool, see the tool's result,
 * then decide again (answer, or call another tool), looping until it
 * has a final answer.
 *
 * Implement runAgent(mockLLM, dispatcher, userQuery, maxSteps):
 *   - `mockLLM` is an async function: mockLLM(conversation) -> one of:
 *       { type: "tool_call", name, arguments }
 *       { type: "final", content }
 *     `conversation` is an array of messages you build up and pass in
 *     each time (so the mock LLM can decide differently based on what
 *     happened so far — see the test's mock below).
 *   - `dispatcher` has a `.dispatch(toolCall)` method (same shape as
 *     27-tool-dispatcher.js) — use it to actually run tool calls.
 *   - Loop:
 *     1. Call mockLLM(conversation).
 *     2. If it returns { type: "final", content } -> return content,
 *        done.
 *     3. If it returns { type: "tool_call", ... } -> run it via
 *        dispatcher.dispatch(...), append BOTH the tool call and its
 *        result to `conversation` as new entries, and loop again.
 *   - If `maxSteps` is reached without a "final" response, throw an
 *     Error like "Max steps exceeded".
 *
 * Message shape appended to `conversation` is up to you, but should
 * contain enough info for your mockLLM to tell what's already
 * happened (e.g. { role: "assistant", toolCall } and
 * { role: "tool", name, result }).
 */

async function runAgent(mockLLM, dispatcher, userQuery, maxSteps) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { runAgent };

// ---- quick manual test runner ----
if (require.main === module) {
  const { createDispatcher } = require("./27-tool-dispatcher.js");

  (async () => {
    const dispatcher = createDispatcher({
      getWeather: {
        required: ["city"],
        handler: async ({ city }) => (city === "Goa" ? "Sunny, 30C" : "Unknown"),
      },
    });

    // A fake "LLM": on the FIRST call it asks for a tool; once it SEES a
    // tool result in the conversation, it gives a final answer using it.
    const mockLLM = async (conversation) => {
      const hasToolResult = conversation.some((m) => m.role === "tool");
      if (!hasToolResult) {
        return { type: "tool_call", name: "getWeather", arguments: { city: "Goa" } };
      }
      const toolMsg = conversation.find((m) => m.role === "tool");
      return { type: "final", content: `The weather in Goa is: ${toolMsg.result}` };
    };

    const result = await runAgent(mockLLM, dispatcher, "What's the weather in Goa?", 5);
    console.log("Agent final answer:", result);

    const pass = result === "The weather in Goa is: Sunny, 30C";
    console.log(pass ? "PASS" : "FAIL");

    // Also check maxSteps actually gets enforced, using an LLM that
    // never gives a final answer.
    const infiniteLLM = async () => ({ type: "tool_call", name: "getWeather", arguments: { city: "Goa" } });
    try {
      await runAgent(infiniteLLM, dispatcher, "loop forever", 3);
      console.log("FAIL - should have thrown Max steps exceeded");
    } catch (err) {
      console.log(err.message.includes("Max steps") ? "PASS (maxSteps enforced)" : "FAIL");
    }
  })();
}
