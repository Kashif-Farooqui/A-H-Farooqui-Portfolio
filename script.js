/* =============================================
   KASHIF FAROOQUI — PORTFOLIO JAVASCRIPT
   script.js
   ============================================= */

/* ---------- ACTIVE NAV LINK ON SCROLL ---------- */
const sections = document.querySelectorAll('section, #hero');
const navLinks = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));


/* ---------- SCROLL-IN ANIMATION FOR CARDS ---------- */
const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on element index within parent
      const siblings = Array.from(entry.target.parentElement.children);
      const index = siblings.indexOf(entry.target);
      entry.target.style.animationDelay = `${index * 0.08}s`;
      entry.target.classList.add('visible');
      animateOnScroll.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Apply to cards and timeline items
document.querySelectorAll(
  '.skill-chip, .timeline-item, .project-card, .edu-card'
).forEach(el => {
  el.classList.add('fade-in-card');
  animateOnScroll.observe(el);
});


/* ---------- INJECT FADE-IN-CARD CSS ---------- */
const style = document.createElement('style');
style.textContent = `
  .fade-in-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .fade-in-card.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .nav-links a.active {
    color: var(--accent);
  }
`;
document.head.appendChild(style);


/* ---------- NAV SHADOW ON SCROLL ---------- */
window.addEventListener('scroll', () => {
  const nav = document.querySelector('nav');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});


/* ---------- SMOOTH SCROLL FOR NAV LINKS ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});