/* ============================================================
   BASELINE CAPITAL — Main JS
   ============================================================ */

// ── MOBILE MENU ──
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.navbar-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });
}

// ── NAVBAR SCROLL SHADOW ──
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ── SCROLL REVEAL ──
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .step, .case-study, .stat, .about-text, .contact-info'
  );
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings inside the same grid/row
    const stagger = el.parentElement.querySelectorAll(':scope > .reveal');
    const idx = Array.from(stagger).indexOf(el);
    if (idx > 0) el.style.transitionDelay = `${idx * 80}ms`;
    observer.observe(el);
  });
}

// ── MEETING REQUEST FORM ──
function initForm() {
  const form = document.getElementById('meeting-form');
  if (!form) return;

  // EmailJS public key — replace with your Baseline Capital EmailJS key
  emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const params = {
      from_name:    form.client_name.value,
      from_email:   form.client_email.value,
      business:     form.business.value,
      site_type:    form.site_type.value,
      has_domain:   form.has_domain.value,
      budget:       form.budget.value,
      timeline:     form.timeline.value,
      project_desc: form.project_desc.value,
      meet_time:    form.meet_time.value,
    };

    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your EmailJS values
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params)
      .then(() => {
        form.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      })
      .catch(() => {
        btn.textContent = 'Send Request';
        btn.disabled = false;
        alert('Something went wrong. Please try again or email us directly.');
      });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavbarScroll();
  initScrollReveal();
  initForm();
});
