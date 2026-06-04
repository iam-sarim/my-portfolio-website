/* ══════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════ */

// CSS handles smooth scroll — no JS needed
document.documentElement.style.scrollBehavior = "smooth";

const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const navbar = document.getElementById("navbar");

// Toggle mobile menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Close menu on link click (delegated — one listener instead of many)
mobileMenu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Close menu on outside click
document.addEventListener("click", (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove("active");
    mobileMenu.classList.remove("active");
  }
});

// Throttled scroll — runs at most once per animation frame
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle("scrolled", scrollY > 50);
        ticking = false;
      });
      ticking = true;
    }
  },
  { passive: true },
); // passive: true tells browser no preventDefault, allows scroll optimization

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

    // const delay = codeLines[currentLine - 1] === "" ? 60 : 220;
    const delay = codeLines[currentLine - 1] === "" ? 45 : 180;
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
      // }, 350);
    }, 280);
    // }, 600);
  }, 450);
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
// setTimeout(typeCodeLine, 400);
setTimeout(typeCodeLine, 320);

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
  });

  // Open the clicked item if it was previously closed
  if (!isOpen) {
    clickedItem.classList.add("open");
    clickedItem.querySelector("button").setAttribute("aria-expanded", "true");
  }
}

/* ══════════════════════════════════════════════════════════════════════
   CONTACT FORM  (from Contact-section/contact.js)
══════════════════════════════════════════════════════════════════════ */

// EmailJS Initialization
emailjs.init("ClGMFRmOCX1vX2kJ4");

function sendEmail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const status = document.getElementById("statusMsg");
  const btn = document.getElementById("sendBtn");

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
    .send("service_tfc8vky", "template_iq0a1a7", {
      from_name: name,
      reply_to: email,
      subject: subject,
      message: message,
    })
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
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("subject").value = "";
      document.getElementById("message").value = "";
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      status.className = "status-msg error";
      status.textContent =
        "✗ Failed to send. Please try again or email me directly.";
      btn.querySelector("span").innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>
        Send Message`;
      btn.disabled = false;
    });
}

/* ══════════════════════════════════════════════════════════════════════
   PROJECTS SECTION  (from Contact-section/contact.js)
══════════════════════════════════════════════════════════════════════ */

const projects = [
  {
    title: "SnapSend",
    category: "Full-Stack App",
    image: "images/projects/snapsend.svg",
    description:
      "A full-stack encrypted file-sharing platform where users can securely upload files, generate shareable links, and automatically notify recipients via email. Features drag-and-drop uploads, Google OAuth authentication, a file management dashboard, and cloud deployment on Vercel.",
    tech: [
      "Next.js 14",
      "Supabase",
      "Clerk",
      "Resend",
      "Vercel",
      "Tailwind CSS",
    ],
    liveUrl: "https://snapsends.vercel.app",
    // githubUrl: "https://github.com/iam-sarim/SnapSend-",
    gradient: "linear-gradient(135deg, #001a33 0%, #002d55 50%, #003366 100%)",
    fallbackInitials: "SS",
  },
  {
    title: "CodebaseAI",
    category: "AI-Powered App",
    image: "images/projects/codebase-ai-logo-watermark.png",
    description: `An AI-powered GitHub repository analysis platform. Paste any public repo link and the app generates a project summary, identifies the tech stack, produces an architectural diagram, and opens a context-aware chat so you can ask questions like "How does payment work?" or "What is the overall workflow?"`,
    tech: [
      "Next.js",
      "Supabase",
      "Groq AI",
      "Llama 3",
      "HuggingFace",
      "RAG Pipeline",
      "Vercel",
    ],
    liveUrl: "https://codebaseai.vercel.app",
    // githubUrl: "https://github.com/iam-sarim/CodeBase-AI",
    gradient: "linear-gradient(135deg, #000d1a 0%, #001a33 50%, #00264d 100%)",
    fallbackInitials: "CB",
  },
  // ── Add more projects here ──────────────────────────────────────────
  // {
  //   title: "My Next Project",
  //   category: "Full-Stack App",
  //   image: "images/projects/my-next-project.png",
  //   description: "Short description of what the project does.",
  //   tech: ["React", "Node.js", "MongoDB"],
  //   liveUrl: "https://my-project.vercel.app",
  //   githubUrl: "https://github.com/iam-sarim/my-next-project",
  //   gradient: "linear-gradient(135deg, #001a33, #002d55)",
  //   fallbackInitials: "MN",
  // },
];

/* ── Render ──────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";

    /* — Image or gradient fallback — */
    const imageHTML = project.image
      ? `<img
           src="${project.image}"
           alt="${project.title} screenshot"
           loading="lazy"
           decoding="async"
           onerror="
             this.style.display='none';
             this.parentNode.innerHTML='<div class=\\'project-img-fallback\\'>${project.fallbackInitials || project.title.slice(0, 2).toUpperCase()}</div>';
           "
         />`
      : `<div class="project-img-fallback">${project.fallbackInitials || project.title.slice(0, 2).toUpperCase()}</div>`;

    /* — Tech pills — */
    const techPillsHTML = project.tech
      .map((t) => `<span class="project-tech-pill">${t}</span>`)
      .join("");

    /* — CTA buttons — */
    const liveBtnHTML = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-primary">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
             <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
             <polyline points="15 3 21 3 21 9"/>
             <line x1="10" y1="14" x2="21" y2="3"/>
           </svg>
           Live Demo
         </a>`
      : "";

    const githubBtnHTML = project.githubUrl
      ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-btn project-btn-secondary">
           <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
             <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
           </svg>
           GitHub
         </a>`
      : "";

    card.innerHTML = `
      <div class="project-image-wrap" style="background: ${project.gradient || "linear-gradient(135deg, #001a33, #002d55)"}">
        ${imageHTML}
      </div>
      <div class="project-body">
        
        <h3 class="project-title">${project.title}</h3>
        <p class="project-description">${project.description}</p>
        <div class="project-tech-list">${techPillsHTML}</div>
      </div>
      <div class="project-footer">
        ${liveBtnHTML}
        ${githubBtnHTML}
      </div>
    `;

    grid.appendChild(card);
  });
}

renderProjects();
