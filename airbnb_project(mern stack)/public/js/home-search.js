// Debounce: only run `fn` after `delay` ms of silence since the last call.
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
    console.log(`[debounced] filtering homes for: "${value}"`);
    filterHomeCards(value);
  }, 300);

  searchInput.addEventListener("input", (e) => {
    debouncedFilter(e.target.value);
  });
});
