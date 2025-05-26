document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    const heroImage = document.querySelector(".hero-section img");
    if (heroImage) {
      const originalSrc = heroImage.getAttribute("src");
      const mobileSrc = originalSrc.replace(".webp", "-mobile.webp");
      fetch(mobileSrc, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            heroImage.setAttribute("src", mobileSrc);
          }
        })
        .catch(err => {
          console.warn("Mobile hero image not found:", mobileSrc);
        });
    }
  }
});
