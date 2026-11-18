/**
 * Topic: Concurrency control (worker pool)
 *
 * Implement a JobQueue class:
 *   new JobQueue(concurrency)
 *   queue.add(asyncFn) -> returns a Promise that resolves/rejects with
 *     asyncFn()'s result once it actually runs.
 *
 * Behavior:
 *   - At most `concurrency` jobs may run AT THE SAME TIME.
 *   - Extra jobs wait in a FIFO queue until a running job finishes.
 *   - As soon as a running job finishes (success OR failure), the next
 *     queued job should start immediately.
 *
 * Simulates limiting how many DB queries / outbound API calls run
 * concurrently, so you don't overwhelm a downstream service.
 */

class JobQueue {
  constructor(concurrency) {
    // TODO: implement
    throw new Error("not implemented");
  }

  add(asyncFn) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { JobQueue };

// ---- quick manual test runner ----
if (require.main === module) {
  const queue = new JobQueue(2); // at most 2 concurrent
  let activeCount = 0;
  let maxActiveSeen = 0;

  const makeJob = (id, ms) => async () => {
    activeCount++;
    maxActiveSeen = Math.max(maxActiveSeen, activeCount);
    await new Promise((r) => setTimeout(r, ms));
    activeCount--;
    return id;
  };

  Promise.all([
    queue.add(makeJob(1, 100)),
    queue.add(makeJob(2, 100)),
    queue.add(makeJob(3, 100)),
    queue.add(makeJob(4, 100)),
  ]).then((results) => {
    console.log("Results:", results);
    console.log("Max concurrent jobs seen:", maxActiveSeen);
    const pass =
      JSON.stringify(results) === JSON.stringify([1, 2, 3, 4]) &&
      maxActiveSeen <= 2;
    console.log(pass ? "PASS" : "FAIL");
  });
}
