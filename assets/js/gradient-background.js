window.addEventListener("DOMContentLoaded", () => {
  // Create and style the canvas
  const canvas = document.createElement("canvas");
  canvas.id = "gradient-bg-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "1";
  canvas.style.inset = "0";
  canvas.style.userSelect = "none";
  canvas.style.transition = "opacity 0.3s";
  canvas.style.opacity = "1";
  document.body.insertBefore(canvas, document.body.firstChild);

  let ctx = canvas.getContext("2d");
  let w = window.innerWidth,
    h = window.innerHeight;

  function resize() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }

  let particles = [];
  const numParticles = 80;

  function createParticles() {
    particles = [];
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.7,
        dy: (Math.random() - 0.5) * 0.7,
        a: Math.random() * 0.5 + 0.3
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
      ctx.fillStyle = `rgba(255, 215, 0, ${p.a})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 215, 0, ${1 - dist / 100})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  // --- Hide gradient where images/videos are visible ---
  function isOverImageOrVideo(x, y) {
    const el = document.elementFromPoint(x, y);
    if (!el) return false;
    // Check for images/videos or their parents with known classes
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

  function updateGradientVisibility() {
    // Check center of viewport and mouse position
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    let hide = false;

    // Hide if center of viewport is over image/video
    if (isOverImageOrVideo(centerX, centerY)) hide = true;

    // Hide if mouse is over image/video
    if (typeof updateGradientVisibility.lastMouse === "object") {
      const { x, y } = updateGradientVisibility.lastMouse;
      if (isOverImageOrVideo(x, y)) hide = true;
    }

    canvas.style.opacity = hide ? "0" : "1";
  }
  updateGradientVisibility.lastMouse = null;

  window.addEventListener("mousemove", e => {
    updateGradientVisibility.lastMouse = { x: e.clientX, y: e.clientY };
    updateGradientVisibility();
  }, { passive: true });

  window.addEventListener("scroll", updateGradientVisibility, { passive: true });
  window.addEventListener("resize", () => {
    resize();
    createParticles();
    updateGradientVisibility();
  });

  // Initial setup
  resize();
  createParticles();
  draw();
  updateGradientVisibility();
});
