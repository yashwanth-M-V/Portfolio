// loader.js
// Dynamically loads HTML sections into placeholder divs.
// Crucially: re-executes any <script> tags inside the loaded HTML
// so event listeners (hamburger, theme, etc.) wire up correctly.

async function loadHTML(placeholderId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Failed to load ${filePath}: ${response.statusText}`);

    const html = await response.text();
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    placeholder.innerHTML = html;

    // After injecting the header, wire up all JS via initHeader()
    if (placeholderId === "header-placeholder") {
      setTimeout(() => {
        if (typeof window.initHeader === "function") {
          window.initHeader();
        }
      }, 50);
    }

  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("loader.js: loading HTML sections...");

  loadHTML("header-placeholder",    "html_files/header.html");
  loadHTML("about-placeholder",     "html_files/about.html");
  loadHTML("skills-placeholder",    "html_files/skills.html");
  loadHTML("projects-placeholder",  "html_files/projects.html");
  loadHTML("education-placeholder", "html_files/education.html");
  loadHTML("experience-placeholder","html_files/experience.html");
  loadHTML("footer-placeholder",    "html_files/footer.html");
  loadHTML("beyond-work-placeholder","html_files/beyond_work.html");
});