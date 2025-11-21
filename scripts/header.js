// header.js
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

  // Preload images
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Get random image that isn't the same as current
  function getRandomImage() {
    let newIndex = currentIndex;
    while (newIndex === currentIndex) {
      newIndex = Math.floor(Math.random() * images.length);
    }
    currentIndex = newIndex;
    return images[newIndex];
  }

  // 🎇 Create BIG explosion effect
  function createExplosion(x, y) {
    const count = 40; // More pieces = more dramatic
    const maxDistance = window.innerHeight * 0.25; // covers 25–30% of screen

    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.classList.add("explosion-piece"); // you said you already added CSS

      document.body.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * maxDistance;

      const finalX = Math.cos(angle) * distance;
      const finalY = Math.sin(angle) * distance;

      // Start at click position
      piece.style.left = `${x}px`;
      piece.style.top = `${y}px`;

      requestAnimationFrame(() => {
        piece.style.transform = `translate(${finalX}px, ${finalY}px) scale(2)`;
        piece.style.opacity = "0";
      });

      // Remove after animation
      setTimeout(() => piece.remove(), 1200);
    }
  }

  // Click handler
  profilePic.addEventListener("click", (event) => {
    const rect = profilePic.getBoundingClientRect();
    const clickX = rect.left + rect.width / 2;
    const clickY = rect.top + rect.height / 2;

    createExplosion(clickX, clickY);

    profilePic.style.opacity = "0.7";
    profilePic.style.transform = "scale(0.9)";

    setTimeout(() => {
      profilePic.src = getRandomImage();

      setTimeout(() => {
        profilePic.style.opacity = "1";
        profilePic.style.transform = "scale(1)";
      }, 70);
    }, 150);
  });

  // Hover effects
  profilePic.addEventListener("mouseenter", () => {
    profilePic.style.cursor = "pointer";
    profilePic.style.filter = "brightness(1.15)";
  });
  profilePic.addEventListener("mouseleave", () => {
    profilePic.style.filter = "brightness(1)";
  });
}

window.initProfilePicture = initProfilePicture;
