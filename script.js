/* ══════════════════════════════════════════════════════
     1. FitText
        Grows the title until it fills the viewport width.
        Calls positionSideTexts() once font-size is known.
  ══════════════════════════════════════════════════════ */
(function FitText() {
  const el = document.getElementById("heroTitle");
  if (!el) return;

  function fit() {
    el.style.fontSize = "10px";

    const maxW = document.documentElement.clientWidth;
    let lo = 10,
      hi = 900;

    while (hi - lo > 0.25) {
      const mid = (lo + hi) / 2;
      el.style.fontSize = mid + "px";
      el.scrollWidth <= maxW ? (lo = mid) : (hi = mid);
    }

    el.style.fontSize = lo - 1 + "px";

    // After size is locked, place the side texts correctly
    positionSideTexts();
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit);
  } else {
    window.addEventListener("load", fit);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fit, 60);
  });

  fit();
})();

/* ══════════════════════════════════════════════════════
     2. positionSideTexts
        Measures the rendered bottom edge of the title and
        places both side texts just below it with a gap.
        Capped so they never go below 68% of the hero-body.

        On mobile (≤640px) CSS handles positioning instead
        (bottom corners), so JS skips those screens.
  ══════════════════════════════════════════════════════ */
function positionSideTexts() {
  const title = document.getElementById("heroTitle");
  const heroBody = document.querySelector(".hero-body");
  const left = document.getElementById("sideLeft");
  const right = document.getElementById("sideRight");

  if (!title || !heroBody || !left || !right) return;

  // Let CSS handle it on mobile
  if (window.innerWidth <= 640) return;

  const hRect = heroBody.getBoundingClientRect();
  const tRect = title.getBoundingClientRect();

  const gap = 30; // px below title
  const computed = tRect.bottom - hRect.top + gap;
  const cap = hRect.height * 0.68; // never below 68%
  const topPx = Math.min(computed, cap);

  [left, right].forEach((el) => {
    el.style.top = topPx + "px";
    el.style.transform = "none";
  });
}

/* ══════════════════════════════════════════════════════
     3. Scroll CTA
  ══════════════════════════════════════════════════════ */
document.getElementById("scrollCta")?.addEventListener("click", () => {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
});

/* ══════════════════════════════════════════════════════
     4. Active nav highlight on scroll
  ══════════════════════════════════════════════════════ */
(function NavHighlight() {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id,
            ),
          );
        }
      }),
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );

  sections.forEach((sec) => observer.observe(sec));
})();

/* ══════════════════════════════════════
   Process connector — draws smooth
   bezier path + dots between cards
══════════════════════════════════════ */
function drawProcessLine() {
  const cards = document.querySelectorAll(".process-card");
  const svg = document.getElementById("processConnector");
  const path = document.getElementById("processPath");
  const section = document.querySelector(".process");
  if (!cards.length || !svg || !path || !section) return;
  if (window.innerWidth <= 960) return;

  svg.querySelectorAll("circle").forEach((c) => c.remove());

  const secRect = section.getBoundingClientRect();
  const points = [];

  // Sort cards by data-phase so path always goes 1→2→3→4→5
  const sorted = Array.from(cards).sort(
    (a, b) => +a.dataset.phase - +b.dataset.phase,
  );

  sorted.forEach((card) => {
    const r = card.getBoundingClientRect();
    points.push({
      x: r.left - secRect.left + r.width / 2,
      y: r.top - secRect.top + 44,
    });
  });

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p = points[i - 1];
    const c = points[i];
    const mx = (p.x + c.x) / 2;
    d += ` C ${mx} ${p.y}, ${mx} ${c.y}, ${c.x} ${c.y}`;
  }

  svg.setAttribute("viewBox", `0 0 ${secRect.width} ${secRect.height}`);
  path.setAttribute("d", d);

  points.forEach((pt) => {
    const dot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    dot.setAttribute("cx", pt.x);
    dot.setAttribute("cy", pt.y);
    dot.setAttribute("r", "5");
    svg.appendChild(dot);
  });
}

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => setTimeout(drawProcessLine, 120));
} else {
  window.addEventListener("load", () => setTimeout(drawProcessLine, 120));
}

