// Same throttle implementation you wrote in practice/02-throttle.js
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
    console.log("Scroll position:", window.scrollY);
  };

  const throttledScroll = throttle(handleScroll, 200);
  window.addEventListener("scroll", throttledScroll);

  backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
