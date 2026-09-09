(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const initSlideshow = (slideshow, interval = 4000) => {
    if (!slideshow) return;
    const slides = Array.from(slideshow.querySelectorAll("img"));
    if (slides.length < 2) return;

    let activeIndex = 0;
    let timer = null;
    let hovered = false;
    let focused = false;

    const showSlide = (nextIndex) => {
      slides[activeIndex].classList.remove("is-active");
      slides[activeIndex].setAttribute("aria-hidden", "true");
      activeIndex = (nextIndex + slides.length) % slides.length;
      slides[activeIndex].classList.add("is-active");
      slides[activeIndex].setAttribute("aria-hidden", "false");
    };

    const stop = () => {
      window.clearTimeout(timer);
      timer = null;
    };

    const schedule = () => {
      stop();
      if (reducedMotion.matches || hovered || focused || document.hidden) return;
      timer = window.setTimeout(() => {
        showSlide(activeIndex + 1);
        schedule();
      }, interval);
    };

    if (!slideshow.querySelector('.slideshow-control')) {
      const previous = document.createElement('button');
      previous.type = 'button';
      previous.className = 'slideshow-control slideshow-control-prev';
      previous.setAttribute('aria-label', 'Previous image');
      previous.innerHTML = '<span aria-hidden="true">‹</span>';

      const next = document.createElement('button');
      next.type = 'button';
      next.className = 'slideshow-control slideshow-control-next';
      next.setAttribute('aria-label', 'Next image');
      next.innerHTML = '<span aria-hidden="true">›</span>';

      previous.addEventListener('click', (event) => {
        event.preventDefault();
        stop();
        showSlide(activeIndex - 1);
      });

      next.addEventListener('click', (event) => {
        event.preventDefault();
        stop();
        showSlide(activeIndex + 1);
      });

      slideshow.append(previous, next);
    }

    slideshow.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stop();
        showSlide(activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        stop();
        showSlide(activeIndex + 1);
      }
    });

    slideshow.addEventListener("mouseenter", () => { hovered = true; stop(); });
    slideshow.addEventListener("mouseleave", () => { hovered = false; schedule(); });
    slideshow.addEventListener("focusin", () => { focused = true; stop(); });
    slideshow.addEventListener("focusout", () => { focused = false; schedule(); });
    document.addEventListener("visibilitychange", schedule);

    const handleMotionChange = () => {
      if (reducedMotion.matches) {
        stop();
        showSlide(0);
      } else {
        schedule();
      }
    };

    if (typeof reducedMotion.addEventListener === "function") {
      reducedMotion.addEventListener("change", handleMotionChange);
    } else {
      reducedMotion.addListener(handleMotionChange);
    }

    schedule();
  };

  const setArtworkCaption = (figure, title, description) => {
    if (!figure) return;
    let caption = figure.querySelector(':scope > figcaption');
    if (!caption) {
      caption = document.createElement('figcaption');
      figure.appendChild(caption);
    }
    caption.className = 'artwork-caption';
    caption.innerHTML = `<span class="artwork-title">${title}</span><span class="artwork-description">${description}</span>`;
  };

  setArtworkCaption(
    document.querySelector('.hero-art'),
    'Hanging Assemblage 001',
    'Suspended assemblage examining weight, tension, accumulation, and the transformation of space.'
  );

  const ceramicsCard = document.querySelector('.work-grid .work-card:nth-child(2)');
  if (ceramicsCard) {
    setArtworkCaption(
      ceramicsCard.querySelector('.work-art'),
      'Commissioned Lidded Vessel',
      'Commissioned ceramic vessel exploring altered form, layered glaze, and functional object-making.'
    );
  }

  const fabricationCard = document.querySelector('.work-grid .work-card:nth-child(4)');
  if (fabricationCard) {
    setArtworkCaption(
      fabricationCard.querySelector('.work-art'),
      'Minerva Beta Form',
      'Hand-built humanoid form exploring constructed identity, embodiment, and the boundary between object and being.'
    );
  }

  if (fabricationCard && !fabricationCard.querySelector('.fabrication-study-slideshow')) {
    const buildFabricationSlideshow = async () => {
      const slideshow = document.createElement('figure');
      slideshow.className = 'fabrication-study-slideshow';
      slideshow.setAttribute('aria-label', 'Fabrication process and detail views');
      slideshow.tabIndex = 0;

      const processImg = document.createElement('img');
      processImg.src = 'assets/images/minerva-beta-process.webp';
      processImg.alt = 'Raw clay in-process view of the humanoid sculpture in the studio classroom.';
      processImg.decoding = 'async';
      processImg.classList.add('is-active');
      processImg.setAttribute('aria-hidden', 'false');
      slideshow.appendChild(processImg);

      try {
        const response = await fetch('assets/images/reflection-thumb-base64.txt', { cache: 'no-store' });
        if (!response.ok) throw new Error('Could not load reflection study');
        const data = (await response.text()).trim();
        if (data) {
          const reflectionImg = document.createElement('img');
          reflectionImg.src = `data:image/webp;base64,${data}`;
          reflectionImg.alt = 'Close-up finished view of the humanoid sculpture with its reverse side visible in a mirror reflection.';
          reflectionImg.decoding = 'async';
          reflectionImg.setAttribute('aria-hidden', 'true');
          slideshow.appendChild(reflectionImg);
        }
      } catch (error) {
        console.warn('Could not load fabrication reflection image.', error);
      }

      const meta = fabricationCard.querySelector('.work-meta');
      if (meta) meta.insertAdjacentElement('afterend', slideshow);
      initSlideshow(slideshow, 3200);
    };

    buildFabricationSlideshow();
  }

  const studioCard = Array.from(document.querySelectorAll('.practice-card')).find((card) =>
    card.querySelector('h3')?.textContent.trim() === 'Studio & Fabrication'
  );
  if (studioCard) {
    const description = studioCard.querySelector('h3')?.nextElementSibling;
    if (description?.tagName === 'P') {
      description.textContent = 'Building studios, fabrication workflows, shop systems, and physical environments for making — from planning and spatial problem-solving through construction, tool organization, material systems, display, and the creation of spaces that support sustained creative work.';
    }
  }

  const studioSlideshow = document.querySelector('[data-studio-slideshow]');
  if (studioSlideshow) {
    const studioImages = [
      ['assets/images/suntoad-studios-tucson.webp', 'Suntoad Studios finished Tucson studio interior'],
      ['assets/images/suntoad-studio-01-demolition.webp', 'Suntoad Studios during demolition and early construction'],
      ['assets/images/suntoad-studio-02-wall-prep.webp', 'Suntoad Studios wall preparation during construction'],
      ['assets/images/suntoad-studio-03-mural-making.webp', 'Suntoad Studios mural-making during the build-out'],
      ['assets/images/suntoad-studio-04-surfboard.webp', 'Suntoad Studios surfboard display and studio environment'],
      ['assets/images/suntoad-studio-05-gallery-display.webp', 'Suntoad Studios gallery display area'],
      ['assets/images/suntoad-studio-06-window-display.webp', 'Suntoad Studios window display'],
      ['assets/images/suntoad-studio-07-gallery-wall.webp', 'Suntoad Studios finished gallery wall']
    ];

    studioSlideshow.querySelectorAll('img').forEach((image) => image.remove());
    studioImages.forEach(([src, alt], index) => {
      const image = document.createElement('img');
      image.src = src;
      image.alt = alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      image.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
      if (index === 0) image.classList.add('is-active');
      studioSlideshow.appendChild(image);
    });

    const entrepreneurshipCard = Array.from(document.querySelectorAll('.practice-card')).find((card) =>
      card.querySelector('h3')?.textContent.trim() === 'Entrepreneurship & Visual Communication'
    );
    if (entrepreneurshipCard && studioSlideshow.parentElement !== entrepreneurshipCard) {
      entrepreneurshipCard.appendChild(studioSlideshow);
    }
  }

  initSlideshow(studioSlideshow, 3800);
})();
