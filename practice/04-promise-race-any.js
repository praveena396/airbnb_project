/**
 * Topic: Promises
 *
 * Implement promiseRace(promisesArray): settles (resolve/reject) as soon
 * as the FIRST promise in the array settles, matching native Promise.race.
 *
 * Stretch goal: implement promiseAny(promisesArray): resolves on the first
 * FULFILLED promise; only rejects if ALL promises reject.
 */

function promiseRace(promisesArray) {
  // TODO: implement
  throw new Error("not implemented");
}

function promiseAny(promisesArray) {
  // TODO (stretch): implement
  throw new Error("not implemented");
}

module.exports = { promiseRace, promiseAny };

// ---- quick manual test runner ----
if (require.main === module) {
  const delay = (val, ms, shouldReject = false) =>
    new Promise((resolve, reject) =>
      setTimeout(() => (shouldReject ? reject(val) : resolve(val)), ms)
    );

  (async () => {
    try {
      const winner = await promiseRace([delay("slow", 200), delay("fast", 50)]);
      console.log("Race winner:", winner);
      console.log(winner === "fast" ? "PASS (race)" : "FAIL (race)");
    } catch (err) {
      console.log("FAIL (race) - threw:", err);
    }

    try {
      const result = await promiseAny([
        delay("err1", 20, true),
        delay("win", 60),
        delay("err2", 100, true),
      ]);
      console.log("Any winner:", result);
      console.log(result === "win" ? "PASS (any)" : "FAIL (any)");
    } catch (err) {
      console.log("FAIL (any) - threw:", err);
    }
  })();
}
