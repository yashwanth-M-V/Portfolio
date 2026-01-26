// -----------------------------
// theme.js
// Handles dark/light mode toggle + about image switch
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // --- Define relative image paths ---
  const lightImage = "assets/about_section/about_pic_lt.png";
  const darkImage = "assets/about_section/about_pic_dt.png";

  // --- Function to update about picture ---
  function updateAboutImage(isDark) {
    const aboutPic = document.getElementById("about-pic");
    if (!aboutPic) return; // Skip if not loaded yet

    aboutPic.classList.add("flip-animation");
    setTimeout(() => {
      aboutPic.src = isDark ? darkImage : lightImage;
      aboutPic.classList.remove("flip-animation");
    }, 300); // Duration matches CSS flip
  }

  // --- Function to safely apply theme after about section is loaded ---
  function applyThemeState() {
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(`${savedTheme || "light"}-mode`);
    toggleBtn.textContent = isDark ? "🌙" : "☀️";

    updateAboutImage(isDark);
  }

  // --- Initial load ---
  applyThemeState();

  // --- Keep checking until about section loads ---
  const checkInterval = setInterval(() => {
    if (document.getElementById("about-pic")) {
      applyThemeState();
      clearInterval(checkInterval);
    }
  }, 500);

  // --- Theme toggle ---
  toggleBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode", !isDark);

    toggleBtn.textContent = isDark ? "🌙" : "☀️";
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateAboutImage(isDark);
  });
});
