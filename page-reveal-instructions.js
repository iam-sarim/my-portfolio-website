/* ─────────────────────────────────────────────
   PAGE CONTENT REVEAL SCRIPT
   
   Reveals the .page-content div after the loading
   screen finishes. This ensures smooth transition
   from loading screen to full page content.
───────────────────────────────────────────── */

// Wait for the loading screen to finish
// The heroSection.js takes about 3-4 seconds total
// We'll add a listener to detect when loading is done

function revealPageContent() {
  const pageContent = document.querySelector('.page-content');
  if (pageContent) {
    // Add the revealed class after a short delay
    // This delay accounts for the loading screen fade-out
    setTimeout(() => {
      pageContent.classList.add('revealed');
    }, 100);
  }
}

// Listen for when the hero content becomes active
// This indicates loading is complete
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains('active')) {
      revealPageContent();
      observer.disconnect(); // Stop observing once done
    }
  });
});

// Start observing the hero content for class changes
window.addEventListener('DOMContentLoaded', () => {
  const heroContent = document.getElementById('heroContent');
  if (heroContent) {
    observer.observe(heroContent, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
});
