// Wrap everything in DOMContentLoaded to ensure DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Fix smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if open
        if (links.classList.contains("active")) {
          toggleMenu();
        }
      }
    });
  });

  // Improve typewriter effect
  const typewriterText = [
    "Software Developer",
    "Web Developer",
    "Tech Enthusiast",
  ];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriterElement = document.querySelector(".typewritter-text");

  function typeEffect() {
    if (!typewriterElement) return;

    const currentText = typewriterText[textIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriterElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % typewriterText.length;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Mobile menu functionality
  const menuToggle = document.getElementById("menuToggle");
  const links = document.querySelector(".links");
  const icon = menuToggle?.querySelector("i");

  function toggleMenu() {
    if (!menuToggle || !links || !icon) return;

    links.classList.toggle("active");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      links?.classList.contains("active") &&
      !e.target.closest(".nav-container")
    ) {
      toggleMenu();
    }
  });

  // Prevent menu close when clicking inside
  links?.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  // Start animations
  typeEffect();

  // Add scroll-based animations
  const observerOptions = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".service-item, .tech-item, .skill")
    .forEach((el) => {
      observer.observe(el);
    });
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Collect form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Email recipient
    const recipientEmail = "bolajimiracle6@gmail.com";

    // Construct mailto link
    const mailtoLink = `mailto:${recipientEmail}?subject=Contact Form Submission from ${name}&body=Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;

    // Open the mail client
    window.location.href = mailtoLink;
  });
