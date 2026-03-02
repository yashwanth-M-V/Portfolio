// header.js
// Handles: profile picture cycling, explosion effect,
//          hamburger menu, smooth scroll, mobile theme toggle.
//
// Called by loader.js after header.html is injected into the DOM.
// Export: window.initHeader() — loader.js calls this after injection.

// ══════════════════════════════════════════
//  PROFILE PICTURE
// ══════════════════════════════════════════
function initProfilePicture() {
  const profilePic = document.getElementById("profile-pic");
  if (!profilePic) return;

  const images = [
    "assets/header_pics/profile_pic_1.png",
    "assets/header_pics/profile_pic_2.gif",
    "assets/header_pics/profile_pic_3.gif",
    "assets/header_pics/profile_pic_4.gif",
    "assets/header_pics/profile_pic_5.gif",
    "assets/header_pics/profile_pic_6.gif",
    "assets/header_pics/profile_pic_7.gif",
  ];

  let currentIndex = 0;

  // Preload all images so swaps are instant
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  function getRandomImage() {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * images.length);
    }
    currentIndex = newIndex;
    return images[newIndex];
  }

  // Explosion effect on click
  function createExplosion(x, y) {
    const count       = 40;
    const maxDistance = window.innerHeight * 0.25;

    for (let i = 0; i < count; i++) {
      const piece    = document.createElement("div");
      piece.classList.add("explosion-piece");
      document.body.appendChild(piece);

      const angle    = Math.random() * Math.PI * 2;
      const distance = Math.random() * maxDistance;
      const finalX   = Math.cos(angle) * distance;
      const finalY   = Math.sin(angle) * distance;

      piece.style.left = `${x}px`;
      piece.style.top  = `${y}px`;

      requestAnimationFrame(() => {
        piece.style.transform = `translate(${finalX}px, ${finalY}px) scale(2)`;
        piece.style.opacity   = "0";
      });

      setTimeout(() => piece.remove(), 1200);
    }
  }

  // Click: explode + swap image
  profilePic.addEventListener("click", () => {
    const rect   = profilePic.getBoundingClientRect();
    const clickX = rect.left + rect.width  / 2;
    const clickY = rect.top  + rect.height / 2;

    createExplosion(clickX, clickY);

    profilePic.style.opacity   = "0.7";
    profilePic.style.transform = "scale(0.9)";

    setTimeout(() => {
      profilePic.src = getRandomImage();
      setTimeout(() => {
        profilePic.style.opacity   = "1";
        profilePic.style.transform = "scale(1)";
      }, 70);
    }, 150);
  });

  // Hover glow
  profilePic.addEventListener("mouseenter", () => {
    profilePic.style.cursor = "pointer";
    profilePic.style.filter = "brightness(1.15)";
  });
  profilePic.addEventListener("mouseleave", () => {
    profilePic.style.filter = "brightness(1)";
  });
}

// ══════════════════════════════════════════
//  HAMBURGER MENU
// ══════════════════════════════════════════
function initHamburger() {
  const btn        = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (!btn || !mobileMenu) return;

  btn.addEventListener("click", function () {
    btn.classList.toggle("open");
    mobileMenu.classList.toggle("open");
  });
}

// ══════════════════════════════════════════
//  SMOOTH SCROLL (desktop + mobile links)
// ══════════════════════════════════════════
function initSmoothScroll() {
  const btn        = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function (e) {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      // Close mobile menu after tapping a link
      if (btn && mobileMenu) {
        btn.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });
  });
}

// ══════════════════════════════════════════
//  MOBILE THEME TOGGLE
//  Mirrors the main #theme-toggle button
//  and stays in sync with theme.js
// ══════════════════════════════════════════
function initMobileTheme() {
  const mobileThemeBtn = document.getElementById("mobile-theme-toggle");
  const mainThemeBtn   = document.getElementById("theme-toggle");

  function syncIcons() {
    const isDark = document.body.classList.contains("dark-mode");
    if (mobileThemeBtn) mobileThemeBtn.textContent = isDark ? "🌙" : "☀️";
    if (mainThemeBtn)   mainThemeBtn.textContent   = isDark ? "🌙" : "☀️";
  }

  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
      document.body.classList.toggle("light-mode");
      const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("theme", mode);
      syncIcons();
    });
  }

  // Sync icon to match whatever theme was restored by theme.js on load
  syncIcons();
}

// ══════════════════════════════════════════
//  MAIN ENTRY POINT
//  loader.js calls window.initHeader()
//  after injecting header.html
// ══════════════════════════════════════════
function initHeader() {
  initProfilePicture();
  initHamburger();
  initSmoothScroll();
  initMobileTheme();
}

// Keep backward-compat alias used elsewhere
window.initProfilePicture = initProfilePicture;
window.initHeader         = initHeader;