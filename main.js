// Nav shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

// Highlight active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.timeline-item, .skill-group, .about-grid, .project-card');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => {
  el.classList.add('fade-in');
  fadeObserver.observe(el);
});

// Email obfuscation — assembles mailto at runtime so it doesn't sit as
// plain text in the HTML for bots to harvest
(function () {
  const u = 'benjamin.pasternak';
  const d = 'rutgers.edu';
  const addr = u + '@' + d;
  const mailto = 'mailto:' + addr;

  const btn = document.getElementById('contact-btn');
  if (btn) btn.href = mailto;

  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.href = mailto;
    emailLink.textContent = '✉ ' + addr;
  }
})();
