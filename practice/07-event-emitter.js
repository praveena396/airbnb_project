/**
 * Topic: Callbacks / Design Pattern
 *
 * Implement a class EventEmitter with:
 *   - on(eventName, listener): subscribe listener to eventName
 *   - emit(eventName, ...args): call all listeners for eventName with args
 *   - off(eventName, listener): unsubscribe a specific listener
 *
 * This is the core pattern behind Node's built-in `events` module.
 */

class EventEmitter {
  constructor() {
    // TODO: set up internal storage for listeners
  }

  on(eventName, listener) {
    // TODO: implement
    throw new Error("not implemented");
  }

  emit(eventName, ...args) {
    // TODO: implement
    throw new Error("not implemented");
  }

  off(eventName, listener) {
    // TODO: implement
    throw new Error("not implemented");
  }
}

module.exports = { EventEmitter };

// ---- quick manual test runner ----
if (require.main === module) {
  const emitter = new EventEmitter();
  const received = [];

  const onBooked = (listingName) => received.push(`booked: ${listingName}`);
  const onBookedTwice = (listingName) => received.push(`notified-again: ${listingName}`);

  emitter.on("booking:confirmed", onBooked);
  emitter.on("booking:confirmed", onBookedTwice);

  emitter.emit("booking:confirmed", "Cozy Cabin");

  emitter.off("booking:confirmed", onBookedTwice);
  emitter.emit("booking:confirmed", "Beach House");

  console.log("Received events:", received);
  const expected = [
    "booked: Cozy Cabin",
    "notified-again: Cozy Cabin",
    "booked: Beach House",
  ];
  console.log(JSON.stringify(received) === JSON.stringify(expected) ? "PASS" : "FAIL");
}
