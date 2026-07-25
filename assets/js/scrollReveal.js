/* ==========================================================================
   SCROLLREVEAL.JS
   IntersectionObserver-powered reveal-on-scroll for `.reveal` elements,
   plus skill progress-bar fill and stat-counter animation.
   ========================================================================== */

(function () {
  // ---- Generic fade/slide reveal ----
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach((el) => revealObserver.observe(el));

  // ---- Skill bar fill ----
  const skillBars = document.querySelectorAll('.skill-bar-fill');

  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const percent = target.dataset.percent || '0';
          target.style.width = `${percent}%`;
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.4 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  // ---- Stat counters (e.g. "12+ Projects") ----
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');

  const countObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = entry.target;
        const end = parseInt(target.dataset.count, 10);
        const suffix = target.dataset.suffix || '';
        const duration = 1200;
        const startTime = performance.now();

        function step(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          target.textContent = Math.round(eased * end) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        observer.unobserve(target);
      });
    },
    { threshold: 0.6 }
  );

  statNumbers.forEach((el) => countObserver.observe(el));
})();
