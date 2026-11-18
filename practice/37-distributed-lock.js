/**
 * Topic: System Design (mutual exclusion across concurrent operations)
 *
 * Problem: two requests might try to modify the SAME resource at the
 * same time (e.g. two booking requests for the same home on the same
 * dates). A lock ensures only one holder at a time can proceed; others
 * wait their turn. "Distributed" here is simulated in-memory (a real
 * system would use Redis/DB-backed locks across multiple servers —
 * same core idea, just shared storage instead of a JS Map).
 *
 * Implement a DistributedLock class:
 *   new DistributedLock()
 *   lock.acquire(key, timeoutMs) -> returns a Promise that resolves
 *     with a `release()` function once the lock for `key` is obtained.
 *     - If `key` is already locked, wait in a FIFO queue until it's
 *       released.
 *     - If the current holder doesn't call release() within
 *       `timeoutMs`, auto-expire their lock (so one stuck/crashed
 *       process doesn't block everyone forever) and let the next
 *       queued waiter proceed.
 *
 * Different keys are completely independent locks.
 */

class DistributedLock {
  constructor() {
    // TODO: implement
    throw new Error("not implemented");
  }

  acquire(key, timeoutMs) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { DistributedLock };

// ---- quick manual test runner ----
if (require.main === module) {
  (async () => {
    const lock = new DistributedLock();
    const log = [];

    // Two "requests" racing for the SAME booking slot (same key).
    const bookHome = async (label, holdMs) => {
      const release = await lock.acquire("home-123-dates-nov20", 500);
      log.push(`${label} acquired lock @${Date.now()}`);
      await new Promise((r) => setTimeout(r, holdMs));
      log.push(`${label} released lock @${Date.now()}`);
      release();
    };

    await Promise.all([bookHome("requestA", 100), bookHome("requestB", 100)]);
    console.log(log.join("\n"));

    const aAcquired = log.findIndex((l) => l.startsWith("requestA acquired"));
    const aReleased = log.findIndex((l) => l.startsWith("requestA released"));
    const bAcquired = log.findIndex((l) => l.startsWith("requestB acquired"));

    // requestB must NOT acquire the lock before requestA released it.
    const pass = bAcquired > aReleased || aAcquired > log.findIndex((l) => l.startsWith("requestB released"));
    console.log(pass ? "PASS (mutual exclusion held)" : "FAIL (both held lock simultaneously)");
  })();
}
