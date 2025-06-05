document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("accessibility-button")) return;

  const lang = document.documentElement.lang || "en";
  const isHebrew = lang.startsWith("he");

  const labels = isHebrew
    ? {
        increase: "הגדל טקסט",
        decrease: "הקטן טקסט",
        contrast: "ניגודיות גבוהה",
        grayscale: "שחור-לבן",
        stop: "עצור אנימציות",
        reset: "איפוס"
      }
    : {
        increase: "Increase Text Size",
        decrease: "Decrease Text Size",
        contrast: "High Contrast",
        grayscale: "Grayscale",
        stop: "Pause Animations",
        reset: "Reset"
      };

  const btn = document.createElement("div");
  btn.id = "accessibility-button";
  btn.innerText = "♿";
  btn.onclick = toggleAccessibilityBar;
  document.body.appendChild(btn);

  const bar = document.createElement("div");
  bar.id = "accessibility-bar";
  bar.innerHTML = `
    <button onclick="changeFontSize(1)">${labels.increase}</button>
    <button onclick="changeFontSize(-1)">${labels.decrease}</button>
    <button onclick="toggleHighContrast()">${labels.contrast}</button>
    <button onclick="toggleGrayscale()">${labels.grayscale}</button>
    <button onclick="stopAnimations()">${labels.stop}</button>
    <button onclick="resetAccessibility()">${labels.reset}</button>
  `;
  document.body.appendChild(bar);

  const style = document.createElement("style");
  style.innerHTML = `
    #accessibility-button {
      position: fixed; bottom: 20px; left: 20px; z-index: 9999;
      background: #FFD700; color: white; border-radius: 50%;
      font-size: 1.5rem; width: 48px; height: 48px;
      text-align: center; line-height: 48px; cursor: pointer;
    }
    #accessibility-bar {
      position: fixed; bottom: 80px; left: 20px;
      background: #fff; color: #000; padding: 1rem;
      border-radius: 12px; box-shadow: 0 2px 12px rgba(0,0,0,0.2);
      display: none; flex-direction: column; gap: 0.5rem;
      z-index: 9999;
    }
    #accessibility-bar button {
      padding: 0.5rem; font-size: 1rem; border: none;
      background: #FFD700; color: #000; border-radius: 6px; cursor: pointer;
    }
    .high-contrast { background: #000 !important; color: #fff !important; }
    .grayscale { filter: grayscale(100%) !important; }
    html.font-110 { font-size: 110%; }
    html.font-120 { font-size: 120%; }
    html.font-130 { font-size: 130%; }
    html.font-140 { font-size: 140%; }
    html.font-150 { font-size: 150%; }
  `;
  document.head.appendChild(style);
});

let currentFontSize = 100;
function toggleAccessibilityBar() {
  const bar = document.getElementById("accessibility-bar");
  if (bar) bar.style.display = bar.style.display === "flex" ? "none" : "flex";
}
function changeFontSize(change) {
  const html = document.documentElement;
  html.classList.remove("font-110", "font-120", "font-130", "font-140", "font-150");
  currentFontSize += change * 10;
  currentFontSize = Math.max(100, Math.min(currentFontSize, 150));
  if (currentFontSize > 100) {
    html.classList.add(`font-${currentFontSize}`);
  }
}
function toggleHighContrast() {
  document.body.classList.toggle("high-contrast");
}
function toggleGrayscale() {
  document.body.classList.toggle("grayscale");
}
function stopAnimations() {
  const css = document.createElement("style");
  css.innerHTML = "* { animation: none !important; transition: none !important; }";
  document.head.appendChild(css);
}
function resetAccessibility() {
  currentFontSize = 100;
  const html = document.documentElement;
  html.classList.remove("font-110", "font-120", "font-130", "font-140", "font-150");
  document.body.style.fontSize = "";
  document.body.classList.remove("high-contrast", "grayscale");
  document.querySelectorAll("style").forEach(s => {
    if (s.innerText.includes("animation")) s.remove();
  });
}
