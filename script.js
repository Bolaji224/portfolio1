// DOM Elements
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const nav = document.getElementById('nav');
const themeToggle = document.getElementById('themeToggle');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
mobileMenuToggle?.addEventListener('click', () => {
  mobileMenuToggle.classList.toggle('active');
  nav.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuToggle?.classList.remove('active');
    nav.classList.remove('active');
  });
});

// Theme Toggle
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// Load saved theme preference
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('darkMode');
  if (savedTheme === 'true') {
    document.body.classList.add('dark-mode');
  }
});

// Smooth scrolling for navigation links
function smoothScrollToSection(targetId) {
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    const targetPosition = targetSection.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
}

// Handle navigation link clicks
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    smoothScrollToSection(targetId);
  });
});

// Active navigation highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// Run highlighting on scroll
window.addEventListener('scroll', updateActiveNavLink);

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Scroll reveal animation
const revealEls = document.querySelectorAll('[data-reveal]');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (revealEls.length) {
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => revealObserver.observe(el));
  }
}

// EmailJS contact form
// TODO: Replace these with your real EmailJS credentials from https://dashboard.emailjs.com
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

if (window.emailjs) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!window.emailjs) {
    console.error('EmailJS SDK failed to load.');
    return;
  }

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, contactForm)
    .then(() => {
      submitBtn.textContent = 'Message Sent!';
      contactForm.reset();
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 3000);
    })
    .catch((error) => {
      console.error('EmailJS error:', error);
      submitBtn.textContent = 'Failed — try again';
      submitBtn.disabled = false;
      setTimeout(() => {
        submitBtn.textContent = originalText;
      }, 3000);
    });
});
