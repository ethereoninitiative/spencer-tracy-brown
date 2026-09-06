(() => {
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  const ZOOM = 2.2;
  const style = document.createElement('style');
  style.textContent = `
    @media (hover: hover) and (pointer: fine) {
      .art-frame[data-magnifier-ready="true"] { cursor: zoom-in; }
      .art-magnifier-lens {
        position: absolute;
        width: clamp(8rem, 14vw, 11rem);
        aspect-ratio: 1;
        border: 2px solid var(--ink, #171413);
        border-radius: 50%;
        background-repeat: no-repeat;
        box-shadow: .35rem .35rem 0 rgba(23, 20, 19, .9);
        pointer-events: none;
        opacity: 0;
        transform: translate(-50%, -50%);
        z-index: 4;
        transition: opacity .12s ease;
        will-change: left, top, background-position;
      }
      .art-frame.magnifier-active .art-magnifier-lens { opacity: 1; }
    }
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.art-frame > img').forEach((img) => {
    const frame = img.parentElement;
    if (!frame || frame.dataset.magnifierReady === 'true') return;

    const lens = document.createElement('div');
    lens.className = 'art-magnifier-lens';
    lens.setAttribute('aria-hidden', 'true');
    frame.appendChild(lens);
    frame.dataset.magnifierReady = 'true';

    const updateLens = (event) => {
      const rect = frame.getBoundingClientRect();
      const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(event.clientY - rect.top, rect.height));
      const naturalWidth = img.naturalWidth || rect.width;
      const naturalHeight = img.naturalHeight || rect.height;
      const coverScale = Math.max(rect.width / naturalWidth, rect.height / naturalHeight);
      const renderedWidth = naturalWidth * coverScale;
      const renderedHeight = naturalHeight * coverScale;
      const cropX = (rect.width - renderedWidth) / 2;
      const cropY = (rect.height - renderedHeight) / 2;
      const lensWidth = lens.offsetWidth;
      const lensHeight = lens.offsetHeight;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;
      lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
      lens.style.backgroundSize = `${renderedWidth * ZOOM}px ${renderedHeight * ZOOM}px`;
      lens.style.backgroundPosition = `${lensWidth / 2 - (x - cropX) * ZOOM}px ${lensHeight / 2 - (y - cropY) * ZOOM}px`;
    };

    frame.addEventListener('pointerenter', (event) => {
      frame.classList.add('magnifier-active');
      updateLens(event);
    });
    frame.addEventListener('pointermove', updateLens);
    frame.addEventListener('pointerleave', () => {
      frame.classList.remove('magnifier-active');
    });
  });
})();
