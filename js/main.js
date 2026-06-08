/* Mr. Sparkle — Main JS */

// ---- Dark mode toggle ----
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root   = document.documentElement;
  let theme    = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function setTheme(t) {
    theme = t;
    root.setAttribute('data-theme', t);
    if (toggle) {
      toggle.setAttribute('aria-label', 'Switch to ' + (t === 'dark' ? 'light' : 'dark') + ' mode');
      toggle.innerHTML = t === 'dark'
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  setTheme(theme);
  if (toggle) toggle.addEventListener('click', () => setTheme(theme === 'dark' ? 'light' : 'dark'));
})();

// ---- Sticky header scroll behavior ----
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > 60) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
    lastY = y;
  }, { passive: true });
})();

// ---- Mobile menu ----
(function () {
  const toggle  = document.querySelector('.nav-hamburger');
  const mobile  = document.querySelector('.nav-mobile');
  if (!toggle || !mobile) return;

  toggle.addEventListener('click', () => {
    const open = mobile.classList.toggle('nav-mobile--open');
    toggle.setAttribute('aria-expanded', open);
    toggle.innerHTML = open
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
  });

  // Close on link click
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobile.classList.remove('nav-mobile--open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });
  });
})();

// ---- Active nav link ----
(function () {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

// ---- Quote form handler ----
(function () {
  const form = document.querySelector('.quote-form-el');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formEl  = form.querySelector('.form-fields');
    const success = form.querySelector('.form-success');
    if (formEl)  formEl.style.display = 'none';
    if (success) success.classList.add('visible');
  });
})();

// ---- Simple scroll reveal ----
(function () {
  const els = document.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    observer.observe(el);
  });
})();
