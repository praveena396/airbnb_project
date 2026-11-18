/**
 * Topic: Security basics (demystifying what the `jsonwebtoken` library
 * does, using Node's built-in `crypto`)
 *
 * A JWT is just: base64url(header) + "." + base64url(payload) + "." +
 * base64url(signature), where signature = HMAC-SHA256(header + "." +
 * payload, secret). Verifying it means: recompute that same signature
 * yourself with the secret, and check it matches what's in the token.
 * If someone tampers with the payload WITHOUT knowing the secret, their
 * signature won't match — that's the entire security guarantee.
 *
 * Implement:
 *
 * signJWT(payload, secret):
 *   - header = { alg: "HS256", typ: "JWT" } (always this exact object).
 *   - base64url-encode JSON.stringify(header) and JSON.stringify(payload).
 *   - signature = HMAC-SHA256 of `${encodedHeader}.${encodedPayload}`,
 *     using `secret`, base64url-encoded.
 *   - Return `${encodedHeader}.${encodedPayload}.${signature}`.
 *
 * verifyJWT(token, secret):
 *   - Split `token` into its 3 parts.
 *   - Recompute the expected signature the same way, using `secret`.
 *   - If it matches the token's actual signature, return the decoded
 *     payload object. If not (or the token is malformed), throw an
 *     Error like "Invalid signature".
 *
 * (base64url = base64 but with +/ replaced by -_ and no padding —
 * Buffer.from(str).toString("base64url") handles this directly in Node.)
 */

const crypto = require("crypto");

function signJWT(payload, secret) {
  // TODO: implement
  throw new Error("not implemented");
}

function verifyJWT(token, secret) {
  // TODO: implement
  throw new Error("not implemented");
}

module.exports = { signJWT, verifyJWT };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  const secret = "super-secret-key";
  const token = signJWT({ userId: 42, role: "host" }, secret);
  console.log("Token:", token);

  const decoded = verifyJWT(token, secret);
  check("verify with correct secret returns original payload", decoded.userId === 42 && decoded.role === "host");

  try {
    verifyJWT(token, "wrong-secret");
    checks.push(false);
    console.log("wrong secret should throw -> FAIL");
  } catch (err) {
    checks.push(true);
    console.log(`wrong secret throws: "${err.message}" -> PASS`);
  }

  // Tamper with the payload without re-signing -> should be rejected.
  const [h, p, s] = token.split(".");
  const tamperedPayload = Buffer.from(JSON.stringify({ userId: 999, role: "admin" })).toString("base64url");
  const tamperedToken = `${h}.${tamperedPayload}.${s}`;
  try {
    verifyJWT(tamperedToken, secret);
    checks.push(false);
    console.log("tampered payload should be rejected -> FAIL");
  } catch (err) {
    checks.push(true);
    console.log(`tampered payload rejected: "${err.message}" -> PASS`);
  }

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
