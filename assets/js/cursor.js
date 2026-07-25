/* ==========================================================================
   CURSOR.JS
   Custom two-part cursor (dot + trailing outline). Auto-disables on
   touch devices via CSS, so this script simply no-ops harmlessly there.
   ========================================================================== */

(function () {
  const dot = document.querySelector('.cursor-dot');
  const outline = document.querySelector('.cursor-outline');

  if (!dot || !outline || window.matchMedia('(hover: none)').matches) return;

  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    outlineX = e.clientX;
    outlineY = e.clientY;
  });

  // Smoothly ease the outline toward the pointer for a "trailing" feel.
  function animateOutline() {
    const currentLeft = parseFloat(outline.style.left) || outlineX;
    const currentTop = parseFloat(outline.style.top) || outlineY;
    const nextLeft = currentLeft + (outlineX - currentLeft) * 0.15;
    const nextTop = currentTop + (outlineY - currentTop) * 0.15;

    outline.style.left = `${nextLeft}px`;
    outline.style.top = `${nextTop}px`;
    requestAnimationFrame(animateOutline);
  }
  requestAnimationFrame(animateOutline);

  // Grow the outline on interactive elements.
  const interactiveSelectors = 'a, button, input, textarea, .btn, .project-card, .cert-card, .tech-badge';
  document.querySelectorAll(interactiveSelectors).forEach((el) => {
    el.addEventListener('mouseenter', () => outline.classList.add('active'));
    el.addEventListener('mouseleave', () => outline.classList.remove('active'));
  });
})();
