/* ══════════════════════════════════════════════════════════════════════
   NAVBAR  (from navbar.js)
══════════════════════════════════════════════════════════════════════ */

// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
const mobileLinks = mobileMenu.querySelectorAll("a");
mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  });
});

// Add scrolled class to navbar on scroll
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});


/* ══════════════════════════════════════════════════════════════════════
   HERO SECTION  (from heroSection.js)
══════════════════════════════════════════════════════════════════════ */

// Code lines shown during loading
const codeLines = [
  '<span class="comment">// Building something amazing...</span>',
  '<span class="keyword">const</span> <span class="variable">developer</span> = {',
  '  <span class="variable">name</span>: <span class="string">\'Sarim Awan\'</span>,',
  '  <span class="variable">skills</span>: [<span class="string">\'React\'</span>, <span class="string">\'Node.js\'</span>, <span class="string">\'Next.js\'</span>],',
  '  <span class="variable">passion</span>: <span class="string">\'Creating amazing web experiences\'</span>',
  "};",
  "",
  '<span class="keyword">function</span> <span class="function-name">createAwesome</span>() {',
  '  <span class="keyword">return</span> <span class="string">\'Your vision, my code!\'</span>;',
  "}",
  '<span class="comment">// Ready to build your project!</span>',
  '<span class="function-name">createAwesome</span>();',
];

// Code-line typing (220 ms per line)
let currentLine = 0;

function typeCodeLine() {
  if (currentLine < codeLines.length) {
    const codeBox = document.getElementById("codeBox");
    const lineEl = document.createElement("div");
    lineEl.className = "code-line";
    lineEl.innerHTML = codeLines[currentLine];
    codeBox.appendChild(lineEl);

    setTimeout(() => lineEl.classList.add("active"), 30);

    currentLine++;
    const progress = Math.floor((currentLine / codeLines.length) * 100);
    updateLoadingBar(progress);

    const delay = codeLines[currentLine - 1] === "" ? 60 : 220;
    setTimeout(typeCodeLine, delay);
  } else {
    finishLoading();
  }
}

function updateLoadingBar(progress) {
  document.getElementById("loadingBarFill").style.width = progress + "%";
  document.getElementById("loadingText").textContent =
    `Initializing Portfolio... ${progress}%`;
}

// Transition from loading → hero
function finishLoading() {
  const codeBox = document.getElementById("codeBox");
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  codeBox.appendChild(cursor);

  setTimeout(() => {
    document.getElementById("loadingScreen").classList.add("hidden");

    setTimeout(() => {
      const hero = document.getElementById("heroContent");
      hero.classList.add("active");

      // Start subtitle typing effect once hero is visible
      setTimeout(startSubtitleTyping, 400);
    }, 350);
  }, 600);
}

// Subtitle typing effect for "loper"
// The static HTML already shows: "Full-Stack Web Deve"
// We animate typing "loper", deleting back to "lop", then retyping "per"
function startSubtitleTyping() {
  const suffix = document.getElementById("typed-suffix");
  const full = "loper";
  const deleteBack = "lop";
  let phase = "type"; // phases: type → delete → retype → done
  let idx = 0;

  function tick() {
    if (phase === "type") {
      if (idx <= full.length) {
        suffix.textContent = full.slice(0, idx);
        idx++;
        setTimeout(tick, idx === full.length + 1 ? 600 : 90);
      } else {
        phase = "delete";
        idx = full.length;
        setTimeout(tick, 600);
      }
    } else if (phase === "delete") {
      const stopAt = deleteBack.length;
      if (idx > stopAt) {
        idx--;
        suffix.textContent = full.slice(0, idx);
        setTimeout(tick, 80);
      } else {
        phase = "retype";
        setTimeout(tick, 300);
      }
    } else if (phase === "retype") {
      if (idx < full.length) {
        idx++;
        suffix.textContent = full.slice(0, idx);
        setTimeout(tick, 90);
      } else {
        // Done — hide the cursor after a pause
        phase = "done";
        setTimeout(() => {
          const cur = document.getElementById("typeCursor");
          if (cur) cur.style.display = "none";
        }, 1200);
      }
    }
  }

  tick();
}

// Init: start code typing after 400ms
setTimeout(typeCodeLine, 400);


/* ══════════════════════════════════════════════════════════════════════
   PAGE CONTENT REVEAL  (from page-reveal-instructions.js)
══════════════════════════════════════════════════════════════════════ */

// Reveals .page-content after the loading screen finishes.
// Watches for when heroContent gets the "active" class (set by finishLoading).
function revealPageContent() {
  const pageContent = document.querySelector(".page-content");
  if (pageContent) {
    setTimeout(() => {
      pageContent.classList.add("revealed");
    }, 100);
  }
}

// MutationObserver watches heroContent for class changes
const revealObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains("active")) {
      revealPageContent();
      revealObserver.disconnect(); // Stop observing once done
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.getElementById("heroContent");
  if (heroContent) {
    revealObserver.observe(heroContent, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }
});


