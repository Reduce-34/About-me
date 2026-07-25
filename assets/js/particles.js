/* ==========================================================================
   PARTICLES.JS
   Lightweight canvas particle background for the hero section.
   No external library — plain Canvas 2D with a capped particle count so it
   stays fast on low-end devices.
   ========================================================================== */

(function () {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let particles = [];
  let width, height;
  let animationId;

  function resize() {
    const hero = canvas.closest('.hero');
    width = canvas.width = hero.offsetWidth;
    height = canvas.height = hero.offsetHeight;
  }

  function particleCount() {
    // Fewer particles on small / low-power screens to keep it fast.
    const area = width * height;
    return Math.min(70, Math.round(area / 18000));
  }

  function createParticles() {
    const count = particleCount();
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const dotColor = isLight ? 'rgba(109, 94, 252, 0.55)' : 'rgba(148, 163, 255, 0.6)';
    const lineColor = isLight ? 'rgba(109, 94, 252,' : 'rgba(148, 163, 255,';

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = dotColor;
      ctx.fill();
    });

    // Connect nearby particles with faint lines for a "network" feel.
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `${lineColor} ${1 - dist / 120})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(draw);
  }

  function init() {
    resize();
    createParticles();
    cancelAnimationFrame(animationId);
    draw();
  }

  if (!prefersReducedMotion) {
    init();
    window.addEventListener('resize', () => {
      clearTimeout(window._particleResizeTimer);
      window._particleResizeTimer = setTimeout(init, 200);
    });
  }
})();
