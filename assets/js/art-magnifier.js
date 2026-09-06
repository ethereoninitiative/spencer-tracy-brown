(() => {
  const cvActions = document.querySelector('.cv-actions');
  if (cvActions && !cvActions.querySelector('[data-press-archive]')) {
    const archive = document.createElement('div');
    archive.className = 'press-archive';
    archive.dataset.pressArchive = 'true';
    archive.setAttribute('aria-label', 'Selected press, archive, and recognition');
    archive.innerHTML = `
      <p class="press-archive-label">Selected press / archive</p>
      <div class="press-archive-links">
        <a class="press-archive-link" href="https://ktar.com/arizona-education/ai-teachers-chatgpt-lessons" target="_blank" rel="noopener">
          <span class="press-archive-meta">2025 · KTAR News 92.3 FM</span>
          <span class="press-archive-title">AI and ChatGPT are forcing Arizona teachers to rethink lessons ↗</span>
        </a>
        <a class="press-archive-link" href="https://www.tucsonlocalmedia.com/marana/news/funky-new-art-studio-opens-in-marana/article_97ed7798-42ff-11ef-9702-1fb1676f9e1c.html" target="_blank" rel="noopener">
          <span class="press-archive-meta">2024 · Marana News</span>
          <span class="press-archive-title">Funky new art studio opens in Marana ↗</span>
        </a>
        <a class="press-archive-link" href="https://www.statepress.com/article/2015/02/bent-realities-offers-quirky-and-emotional-expression-by-asu-seniors" target="_blank" rel="noopener">
          <span class="press-archive-meta">2015 · The State Press</span>
          <span class="press-archive-title">Bent Realities offers quirky and emotional expression by ASU seniors ↗</span>
        </a>
      </div>
      <p class="press-archive-label recognition-label">Recognition / features</p>
      <div class="press-archive-links">
        <a class="press-archive-link" href="https://www.facebook.com/GoodyearHighSchoolMavericks/posts/congrats-to-our-art-teacher-mr-spencer-brown-he-was-selected-for-the-first-ever-/122186693786332919/" target="_blank" rel="noopener">
          <span class="press-archive-meta">2025 · Goodyear High School</span>
          <span class="press-archive-title">Selected for the first ChatGPT Lab for High School Teachers — national cohort of 12 educators ↗</span>
        </a>
      </div>
    `;
    cvActions.appendChild(archive);
  }

  const siteEnhancementStyle = document.createElement('style');
  siteEnhancementStyle.textContent = `
    .cv-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      gap: 1.1rem 1.4rem;
    }
    .press-archive {
      flex: 1 1 31rem;
      min-width: min(100%, 24rem);
      padding-top: .75rem;
      border-top: 1px solid var(--line-strong, rgba(23,20,19,.36));
    }
    .press-archive-label {
      margin: 0 0 .35rem;
      color: var(--cobalt, #123f78) !important;
      font-size: .68rem !important;
      font-weight: 800;
      line-height: 1.3 !important;
      letter-spacing: .14em;
      text-transform: uppercase;
    }
    .recognition-label { margin-top: 1.15rem; }
    .press-archive-links { display: grid; }
    .press-archive-link {
      display: grid;
      grid-template-columns: minmax(8.5rem, 10.5rem) minmax(0, 1fr);
      gap: .45rem 1rem;
      align-items: baseline;
      padding: .7rem 0;
      border-bottom: 1px solid var(--line, rgba(23,20,19,.16));
      text-decoration: none;
    }
    .press-archive-meta {
      color: var(--muted, #64574e);
      font-size: .7rem;
      font-weight: 800;
      letter-spacing: .09em;
      text-transform: uppercase;
    }
    .press-archive-title {
      font-family: var(--serif, Georgia, serif);
      font-size: .98rem;
      line-height: 1.35;
    }
    .press-archive-link:hover .press-archive-title,
    .press-archive-link:focus-visible .press-archive-title { color: var(--cobalt, #123f78); }
    @media (max-width: 560px) {
      .press-archive-link { grid-template-columns: 1fr; gap: .2rem; }
    }
  `;
  document.head.appendChild(siteEnhancementStyle);

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