/* ══════════════════════════════════════════════════════════════════════
   FAQ SECTION  (from FAQ/faq.js)
══════════════════════════════════════════════════════════════════════ */

const faqs = [
  {
    q: "What technologies do you specialize in, and what services do you offer?",
    a: "I specialize in modern full-stack development focused on building fast and scalable web applications, using modern AI tools for faster development and automated workflows. My core tech stack includes React, Next.js, Node.js, Express, MongoDB, and PostgreSQL. I also work with WordPress for CMS-based solutions, which is ideal for business websites and e-commerce stores.",
  },
  {
    q: "How do we get started?",
    a: "Simply reach out with a brief description of your project, what it is, what features you need, and your deadline. I'll review it and get back to you with questions, a rough timeline, and a quote.",
  },
  {
    q: "How long does a project usually take?",
    a: "Project timelines vary based on complexity. A simple WordPress business website typically takes 1–2 weeks, while a custom web application with different features can take 3–6+ weeks. I'll provide a clear, detailed timeline after understanding your exact requirements.",
  },
  {
    q: "What does your development process look like?",
    a: "I start by understanding your goals and requirements, then define the scope and timeline. From there, I move into design and development with regular updates, test across different devices, apply final revisions, and hand over full access upon launch. You'll always know where your project stands.",
  },
  {
    q: "Do you work with teams or just solo projects?",
    a: "I work both independently and as part of development teams. I'm comfortable collaborating with designers, project managers, and other developers to deliver the best result for your project.",
  },
  {
    q: "Who do you typically work with?",
    a: "I mostly work with startups, agencies, organizations and businesses of all sizes. This typically includes clients who want to grow their online presence with AI powered web solutions and automated workflows.",
  },
];

const faqList = document.getElementById("faqList");

faqs.forEach((faq, i) => {
  const item = document.createElement("div");
  item.className = "faq-item";
  item.innerHTML = `
    <button class="faq-question" aria-expanded="false" onclick="faqToggle(${i})">
      <span class="faq-question-text">${faq.q}</span>
      <span class="faq-icon">
        <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1,4 6,9 11,4"/>
        </svg>
      </span>
    </button>
    <div class="faq-answer">
      <div class="faq-answer-inner">
        <p class="faq-answer-text">${faq.a}</p>
      </div>
    </div>
  `;
  faqList.appendChild(item);
});

function faqToggle(index) {
  const items = document.querySelectorAll(".faq-item");
  const clickedItem = items[index];
  const isOpen = clickedItem.classList.contains("open");

  // Close all items
  items.forEach((el) => {
    el.classList.remove("open");
    el.querySelector("button").setAttribute("aria-expanded", "false");
    el.querySelector(".faq-answer").style.height = "0px";
  });

  // Open the clicked item if it was previously closed
  if (!isOpen) {
    clickedItem.classList.add("open");
    clickedItem.querySelector("button").setAttribute("aria-expanded", "true");
    const ans = clickedItem.querySelector(".faq-answer");
    const inner = ans.querySelector(".faq-answer-inner");
    ans.style.height = inner.scrollHeight + "px";
  }
}


/* ══════════════════════════════════════════════════════════════════════
   CONTACT FORM  (from Contact-section/contact.js)
══════════════════════════════════════════════════════════════════════ */

// EmailJS Initialization
emailjs.init("ClGMFRmOCX1vX2kJ4");

function sendEmail() {
  const name    = document.getElementById("name").value.trim();
  const email   = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const status  = document.getElementById("statusMsg");
  const btn     = document.getElementById("sendBtn");

  // Clear previous status
  status.className = "status-msg";
  status.textContent = "";

  // Validate: all fields required
  if (!name || !email || !subject || !message) {
    status.className = "status-msg error";
    status.textContent = "⚠ Please fill in all fields before sending.";
    return;
  }

  // Validate: email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    status.className = "status-msg error";
    status.textContent = "⚠ Please enter a valid email address.";
    return;
  }

  // Loading state
  btn.disabled = true;
  btn.querySelector("span").textContent = "Sending…";

  // Send via EmailJS
  emailjs
    .send(
      "service_tfc8vky",
      "template_iq0a1a7",
      {
        from_name: name,
        reply_to:  email,
        subject:   subject,
        message:   message,
      }
    )
    .then(() => {
      status.className = "status-msg success";
      status.textContent = "✓ Message sent! I'll get back to you soon.";
      btn.querySelector("span").innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
        Send Message`;
      btn.disabled = false;
      // Clear the form
      document.getElementById("name").value    = "";
      document.getElementById("email").value   = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      status.className = "status-msg error";
      status.textContent = "✗ Failed to send. Please try again or email me directly.";
      btn.querySelector("span").innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
        Send Message`;
      btn.disabled = false;
    });
}
