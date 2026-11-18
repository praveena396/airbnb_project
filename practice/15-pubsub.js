/**
 * Topic: Design patterns (Pub/Sub, broader than a basic EventEmitter)
 *
 * Implement a PubSub class:
 *   new PubSub()
 *   pubsub.subscribe(eventName, handler) -> returns an `unsubscribe`
 *     function. Calling it removes this specific handler.
 *   pubsub.publish(eventName, data) -> calls every handler currently
 *     subscribed to eventName, passing `data`.
 *
 * Requirements:
 *   - Multiple handlers can subscribe to the same event; all should run.
 *   - Different events are independent (publishing "a" never calls
 *     handlers subscribed to "b").
 *   - unsubscribe() must only remove THAT ONE handler, not others.
 *   - publish() on an event with zero subscribers should just do nothing
 *     (not throw).
 */

class PubSub {
  constructor() {
    // TODO: implement
    throw new Error("not implemented");
  }

  subscribe(eventName, handler) {
    // TODO: implement
    throw new Error("not implemented");
  }

  publish(eventName, data) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { PubSub };

// ---- quick manual test runner ----
if (require.main === module) {
  const bus = new PubSub();
  const log = [];

  const unsubA1 = bus.subscribe("booking", (data) => log.push(`A1 got ${data}`));
  bus.subscribe("booking", (data) => log.push(`A2 got ${data}`));
  bus.subscribe("payment", (data) => log.push(`B1 got ${data}`));

  bus.publish("booking", "home#1");
  bus.publish("payment", "txn#1");
  bus.publish("unknown-event", "should do nothing");

  unsubA1(); // remove only A1
  bus.publish("booking", "home#2");

  console.log(log.join("\n"));

  const pass =
    log.includes("A1 got home#1") &&
    log.includes("A2 got home#1") &&
    log.includes("B1 got txn#1") &&
    !log.includes("A1 got home#2") && // A1 was unsubscribed
    log.includes("A2 got home#2"); // A2 still subscribed

  console.log(pass ? "PASS" : "FAIL");
}
