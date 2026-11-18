/**
 * Topic: AI Engineering basics (how LLM token streaming / SSE works)
 *
 * Real LLM APIs (and ChatGPT-style UIs) stream responses token-by-token
 * over Server-Sent Events (SSE). Raw network chunks do NOT line up
 * neatly with message boundaries — a single "line" of the stream can
 * be split across two separate chunks arriving from the network.
 *
 * Each SSE line looks like: `data: {"token":"Hello"}\n\n`
 * A special line `data: [DONE]\n\n` marks the end of the stream.
 *
 * Implement parseSSEChunks(rawChunks):
 *   - `rawChunks` is an array of strings, each one a raw piece of
 *     network data AS IT ARRIVED (may contain a partial line, multiple
 *     full lines, or a line split across the boundary with the next
 *     chunk).
 *   - Return an array of all the `token` strings extracted from every
 *     complete `data: {...}` line, IN ORDER, stopping at (and not
 *     including) `[DONE]`.
 *   - You must correctly handle a line that is split across two
 *     chunks — i.e. buffer incomplete data until a full line is seen.
 */

function parseSSEChunks(rawChunks) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { parseSSEChunks };

// ---- quick manual test runner ----
if (require.main === module) {
  // "Hello world" streamed token by token, with one line deliberately
  // split across a chunk boundary to simulate a real network split.
  const chunks = [
    'data: {"token":"Hello"}\n\n',
    'data: {"tok',                  // split mid-line here
    'en":" world"}\n\ndata: {"token":"!"}\n\n',
    'data: [DONE]\n\n',
  ];

  const result = parseSSEChunks(chunks);
  console.log(result);

  const pass = JSON.stringify(result) === JSON.stringify(["Hello", " world", "!"]);
  console.log(pass ? "PASS" : "FAIL");
}
