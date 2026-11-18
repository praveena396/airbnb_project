# Frontend practice (React) — kept short on purpose

These 3 are enough to credibly speak to React fundamentals in an
interview, without going deep. Each one reuses logic you've already
built in this folder — the only new part is wrapping it as a React
hook. You'll need an actual React app to run these (your airbnb
project is currently server-rendered EJS, not React) — these are
meant for whenever you start the React phase of your roadmap.

---

## 1. `useDebounce(value, delayMs)`

Reuses the exact debounce idea from `01-debounce.js`, but as a hook
instead of a plain function.

```jsx
function useDebounce(value, delayMs) {
  // TODO: return a `debouncedValue` that only updates `delayMs` after
  // `value` stops changing (e.g. for a search input that shouldn't
  // fire an API call on every keystroke).
}
```

**Manual test:** drop it into a search box component. Type fast —
`debouncedValue` (and any effect depending on it, like an API call)
should only update ~`delayMs` after you stop typing, not on every
keystroke.

---

## 2. `useFetch(url)`

```jsx
function useFetch(url) {
  // TODO: return { data, loading, error }.
  // - loading starts true, becomes false once the fetch settles.
  // - data holds the parsed response on success.
  // - error holds the error on failure.
  // - IMPORTANT: if the component unmounts (or `url` changes) before
  //   the fetch finishes, don't call setState on the old request's
  //   result — this is the realistic/tricky part (a common source of
  //   "setState on unmounted component" warnings and race conditions
  //   when url changes quickly, e.g. a user typing in a search box).
}
```

**Manual test:**
1. Use it in a component, confirm `loading` -> `data` transition works.
2. Change `url` rapidly (e.g. typing in a search box bound to it) and
   confirm the final rendered `data` matches the LAST url, not a
   stale earlier response that happened to resolve later (same
   "out-of-order resolution" issue you traced in `promiseAll`).

---

## 3. Controlled form with validation

```jsx
function BookingForm() {
  // TODO: controlled inputs (value + onChange wired to state) for at
  // least 2 fields (e.g. checkIn date, numberOfGuests).
  // - Show a validation error if numberOfGuests <= 0.
  // - Disable the submit button while the form is invalid.
}
```

**Manual test:** confirm the input's displayed value always matches
state (not just whatever the browser renders by default), and that
an invalid value disables submit without a page reload.
