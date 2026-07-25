/* ==========================================================================
   MAIN.JS
   Core site behaviour: loading screen, sticky navbar + active link,
   mobile nav toggle, dark/light theme toggle (persisted), scroll progress
   bar, back-to-top button, smooth-scroll offset, dynamic footer year,
   and copy-email-to-clipboard.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------------- Loading screen ---------------- */
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader && loader.classList.add('hidden'), 350);
  });

  /* ---------------- Theme toggle (persisted in localStorage) ---------------- */
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem('portfolio-theme');

  if (savedTheme) {
    root.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    root.setAttribute('data-theme', 'light');
  }

  themeToggle?.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    const next = isLight ? 'dark' : 'light';
    if (next === 'dark') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', next);
    }
    localStorage.setItem('portfolio-theme', next);
  });

  /* ---------------- Navbar: scrolled state + mobile toggle ---------------- */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  function handleNavbarBackground() {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }
  handleNavbarBackground();

  navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navToggle?.classList.remove('active');
      navMenu?.classList.remove('active');
    });
  });

  /* ---------------- Scroll progress bar + navbar bg + active link + back-to-top ---------------- */
  const progressBar = document.querySelector('.scroll-progress');
  const backToTop = document.querySelector('.back-to-top');
  const sections = document.querySelectorAll('main section[id]');

  function onScroll() {
    // Progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Navbar background
    handleNavbarBackground();

    // Back to top visibility
    backToTop?.classList.toggle('visible', scrollTop > 480);

    // Active nav link based on section in view
    let currentId = '';
    sections.forEach((section) => {
      const offsetTop = section.offsetTop - 120;
      if (scrollTop >= offsetTop) currentId = section.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }

  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Copy email to clipboard ---------------- */
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const value = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(value);
        const original = btn.textContent;
        btn.textContent = 'Tersalin!';
        setTimeout(() => (btn.textContent = original), 1800);
      } catch (err) {
        console.warn('Clipboard copy failed:', err);
      }
    });
  });

  /* ---------------- Footer year ---------------- */
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
