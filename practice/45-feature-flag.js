/**
 * Topic: Backend patterns (real feature-flag / gradual-rollout systems,
 * e.g. LaunchDarkly, GrowthBook, Statsig — this is literally the core
 * mechanic underneath them)
 *
 * Problem: you want to roll a new feature out to e.g. 25% of users,
 * NOT randomly on every request (the same user should consistently
 * get the same answer every time they check), but spread evenly
 * across your user base.
 *
 * Implement a FeatureFlagEvaluator class:
 *   new FeatureFlagEvaluator()
 *   evaluator.setFlag(flagName, rolloutPercent) -> configures a flag
 *     (0-100).
 *   evaluator.isEnabled(flagName, userId) -> returns true/false,
 *     DETERMINISTICALLY based on (flagName, userId) — the SAME
 *     (flagName, userId) pair must ALWAYS return the same answer
 *     (don't use Math.random()!). Roughly `rolloutPercent`% of all
 *     possible userIds should get `true`, spread evenly (not just
 *     "the first N users" or anything clustered).
 *   - Unknown flag name -> isEnabled should return false.
 *
 * Hint: hash `flagName + userId` into a number, then check if
 * `hash % 100 < rolloutPercent`. A decent string hash (e.g. summing
 * char codes with a multiplier, like you may have used in the Bloom
 * filter) is enough here.
 */

class FeatureFlagEvaluator {
  constructor() {
    // TODO: implement
    throw new Error("not implemented");
  }

  setFlag(flagName, rolloutPercent) {
    // TODO: implement
    throw new Error("not implemented");
  }

  isEnabled(flagName, userId) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { FeatureFlagEvaluator };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  const evaluator = new FeatureFlagEvaluator();
  evaluator.setFlag("new-booking-ui", 30);

  check("unknown flag returns false", evaluator.isEnabled("unknown-flag", "user-1") === false);

  const first = evaluator.isEnabled("new-booking-ui", "user-42");
  const second = evaluator.isEnabled("new-booking-ui", "user-42");
  check("same (flag, user) is deterministic across calls", first === second);

  // Roughly 30% of 1000 simulated users should get `true` (allow a
  // generous range since this is a simple hash, not a perfect RNG).
  let enabledCount = 0;
  for (let i = 0; i < 1000; i++) {
    if (evaluator.isEnabled("new-booking-ui", `user-${i}`)) enabledCount++;
  }
  console.log(`Enabled for ${enabledCount} / 1000 simulated users (expected roughly ~300)`);
  check("rollout percentage is roughly correct", enabledCount > 150 && enabledCount < 450);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
