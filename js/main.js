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
  initForm();
});
