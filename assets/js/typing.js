/* ==========================================================================
   TYPING.JS
   Simple typewriter effect that cycles through a list of roles/keywords
   inside the hero subtitle (#typing-text).
   ========================================================================== */

(function () {
  const el = document.getElementById('typing-text');
  if (!el) return;

  // EDIT: ganti / tambah kata sesuai identitas profesional Anda.
  const words = [
    'Calon IT Support',
    'Mahasiswa Teknik Komputer',
    'Problem Solver',
    'Tech Enthusiast',
  ];

  const TYPE_SPEED = 90;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER_TYPE = 1400;
  const PAUSE_AFTER_DELETE = 400;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function tick() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = currentWord.slice(0, charIndex);

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER_TYPE);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIndex--;
      el.textContent = currentWord.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, PAUSE_AFTER_DELETE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
})();
