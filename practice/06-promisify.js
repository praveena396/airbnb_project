/**
 * Topic: Callbacks -> Promises
 *
 * Given a Node-style callback function with signature (err, result) as its
 * LAST argument, implement promisify(fn) that returns a new function which
 * returns a Promise instead of accepting a callback.
 */

function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
}

module.exports = { promisify };

// ---- quick manual test runner ----
if (require.main === module) {
  // Mock of a Node-style callback API, e.g. like fs.readFile.
  function readListingNameCallbackStyle(id, callback) {
    setTimeout(() => {
      if (id === 0) {
        callback(new Error("Listing not found"));
      } else {
        callback(null, `Listing #${id}: Cozy Cabin`);
      }
    }, 100);
  }

  const readListingNamePromise = promisify(readListingNameCallbackStyle);

  (async () => {
    try {
      const name = await readListingNamePromise(42);
      console.log("Resolved:", name);
      console.log(name === "Listing #42: Cozy Cabin" ? "PASS (success case)" : "FAIL (success case)");
    } catch (err) {
      console.log("FAIL (success case) - threw:", err);
    }

    try {
      await readListingNamePromise(0);
      console.log("FAIL (error case) - should have thrown");
    } catch (err) {
      console.log("Rejected as expected:", err.message);
      console.log(err.message === "Listing not found" ? "PASS (error case)" : "FAIL (error case)");
    }
  })();
}
