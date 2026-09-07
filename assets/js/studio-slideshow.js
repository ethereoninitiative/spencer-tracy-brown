(() => {
  const fabricationCard = document.querySelector('.work-grid .work-card:nth-child(4)');

  if (fabricationCard) {
    const loadFabricationImage = async (source, property) => {
      try {
        const response = await fetch(source, { cache: 'no-store' });
        if (!response.ok) return;
        const base64 = (await response.text()).trim();
        if (!base64) return;
        fabricationCard.style.setProperty(property, `url("data:image/webp;base64,${base64}")`);
      } catch (error) {
        console.warn('Could not load fabrication study image.', error);
      }
    };

    loadFabricationImage('assets/images/process-thumb-base64.txt', '--fabrication-process-image');
    loadFabricationImage('assets/images/reflection-thumb-base64.txt', '--fabrication-reflection-image');
  }

  const slideshow = document.querySelector("[data-studio-slideshow]");
  if (!slideshow) return;

  const slides = Array.from(slideshow.querySelectorAll("img"));
  if (slides.length < 2) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const interval = 6500;
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

  slideshow.addEventListener("mouseenter", () => {
    hovered = true;
    stop();
  });

  slideshow.addEventListener("mouseleave", () => {
    hovered = false;
    schedule();
  });

  slideshow.addEventListener("focusin", () => {
    focused = true;
    stop();
  });

  slideshow.addEventListener("focusout", () => {
    focused = false;
    schedule();
  });

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
})();