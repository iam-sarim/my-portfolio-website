// ─── EmailJS Init (paste your Public Key here) ───
emailjs.init("ClGMFRmOCX1vX2kJ4"); // ← replace this

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

  // Validate fields
  if (!name || !email || !subject || !message) {
    status.className = "status-msg error";
    status.textContent = "⚠ Please fill in all fields before sending.";
    return;
  }

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
      "service_tfc8vky", // ← replace this
      "template_iq0a1a7", // ← replace this
      {
        from_name: name,
        reply_to: email,
        subject: subject,
        message: message,
      },
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
