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
    a: "I start by understanding your goals and requirements, then define the scope and timeline. From there, I move into design and development with regular updates, test across different devices, apply final revisions, and hand over full access upon launch. you’ll always know where your project stands.",
  },
  {
    q: "Do you work with teams or just solo projects?",
    a: "I work both independently and as part of development teams. I'm comfortable collaborating with designers, project managers, and other developers to deliver the best result for your project.",
  },
  {
    q: "Who do you typically work with?",
    a: "I mostly works with startups, agencies, organizations and business of all sizes. This typically includes clients who wants to grow their online presence with AI powered web solutions and automated workflows.",
  },
];

const list = document.getElementById("faqList");

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
  list.appendChild(item);
});

function faqToggle(index) {
  const items = document.querySelectorAll(".faq-item");
  const clickedItem = items[index];
  const isOpen = clickedItem.classList.contains("open");

  // Close all
  items.forEach((el) => {
    el.classList.remove("open");
    el.querySelector("button").setAttribute("aria-expanded", "false");
    const ans = el.querySelector(".faq-answer");
    ans.style.height = "0px";
  });

  // Open clicked if it was closed
  if (!isOpen) {
    clickedItem.classList.add("open");
    clickedItem.querySelector("button").setAttribute("aria-expanded", "true");
    const ans = clickedItem.querySelector(".faq-answer");
    const inner = ans.querySelector(".faq-answer-inner");
    ans.style.height = inner.scrollHeight + "px";
  }
}
