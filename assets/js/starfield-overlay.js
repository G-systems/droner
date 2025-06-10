(() => {
  // Configurable parameters
  const STAR_COUNT = window.innerWidth < 600 ? 40 : 90;
  const STAR_COLOR = 'rgba(57, 169, 220, 0.75)'; // Updated to --color-gold (#39A9DC)
  const STAR_COLOR_DIM = 'rgba(57, 169, 220, 0.25)'; // Dim version
  const STAR_SIZE_MIN = 0.7;
  const STAR_SIZE_MAX = 2.2;
  const STAR_SPEED_MIN = 0.02;
  const STAR_SPEED_MAX = 0.12;
  const Z_INDEX = 2; // Just above background, below UI

  // Create and style canvas
  const canvas = document.createElement('canvas');
  canvas.setAttribute('aria-hidden', 'true');
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = Z_INDEX;
  canvas.style.inset = 0;
  canvas.style.userSelect = 'none';
  canvas.style.transition = 'opacity 0.3s';
  canvas.style.opacity = '0.7';
  document.body.appendChild(canvas);

  let ctx = canvas.getContext('2d');
  let w = window.innerWidth, h = window.innerHeight;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  // --- Hide starfield where images/videos are visible ---
  function isOverImageOrVideo(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return false;
    if (
      el.tagName === "IMG" ||
      el.tagName === "VIDEO" ||
      el.closest(".image-container") ||
      el.closest(".video-container") ||
      el.closest(".media-gallery-row") ||
      el.closest(".about-gallery-row") ||
      el.closest(".product-card") ||
      el.closest(".main-video-wrapper") ||
      el.closest(".video-thumb-window")
    ) {
      return true;
    }
    return false;
  }

  function updateStarfieldVisibility() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let hide = false;

    if (isOverImageOrVideo(centerX, centerY)) hide = true;

    if (typeof updateStarfieldVisibility.lastMouse === "object") {
      const { x, y } = updateStarfieldVisibility.lastMouse;
      if (isOverImageOrVideo(x, y)) hide = true;
    }

    canvas.style.opacity = hide ? "0" : "0.7";
  }
  updateStarfieldVisibility.lastMouse = null;

  window.addEventListener("mousemove", e => {
    updateStarfieldVisibility.lastMouse = { x: e.clientX, y: e.clientY };
    updateStarfieldVisibility();
  }, { passive: true });

  window.addEventListener("scroll", updateStarfieldVisibility, { passive: true });
  window.addEventListener("resize", () => {
    resize();
    updateStarfieldVisibility();
  });

  // Star object
  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }
  function createStar() {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.sqrt(Math.random()) * Math.max(w, h) * 0.5;
    return {
      x: w / 2 + Math.cos(angle) * radius,
      y: h / 2 + Math.sin(angle) * radius,
      size: randomBetween(STAR_SIZE_MIN, STAR_SIZE_MAX),
      speed: randomBetween(STAR_SPEED_MIN, STAR_SPEED_MAX),
      twinkle: Math.random() * Math.PI * 2,
      twinkleSpeed: randomBetween(0.008, 0.025),
      color: Math.random() > 0.7 ? STAR_COLOR : STAR_COLOR_DIM
    };
  }

  let stars = Array.from({ length: STAR_COUNT }, createStar);

  function animate() {
    ctx.clearRect(0, 0, w, h);
    for (let star of stars) {
      // Twinkle effect
      const twinkle = 0.7 + 0.3 * Math.sin(star.twinkle);
      ctx.globalAlpha = twinkle;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
      ctx.fillStyle = star.color;
      ctx.shadowColor = '#39A9DC'; // Updated to --color-gold
      ctx.shadowBlur = 8 * twinkle;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      // Move star outward (parallax effect)
      const dx = star.x - w / 2;
      const dy = star.y - h / 2;
      star.x += dx * star.speed * 0.001;
      star.y += dy * star.speed * 0.001;
      star.twinkle += star.twinkleSpeed;

      // Respawn if out of bounds
      if (
        star.x < -50 || star.x > w + 50 ||
        star.y < -50 || star.y > h + 50
      ) {
        Object.assign(star, createStar());
      }
    }
    requestAnimationFrame(animate);
  }

  animate();

  // Optional: fade out on print
  window.addEventListener('beforeprint', () => { canvas.style.opacity = '0'; });
  window.addEventListener('afterprint', () => { updateStarfieldVisibility(); });

  // Initial visibility check
  updateStarfieldVisibility();
})();
