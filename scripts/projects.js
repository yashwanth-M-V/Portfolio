function initProjectsCarousel() {
  const track = document.querySelector(".projects-track");
  const slides = Array.from(document.querySelectorAll(".projects-section"));
  const nextBtn = document.querySelector(".right-btn");
  const prevBtn = document.querySelector(".left-btn");
  const indicators = Array.from(document.querySelectorAll(".indicator"));

  console.log("Projects carousel elements:", {
    track: !!track,
    slides: slides.length,
    nextBtn: !!nextBtn,
    prevBtn: !!prevBtn
  });

  // Check if all required elements exist
  if (!track || !nextBtn || !prevBtn || slides.length === 0) {
    console.log("Projects carousel elements not found yet - will retry");
    return false;
  }

  let currentIndex = 0;
  let autoSlideInterval;
  let isAnimating = false;

  function calculateSlidePosition() {
    if (isAnimating) return;
    
    isAnimating = true;
    
    // Calculate the exact position to center the current slide
    const slide = slides[0];
    const slideStyle = window.getComputedStyle(slide);
    const trackStyle = window.getComputedStyle(track);
    
    const slideWidth = slide.offsetWidth;
    const gap = parseInt(trackStyle.gap || 30);
    const trackPadding = parseInt(trackStyle.paddingLeft || 0) + parseInt(trackStyle.paddingRight || 0);
    
    // Calculate the total width of track content
    const totalContentWidth = (slideWidth + gap) * slides.length - gap;
    
    // Calculate the transform needed to center the current slide
    const slideCenter = currentIndex * (slideWidth + gap);
    const containerCenter = track.offsetWidth / 2;
    const transformValue = containerCenter - slideCenter - (slideWidth / 2);

    console.log("Position calculation:", {
      slideWidth,
      gap,
      trackPadding,
      totalContentWidth,
      slideCenter,
      containerCenter,
      transformValue,
      currentIndex
    });

    track.style.transform = `translateX(${transformValue}px)`;

    // Update active state for slides
    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });

    resetAutoSlide();

    // Reset animation flag after transition
    setTimeout(() => {
      isAnimating = false;
    }, 800);
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

  // --- Auto Slide ---
  function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
  }

  // --- Event Listeners ---
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      const index = parseInt(indicator.getAttribute("data-index"));
      goToSlide(index);
    });
  });

  // --- Keyboard navigation ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    else if (e.key === "ArrowLeft") prevSlide();
  });

  // --- Hover pause ---
  const carousel = document.querySelector(".projects-carousel");
  carousel.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
  carousel.addEventListener("mouseleave", startAutoSlide);

  // --- Swipe for touch devices ---
  let startX = 0;
  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    clearInterval(autoSlideInterval);
  });
  
  track.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    const swipeThreshold = 50;
    
    if (Math.abs(diff) > swipeThreshold) {
      diff > 0 ? nextSlide() : prevSlide();
    }
    
    startAutoSlide();
  });

  // --- Initialize ---
  // Wait a bit for the DOM to fully render
  setTimeout(() => {
    calculateSlidePosition();
    startAutoSlide();
  }, 100);
  
  console.log("Projects carousel initialized successfully");
  return true;
}

// Initialize carousel
document.addEventListener("DOMContentLoaded", () => {
  // Try initializing right away
  if (!initProjectsCarousel()) {
    // If not ready, set up a retry mechanism
    console.log("Projects carousel not ready, setting up retry...");
    let retryCount = 0;
    const maxRetries = 10;
    
    const retryInterval = setInterval(() => {
      retryCount++;
      if (initProjectsCarousel()) {
        clearInterval(retryInterval);
        console.log("Projects carousel initialized after retry");
      } else if (retryCount >= maxRetries) {
        clearInterval(retryInterval);
        console.log("Failed to initialize projects carousel after max retries");
      }
    }, 200);
  }
});