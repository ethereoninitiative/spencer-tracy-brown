(() => {
  const ZOOM = 2.2;

  const installPracticeArtwork = async () => {
    const grid = document.querySelector('.practice-grid');
    const studioCard = grid?.querySelector('.practice-card:first-child');
    if (!grid || !studioCard || studioCard.querySelector('.practice-art')) return;

    const response = await fetch('assets/images/skull-horned-ceramic-sculpture-520.b64', { cache: 'force-cache' });
    if (!response.ok) throw new Error(`Artwork asset returned ${response.status}`);

    const encoded = (await response.text()).replace(/\s+/g, '');
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
    const imageUrl = URL.createObjectURL(new Blob([bytes], { type: 'image/webp' }));

    const copy = document.createElement('div');
    copy.className = 'practice-card-copy';
    while (studioCard.firstChild) copy.appendChild(studioCard.firstChild);

    const figure = document.createElement('figure');
    figure.className = 'art-figure practice-art';

    const frame = document.createElement('div');
    frame.className = 'art-frame';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = 'Ceramic skull sculpture with glossy black organic horn-like forms';
    img.width = 520;
    img.height = 650;
    img.loading = 'lazy';
    img.decoding = 'async';

    frame.appendChild(img);
    figure.appendChild(frame);
    studioCard.append(copy, figure);
    studioCard.classList.add('practice-card-featured');
    grid.classList.add('has-featured-practice-art');
  };

  const initMagnifiers = () => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

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
  };

  installPracticeArtwork()
    .catch((error) => console.warn('Studio artwork could not be loaded.', error))
    .finally(initMagnifiers);
})();
