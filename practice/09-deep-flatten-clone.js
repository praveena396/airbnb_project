/**
 * Topic: Recursion
 *
 * 1. deepFlatten(arr): flattens an arbitrarily nested array into a
 *    single-level array.
 * 2. deepClone(obj): creates a full deep copy of a nested object/array
 *    (no shared references) WITHOUT using JSON.parse(JSON.stringify(...)).
 *
 * Useful for normalizing nested API responses, e.g. a listing object
 * containing nested review/host objects.
 */

function deepFlatten(arr) {
  // TODO: implement
  throw new Error("not implemented");
}

function deepClone(obj) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { deepFlatten, deepClone };

// ---- quick manual test runner ----
if (require.main === module) {
  const nested = [1, [2, [3, 4], 5], [[6]], 7];
  const flattened = deepFlatten(nested);
  console.log("Flattened:", flattened);
  console.log(
    JSON.stringify(flattened) === JSON.stringify([1, 2, 3, 4, 5, 6, 7]) ? "PASS (flatten)" : "FAIL (flatten)"
  );

  const original = {
    listingName: "Cozy Cabin",
    host: { name: "Alex", contact: { email: "alex@example.com" } },
    reviews: [{ rating: 5 }, { rating: 4 }],
  };

  const cloned = deepClone(original);
  cloned.host.contact.email = "changed@example.com";
  cloned.reviews[0].rating = 1;

  const unaffected =
    original.host.contact.email === "alex@example.com" && original.reviews[0].rating === 5;

  console.log("Original untouched after mutating clone:", unaffected);
  console.log(unaffected ? "PASS (clone)" : "FAIL (clone)");
}
