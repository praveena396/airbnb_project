/**
 * Topic: Recursion (common utility-function interview question)
 *
 * Implement deepEqual(a, b):
 *   - Returns true if a and b are deeply equal:
 *     - Primitives (numbers, strings, booleans, null, undefined):
 *       equal if === equal (NaN special case not required).
 *     - Arrays: equal if same length and every element is deepEqual.
 *     - Plain objects: equal if they have the SAME SET of keys (order
 *       doesn't matter) and every corresponding value is deepEqual.
 *   - Different types (e.g. an array vs. a plain object) -> false.
 *   - Must handle NESTED structures (objects containing arrays
 *     containing objects, arbitrarily deep).
 */

function deepEqual(a, b) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { deepEqual };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  check("primitives equal", deepEqual(5, 5) === true);
  check("primitives not equal", deepEqual(5, 6) === false);
  check("flat objects equal", deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }) === true);
  check("flat objects not equal (different value)", deepEqual({ a: 1 }, { a: 2 }) === false);
  check("different key sets", deepEqual({ a: 1 }, { a: 1, b: 2 }) === false);
  check("arrays equal", deepEqual([1, 2, 3], [1, 2, 3]) === true);
  check("arrays different order -> not equal", deepEqual([1, 2, 3], [3, 2, 1]) === false);

  const nested1 = { home: { name: "Beach Villa", amenities: ["pool", "wifi"] }, price: 200 };
  const nested2 = { home: { name: "Beach Villa", amenities: ["pool", "wifi"] }, price: 200 };
  const nested3 = { home: { name: "Beach Villa", amenities: ["pool", "parking"] }, price: 200 };
  check("deeply nested equal objects", deepEqual(nested1, nested2) === true);
  check("deeply nested different (one amenity differs)", deepEqual(nested1, nested3) === false);

  check("array vs object -> not equal", deepEqual([1, 2], { 0: 1, 1: 2 }) === false);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
