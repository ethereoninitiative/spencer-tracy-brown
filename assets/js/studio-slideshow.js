(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const initSlideshow = (slideshow, interval = 6500) => {
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
      activeIndex = nextIndex;
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
        showSlide((activeIndex + 1) % slides.length);
        schedule();
      }, interval);
    };

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
    const sources = [
      {
        file: 'assets/images/process-thumb-base64.txt',
        alt: 'Raw clay in-process view of the humanoid sculpture in the studio classroom.'
      },
      {
        file: 'assets/images/reflection-thumb-base64.txt',
        alt: 'Close-up finished view of the humanoid sculpture with its reverse side visible in a mirror reflection.'
      }
    ];

    Promise.all(sources.map(async ({ file, alt }) => {
      const response = await fetch(file, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Could not load ${file}`);
      return { data: (await response.text()).trim(), alt };
    }))
      .then((items) => {
        const slideshow = document.createElement('figure');
        slideshow.className = 'fabrication-study-slideshow';
        slideshow.setAttribute('aria-label', 'Fabrication process and detail views');
        slideshow.tabIndex = 0;

        items.forEach(({ data, alt }, index) => {
          const img = document.createElement('img');
          img.src = `data:image/webp;base64,${data}`;
          img.alt = alt;
          img.decoding = 'async';
          img.classList.toggle('is-active', index === 0);
          img.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
          slideshow.appendChild(img);
        });

        const meta = fabricationCard.querySelector('.work-meta');
        if (meta) meta.insertAdjacentElement('afterend', slideshow);
        initSlideshow(slideshow, 5200);
      })
      .catch((error) => {
        console.warn('Could not build fabrication slideshow.', error);
      });
  }

  initSlideshow(document.querySelector("[data-studio-slideshow]"), 6500);
})();
