/**
 * Topic: API Design (real-world pagination, used by most production APIs)
 *
 * `?page=2&limit=20` ("offset pagination") breaks if items are
 * inserted/deleted between requests — page 2 can skip or repeat items.
 * Real APIs (Stripe, GitHub, etc.) use CURSOR pagination instead: an
 * opaque token representing "where you left off," usually encoding
 * the last item's unique sort key.
 *
 * Implement:
 *
 * encodeCursor(obj):
 *   - `obj` is a plain object (e.g. { id: 42, createdAt: "2024-01-01" }).
 *   - Return a base64-encoded string representing it (so clients treat
 *     it as an OPAQUE token — they shouldn't need to know or rely on
 *     its internal structure).
 *
 * decodeCursor(cursor):
 *   - Reverses encodeCursor — given the base64 string, return the
 *     original object back.
 *
 * paginate(items, cursor, pageSize):
 *   - `items` is a full, already-sorted array of { id, ...fields }.
 *   - `cursor` is either null (first page) or a cursor string from a
 *     PREVIOUS paginate() call's `nextCursor`.
 *   - Returns { page, nextCursor }:
 *     - `page`: the next `pageSize` items that come AFTER the item
 *       referenced by `cursor` (or the first `pageSize` items if
 *       cursor is null).
 *     - `nextCursor`: a cursor encoding the LAST item's id in `page`
 *       (for fetching the next page), or null if there are no more
 *       items after this page.
 */

function encodeCursor(obj) {
  // TODO: implement
  throw new Error("not implemented");
}

function decodeCursor(cursor) {
  // TODO: implement
  throw new Error("not implemented");
}

function paginate(items, cursor, pageSize) {
  // TODO: implement (use encodeCursor/decodeCursor internally)
  throw new Error("not implemented");
}

module.exports = { encodeCursor, decodeCursor, paginate };

// ---- quick manual test runner ----
if (require.main === module) {
  const checks = [];
  const check = (label, cond) => {
    checks.push(cond);
    console.log(`${label} -> ${cond ? "PASS" : "FAIL"}`);
  };

  check("encode/decode round-trip", JSON.stringify(decodeCursor(encodeCursor({ id: 42 }))) === JSON.stringify({ id: 42 }));

  const items = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, name: `Home ${i + 1}` }));

  const page1 = paginate(items, null, 4);
  console.log("Page 1:", page1.page.map((i) => i.id));
  check("page 1 has first 4 items", JSON.stringify(page1.page.map((i) => i.id)) === JSON.stringify([1, 2, 3, 4]));
  check("page 1 has a nextCursor", page1.nextCursor !== null);

  const page2 = paginate(items, page1.nextCursor, 4);
  console.log("Page 2:", page2.page.map((i) => i.id));
  check("page 2 continues from where page 1 left off", JSON.stringify(page2.page.map((i) => i.id)) === JSON.stringify([5, 6, 7, 8]));

  const page3 = paginate(items, page2.nextCursor, 4);
  console.log("Page 3:", page3.page.map((i) => i.id));
  check("page 3 has the remaining 2 items", JSON.stringify(page3.page.map((i) => i.id)) === JSON.stringify([9, 10]));
  check("page 3 has no nextCursor (end of data)", page3.nextCursor === null);

  console.log(checks.every(Boolean) ? "ALL PASS" : "SOME FAILED");
}
