// Receivio landing page.
// Everything here is optional: without JavaScript the abstract shows in
// full and the theme follows the system setting.

// ---------- Theme toggle ----------

const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");

function currentTheme() {
  if (root.dataset.theme) return root.dataset.theme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

themeButton.hidden = false;
themeButton.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch (e) {
    // Storage blocked (private mode): the choice lasts for this visit only.
  }
});

// ---------- Abstract "Read more" ----------

const abstract = document.getElementById("abstract");
const readMore = document.querySelector('[aria-controls="abstract"]');

function setAbstractOpen(open) {
  abstract.classList.toggle("collapsed", !open);
  readMore.setAttribute("aria-expanded", String(open));
  readMore.textContent = open ? "Read less" : "Read more";
}

readMore.hidden = false;
setAbstractOpen(false);
readMore.addEventListener("click", () => {
  setAbstractOpen(readMore.getAttribute("aria-expanded") !== "true");
});

// ---------- Motion ----------
// Skipped entirely when the visitor asks for reduced motion.

const motionOK = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

if (motionOK) {
  // Scroll reveal: fade sections up as they enter the screen.
  // Items in the same group appear one after another.
  const groups = [
    ".section .eyebrow",
    ".section h2",
    ".cards .card",
    ".steps li",
    ".section .note",
    ".team li",
  ];

  const revealItems = [];
  groups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => {
      const siblings = Array.from(el.parentElement.children);
      const index = siblings.filter((s) => s.matches(selector)).indexOf(el);
      el.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 0.09}s`);
      el.classList.add("reveal");
      revealItems.push(el);
    });
  });

  if ("IntersectionObserver" in window) {
    root.classList.add("js-motion");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("in");
          observer.unobserve(el);
          // Once shown, drop the reveal styles so hover effects run normally.
          setTimeout(() => {
            el.classList.remove("reveal", "in");
            el.style.removeProperty("--reveal-delay");
          }, 1500);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );
    revealItems.forEach((el) => observer.observe(el));
  }

  // Vault demo: every few seconds the reserved slot receives a parcel,
  // the toast announces it, an old parcel is picked up, and a free slot
  // is reserved for the next round.
  const slots = Array.from(document.querySelectorAll(".slot"));
  const toast = document.querySelector(".toast");
  const toastText = toast && toast.querySelector("span");

  function pick(state) {
    const matches = slots.filter((s) =>
      state === "free"
        ? !s.classList.contains("busy") && !s.classList.contains("reserved")
        : s.classList.contains(state)
    );
    return matches[Math.floor(Math.random() * matches.length)];
  }

  function deliver() {
    if (document.hidden) return;
    const reserved = pick("reserved");
    const pickedUp = pick("busy");
    if (!reserved || !pickedUp) return;

    reserved.classList.replace("reserved", "busy");
    reserved.classList.remove("flash");
    void reserved.offsetWidth; // restart the flash animation
    reserved.classList.add("flash");

    if (toast && toastText) {
      toastText.textContent = `Your parcel is in vault ${reserved.textContent}.`;
      toast.classList.remove("again");
      void toast.offsetWidth;
      toast.classList.add("again");
    }

    setTimeout(() => {
      pickedUp.classList.remove("busy");
      const next = pick("free");
      if (next) next.classList.add("reserved");
    }, 1600);
  }

  setTimeout(() => setInterval(deliver, 4000), 2000);
}
