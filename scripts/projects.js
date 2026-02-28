function initProjectsCarousel() {
  const track      = document.querySelector(".projects-track");
  const slides     = Array.from(document.querySelectorAll(".projects-section"));
  const nextBtn    = document.querySelector(".right-btn");
  const prevBtn    = document.querySelector(".left-btn");
  const indicators = Array.from(document.querySelectorAll(".indicator"));
  const carousel   = document.querySelector(".projects-carousel");
  const pauseBtn   = document.getElementById("carousel-pause-btn");
  const pauseIcon  = pauseBtn ? pauseBtn.querySelector(".pause-icon")  : null;
  const pauseLabel = pauseBtn ? pauseBtn.querySelector(".pause-label") : null;

  console.log("Projects carousel elements:", {
    track: !!track,
    slides: slides.length,
    nextBtn: !!nextBtn,
    prevBtn: !!prevBtn
  });

  if (!track || !nextBtn || !prevBtn || slides.length === 0) {
    console.log("Projects carousel elements not found yet - will retry");
    return false;
  }

  let currentIndex      = 0;
  let autoSlideInterval = null;
  let isAnimating       = false;
  let isPaused          = false;   // manual pause flag
  let isHovered         = false;   // hover pause flag

  // ── Core: calculate and apply position (YOUR original logic) ──
  function calculateSlidePosition() {
    if (isAnimating) return;
    isAnimating = true;

    const slide      = slides[0];
    const trackStyle = window.getComputedStyle(track);

    const slideWidth      = slide.offsetWidth;
    const gap             = parseInt(trackStyle.gap || 30);
    const slideCenter     = currentIndex * (slideWidth + gap);
    const containerCenter = track.offsetWidth / 2;
    const transformValue  = containerCenter - slideCenter - (slideWidth / 2);

    console.log("Position calculation:", {
      slideWidth, gap, slideCenter, containerCenter, transformValue, currentIndex
    });

    track.style.transform = `translateX(${transformValue}px)`;

    slides.forEach((s, i) => s.classList.toggle("active", i === currentIndex));
    indicators.forEach((ind, i) => ind.classList.toggle("active", i === currentIndex));

    resetAutoSlide();

    setTimeout(() => { isAnimating = false; }, 800);
  }

  function nextSlide() {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % slides.length;
    calculateSlidePosition();
  }

  function prevSlide() {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    calculateSlidePosition();
  }

  function goToSlide(index) {
    if (isAnimating) return;
    currentIndex = index;
    calculateSlidePosition();
  }

  // ── Autoplay — only ticks when neither manually paused nor hovered ──
  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
      if (!isPaused && !isHovered) nextSlide();
    }, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // ── Pause button UI ──
  function updatePauseBtn() {
    if (!pauseBtn) return;
    if (isPaused) {
      pauseIcon.textContent  = "▶";
      pauseLabel.textContent = "Resume";
      pauseBtn.classList.add("paused");
    } else {
      pauseIcon.textContent  = "⏸";
      pauseLabel.textContent = "Pause";
      pauseBtn.classList.remove("paused");
    }
  }

  // ── Event listeners ──

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  indicators.forEach((ind) => {
    ind.addEventListener("click", () => {
      goToSlide(parseInt(ind.getAttribute("data-index")));
    });
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  // Hover pause — does NOT change isPaused so button state is preserved
  if (carousel) {
    carousel.addEventListener("mouseenter", () => { isHovered = true; });
    carousel.addEventListener("mouseleave", () => { isHovered = false; });
  }

  // Manual pause / resume button
  if (pauseBtn) {
    pauseBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      updatePauseBtn();
    });
  }

  // Touch swipe
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", (e) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
    }
  }, { passive: true });

  // ── Initialise ──
  setTimeout(() => {
    calculateSlidePosition();
    startAutoSlide();
    updatePauseBtn();
  }, 100);

  console.log("Projects carousel initialised successfully");
  return true;
}

// ── Bootstrap with retry (YOUR original pattern) ──
document.addEventListener("DOMContentLoaded", () => {
  if (!initProjectsCarousel()) {
    console.log("Projects carousel not ready, setting up retry...");
    let retryCount = 0;
    const maxRetries = 10;

    const retryInterval = setInterval(() => {
      retryCount++;
      if (initProjectsCarousel()) {
        clearInterval(retryInterval);
        console.log("Projects carousel initialised after retry");
      } else if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        console.error("Failed to initialise projects carousel after max retries");
      }
    }, 200);
  }
});