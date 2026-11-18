/**
 * Topic: Security basics (what bcrypt/argon2 actually do, demystified)
 *
 * NEVER store plain-text passwords. Also never just do a single plain
 * hash (e.g. sha256(password)) — identical passwords would produce
 * identical hashes, letting an attacker spot repeated passwords across
 * users, and precomputed "rainbow tables" could crack common ones
 * instantly. The fix: a random SALT per user, combined with the
 * password before hashing, so even identical passwords produce
 * completely different stored hashes.
 *
 * You're allowed (encouraged) to use Node's built-in `crypto` module
 * here — the point isn't to reinvent cryptographic hashing itself,
 * it's to understand the salt+hash+verify FLOW that a real password
 * system uses, instead of treating `bcrypt.hash()` as total magic.
 *
 * Implement:
 *
 * hashPassword(password):
 *   - Generate a random salt (e.g. crypto.randomBytes(16).toString("hex")).
 *   - Hash (password + salt) using crypto.createHash("sha256") (or
 *     crypto.pbkdf2Sync for something closer to real-world practice).
 *   - Return { salt, hash }.
 *
 * verifyPassword(password, salt, hash):
 *   - Re-hash (password + salt) the SAME way.
 *   - Return true if it matches the stored `hash`, false otherwise.
 */

const crypto = require("crypto");

function hashPassword(password) {
  // TODO: implement
  throw new Error("not implemented");
}

function verifyPassword(password, salt, hash) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { hashPassword, verifyPassword };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  const { salt, hash } = hashPassword("correct-password-123");

  check("correct password verifies successfully", verifyPassword("correct-password-123", salt, hash) === true);
  check("wrong password fails verification", verifyPassword("wrong-password", salt, hash) === false);

  const second = hashPassword("correct-password-123"); // SAME password, different call
  check("same password hashed twice produces DIFFERENT salts", second.salt !== salt);
  check("same password hashed twice produces DIFFERENT hashes (thanks to different salts)", second.hash !== hash);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
