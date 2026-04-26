/* ── Code lines shown during loading ── */
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

/* ── Code-line typing (faster: 220 ms per line) ── */
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

/* ── Transition from loading → hero ── */
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

      /* Start subtitle typing effect once hero is visible */
      setTimeout(startSubtitleTyping, 400);
    }, 350);
  }, 600);
}

/* ── Subtitle typing effect for "loper" ──
           The static HTML already shows: Full-Stack Web Deve
           We animate typing "loper", deleting it, then retyping it.
        ── */
function startSubtitleTyping() {
  const suffix = document.getElementById("typed-suffix");
  const full = "loper"; // text to type
  const deleteBack = "lop"; // delete back to keep "deve" + "lo" visible, retype "per"
  let phase = "type"; // phases: type → pause → delete → retype → done
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
      /* Delete back to "lop" leaving "deve" + "lo" → then retype "per" */
      const stopAt = deleteBack.length; // 3 chars stay → "lop"
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
        /* Done — hide the cursor after a pause */
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

/* ── Init ── */
setTimeout(typeCodeLine, 400);
