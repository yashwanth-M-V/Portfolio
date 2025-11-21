// -----------------------------
// theme.js
// -----------------------------

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  // -----------------------------
  // ABOUT IMAGE SWITCH
  // -----------------------------
  const lightImage = "assets/about_section/about_pic_lt.png";
  const darkImage  = "assets/about_section/about_pic_dt.png";

  function updateAboutImage(isDark) {
    const aboutPic = document.getElementById("about-pic");
    if (!aboutPic) return;

    aboutPic.classList.add("flip-animation");

    setTimeout(() => {
      aboutPic.src = isDark ? darkImage : lightImage;
      aboutPic.classList.remove("flip-animation");
    }, 300);
  }

  function applyThemeState() {
    const savedTheme = localStorage.getItem("theme") || "light";
    const isDark = savedTheme === "dark";

    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(`${savedTheme}-mode`);

    body.setAttribute("data-theme", savedTheme);

    toggleBtn.textContent = isDark ? "🌙" : "☀️";

    updateAboutImage(isDark);
  }

  applyThemeState();

  // -----------------------------
  // THEME TOGGLE
  // -----------------------------
  toggleBtn.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode", !isDark);

    const newTheme = isDark ? "dark" : "light";
    body.setAttribute("data-theme", newTheme);

    toggleBtn.textContent = isDark ? "🌙" : "☀️";

    localStorage.setItem("theme", newTheme);
    updateAboutImage(isDark);
  });

  
});
