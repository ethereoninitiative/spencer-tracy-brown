(() => {
  const studioCard = document.querySelector('.practice-grid .practice-card:first-child');

  if (studioCard && !studioCard.querySelector('.studio-fabrication-art')) {
    studioCard.classList.add('practice-card-featured');

    const figure = document.createElement('figure');
    figure.className = 'art-figure practice-art studio-fabrication-art';

    const frame = document.createElement('div');
    frame.className = 'art-frame';

    const img = document.createElement('img');
    img.src = 'assets/images/obsidian-horned-skull.webp';
    img.alt = 'Ceramic skull sculpture with glossy black organic horn-like forms';
    img.width = 1122;
    img.height = 1402;
    img.loading = 'lazy';
    img.decoding = 'async';

    frame.appendChild(img);
    figure.appendChild(frame);
    studioCard.appendChild(figure);
  }

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  if (!finePointer.matches) return;

  const ZOOM = 2.2;

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
