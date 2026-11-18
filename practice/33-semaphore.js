/**
 * Topic: Concurrency primitives (generalizes the limiting idea from
 * 16-job-queue.js into a standalone, reusable building block)
 *
 * Implement a Semaphore class:
 *   new Semaphore(maxConcurrent)
 *   sem.acquire() -> returns a Promise that resolves (with no value)
 *     once a "slot" is available. If all slots are taken, it waits in
 *     a FIFO queue.
 *   sem.release() -> frees up one slot. If anything is waiting in the
 *     queue, immediately hand the freed slot to the next one.
 *
 * A semaphore is the generic primitive underneath things like
 * JobQueue (16) and ConnectionPool (18) — those are really just "a
 * semaphore wrapping some specific resource." Here you build the bare
 * primitive itself: just slots, no resource object attached.
 */

class Semaphore {
  constructor(maxConcurrent) {
    // TODO: implement
    throw new Error("not implemented");
  }

  acquire() {
    // TODO: implement
    throw new Error("not implemented");
  }

  release() {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { Semaphore };

// ---- quick manual test runner ----
if (require.main === module) {
  const sem = new Semaphore(2);
  let activeCount = 0;
  let maxActiveSeen = 0;
  const log = [];

  const task = async (id, ms) => {
    await sem.acquire();
    activeCount++;
    maxActiveSeen = Math.max(maxActiveSeen, activeCount);
    log.push(`${id} started @${Date.now()}`);
    await new Promise((r) => setTimeout(r, ms));
    activeCount--;
    sem.release();
    log.push(`${id} finished @${Date.now()}`);
  };

  Promise.all([task("A", 100), task("B", 100), task("C", 100), task("D", 100)]).then(() => {
    console.log(log.join("\n"));
    console.log("Max concurrent:", maxActiveSeen);
    console.log(maxActiveSeen <= 2 ? "PASS" : "FAIL");
  });
}
