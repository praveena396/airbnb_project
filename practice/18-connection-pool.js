/**
 * Topic: System Design (resource pooling, like a real DB connection pool)
 *
 * Implement a ConnectionPool class:
 *   new ConnectionPool(maxConnections)
 *   pool.acquire() -> returns a Promise that resolves with a "connection"
 *     object once one is available (if all are in use, waits in a queue).
 *   pool.release(connection) -> returns the connection to the pool, and
 *     immediately hands it to the next queued acquire() call, if any.
 *
 * The actual "connection" object can be anything simple (e.g.
 * { id: number }) — the point is limiting how many are checked out
 * at once and queueing the rest, same idea as a real DB driver's
 * connection pool.
 */

class ConnectionPool {
  constructor(maxConnections) {
    // TODO: implement
    throw new Error("not implemented");
  }

  acquire() {
    // TODO: implement
    throw new Error("not implemented");
  }

  release(connection) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { ConnectionPool };

// ---- quick manual test runner ----
if (require.main === module) {
  const pool = new ConnectionPool(2);
  const log = [];

  const useConnection = async (label, holdMs) => {
    const conn = await pool.acquire();
    log.push(`${label} acquired conn #${conn.id} @${Date.now()}`);
    await new Promise((r) => setTimeout(r, holdMs));
    pool.release(conn);
    log.push(`${label} released conn #${conn.id} @${Date.now()}`);
  };

  (async () => {
    // 3 requests, but only 2 connections -> the 3rd must wait for one to free up.
    await Promise.all([
      useConnection("req1", 100),
      useConnection("req2", 100),
      useConnection("req3", 50),
    ]);

    console.log(log.join("\n"));

    const req3AcquiredLine = log.find((l) => l.startsWith("req3 acquired"));
    const someReleaseBeforeReq3 = log.findIndex((l) => l.startsWith("req3 acquired")) >
      log.findIndex((l) => l.includes("released"));

    console.log(someReleaseBeforeReq3 ? "PASS (req3 waited for a release)" : "FAIL");
  })();
}
