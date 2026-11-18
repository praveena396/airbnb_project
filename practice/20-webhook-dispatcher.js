/**
 * Topic: System Design (webhooks, fan-out + retries)
 *
 * Implement dispatchWebhook(subscriberUrls, payload, send, retries):
 *   - `subscriberUrls` is an array of URLs (strings).
 *   - `send` is a function: send(url, payload) -> Promise. It simulates
 *     the actual HTTP call (and can fail).
 *   - For EVERY url, attempt to send(url, payload). If it fails, retry
 *     up to `retries` times for THAT url (each url's retries are
 *     independent of the others).
 *   - All urls are attempted CONCURRENTLY, not one at a time.
 *   - Returns a Promise that resolves with an array of per-url results,
 *     in the SAME ORDER as subscriberUrls:
 *       { url, status: "success" | "failed", attempts: number }
 *   - A url that still fails after using up all retries gets
 *     status: "failed" — this does NOT cause the whole function to
 *     reject; other urls' results are still reported.
 */

function dispatchWebhook(subscriberUrls, payload, send, retries) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { dispatchWebhook };

// ---- quick manual test runner ----
if (require.main === module) {
  const attemptsByUrl = {};

  // urlB always fails. urlA and urlC succeed on their 2nd attempt.
  const send = async (url, payload) => {
    attemptsByUrl[url] = (attemptsByUrl[url] || 0) + 1;
    if (url === "urlB") throw new Error("always fails");
    if (attemptsByUrl[url] < 2) throw new Error("fails once");
    return "ok";
  };

  dispatchWebhook(["urlA", "urlB", "urlC"], { event: "booking.created" }, send, 3).then((results) => {
    console.log(JSON.stringify(results, null, 2));

    const pass =
      results[0].url === "urlA" && results[0].status === "success" && results[0].attempts === 2 &&
      results[1].url === "urlB" && results[1].status === "failed" && results[1].attempts === 4 && // 1 initial + 3 retries
      results[2].url === "urlC" && results[2].status === "success" && results[2].attempts === 2;

    console.log(pass ? "PASS" : "FAIL");
  });
}
