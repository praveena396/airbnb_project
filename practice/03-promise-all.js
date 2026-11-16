/**
 * Topic: Promises
 *
 * Implement promiseAll(promisesArray) mimicking native Promise.all.
 * - Resolves with an array of resolved values, in original order,
 *   once every promise/value has resolved.
 * - Rejects immediately with the first rejection reason.
 */

function promiseAll(promisesArray) {
  return new Promise((resolve, reject) => {
    if (promisesArray.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promisesArray.length);
    let completedCount = 0;

    promisesArray.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => {
          results[index] = value;
          completedCount++;
          if (completedCount === promisesArray.length) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}

module.exports = { promiseAll };

// ---- quick manual test runner ----
if (require.main === module) {
  const delay = (val, ms, shouldReject = false) =>
    new Promise((resolve, reject) =>
      setTimeout(() => (shouldReject ? reject(val) : resolve(val)), ms)
    );

  (async () => {
    try {
      const result = await promiseAll([delay(1, 100), delay(2, 50), delay(3, 150)]);
      console.log("Success case result:", result);
      console.log(
        JSON.stringify(result) === JSON.stringify([1, 2, 3]) ? "PASS (success case)" : "FAIL (success case)"
      );
    } catch (err) {
      console.log("FAIL (success case) - threw:", err);
    }

    try {
      await promiseAll([delay(1, 50), delay("boom", 20, true), delay(3, 100)]);
      console.log("FAIL (rejection case) - should have thrown");
    } catch (err) {
      console.log("Rejection case caught:", err);
      console.log(err === "boom" ? "PASS (rejection case)" : "FAIL (rejection case)");
    }
  })();
}
