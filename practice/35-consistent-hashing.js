/**
 * Topic: System Design (how data/requests get distributed across servers)
 *
 * Problem: if you route `key -> servers[hash(key) % servers.length]`,
 * then adding or removing ONE server changes `servers.length`, which
 * reshuffles almost EVERY key to a different server — terrible if
 * those servers are caches (near-total cache miss storm).
 *
 * Consistent hashing fixes this: servers (and keys) are placed on a
 * conceptual circle (a "hash ring"). A key maps to the first server
 * found walking clockwise from the key's position. Removing one
 * server only affects the keys that were mapped to IT — everyone
 * else's mapping is undisturbed.
 *
 * Implement a ConsistentHash class:
 *   new ConsistentHash(replicas)
 *     - `replicas`: how many positions on the ring each server occupies
 *       (multiple positions per server = more even distribution).
 *   ring.addNode(nodeId) -> adds a server to the ring.
 *   ring.removeNode(nodeId) -> removes a server from the ring.
 *   ring.getNode(key) -> returns which nodeId a given key maps to.
 *
 * You'll need a simple hash function (e.g. sum of char codes, or any
 * simple string->number hash) to place nodes/keys on the ring (use a
 * large range, e.g. 0 to 359 degrees, or 0 to 10000).
 */

class ConsistentHash {
  constructor(replicas) {
    // TODO: implement
    throw new Error("not implemented");
  }

  addNode(nodeId) {
    // TODO: implement
    throw new Error("not implemented");
  }

  removeNode(nodeId) {
    // TODO: implement
    throw new Error("not implemented");
  }

  getNode(key) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { ConsistentHash };

// ---- quick manual test runner ----
if (require.main === module) {
  const ring = new ConsistentHash(3);
  ring.addNode("server-A");
  ring.addNode("server-B");
  ring.addNode("server-C");

  const keys = ["home-1", "home-2", "home-3", "home-4", "home-5", "home-6", "home-7", "home-8"];
  const before = {};
  keys.forEach((k) => (before[k] = ring.getNode(k)));
  console.log("Before removing server-B:", before);

  ring.removeNode("server-B");

  const after = {};
  keys.forEach((k) => (after[k] = ring.getNode(k)));
  console.log("After removing server-B:", after);

  const changedCount = keys.filter((k) => before[k] !== after[k]).length;
  console.log(`Keys that changed server: ${changedCount} / ${keys.length}`);

  // Only keys that WERE on server-B should change. With a plain
  // `hash(key) % numServers` scheme, nearly ALL keys would change —
  // consistent hashing should keep this number small, roughly keys/numServers.
  const pass = changedCount > 0 && changedCount < keys.length;
  console.log(pass ? "PASS (partial remap, not a full reshuffle)" : "FAIL");
}
