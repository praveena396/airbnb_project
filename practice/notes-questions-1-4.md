# Practice Notes — Questions 1-4

Core function implementation for each concept, followed by where (and whether)
it was applied as a real feature in the airbnb MERN project.

---

## Question 1: Debounce

**Problem it solves:** Some user actions (typing in a search box) fire events
dozens of times per second. Running expensive logic on every keystroke wastes
resources. Debounce delays running a function until the triggering events
have stopped for a set period — each new call resets the timer.

**Core function** (`practice/01-debounce.js`)
```js
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

**Real implementation** (`public/js/home-search.js`, wired into `home-list.ejs`)
```js
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function filterHomeCards(query) {
  const normalized = query.trim().toLowerCase();
  const cards = document.querySelectorAll("[data-home-card]");
  cards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const location = card.dataset.location.toLowerCase();
    const matches = name.includes(normalized) || location.includes(normalized);
    card.style.display = matches ? "" : "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("home-search-input");
  if (!searchInput) return;

  const debouncedFilter = debounce((value) => {
    filterHomeCards(value);
  }, 300);

  searchInput.addEventListener("input", (e) => {
    debouncedFilter(e.target.value);
  });
});
```

**Feature shipped:** Search-as-you-type filter on the homes list — waits
300ms after the user stops typing before filtering cards by name/location,
instead of filtering on every keystroke.

---

## Question 2: Throttle

**Problem it solves:** Continuous events (scrolling) fire constantly. Unlike
debounce, you don't want to wait for the activity to *stop* — you want
updates at a steady, capped rate the whole time. Throttle guarantees a
function runs at most once every N ms, no matter how often the event fires.

**Core function** (`practice/02-throttle.js`)
```js
function throttle(fn, limit) {
  let inCooldown = false;
  return function (...args) {
    if (!inCooldown) {
      fn.apply(this, args);
      inCooldown = true;
      setTimeout(() => {
        inCooldown = false;
      }, limit);
    }
  };
}
```

**Real implementation** (`public/js/back-to-top.js`)
```js
function throttle(fn, limit) {
  let inCooldown = false;
  return function (...args) {
    if (!inCooldown) {
      fn.apply(this, args);
      inCooldown = true;
      setTimeout(() => {
        inCooldown = false;
      }, limit);
    }
  };
}

document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (!backToTopBtn) return;

  const handleScroll = () => {
    backToTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
  };

  const throttledScroll = throttle(handleScroll, 200);
  window.addEventListener("scroll", throttledScroll);

  backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
```

**Feature shipped:** Back-to-top button on the homes list — scroll-triggered
show/hide logic runs at most once every 200ms instead of on every scroll
event; clicking smooth-scrolls the page to the top.

---

## Question 3: `Promise.all`

**Problem it solves:** Running several independent async operations
concurrently and only proceeding once ALL of them have finished, with
results in the original order (even if they finish out of order internally).
Fails immediately if any one fails.

**Core function** (`practice/03-promise-all.js`)
```js
function promiseAll(promisesArray) {
  return new Promise((resolve, reject) => {
    if (promisesArray.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promisesArray.length);
    let completedCount = 0;

    promisesArray.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => {
          results[index] = value;
          completedCount++;
          if (completedCount === promisesArray.length) {
            resolve(results);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
  });
}
```

**Real implementation:** None yet — practice only, not yet applied to a
feature in the project.

---

## Question 4: `Promise.race` and `Promise.any`

**Problem they solve:** Care about speed over completeness.
- `Promise.race`: settles as soon as the FIRST operation finishes (success
  or failure). Used for timeouts — race a real operation against a timer.
- `Promise.any`: settles on the first SUCCESS; only fails if every attempt
  fails. Used for redundancy across equivalent sources.

**Core functions** (`practice/04-promise-race-any.js`)
```js
function promiseRace(promisesArray) {
  return new Promise((resolve, reject) => {
    promisesArray.forEach((p) => {
      Promise.resolve(p).then(
        (value) => resolve(value),
        (reason) => reject(reason)
      );
    });
  });
}

function promiseAny(promisesArray) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors = [];

    promisesArray.forEach((p, index) => {
      Promise.resolve(p).then(
        (value) => resolve(value),
        (reason) => {
          errors[index] = reason;
          rejectedCount++;
          if (rejectedCount === promisesArray.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        }
      );
    });
  });
}
```

**Real implementation** (`controllers/storeController.js`)
```js
const withTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms)
  );
  return Promise.race([promise, timeout]);
};

exports.getHomes = async (req, res, next) => {
  try {
    const registeredHomes = await withTimeout(Home.find(), 5000);
    res.render("store/home-list", {
      registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  } catch (err) {
    console.log("Error loading homes: ", err);
    res.status(500).send("Something went wrong loading homes. Please try again.");
  }
};
```

**Feature shipped:** Timeout-protected database query on the homes list
endpoint — races the real MongoDB query against a 5-second timer using
`Promise.race`, so a slow/hung DB returns a clean error instead of hanging
the request indefinitely.
