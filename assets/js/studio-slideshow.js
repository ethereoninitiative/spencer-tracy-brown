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

  const fabricationCard = document.querySelector('.work-grid .work-card:nth-child(4)');

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

  initSlideshow(document.querySelector("[data-studio-slideshow]"), 3800);
})();
