/**
 * Topic: System Design (idempotency — classic Stripe-style interview Q)
 *
 * Problem this solves in real systems: a client sends a "book this
 * home" or "charge this card" request, but the network is flaky, so
 * the client RETRIES the same request. Without protection, you'd
 * double-book the home or double-charge the card. The fix: the client
 * sends a unique `idempotencyKey` with the request; if you've already
 * handled that exact key before, return the SAME result instead of
 * re-running the operation.
 *
 * Implement an IdempotencyHandler class:
 *   new IdempotencyHandler(ttlMs)
 *   handler.handle(idempotencyKey, asyncFn) -> returns a Promise.
 *     - If this exact `idempotencyKey` was already handled within the
 *       last `ttlMs` milliseconds, return the CACHED result from that
 *       first call, WITHOUT calling asyncFn again.
 *     - If two calls with the SAME key happen concurrently (the 2nd
 *       request arrives before the 1st has finished), the 2nd call
 *       must wait for and reuse the 1st call's result, not trigger a
 *       second real execution (same "dedupe in-flight" idea as 25).
 *     - If the key has never been seen, or its TTL has expired, run
 *       asyncFn(), cache the result under this key, and return it.
 */

class IdempotencyHandler {
  constructor(ttlMs) {
    // TODO: implement
    throw new Error("not implemented");
  }

  async handle(idempotencyKey, asyncFn) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { IdempotencyHandler };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    let bookingCount = 0;
    const createBooking = async () => {
      bookingCount++;
      await new Promise((r) => setTimeout(r, 30));
      return { bookingId: `booking-${bookingCount}` };
    };

    const handler = new IdempotencyHandler(200);
    const checks = [];
    const check = (label, cond) => {
      checks.push(cond);
      console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
    };

    // Simulate the client retrying the SAME request (same key) while
    // the first attempt is still in flight.
    const [r1, r2] = await Promise.all([
      handler.handle("idem-key-1", createBooking),
      handler.handle("idem-key-1", createBooking),
    ]);
    check("concurrent retries with same key return same bookingId", r1.bookingId === r2.bookingId);
    check("only ONE real booking was created", bookingCount === 1);

    // A later retry (after the first finished) with the same key, still within TTL.
    const r3 = await handler.handle("idem-key-1", createBooking);
    check("later retry within TTL still returns cached result", r3.bookingId === r1.bookingId);
    check("still only ONE real booking created", bookingCount === 1);

    // A different key should create a genuinely new booking.
    const r4 = await handler.handle("idem-key-2", createBooking);
    check("different key creates a new booking", r4.bookingId !== r1.bookingId && bookingCount === 2);

    console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
  })();
}
