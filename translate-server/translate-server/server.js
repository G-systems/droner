const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/translate', async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Missing text to translate' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'Translate the following Hebrew text to fluent, natural English, preserving meaning and tone.' },
          { role: 'user', content: text }
        ],
        temperature: 0.3,
      }),
    });

    const data = await openaiRes.json();
    const translated = data.choices?.[0]?.message?.content;
    res.json({ translated });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Translation failed' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Translation server running on port ${PORT}`));
