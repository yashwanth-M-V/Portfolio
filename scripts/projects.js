/* ═══════════════════════════════════════════════════
   projects.js
   Media modes (set via "media_type" in projects.json):
     "gif"   → full-bleed animated GIF filling the panel
     "icon"  → transparent PNG/icon centered on gradient bg
     ""/null → gradient fallback with project initials
═══════════════════════════════════════════════════ */

// ── Build the left-panel media HTML ─────────────────
function buildMediaHTML(project) {
  const src  = (project.media || "").trim();
  const type = (project.media_type || "").trim().toLowerCase();

  // ── Full-bleed GIF (covers the whole panel) ──
  if (src && type === "gif") {
    return `
      <img
        class="proj-media proj-gif"
        src="${src}"
        alt="${project.name} demo"
        loading="lazy"
      >`;
  }

  // ── Transparent icon / PNG (centred, gradient shows through) ──
  if (src && type === "icon") {
    return `
      <div class="proj-media proj-icon-wrap">
        <img
          class="proj-icon"
          src="${src}"
          alt="${project.name} icon"
          loading="lazy"
        >
      </div>`;
  }

  // ── Fallback: gradient + project initials ──
  const initials = (project.name || "??")
    .split(" ")
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join("");

  return `
    <div class="proj-media proj-fallback">
      <span class="proj-initials">${initials}</span>
    </div>`;
}

// ── Build all tiles from JSON array ─────────────────
function buildProjectTiles(projects) {
  const track      = document.getElementById("projects-track");
  const indicators = document.getElementById("carousel-indicators");
  if (!track || !indicators) return;

  track.innerHTML      = "";
  indicators.innerHTML = "";

  projects.forEach((project, index) => {

    const skillTags = (project.skills || [])
      .map(s => `<span class="skill-tag">${s}</span>`)
      .join("");

    const githubBtn = (project.github || "").trim()
      ? `<a href="${project.github}" target="_blank" rel="noopener" class="proj-btn github-btn">GitHub</a>`
      : "";

    const demoBtn = (project.demo || "").trim()
      ? `<a href="${project.demo}" target="_blank" rel="noopener" class="proj-btn demo-btn">Live Demo</a>`
      : "";

    const buttonsHtml = (githubBtn || demoBtn)
      ? `<div class="project-buttons">${githubBtn}${demoBtn}</div>`
      : "";

    const tile = document.createElement("div");
    tile.className = `glassmorphism-container projects-section${index === 0 ? " active" : ""}`;
    tile.innerHTML = `
      <div class="proj-left">
        ${buildMediaHTML(project)}
      </div>
      <div class="proj-right">
        <div class="proj-right-top">
          <h2>${project.name}</h2>
          <div class="project-skills">${skillTags}</div>
          <p>${project.description}</p>
        </div>
        ${buttonsHtml}
      </div>
    `;
    track.appendChild(tile);

    // Dot indicator
    const dot = document.createElement("span");
    dot.className = `indicator${index === 0 ? " active" : ""}`;
    dot.setAttribute("data-index", index);
    indicators.appendChild(dot);
  });
}

// ── Carousel engine (your original centring logic) ──
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

  if (!track || !nextBtn || !prevBtn || slides.length === 0) return false;

  let currentIndex = 0, autoSlideInterval = null;
  let isAnimating = false, isPaused = false, isHovered = false;

  function calculateSlidePosition() {
    if (isAnimating) return;
    isAnimating = true;
    const trackStyle      = window.getComputedStyle(track);
    const slideWidth      = slides[0].offsetWidth;
    const gap             = parseInt(trackStyle.gap || 30);
    const transformValue  = (track.offsetWidth / 2) - (currentIndex * (slideWidth + gap)) - (slideWidth / 2);
    track.style.transform = `translateX(${transformValue}px)`;
    slides.forEach((s, i)    => s.classList.toggle("active", i === currentIndex));
    indicators.forEach((d, i) => d.classList.toggle("active", i === currentIndex));
    resetAutoSlide();
    setTimeout(() => { isAnimating = false; }, 800);
  }

  function nextSlide() { if (!isAnimating) { currentIndex = (currentIndex + 1) % slides.length; calculateSlidePosition(); } }
  function prevSlide() { if (!isAnimating) { currentIndex = (currentIndex - 1 + slides.length) % slides.length; calculateSlidePosition(); } }
  function goToSlide(i){ if (!isAnimating) { currentIndex = i; calculateSlidePosition(); } }

  function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => { if (!isPaused && !isHovered) nextSlide(); }, 5000);
  }
  function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

  function updatePauseBtn() {
    if (!pauseBtn) return;
    pauseIcon.textContent  = isPaused ? "▶" : "⏸";
    pauseLabel.textContent = isPaused ? "Resume" : "Pause";
    pauseBtn.classList.toggle("paused", isPaused);
  }

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
  indicators.forEach(d => d.addEventListener("click", () => goToSlide(+d.getAttribute("data-index"))));
  document.addEventListener("keydown", e => { if (e.key === "ArrowRight") nextSlide(); else if (e.key === "ArrowLeft") prevSlide(); });

  if (carousel) {
    carousel.addEventListener("mouseenter", () => { isHovered = true;  });
    carousel.addEventListener("mouseleave", () => { isHovered = false; });
  }
  if (pauseBtn) pauseBtn.addEventListener("click", () => { isPaused = !isPaused; updatePauseBtn(); });

  let startX = 0;
  track.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend",   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  }, { passive: true });

  setTimeout(() => { calculateSlidePosition(); startAutoSlide(); updatePauseBtn(); }, 100);
  console.log("Projects carousel initialised ✓");
  return true;
}

// ── Fetch → build → init ────────────────────────────
async function loadProjects() {
  try {
    const res = await fetch("assets/projects/projects.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const projects = await res.json();
    if (!Array.isArray(projects) || !projects.length) throw new Error("Empty JSON");

    buildProjectTiles(projects);

    setTimeout(() => {
      if (!initProjectsCarousel()) {
        let retries = 0;
        const retry = setInterval(() => {
          if (initProjectsCarousel() || ++retries >= 10) clearInterval(retry);
        }, 200);
      }
    }, 150);

  } catch (err) {
    console.error("Could not load projects.json:", err);
    const track = document.getElementById("projects-track");
    if (track) track.innerHTML = `
      <div class="glassmorphism-container projects-section active"
           style="justify-content:center;align-items:center;flex:0 0 60%;min-width:60%;">
        <p style="text-align:center;opacity:0.7;">Projects coming soon…</p>
      </div>`;
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadProjects);
} else {
  loadProjects();
}