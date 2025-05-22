require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error("❌ API KEY not loaded! Check your .env file");
  process.exit(1);
} else {
  console.log("✅ API KEY loaded successfully");
}

app.post('/translate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text to translate' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Translate the following text from Hebrew to English" },
          { role: "user", content: text }
        ]
      })
    });

    const data = await response.json();
    console.log("🧠 OpenAI raw response:", JSON.stringify(data, null, 2));

    if (!data.choices || !data.choices[0]) {
      return res.status(500).json({ error: "No translation returned from OpenAI", raw: data });
    }

    const translated = data.choices[0].message.content.trim();
    res.json({ translated });

  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ error: 'Translation failed', details: err.message });
  }
});

app.listen(3001, () => {
  console.log('🚀 Translation server running on port 3001');
});
