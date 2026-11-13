/**
 * Topic: Arrays / Hash Map
 *
 * Given an array of integers `nums` and an integer `target`, return the
 * indices of the two numbers that add up to target. Exactly one solution
 * exists; you may not use the same element twice.
 *
 * Aim for O(n) using a hash map instead of brute-force O(n^2).
 */

function twoSum(nums, target) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { twoSum };

// ---- quick manual test runner ----
if (require.main === module) {
  const result1 = twoSum([2, 7, 11, 15], 9);
  console.log("Result:", result1);
  console.log(JSON.stringify(result1.sort()) === JSON.stringify([0, 1]) ? "PASS (case 1)" : "FAIL (case 1)");

  const result2 = twoSum([3, 2, 4], 6);
  console.log("Result:", result2);
  console.log(JSON.stringify(result2.sort()) === JSON.stringify([1, 2]) ? "PASS (case 2)" : "FAIL (case 2)");
}
