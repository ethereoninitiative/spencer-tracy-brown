/* Stone Container R1: manual artwork viewing, keyboard access, and touch gestures. */
(() => {
  const gallery = document.querySelector('[data-stone-gallery]');
  if (!gallery) return;
  const slides = Array.from(gallery.querySelectorAll('[data-stone-slide]'));
  const previous = gallery.querySelector('[data-stone-prev]');
  const next = gallery.querySelector('[data-stone-next]');
  const count = gallery.querySelector('[data-stone-count]');
  const viewport = gallery.querySelector('[data-stone-viewport]');
  if (slides.length < 2 || !previous || !next || !count || !viewport) return;

  let current = 0;
  const show = (nextIndex) => {
    current = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      slide.hidden = index !== current;
      slide.setAttribute('aria-hidden', index === current ? 'false' : 'true');
    });
    count.textContent = (current + 1) + ' / ' + slides.length;
  };

  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));

  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + 1);
    }
  });

  let startX = null;
  let startY = null;
  viewport.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return;
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  }, { passive: true });

  viewport.addEventListener('touchend', (event) => {
    if (startX === null || startY === null || event.changedTouches.length !== 1) return;
    const deltaX = event.changedTouches[0].clientX - startX;
    const deltaY = event.changedTouches[0].clientY - startY;
    startX = null;
    startY = null;
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3) {
      show(current + (deltaX < 0 ? 1 : -1));
    }
  }, { passive: true });
  viewport.addEventListener('touchcancel', () => { startX = null; startY = null; });

  show(0);
  gallery.classList.add('is-enhanced');
})();