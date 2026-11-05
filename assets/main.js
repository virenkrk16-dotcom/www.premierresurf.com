(function () {
  "use strict";

  var header = document.getElementById("header");
  var navToggle = document.querySelector(".nav-toggle");
  var drawer = document.getElementById("mobile-nav");
  var scrim = document.querySelector(".drawer-scrim");
  var yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Mobile drawer ---------- */
  function setDrawer(open) {
    if (!drawer || !scrim || !navToggle) return;
    drawer.hidden = !open;
    scrim.hidden = !open;
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setDrawer(navToggle.getAttribute("aria-expanded") !== "true");
    });
  }
  if (scrim) scrim.addEventListener("click", function () { setDrawer(false); });

  if (drawer) {
    drawer.addEventListener("click", function (event) {
      if (event.target.closest("a")) setDrawer(false);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && drawer && !drawer.hidden) setDrawer(false);
  });

  /* ---------- Header shadow on scroll ---------- */
  function onScroll() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Before / after sliders ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".ba-frame"), function (frame) {
    var range = frame.querySelector(".ba-range");
    if (!range) return;

    function paint() {
      frame.style.setProperty("--pos", range.value + "%");
    }

    range.addEventListener("input", paint);
    paint();
  });

  /* ---------- Scroll reveal ---------- */
  var revealables = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Active nav link ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a[href^='#']"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").slice(1);
      return { link: link, section: id ? document.getElementById(id) : null };
    })
    .filter(function (item) { return item.section; });

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        sections.forEach(function (item) {
          item.link.classList.toggle("is-active", item.section === entry.target);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (item) { navObserver.observe(item.section); });
  }
})();
