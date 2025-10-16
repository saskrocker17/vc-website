// Basic interactivity: mobile nav toggle, smooth scroll, simple contact form validation
document.addEventListener("DOMContentLoaded", function () {
  // Set footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  const navToggle = document.getElementById("nav-toggle");
  const primaryNav = document.getElementById("primary-nav");
  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      // toggle an attribute to control CSS display
      primaryNav.setAttribute("aria-hidden", String(expanded));
    });
    // ensure initial state
    primaryNav.setAttribute("aria-hidden", "true");
  }

  // Smooth scroll for same-page links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // close mobile nav if open
        if (primaryNav && window.getComputedStyle(navToggle).display !== "none") {
          primaryNav.setAttribute("aria-hidden", "true");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // Contact form simple client-side validation (does not send anywhere)
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = "Please fill out all fields.";
        status.style.color = "crimson";
        return;
      }
      // basic email pattern
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.style.color = "crimson";
        return;
      }

      // simulate send
      status.textContent = "Sending…";
      status.style.color = "inherit";

      setTimeout(() => {
        form.reset();
        status.textContent = "Thanks — your message was sent (demo only).";
        status.style.color = "green";
      }, 800);
    });
  }
});
