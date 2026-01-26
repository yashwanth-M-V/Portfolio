// -----------------------------
// loader.js
// Dynamically loads reusable HTML sections (like header, about, etc.)
// -----------------------------

// Utility function to load an external HTML file into a placeholder div
async function loadHTML(placeholderId, filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
    }

    const html = await response.text();
    document.getElementById(placeholderId).innerHTML = html;
    
    // Initialize profile picture if this is the header
    if (placeholderId === "header-placeholder") {
      setTimeout(() => {
        if (typeof initProfilePicture === 'function') {
          initProfilePicture();
        }
      }, 100);
    }
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

// When the DOM is ready, load all modular sections
document.addEventListener("DOMContentLoaded", () => {
  console.log("Loader.js: loading HTML sections...");

  // Load each section by its placeholder and path
  loadHTML("header-placeholder", "html_files/header.html");
  loadHTML("about-placeholder", "html_files/about.html");
  loadHTML("skills-placeholder", "html_files/skills.html");
  loadHTML("projects-placeholder", "html_files/projects.html");
  loadHTML("education-placeholder", "html_files/education.html");
  loadHTML("experience-placeholder", "html_files/experience.html");
  loadHTML("footer-placeholder", "html_files/footer.html");
  
});