let processTimer;
window.addEventListener("resize", () => {
  clearTimeout(processTimer);
  processTimer = setTimeout(drawProcessLine, 80);
});

/* ══════════════════════════
   FAQ Accordion
══════════════════════════ */
(function FAQ() {
  const items = document.querySelectorAll(".faq-item");

  items.forEach((item) => {
    item.querySelector(".faq-question").addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      // Close all items
      items.forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // Open the clicked one if it was closed
      if (!isOpen) {
        item.classList.add("open");
        item
          .querySelector(".faq-question")
          .setAttribute("aria-expanded", "true");
      }
    });
  });
})();

/* ══════════════════════
   Contact form
══════════════════════ */
(function ContactForm() {
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formSuccess");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fields = form.querySelectorAll("[required]");
    let valid = true;

    fields.forEach((field) => {
      field.style.borderColor = "";
      if (!field.value.trim()) {
        field.style.borderColor = "rgba(200, 50, 50, 0.5)";
        valid = false;
      }
    });

    if (!valid) return;

    // ── Wire up to Formspree / EmailJS here ──
    // For now: show success state
    form.classList.add("hidden");
    success.classList.add("visible");
  });
})();

/* ══════════════════════════════
   Project Modal
══════════════════════════════ */
(function ProjectModal() {
  const backdrop = document.getElementById("projectModal");
  const closeBtn = document.getElementById("modalClose");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");
  const modalLive = document.getElementById("modalLive");
  const modalBox = backdrop?.querySelector(".modal-box");

  if (!backdrop) return;

  function openModal(card) {
    const {
      title = "",
      desc = "",
      tech = "",
      live = "#",
      img = "",
    } = card.dataset;

    modalImg.src = img;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;

    // Build tech tags
    modalTags.innerHTML = "";
    tech.split(",").forEach((t) => {
      if (!t.trim()) return;
      const span = document.createElement("span");
      span.className = "modal-tag";
      span.textContent = t.trim();
      modalTags.appendChild(span);
    });

    // Live button — hide if no real link
    if (live && live !== "#") {
      modalLive.href = live;
      modalLive.style.display = "inline-flex";
    } else {
      modalLive.style.display = "none";
    }

    backdrop.classList.add("open");
    backdrop.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    // Scroll modal to top on reopen
    if (modalBox) modalBox.scrollTop = 0;
  }

  function closeModal() {
    backdrop.classList.remove("open");
    backdrop.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  // Open on card click
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", () => openModal(card));
  });

  // Close: button, backdrop click, Escape key
  closeBtn.addEventListener("click", closeModal);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("open")) closeModal();
  });
})();

/* ══════════════════════════════════════════
   Floating Hamburger Nav
══════════════════════════════════════════ */
(function FloatNav() {
  const floatNav = document.getElementById("floatNav");
  const hamburger = document.getElementById("floatHamburger");
  const heroNav = document.querySelector(".hero-nav");
  if (!floatNav || !hamburger || !heroNav) return;

  /* Show hamburger the moment the top navbar leaves the viewport */
  const navObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        /* Navbar back on screen — hide and close hamburger */
        floatNav.classList.remove("visible", "open");
        hamburger.setAttribute("aria-expanded", "false");
      } else {
        /* Navbar off screen — reveal hamburger */
        floatNav.classList.add("visible");
      }
    },
    { threshold: 0 },
  );
  navObserver.observe(heroNav);

  /* Toggle open / close on button click */
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = floatNav.classList.toggle("open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });

  /* Close when a link is clicked */
  document.querySelectorAll(".float-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      floatNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* Close when clicking anywhere outside the float nav */
  document.addEventListener("click", (e) => {
    if (!floatNav.contains(e.target)) {
      floatNav.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
    }
  });

  /* Keep active link in sync with scroll position */
  const floatLinks = document.querySelectorAll(".float-nav-link");
  const sections = document.querySelectorAll("section[id]");

  const sectionObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          floatLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + id,
            ),
          );
        }
      }),
    { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
  );
  sections.forEach((sec) => sectionObserver.observe(sec));
})();
