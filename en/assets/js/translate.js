window.translatePageToEnglish = async function () {
  const elementsToTranslate = Array.from(document.querySelectorAll("body, body *"))
    .filter(el => el.children.length === 0 && el.textContent.trim().length > 0);

  console.log(`🔍 Found ${elementsToTranslate.length} elements to translate`);

  for (const el of elementsToTranslate) {
    const originalText = el.textContent.trim();

    try {
      const response = await fetch("http://localhost:3001/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: originalText }),
      });

      if (!response.ok) {
        console.error("❌ Server responded with error:", response.status);
        continue;
      }

      const result = await response.json();

      if (result.translated) {
        el.textContent = result.translated;
        console.log("✅", originalText, "→", result.translated);
      } else {
        console.warn("⚠️ No translation returned for:", originalText);
      }

    } catch (err) {
      console.error("❌ Translation fetch error:", err);
    }
  }
}
