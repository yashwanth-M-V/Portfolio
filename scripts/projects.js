/***************************************************
 * FINAL PROJECTS CAROUSEL — CLEAN + BUG-FREE
 ***************************************************/
function initProjectsCarousel() {
  const track = document.querySelector(".projects-track");
  const slides = Array.from(document.querySelectorAll(".projects-section"));
  const nextBtn = document.querySelector(".right-btn");
  const prevBtn = document.querySelector(".left-btn");
  const indicators = Array.from(document.querySelectorAll(".indicator"));

  if (!track || slides.length === 0) return;

  let current = 0;
  let autoSlideTimer = null;
  let isAnimating = false;

  /***************************************************
   * POSITION SLIDES (center current slide)
   ***************************************************/
  function updateSlides() {
    const slideWidth = slides[0].offsetWidth;
    const gap = 30;
    const trackCenter = track.offsetWidth / 2;

    const offset = trackCenter - (current * (slideWidth + gap)) - slideWidth / 2;

    track.style.transform = `translateX(${offset}px)`;
    track.style.transition = "transform 0.6s ease";

    // ACTIVE / INACTIVE STATES
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === current);
    });

    indicators.forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  /***************************************************
   * SLIDE CONTROLS
   ***************************************************/
  function nextSlide() {
    if (isAnimating) return;
    isAnimating = true;

    current = (current + 1) % slides.length;
    updateSlides();
    resetAutoSlide();

    setTimeout(() => (isAnimating = false), 600);
  }

  function prevSlide() {
    if (isAnimating) return;
    isAnimating = true;

    current = (current - 1 + slides.length) % slides.length;
    updateSlides();
    resetAutoSlide();

    setTimeout(() => (isAnimating = false), 600);
  }

  /***************************************************
   * AUTO SLIDE
   ***************************************************/
  function startAutoSlide() {
    autoSlideTimer = setInterval(nextSlide, 4000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
  }

  /***************************************************
   * EVENT LISTENERS
   ***************************************************/
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  indicators.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      current = index;
      updateSlides();
      resetAutoSlide();
    });
  });

  // Pause auto-slide when hovering
  track.addEventListener("mouseenter", () => clearInterval(autoSlideTimer));
  track.addEventListener("mouseleave", startAutoSlide);

  /***************************************************
   * SWIPE SUPPORT (touch devices)
   ***************************************************/
  let startX = 0;

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlideTimer);
  });

  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;

    if (Math.abs(diff) > 40) {
      diff < 0 ? nextSlide() : prevSlide();
    }

    startAutoSlide();
  });

  /***************************************************
   * KEYBOARD NAVIGATION
   ***************************************************/
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  /***************************************************
   * RESIZE HANDLER
   ***************************************************/
  window.addEventListener("resize", () => {
    updateSlides(); // recenter slides
  });

  /***************************************************
   * INITIALIZE
   ***************************************************/
  setTimeout(updateSlides, 50);
  startAutoSlide();
}

document.addEventListener("DOMContentLoaded", initProjectsCarousel);
/***************************************************
 * END OF PROJECTS CAROUSEL
 ***************************************************/