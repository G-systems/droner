async function translatePageToEnglish() {
  const elementsToTranslate = Array.from(document.querySelectorAll("body, body *"))
    .filter(el => el.children.length === 0 && el.textContent.trim().length > 0);

  for (const el of elementsToTranslate) {
    const originalText = el.textContent.trim();

    try {
      const response = await fetch("http://localhost:3001/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: originalText }),
      });

      const result = await response.json();
      if (result.translated) {
        el.textContent = result.translated;
      }

    } catch (err) {
      console.error("Translation error:", err);
    }
  }
}
