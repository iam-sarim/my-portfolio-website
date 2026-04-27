const faqs = [
  {
    q: "What technologies do you specialize in?",
    a: "I specialize in <strong>Drupal</strong> as my primary CMS, along with <strong>PHP, JavaScript, and React</strong> for custom module and theme development. I'm also proficient in RESTful API integrations, DevOps workflows with Docker and CI/CD pipelines, and front-end performance optimization.",
  },
  {
    q: "How long does a typical Drupal project take?",
    a: "It depends on scope. A standard brochure site takes <strong>3–6 weeks</strong>, a mid-size project with custom modules runs <strong>6–12 weeks</strong>, and large enterprise builds can take <strong>3–6 months</strong>. I always provide a detailed timeline after a discovery call so you know exactly what to expect.",
  },
  {
    q: "Do you provide ongoing maintenance and support?",
    a: "Yes — I offer <strong>monthly retainer packages</strong> that cover security updates, module upgrades, performance monitoring, bug fixes, and priority support. Think of it as having a dedicated Drupal developer on call without the overhead of a full-time hire.",
  },
  {
    q: "What's your development process like?",
    a: "I follow an <strong>agile, milestone-based workflow</strong>: discovery → design handoff → iterative development sprints → QA & staging review → deployment. You get regular progress updates, access to a staging environment throughout, and a clear handoff document at the end.",
  },
  {
    q: "Do you work with teams or just solo projects?",
    a: "Both. I'm comfortable <strong>embedded in an existing team</strong> — working alongside designers, project managers, and other developers — or leading a project entirely from discovery to launch. I adapt to your workflow, whether that's Jira, Linear, Asana, or a simple Slack channel.",
  },
  {
    q: "Who do you typically work with?",
    a: "My clients range from <strong>digital agencies</strong> that need a reliable Drupal specialist to bring in on client projects, to <strong>mid-size companies</strong> and nonprofits looking to build or scale their web presence. If you need a thoughtful, experienced developer who communicates clearly, we'll probably be a great fit.",
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
