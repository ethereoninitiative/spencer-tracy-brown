(() => {
  const CV_PATH = 'assets/docs/Spencer-Tracy-Brown-CV.pdf';

  const cvStyle = document.createElement('style');
  cvStyle.textContent = `
    .cv-actions {
      grid-column: 1 / -1;
      display: flex;
      flex-wrap: wrap;
      gap: .75rem;
      margin: 1.15rem 0 0;
    }
    .cv-action {
      display: inline-flex;
      align-items: center;
      min-height: 2.75rem;
      padding: .72rem .95rem;
      border: 2px solid var(--ink, #171413);
      background: rgba(255,255,255,.3);
      color: var(--ink, #171413);
      text-decoration: none;
      font-size: .76rem;
      font-weight: 800;
      letter-spacing: .1em;
      text-transform: uppercase;
      box-shadow: .22rem .22rem 0 var(--ink, #171413);
    }
    .cv-action:hover,
    .cv-action:focus-visible {
      background: var(--cobalt, #123f78);
      color: #fff;
    }
  `;
  document.head.appendChild(cvStyle);

  const nav = document.querySelector('.site-nav');
  if (nav && !nav.querySelector('[data-cv-nav]')) {
    const cvNav = document.createElement('a');
    cvNav.href = CV_PATH;
    cvNav.target = '_blank';
    cvNav.rel = 'noopener';
    cvNav.dataset.cvNav = 'true';
    cvNav.textContent = 'CV';
    nav.appendChild(cvNav);
  }

  const about = document.querySelector('.about-copy');
  const tagList = about?.querySelector('.tag-list');
  if (about && tagList && !about.querySelector('.cv-actions')) {
    const actions = document.createElement('div');
    actions.className = 'cv-actions';

    const view = document.createElement('a');
    view.className = 'cv-action';
    view.href = CV_PATH;
    view.target = '_blank';
    view.rel = 'noopener';
    view.textContent = 'View CV ↗';

    const download = document.createElement('a');
    download.className = 'cv-action';
    download.href = CV_PATH;
    download.setAttribute('download', 'Spencer-Tracy-Brown-CV.pdf');
    download.textContent = 'Download PDF ↓';

    actions.append(view, download);
    tagList.insertAdjacentElement('afterend', actions);
  }

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
